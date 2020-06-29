const Agency = require('../models/agency');
const baseURL = 'http://localhost:3001/admin';

const getAgencies = (req, res, next) => {
  Agency.find({})
    .exec()
    .then(docs => {
      res.status(200).json({
        agencyCount: docs.length,
        agencies: docs.map(doc => {
          return {
            doc,
            request: {
              type: 'GET',
              description: 'View individual agency specifics',
              url: `${baseURL}/agency/${doc._id}`
            }
          };
        })
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

const getAgency = (req, res, next) => {
  Agency.findById({ _id: req.params.agencyId })
    .populate('employees', 'name seniority emailAddress isAgencyAdmin')
    .exec()
    .then(doc => {
      res.status(200).json({
        doc,
        request: {
          type: 'GET',
          description: 'View all agencies',
          url: `${baseURL}/agency`
        }
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

const postAgency = (req, res, next) => {
  const {
    name,
    streetAddress,
    city,
    state,
    zipCode,
    phoneNumber,
    detailRate
  } = req.body;

  const newAgency = new Agency({
    name,
    streetAddress,
    city,
    state,
    zipCode,
    phoneNumber,
    detailRate
  });

  newAgency
    .save()
    .then(doc => {
      res.status(201).json({
        message: 'Agency created',
        doc,
        request: {
          type: 'GET',
          description: 'View all agencies',
          url: `${baseURL}/agency`
        }
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

const patchAgency = (req, res, next) => {
  const agencyId = req.params.agencyId;

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Agency.findByIdAndUpdate(agencyId, { $set: updateOps })
    .exec()
    .then(updatedAgency => {
      res.status(200).json({
        updatedAgency,
        request: {
          type: 'GET',
          description: 'View individual agency specifics',
          url: `${baseURL}/agency/${agencyId}`
        }
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

const deleteAgency = (req, res, next) => {
  const agencyId = req.params.agencyId;

  Agency.findByIdAndDelete(agencyId)
    .exec()
    .then(agencyToDelete => {
      res.status(204).json({
        message: `Agency with ID ${agencyId} removed.`,
        request: {
          type: 'POST',
          description: 'Create new agency',
          url: `${baseURL}/agency`,
          body: {}
        }
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

module.exports = {
  getAgencies,
  getAgency,
  postAgency,
  patchAgency,
  deleteAgency
};
