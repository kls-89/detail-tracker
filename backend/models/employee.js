const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  isAgencyAdmin: {
    type: Boolean,
    required: true
  },
  canWorkDetails: {
    type: Boolean,
    required: true
  },
  seniority: {
    type: Number,
    default: null
  },
  details: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Detail' }],
  agencyAffiliation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agency' }]
});

employeeSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.passwordHash;
    delete returnedObj.passwordResetToken;
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
