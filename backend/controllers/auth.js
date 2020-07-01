const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');

const postLogin = (req, res, next) => {
  const { emailAddress, password } = req.body;
  Employee.find({ emailAddress })
    .exec()
    .then(employee => {
      if (employee.length < 1) {
        return res.status(401).json({ message: 'Auth failed' });
      }
      bcrypt.compare(password, employee[0].passwordHash, (err, onSuccess) => {
        if (err) {
          return res.status(401).json({ message: 'Auth failed' });
        }
        if (onSuccess) {
          // email and pw correct
          const token = jwt.sign(
            {
              emailAddress: employee[0].emailAddress,
              employeeId: employee[0]._id,
              agencyAffiliation: employee[0].agencyAffiliation,
              canWorkDetails: employee[0].canWorkDetails
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h'
            }
          );
          return res.status(200).json({ message: 'Auth successful', token });
        }
        // incorrect pw
        return res.status(401).json({ message: 'Auth failed' });
      });
    })
    .catch(err => res.status(500).json({ error: err }));
};

// Sign up to create a new agency and set an administrator.
const postSignup = (req, res, next) => {
  const { emailAddress, password } = req.body;
  Employee.find({ emailAddress })
    .exec()
    .then(employee => {
      if (employee.length >= 1) {
        return res
          .status(422)
          .json({ message: 'E-mail address is already taken.' });
      } else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) {
            res.status(500).json({ error: err });
          } else {
            const employee = new Employee({
              emailAddress,
              passwordHash: hash
            });
            employee
              .save()
              .then(result => {
                res.status(201).json({ message: 'Signup successful' });
              })
              .catch(err => res.status(500).json({ error: err }));
          }
        });
      }
    });
};

module.exports = {
  postLogin,
  postSignup
};
