const getDetails = (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /details'
  });
};
const getDetail = (req, res, next) => {
  const detailId = req.params.detailId;
  res.status(200).json({ message: 'Viewing /details/someId', detailId });
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

  const detail = {
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
  };
  res.status(201).json({ message: 'Detail created', detail });
};

const patchDetail = (req, res, next) => {
  const detailId = req.params.id;
  res.status(200).json({
    message: 'Updated Detail',
    detailId
  });
};

const deleteDetail = (req, res, next) => {
  const detailId = req.params.detailId;
  res.status(204).json({
    message: 'Deleted Detail',
    detailId
  });
};

module.exports = {
  getDetails,
  getDetail,
  postDetail,
  patchDetail,
  deleteDetail
};
