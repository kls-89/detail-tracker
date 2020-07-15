const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agency');

const { belongsToAgency } = require('../middleware/checkPermissons');

// URL: /agency/
router.get('/', (req, res, next) => {
  res.redirect('/');
});

// view this agency's page
router.get('/:agencyId', belongsToAgency, agencyController.getAgency);

// view all details for this agency
router.get(
  '/:agencyId/details',
  belongsToAgency,
  agencyController.getAgencyDetails
);

// view a specific detail for this agency
router.get('/:agencyId/details/:detailId', belongsToAgency);

module.exports = router;
