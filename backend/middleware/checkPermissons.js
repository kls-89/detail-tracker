const jwt = require('jsonwebtoken');

// Middleware function to check user permissions.

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.employeeData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth failed' });
  }
};

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
  isLoggedIn,
  belongsToAgency,
  isAgencyAdmin,
  canWorkDetails,
  checkTownAuthorization
};
