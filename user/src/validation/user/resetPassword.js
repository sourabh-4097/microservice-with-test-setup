import Joi from "joi";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Set up DOMPurify with JSDOM
const window = new JSDOM("").window;
const dompurify = DOMPurify(window);
// Define JOI schema for reset password request validation
const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
      "string.max": "Password must be at most 16 characters long",
    }),
});

// Function to validate reset password request
const validateResetPassword = (data) => {
  // Sanitize input
  const sanitizedData = {
    token: dompurify.sanitize(data.token),
    password: dompurify.sanitize(data.password),
  };
  return resetPasswordSchema.validate(sanitizedData, { abortEarly: false });
};

export { validateResetPassword };
