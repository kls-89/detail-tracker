require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("connected");
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(process.env.PORT, () => console.log("server running on port", process.env.PORT));
  })
  .catch(error => {
    console.error("Error connecting to MongoDB Atlas", error);
  });


