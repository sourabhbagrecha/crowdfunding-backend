// require('dotenv').config();

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');

// const routes = require('./routes');
// mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
//   .then( response => {
//     console.log("Connected!");
//   })
//   .catch( err => console.log);
  
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/api/user");
const projectRoutes = require("./routes/api/project");
const biddingRoutes = require("./routes/api/bid");
const emailRoutes = require("./routes/util/emailer");

const app = express();

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
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/bid", biddingRoutes);
app.use("/util/email", emailRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data  = error.data;
  return res.status(status).json({ msg: message, data: data});
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
