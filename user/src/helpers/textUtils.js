
/**
 * Function to sanitize an email address and create a case-insensitive RegExp pattern
 *
 * @param {string} email for passed user email
 *
 * @returns string for email
 */
const sanitizeEmail = (email) => {
  // Replace special characters in the email with their escaped versions
  const escapedEmail = email?.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

  // Create a regular expression with the escaped email pattern, anchored to the start and end
  // The resulting regular expression is used for case-insensitive matching
  return new RegExp("^" + escapedEmail + "$", "i");
};

export {
  sanitizeEmail,
};
