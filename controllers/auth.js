const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/user");

const register = async (req, res, next) => {
    
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
      return  res.status(400).json(errors);
  }

  User.findOne({ uid: req.body.uid}).then(user => {
      if (user) {
          return res.status(400).json({ uid: "UID already exists" });
      } else {
          const newUser = new User({
              name: req.body.name,
              uid: req.body.uid,
              password: req.body.password
          });

          // Hash the password
          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password.toString(), salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser.save().then(user => res.json(user)).catch(err => console.log(err));
              });
          });
      }
  });
};

const login = async (req, res, next) => {
	try {
		// Form Validation
		const { errors, isValid } = validateLoginInput(req.body);
		const {uid, password} = req.body;
	
		// Find the user by uid
		User.findOne({ uid }).then(user => {
				// Check if the user exists
				if (!user) {
						return res.status(404).json({ msg: "No such user exists!" });
				}
	
				// Check the hashed password
				bcrypt.compare(password, user.password).then(isMatch => {
						if (isMatch) {
								// User matched
								// Create JWT Payload
								const payload = {
								userId: user.id,
								name: user.name
						};
						jwt.sign(
								payload, keys.secretOrKey, {
										expiresIn: 31556926 
								},
								(err, token) => {
										res.json({
												success: true,
												token: "Bearer " + token,
												user
										});
								}
						);
						} else {
								return res.status(400).json({ passwordincorrect: "Password incorrect" });
						}
				});
		});
	} catch (error) {
		next(error);
	}
}

module.exports = {register, login};