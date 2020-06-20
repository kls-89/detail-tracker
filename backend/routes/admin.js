const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// View all Agencies
router.get('/agency', adminController.getAgency);

// Create new Agency
router.post('/agency', adminController.postAgency);

// Update Agency
router.put('/agency/:id', adminController.putAgency);

// Delete Agency
router.delete('/agency/:id', adminController.deleteAgency);

module.exports = router;
