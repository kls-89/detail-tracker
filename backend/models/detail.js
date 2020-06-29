const mongoose = require('mongoose');

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
};

const detailSchema = new mongoose.Schema(
  {
    dateOfDetail: {
      type: Date,
      required: true
    },
    detailFilled: {
      type: Boolean,
      default: false
    },
    startTime: {
      type: Date,
      default: Date.now
    },
    endTime: {
      type: Date
    },
    duration: {
      type: Number,
      default: 8
    },
    location: {
      type: String,
      required: true
    },
    numberOfOfficers: {
      type: Number,
      default: 1
    },
    cruiserNeeded: {
      type: Boolean,
      default: false
    },
    vendorContactName: {
      type: String,
      required: true
    },

    vendorContactTelephone: {
      type: String,
      required: true
    },
    vendorBillingInformation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor'
    },
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agency'
    },

    officersAcceptingDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },
    callTakerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },
    detailFilledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    }
  },
  schemaOptions
);

detailSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
});

const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;
