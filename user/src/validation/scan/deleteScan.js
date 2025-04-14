// validation/deleteScanValidation.js
import Joi from "joi";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Create a DOMPurify instance using jsdom
const window = new JSDOM("").window;
const dompurify = DOMPurify(window);

// Define the JOI schema for the id parameter
const deleteScanSchema = Joi.object({
  id: Joi.string().required(), // Assuming id is a UUID, adjust as needed
});

// Middleware for validating request params
const validateDeleteScan = (req, res, next) => {
  // Sanitize the input
  const sanitizedParams = {
    id: dompurify.sanitize(req.params.id),
  };
  const { error } = deleteScanSchema.validate(sanitizedParams);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export { validateDeleteScan };
