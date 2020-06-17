const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  detailRate: {
    type: Number,
    required: true
  },
  outOfTownAvailable: {
    type: Boolean,
    required: true,
    default: true
  },
  employees: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }
  ],
  agencyAdministrators: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }
  ],
  details: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Detail" }
  ]
});

agencySchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;