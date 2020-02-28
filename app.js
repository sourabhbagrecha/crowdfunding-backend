// require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const routes = require('./routes');

// Middleware BodyParser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json());

// MongoDB configuration
const db = require("./config/keys").mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("MongoDB successfully connected")).catch(err => console.log(err));


//setting cors policies
app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use(routes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data  = error.data;
  return res.status(status).json({ msg: message, data: data});
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
