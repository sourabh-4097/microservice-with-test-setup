import Joi from "joi";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Set up DOMPurify with JSDOM
const window = new JSDOM("").window;
const dompurify = DOMPurify(window);

// regex pattern
const urlPattern =
  /^(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?$/;

const customUrlValidation = (value, helpers) => {
  if (!urlPattern.test(value)) {
    return helpers.error("string.uri");
  }
  return value;
};

// Define the schema for suggestion and passSuggestion items
const optimize_suggestionSchema = Joi.object({
  message: Joi.string().required(),
  severity: Joi.number().integer().optional(),
  premium: Joi.boolean().optional(),
  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
        size: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
        type: Joi.string().valid("size", "alt").required(),
      })
    )
    .optional(),
  htmlElement: Joi.array().items(Joi.any()).optional(),
  links: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        url: Joi.string().allow(null, "").custom(customUrlValidation),
      })
    )
    .optional(),
  isBlank: Joi.boolean().optional(),
  metaDescription: Joi.string().allow(null).optional(),
  button: Joi.number().optional(),
  notes: Joi.string().allow("").optional(),
  inspectionResultLink: Joi.string().allow("").optional(),
  warning: Joi.boolean().optional(),
});

const passSuggestionSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().allow(null, "").required(),
  severity: Joi.number().integer().optional(),
  premium: Joi.boolean().optional(),
});

// Define the schema for each object in the optimized_scan and premium_scan arrays
const scanItemSchema = Joi.object({
  title: Joi.string().required(),
  suggestions: Joi.array().items(optimize_suggestionSchema).default([]),
  passSuggestions: Joi.array()
    .items(Joi.alternatives().try(passSuggestionSchema, Joi.string()))
    .default([]),
  info: Joi.string().allow("").required(),
  successMessage: Joi.string().optional(),
  totalChecks: Joi.number().integer().optional(),
  passChecks: Joi.number().integer().optional(),
  duration: Joi.number().integer().optional(),
  draftPageMessage: Joi.string().optional(),
  noSuggestions: Joi.array().optional(),
  keyword: Joi.string().optional(),
  notes: Joi.string().allow("").optional(),
});

// Define the schema for suggestion items
const suggestionSchema = Joi.object({
  Keyword: Joi.string().required(),
  volume: Joi.number().integer().required(),
  Competition: Joi.number().integer().required(),
  Competition_level: Joi.string().valid("LOW", "MEDIUM", "HIGH").required(),
});

// Define the schema for each object in the premium_scan array
const premiumScanItemSchema = Joi.object({
  title: Joi.string().required(),
  value: Joi.alternatives()
    .try(
      Joi.number().integer(),
      Joi.string().valid("LOW", "MEDIUM", "HIGH").empty(""),
      Joi.string().empty("")
    )
    .required(),
  allintitle: Joi.alternatives()
    .try(
      Joi.object({
        searchTime: Joi.number().required(),
        formattedSearchTime: Joi.string().required(),
        totalResults: Joi.string().required(),
        formattedTotalResults: Joi.string().required(),
      }).optional(),
      Joi.array()
        .items(
          Joi.object({
            searchTime: Joi.number().required(),
            formattedSearchTime: Joi.string().required(),
            totalResults: Joi.string().required(),
            formattedTotalResults: Joi.string().required(),
          })
        )
        .default([]) // Default to an empty array if not provided
    )
    .default([]), // Default to an empty array if not provided
  suggestions: Joi.array().items(suggestionSchema).default([]),
  color: Joi.string().valid("red", "sky", "orange").required(),
});

// Define the main schema for the entire premium_scan array
const createScanSchema = Joi.object({
  user_id: Joi.string().required().messages({
    "string.empty": "User ID is required",
  }),
  scan_url: Joi.string().required().custom(customUrlValidation).messages({
    "string.uri": "Scan URL must be a valid URL",
    "string.empty": "Scan URL is required",
  }),
  with_keyword: Joi.boolean().optional(),
  keyword: Joi.string().allow("").max(50).optional(),
  created_at: Joi.date().optional(),
  optimized_scan: Joi.array().items(scanItemSchema).optional().messages({
    "array.base": "Optimized scan must be an array",
  }),
  premium_scan: Joi.array().items(premiumScanItemSchema).optional().messages({
    "array.base": "Premium scan must be an array",
  }),
  sitepage_id: Joi.string().optional(),
  location_code: Joi.string().optional(),
});

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

const validateCreateScan = (data) => {
  // Sanitize input
  const sanitizedData = {
    user_id: dompurify.sanitize(data.user_id),
    scan_url: dompurify.sanitize(data.scan_url),
    with_keyword: data.with_keyword,
    keyword: dompurify.sanitize(data.keyword),
    created_at: data.created_at,
    optimized_scan: sanitizeArrayOfObjects(data.optimized_scan),
    premium_scan: sanitizeArrayOfObjects(data.premium_scan),
    sitepage_id: dompurify.sanitize(data.sitepage_id),
    location_code: dompurify.sanitize(data.location_code),
  };
  return createScanSchema.validate(sanitizedData, { abortEarly: false });
};

export { validateCreateScan };
