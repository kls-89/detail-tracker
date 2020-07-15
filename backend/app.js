require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');

app.use(cors());
app.use(helmet());
app.use(cookieParser());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Controll-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
//   next();
// });

// Routes
const adminRoutes = require('./routes/admin');
const agencyRoutes = require('./routes/agency');
const authRoutes = require('./routes/auth');
const detailRoutes = require('./routes/details');
const employeeRoutes = require('./routes/employee');

app.use(morgan('dev'));
app.use(bodyParser.json());

// MIDDLEWARE
// const { isLoggedIn } = require('./middleware/checkPermissons');

// FOR DEV -- removed isLoggedIn check
const isLoggedIn = (req, res, next) => next();

app.use(authRoutes);
app.use('/admin', isLoggedIn, adminRoutes);
app.use('/api/details', isLoggedIn, detailRoutes);
app.use('/api/employees', isLoggedIn, employeeRoutes);
app.use('/agency', isLoggedIn, agencyRoutes);

// error handling
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(process.env.PORT, () =>
      console.log('server running on port', process.env.PORT)
    );
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas', error);
  });
