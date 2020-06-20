require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Routes
const adminRoutes = require('./routes/admin');
const detailRoutes = require('./routes/detail');

app.use(cors());
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/api/detail', detailRoutes);

app.get('/', (req, res) => {
  res.send('connected');
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
