require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');

// app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Controll-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const detailRoutes = require('./routes/details');
const employeeRoutes = require('./routes/employee');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MIDDLEWARE
const { isLoggedIn } = require('./middleware/checkPermissons');

// app.use(isLoggedIn);
app.use('/admin', adminRoutes);
app.use('/api/details', detailRoutes);
app.use('/api/employees', employeeRoutes);
app.use(authRoutes);

app.get('/', (req, res) => {
  res.send('connected');
});

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
