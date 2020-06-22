const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

// View all Agencies
router.get('/agency', adminController.getAgencies);

// View individual agency
router.get('/agency/:id', adminController.getAgency);

// Create new Agency
router.post('/agency', adminController.postAgency);

// Update Agency
router.put('/agency/:id', adminController.putAgency);

// Delete Agency
router.delete('/agency/:id', adminController.deleteAgency);

// View all Employees
router.get('/employee', adminController.getEmployees);

// view individual employee
router.get('/employee/:id', adminController.getEmployee);

// Create new Employee
router.post('/employee', adminController.postEmployee);

// Update Employee
router.put('/employee/:id', adminController.putEmployee);

// Delete Employee
router.delete('/employee/:id', adminController.deleteEmployee);

module.exports = router;
