const bcrypt = require('bcrypt');
const saltRounds = 10;

const Employee = require('../models/employee');
const Agency = require('../models/agency');

const baseURL = 'http://localhost:3001/api/employees';

const getEmployees = (req, res, next) => {
  Employee.find({})
    .exec()
    .then(docs => {
      res.status(200).json({
        employeeCount: docs.length,
        employees: docs.map(doc => {
          return {
            doc,
            request: {
              type: 'GET',
              description: 'View individual employee specifics',
              url: `${baseURL}/${doc._id}`
            }
          };
        })
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

const getEmployee = (req, res, next) => {
  Employee.findById({ _id: req.params.employeeId })
    // .populate(
    //   'agencyAffiliation',
    //   'name streetAddress city state zipCode phoneNumber detailRate'
    // )
    .populate('agencyAffiliation details')
    .exec()
    .then(doc => {
      res.status(200).json({
        doc,
        request: {
          type: 'GET',
          description: 'View all employees',
          url: `${baseURL}`
        }
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

const postEmployee = async (req, res, next) => {
  const {
    firstName,
    lastName,
    title,
    phoneNumber,
    emailAddress,
    password,
    isAgencyAdmin,
    canWorkDetails,
    seniority,
    agencyAffiliation
  } = req.body;

  try {
    await bcrypt.hash(password, saltRounds, (err, passwordHash) => {
      if (err) {
        return res.status(500).json({
          message: 'Error hashing password in postEmployee route',
          error: err
        });
      }

      // TODO: Add validation to verify employee doesn't already exist.

      // CREATE NEW EMPLOYEE
      const newEmployee = new Employee({
        firstName,
        lastName,
        title,
        phoneNumber,
        emailAddress,
        passwordHash,
        isAgencyAdmin,
        canWorkDetails,
        seniority,
        agencyAffiliation
      });

      // Save new employee to the agency's employee collection
      newEmployee
        .save()
        .then(async () => {
          try {
            const foundAgency = await Agency.findById(agencyAffiliation);
            // Save ref to employee in the Agency's document
            foundAgency.employees.push(newEmployee._id);
            // Update Agency Admin list (if need be)
            if (isAgencyAdmin) {
              foundAgency.agencyAdministrators.push(newEmployee._id);
            }
            await foundAgency.save();
          } catch (err) {
            return res.status(400).json({
              message: 'Error updating agency',
              error: err
            });
          }
        })
        .then(doc => {
          return res.status(200).json({
            message: 'Employee created',
            doc,
            request: {
              type: 'GET',
              description: 'View all employees',
              url: `${baseURL}`
            }
          });
        })
        .catch(err =>
          console.log(
            'Error saving employee to db from postEmployee controller',
            err
          )
        );
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const patchEmployee = (req, res, next) => {
  const employeeId = req.params.employeeId;

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Employee.findByIdAndUpdate(employeeId, { $set: updateOps })
    .exec()
    .then(updatedEmployee => {
      res.status(200).json({
        updatedEmployee,
        request: {
          type: 'GET',
          description: 'View individual employee specifics',
          url: `${baseURL}/${employeeId}`
        }
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

const deleteEmployee = (req, res, next) => {
  const employeeId = req.params.employeeId;

  Employee.findByIdAndDelete(employeeId)
    .exec()
    .then(employeeToDelete => {
      res.status(204).json({
        message: `Employee with ID ${employeeId} removed.`,
        request: {
          type: 'POST',
          description: 'Create new employee',
          url: `${baseURL}`
        }
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

module.exports = {
  getEmployees,
  getEmployee,
  postEmployee,
  patchEmployee,
  deleteEmployee
};
