const Agency = require('../models/agency');
const Employee = require('../models/employee');

// AGENCY
const getAgencies = async (req, res, next) => {
  try {
    const agencies = await Agency.find({});
    res.status(200).json(agencies);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAgency = async (req, res, next) => {
  try {
    const agency = await Agency.findById({ _id: req.params.id });
    res.status(200).json(agency);
  } catch (error) {
    res.status(404).json(error);
  }
};

const postAgency = async (req, res, next) => {
  const { name, address, phoneNumber, detailRate } = req.body;
  const newAgency = new Agency({ name, address, phoneNumber, detailRate });
  try {
    await newAgency.save();
    res.status(200).json(newAgency);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const putAgency = (req, res, next) => {
  console.log(req);
  res.send('put agency');
};

const deleteAgency = async (req, res, next) => {
  try {
    const agencyId = req.params.id;
    await Agency.findByIdAndRemove({ _id: agencyId });
    res.status(204).json({ message: `Agency with ID ${agencyId} removed.` });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// EMPLOYEE

const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findById({ _id: req.params.id });
    res.status(200).json(employee);
  } catch (error) {
    res.status(404).json(error);
  }
};

const postEmployee = async (req, res, next) => {
  const {
    name,
    phoneNumber,
    emailAddress,
    passwordHash,
    isAgencyAdmin,
    canWorkDetails,
    seniority,
    agencyAffiliation
  } = req.body;

  const newEmployee = new Employee({
    name,
    phoneNumber,
    emailAddress,
    passwordHash,
    isAgencyAdmin,
    canWorkDetails,
    seniority,
    agencyAffiliation
  });
  try {
    await newEmployee.save();
    res.status(200).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// const employeeSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   phoneNumber: {
//     type: String,
//     required: true
//   },
//   emailAddress: {
//     type: String,
//     required: true
//   },
//   passwordHash: {
//     type: String,
//     required: true
//   },
//   passwordResetToken: {
//     type: String
//   },
//   isAgencyAdmin: {
//     type: Boolean,
//     required: true
//   },
//   canWorkDetails: {
//     type: Boolean,
//     required: true
//   },
//   seniority: {
//     type: Number,
//     default: null
//   },
//   details: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Detail' }],
//   agencyAffiliation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agency' }]
// });

const putEmployee = (req, res, next) => {
  console.log(req);
  res.send('put Employee');
};

const deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    await Employee.findByIdAndRemove({ _id: employeeId });
    res.status(204).json({ message: `Agency with ID ${employeeId} removed.` });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getAgencies,
  getAgency,
  postAgency,
  putAgency,
  deleteAgency,
  getEmployees,
  getEmployee,
  postEmployee,
  putEmployee,
  deleteEmployee
};
