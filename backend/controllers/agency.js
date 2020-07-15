const Agency = require('../models/agency');
const Detail = require('../models/detail');

const getAgency = (req, res, next) => {
  const agencyId = req.params;
  agencyId;
};

const getAgencyDetails = (req, res, next) => {
  const agencyId = req.params.agencyId;
  Agency.findById(agencyId)
    .select('details')
    .exec()
    .then()
    .catch();
};

const getSpecificDetail = (req, res, next) => {
  const agencyId = req.params.agencyId;
  const detailId = req.params.detailId;
  Detail.findById(detailId)
    .exec()
    .then(doc => {
      console.log(doc);
    })
    .catch();
};

module.exports = {
  getAgency,
  getAgencyDetails,
  getSpecificDetail
};
