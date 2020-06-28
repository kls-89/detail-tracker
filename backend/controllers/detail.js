const mongoose = require('mongoose');
const Detail = require('../models/detail');

const getDetails = (req, res, next) => {
  Detail.find({})
    .exec()
    .then(docs => {
      res.status(200).json(docs);
      // if (docs.length > 0) {
      //   res.status(200).json(docs);
      // } else {
      //   res.status(404).json({ message: 'No details found.' });
      // }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
const getDetail = (req, res, next) => {
  const detailId = req.params.detailId;
  Detail.findById(detailId)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: 'No detail found for the provided ID.' });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

const postDetail = (req, res, next) => {
  const {
    dateOfDetail,
    detailFilled,
    startTime,
    endTime,
    duration,
    location,
    numberOfOfficers,
    cruiserNeeded,
    vendorContactName,
    vendorContactTelephone,
    vendorBillingInformation,
    agencyId
  } = req.body;

  const detail = new Detail({
    dateOfDetail,
    detailFilled,
    startTime,
    endTime,
    duration,
    location,
    numberOfOfficers,
    cruiserNeeded,
    vendorContactName,
    vendorContactTelephone,
    vendorBillingInformation,
    agencyId
  });

  detail
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({ message: 'Detail created', detail });
    })
    .catch(err => res.status(500).json({ error: err }));
};

const patchDetail = (req, res, next) => {
  const detailId = req.params.id;

  // Set up for only updating that which is forwarded from req.body:
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Detail.update(detailId, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => res.status(500).json({ error: err }));
};

const deleteDetail = (req, res, next) => {
  const detailId = req.params.detailId;
  Detail.findByIdAndDelete(detailId)
    .exec()
    .then(result => {
      res.status(204).json(result);
    })
    .catch(err => res.status(500).json({ error: err }));
};

module.exports = {
  getDetails,
  getDetail,
  postDetail,
  patchDetail,
  deleteDetail
};
