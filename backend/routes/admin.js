const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

const { belongsToAgency } = require('../middleware/checkPermissons');
// View all Agencies
router.get('/agency', adminController.getAgencies);

// View individual agency
router.get('/agency/:agencyId', belongsToAgency, adminController.getAgency);

// Create new Agency
router.post('/agency', adminController.postAgency);

// Update Agency
router.patch('/agency/:agencyId', adminController.patchAgency);

// Delete Agency
router.delete('/agency/:agencyId', adminController.deleteAgency);

module.exports = router;
