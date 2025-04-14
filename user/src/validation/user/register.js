import Joi from "joi";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Set up DOMPurify with JSDOM
const window = new JSDOM("").window;
const dompurify = DOMPurify(window);
// Define JOI schema for register user request validation
const registerUserSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .required()
    .pattern(
      new RegExp(
        "^(?=.*[a-zA-Z0-9~`¿¡!#$%^&*€£@+÷=\\-\\[\\]\\\\';,/{}/()|\\\\\":<>?.\\_]).{8,}$"
      )
    )
    .messages({
      "string.pattern.base":
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
      "string.max": "Password must be at most 16 characters long",
    }),
  clientReferenceId: Joi.string(),
  team_size: Joi.string(), // Adjust min and max as per your requirements
  your_role: Joi.string(),
  selectPlanId: Joi.string(), // Assuming this is related to Stripe plan ID
  hasAgreedToTerms: Joi.boolean()
    .optional()
    .messages({ "boolean.base": "Please accept SEOSpace’s T&Cs to continue." }),
});

// Function to validate register user request
const validateRegisterUser = (data) => {
  // Sanitize input
  const sanitizedData = {
    name: dompurify.sanitize(data.name),
    email: dompurify.sanitize(data.email),
    password: dompurify.sanitize(data.password),
    clientReferenceId: data.clientReferenceId
      ? dompurify.sanitize(data.clientReferenceId)
      : undefined,
    team_size: data.team_size ? dompurify.sanitize(data.team_size) : undefined,
    your_role: data.your_role ? dompurify.sanitize(data.your_role) : undefined,
    selectPlanId: data.selectPlanId
      ? dompurify.sanitize(data.selectPlanId)
      : undefined,
    hasAgreedToTerms: data.hasAgreedToTerms,
  };
  return registerUserSchema.validate(sanitizedData, { abortEarly: false });
};

export { validateRegisterUser };
