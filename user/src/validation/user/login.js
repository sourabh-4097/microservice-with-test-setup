import Joi from "joi";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Set up DOMPurify with JSDOM
const window = new JSDOM("").window;
const dompurify = DOMPurify(window);
// Define JOI schema for login request validation
const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Function to validate login request
const validateLoginUser = (data) => {
  // Sanitize input
  const sanitizedData = {
    email: dompurify.sanitize(data.email),
    password: dompurify.sanitize(data.password),
  };
  return loginUserSchema.validate(sanitizedData, { abortEarly: false });
};

export { validateLoginUser };
