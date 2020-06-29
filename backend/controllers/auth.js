const bcrypt = require('bcrypt');
const Employee = require('../models/employee');

const postLogin = async (req, res, next) => {
  const { emailAddress, password } = req.body;
  const foundUser = await Employee.find({ emailAddress });

  if (foundUser.length === 0) {
    return res.status(409).json({ message: 'Invalid username or password' });
  } else {
    await bcrypt.compare(
      password,
      foundUser[0].passwordHash,
      (err, onSuccess) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        }
        if (onSuccess) {
          return res.status(200).json({
            message: 'Login successful'
          });
        }
        // invalid password
        return res.status(409).json({
          message: 'Invalid username or password'
        });
      }
    );
  }
};

const postSignup = async (req, res, next) => {
  const { emailAddress, password } = req.body;
  const employeeEmailExists = await Employee.find({ emailAddress });

  if (employeeEmailExists.length > 0) {
    return res.status(409).json({ message: 'Email Address Already Taken' });
  }
  res.status(200).json({ message: 'Signup successful' });
};

module.exports = {
  postLogin,
  postSignup
};
