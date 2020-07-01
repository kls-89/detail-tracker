const jwt = require('jsonwebtoken');

// Middleware function to check user permissions.

// User is signed into the application.
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

// Check that the user is a member of the agency.
const belongsToAgency = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokenValues = jwt.decode(token);

  if (
    tokenValues.agencyAffiliation.find(
      agencyId => agencyId === req.params.agencyId
    )
  ) {
    console.log('belongs to agency');
    next();
  } else {
    return res
      .status(403)
      .json({ message: 'Not authorized to view this agency.' });
  }
};

// TODO:
const isAgencyAdmin = (req, res, next) => {
  // Check that the user in a given agency is also an administrator for that agency.
  next();
};

// Limit access to detail-specific routes only to those who can work details.
const canWorkDetails = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const tokenValues = jwt.decode(token);

  // ADDED TO DETAIL CONTROLLER -- DELETE IF NOT NEEDED.

  if (tokenValues.canWorkDetails) {
    console.log('Can work Details');
    next();
  } else {
    return res
      .status(403)
      .json({
        message: 'You must be authorized to work details to view this page.'
      });
  }
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
