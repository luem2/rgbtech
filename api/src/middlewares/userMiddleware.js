const { User } = require("../db.js");
const { cloudinary } = require("../Utils/cloudinary.js");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const {htmlMail} = require('../Utils/EmailTemplate.js')

module.exports = {
	checkSingupBody: (req, res, next) => {
		const { user, password, mail } = req.body;
		if (user && password && mail) {
			req.body.newUser = {
				user,
				mail,
				password,
			};
			const coincidences = User.findAll({
				where: {
					user: user,
				},
			});
			return coincidences.length
				? res.status(400).send("Already registered user")
				: next();
		} else {
			return res.status(400).send("Mandatory data missing");
		}
	},
	uploadNewUserPhoto: async (req, res, next) => {
		const { profilePhoto } = req.body;
		if (profilePhoto) {
			const uploadedResponse = await cloudinary.uploader.upload(profilePhoto, {
				upload_preset: "RGBtech",
			});
			req.body.newUser.photo = uploadedResponse.secure_url;
			return next();
		} else {
			req.body.newUser.photo = "Image_Default";
			return next();
		}
	},
	sendConfirmationEmail : async (newUser) => {
		const emailToken = jwt.sign(newUser, process.env.SECRET, {expiresIn: '1d'})
		const url = `http://localhost:5173/confirmation/${emailToken}`
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'rgbtechPF@gmail.com',
				pass: 'qqilqandbimpiaxu'
			}
		})
		const html = htmlMail(url)
		await transporter.sendMail({
			from: "rgbtech@tech.com",
			to: newUser.mail,
			subject: "Confirmation",
			html
		})
	},
	checkLoginBody: (req, res, next) => {
		const { user, password } = req.body;
		if (!user && !password) {
			return res.status(400).send("Mandatory data missing");
		} else return next();
	},

	checkUserRegistration: async (req, res, next) => {
		const { user } = req.body;
		try {
			const findedUser = await User.findOne({
				where: {
					user: user,
				},
			});
			req.body.findedUser = findedUser;
			return Object.keys(findedUser).length
				? next()
				: res.status(404).send("User not found");
		} catch {
			return res.status(500).send("Internal Server Error");
		}
	},

	validateToken: (req, res, next) => {
		const accessToken = req.headers["authorized"];
		if (!accessToken) {
			return res.status(401).send("Access denied");
		} else {
			jwt.verify(accessToken, process.env.SECRET, (err, user) => {
				if (err) {
					return res.status(403).send("Access denied");
				} else {
					req.body.user = user;
					return next();
				}
			});
		}
	},
};
