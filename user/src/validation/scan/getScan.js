import Joi from "joi";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Set up DOMPurify with JSDOM
const window = new JSDOM("").window;
const dompurify = DOMPurify(window);

const getScanSchema = Joi.object({
  field: Joi.string().required().messages({
    "string.empty": "Field is required",
  }),
  value: Joi.string().required().messages({
    "string.empty": "Value is required",
  }),
});

const validateGetScan = (data) => {
  // Sanitize input
  const sanitizedData = {
    field: dompurify.sanitize(data.field),
    value: dompurify.sanitize(data.value),
  };
  return getScanSchema.validate(sanitizedData, { abortEarly: false });
};

export { validateGetScan };
