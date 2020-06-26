// Middleware function to check user permissions.

// TODO:
const belongsToAgency = (req, res, next) => {
  // Check that the user is a member of the agency.
  next();
};

// TODO:
const isAgencyAdmin = (req, res, next) => {
  // Check that the user in a given agency is also an administrator for that agency.
  next();
};

// TODO:
const canWorkDetails = (req, res, next) => {
  // Limit access to detail-specific routes only to those who can work details.
  next();
};

// TODO:
const checkTownAuthorization = (req, res, next) => {
  // Mechanism to only allow users to see details posted by other towns, if the other town authorizes this to be done.
  next();
};

module.exports = {
  belongsToAgency,
  isAgencyAdmin,
  canWorkDetails,
  checkTownAuthorization
};
