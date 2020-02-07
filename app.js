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
const passport = require("passport");

const users = require("./routes/api/users");
const project = require("./routes/api/project");

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

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/projects", project);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
