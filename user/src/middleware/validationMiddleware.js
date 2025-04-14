// middleware/validationMiddleware.js
import { BadRequestError } from "../errors/index.js";
export const validate = (schema) => (req, res, next) => {
    const { error } = schema(req.body);
    if (error) {
        // Validation failed, return error details
        throw new BadRequestError(error.details[0].message);
    }

    // Validation passed, continue to next middleware or route handler
    next();
};

