const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/user");
const otpGenerator = require('otp-generator');
const moment = require('moment');
const emailer = require('./util/emailer');

const register = async (req, res, next) => {
	try {
		const {email, password, name} = req.body;
		// Form validation
		const { errors, isValid } = validateRegisterInput(req.body);
		// Check Validation
		if (!isValid) {
				return  res.status(400).json(errors);
		}
		const user = await User.findOne({ email })
		if (user) return res.status(400).json({ msg: "Email already exists" });
		const newUser = new User({
			name,
			password,
			email
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
					userId: user._id,
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

const sendOTP = async (req, res, next) => {
	try {
		const {email} = req.body;
		const user = await User.findOne({email}).select('_id');
		if(!user) return res.status(404).json({ msg: "No such user exists!" });
		const OTP = otpGenerator.generate(6, {digits: true, alphabets: false, upperCase: false, specialChars: false});
		user.otp = {
			token: OTP, 
			expiresIn: moment().add(10, 'm').format()
		};
		const updatedUser = await user.save();
		emailer.sendEmail(email, OTP);
		res.status(200).json({msg: "An email has been sent to your registered email Id! Check your spam folder as well!"});
	} catch (error) {
		next(error);
	}
}

const authenticateOTP = async (req, res, next) => {
	try {
		const {email, otp} = req.body;
		const user = await User.findOne({email});
		if(!user) return res.status(404).json({ msg: "No such user exists!" });
		if(otp != user.otp.token) return res.status(401).json({ msg: "Incorrect OTP!" })
		else if(!moment(Date.now()).isBefore(user.otp.expiresIn)) return res.status(401).json({msg: "OTP expired!"});
		const payload = {
			userId: user._id,
			email
		};
		const token = jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926});
		user.otp = null;
		const updatedUser = await user.save();
		return res.status(200).json({ success: true, token: "Bearer " + token, user });
	} catch (error) {
		next(error);
	}
}

module.exports = {register, login, sendOTP, authenticateOTP};