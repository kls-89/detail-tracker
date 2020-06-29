const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee');

// View all Employees
router.get('/', employeeController.getEmployees);

// view individual employee
router.get('/:employeeId', employeeController.getEmployee);

// Create new Employee
router.post('/', employeeController.postEmployee);

// Update Employee
router.patch('/:employeeId', employeeController.patchEmployee);

// Delete Employee
router.delete('/:employeeId', employeeController.deleteEmployee);

module.exports = router;
