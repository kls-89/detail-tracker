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
    required: true,
    match: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
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
