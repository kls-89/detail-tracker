const express = require('express');
const router = express.Router();
const detailController = require('../controllers/detail');

// middleware
const {
  belongsToAgency,
  canWorkDetails
} = require('../middleware/checkPermissons');

// View all Details
router.get('/', canWorkDetails, detailController.getDetails);

// View single Detail
router.get('/:detailId', detailController.getDetail);

// Create new Detail
router.post('/', detailController.postDetail);

// Update Detail
router.patch('/:detailId', detailController.patchDetail);

// Delete Detail
router.delete('/:detailId', detailController.deleteDetail);

module.exports = router;
