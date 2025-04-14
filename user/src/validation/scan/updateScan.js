import Joi from "joi";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Set up DOMPurify with JSDOM
const window = new JSDOM("").window;
const dompurify = DOMPurify(window);

// Regex pattern for URL validation
const urlPattern =
  /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/;

// Custom URL validation function
const customUrlValidation = (value, helpers) => {
  if (!urlPattern.test(value)) {
    return helpers.error("string.uri");
  }
  return value;
};

const customImageValidation = Joi.object({
  url: Joi.string().uri().required(),
  size: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
  type: Joi.string().valid("size", "alt").required(),
});

// Custom suggestion validation schema
const customSuggestionValidation = Joi.object({
  message: Joi.string().required(),
  images: Joi.array().items(customImageValidation).optional(),
  htmlElement: Joi.array().items(Joi.any()).optional(),
  severity: Joi.number().integer().min(1).max(3).required(),
  metaDescription: Joi.alternatives()
    .try(Joi.string().allow(""), Joi.valid(null))
    .optional(),
  notes: Joi.string().allow("").optional(),
  isBlank: Joi.boolean().optional(),
  button: Joi.number().optional(),
  inspectionResultLink: Joi.string().allow("").optional(),
  premium: Joi.boolean().optional(),
  warning: Joi.boolean().optional(),
  links: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        url: Joi.string().allow(null, "").custom(customUrlValidation),
      })
    )
    .optional(),
});

// Custom pass suggestion validation schema
const customPassSuggestionValidation = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  severity: Joi.number().integer().min(1).max(3).required(),
  premium: Joi.boolean().optional(),
});

// Custom scan object validation schema
const customScanObjectValidation = Joi.object({
  title: Joi.string().required(),
  suggestions: Joi.array().items(customSuggestionValidation).required(),
  passSuggestions: Joi.array()
    .items(Joi.alternatives().try(customPassSuggestionValidation, Joi.string()))
    .required(),
  successMessage: Joi.string().required(),
  info: Joi.string().allow("").required(),
  totalChecks: Joi.number().integer().min(1).required(),
  passChecks: Joi.number().integer().min(0).required(),
  duration: Joi.number().integer().min(0).optional(),
  draftPageMessage: Joi.string().allow("").optional(),
  noSuggestions: Joi.array().default([]).optional(),
  notes: Joi.string().allow("").optional(),
  keyword: Joi.string().optional(),
}).required();

// Update scan schema validation
const updateScanSchema = Joi.object({
  url: Joi.string().required().custom(customUrlValidation).messages({
    "string.uri": "URL must be a valid URI",
    "string.empty": "URL is required",
  }),
  optimized_scan: Joi.array().items(customScanObjectValidation).required(),
});

// Function to sanitize array of objects
const sanitizeArrayOfObjects = (array) => {
  if (!Array.isArray(array)) return [];
  return array.map((item) => {
    const sanitizedItem = {};
    for (const [key, value] of Object.entries(item)) {
      sanitizedItem[dompurify.sanitize(key)] =
        typeof value === "string" ? dompurify.sanitize(value) : value;
    }
    return sanitizedItem;
  });
};

// Function to validate update scan data
const validateUpdateScan = (data) => {
  // Sanitize input
  const sanitizedData = {
    url: dompurify.sanitize(data.url),
    optimized_scan: sanitizeArrayOfObjects(data.optimized_scan),
  };
  return updateScanSchema.validate(sanitizedData, { abortEarly: false });
};

export { validateUpdateScan };
