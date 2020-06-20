const Agency = require('../models/agency');

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

module.exports = {
  getAgencies,
  getAgency,
  postAgency,
  putAgency,
  deleteAgency
};
