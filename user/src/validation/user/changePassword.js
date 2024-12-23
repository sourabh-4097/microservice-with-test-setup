import Joi from "joi";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Set up DOMPurify with JSDOM
const window = new JSDOM("").window;
const dompurify = DOMPurify(window);

const changePasswordSchema = Joi.object({
  user_id: Joi.string().required(),
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
  oldPassword: Joi.string().required(),
});

const validateChangePassword = (data) => {
  // Sanitize input
  const sanitizedData = {
    user_id: dompurify.sanitize(data.user_id),
    password: dompurify.sanitize(data.password),
    oldPassword: dompurify.sanitize(data.oldPassword),
  };
  return changePasswordSchema.validate(sanitizedData, { abortEarly: false });
};
export { validateChangePassword };
