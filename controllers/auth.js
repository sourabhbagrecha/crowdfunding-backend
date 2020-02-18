const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/user");

const register = async (req, res, next) => {
	try {
		// Form validation
		const { errors, isValid } = validateRegisterInput(req.body);
		// Check Validation
		if (!isValid) {
				return  res.status(400).json(errors);
		}
		const user = await User.findOne({ uid: req.body.uid})
		if (user) return res.status(400).json({ msg: "UID already exists" });
		const newUser = new User({
			name: req.body.name,
			uid: req.body.uid,
			password: req.body.password
		});
		// Hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password.toString(), salt, async (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				const savedUser = await newUser.save();
				return res.json({savedUser})
			});
		});
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		// Form Validation
		const { errors, isValid } = validateLoginInput(req.body);
		const {uid, password} = req.body;
		console.log({uid})
		// Find the user by uid
		const user = await User.findOne({ uid });
			if (!user) {
				return res.status(404).json({ msg: "No such user exists!" });
			}
			// Check the hashed password
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				const payload = {
					userId: user.id,
					name: user.name
				};
				jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926}, (err, token) => (
					res.status(200).json({ success: true, token: "Bearer " + token, user })
				));
			} else {
				return res.status(400).json({ msg: "Sorry you can not hack into Inceptio! Incorrect Password!" });
			}
	} catch (error) {
		next(error);
	}
}

module.exports = {register, login};