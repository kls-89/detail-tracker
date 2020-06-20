const express = require('express');
const router = express.Router();
const detailController = require('../controllers/detail');

// View all Details
router.get('/', detailController.getDetail);

// Create new Detail
router.post('/', detailController.postDetail);

// Update Detail
router.put('/:id', detailController.putDetail);

// Delete Detail
router.delete('/:id', detailController.deleteDetail);

module.exports = router;
