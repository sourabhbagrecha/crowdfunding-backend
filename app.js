require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const routes = require('./routes');
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then( response => {
    console.log("Connected!");
  })
  .catch( err => console.log);
  