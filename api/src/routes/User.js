const { Router } = require("express");
const { User } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
	validateToken,
	checkSingupBody,
	uploadNewUserPhoto,
	checkLoginBody,
	checkUserRegistration,
} = require("../middlewares/userMiddleware.js");
const {htmlMail} = require('../Utils/EmailTemplate.js')
const nodemailer = require('nodemailer')


const router = Router();

const hashPassword = (req, res, next) => {

}



const sendConfirmationEmail = async (newUser) => {
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
}


router.post("/register", checkSingupBody, uploadNewUserPhoto, async (req, res) => {
		let { password, newUser } = req.body;
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			console.log("hashedPassword", hashedPassword);
			await User.create({
				...newUser,
				password: hashedPassword,
			});
			await sendConfirmationEmail(newUser)
			return res.status(201).send("User created successfully");
		} catch (error) {
			console.log(error);
			return res.status(500).send("Internal Server Error");
		}
	}
);

router.post(
	"/login",
	checkLoginBody,
	checkUserRegistration,
	async (req, res) => {
		try {
			const { findedUser, password } = req.body;
			if (bcrypt.compareSync(password, findedUser.password)) {
				const { id, user, mail, profilePhoto, cartShop, favorite, isAdmin } = findedUser;
				const logedUser = {
					id,
					user,
					mail,
					profilePhoto,
					cartShop,
					favorite,
					isAdmin,
				};
				const accessToken = jwt.sign(logedUser, process.env.SECRET);
				return res.status(200).json({
					mssage: "usuario autenticado",
					token: accessToken,
				});
			} else return res.json({ message: "contraseña incorrecta" });
		} catch (error) {
			res.json({ message: error });
		}
	}
);

router.put("/Cart", async (req, res, next) => {
	try {
		//Asegurarse de vaciar esta propiedad al ejecutar esta compra
		const { id } = req.params;
		const { cartShop } = req.body;
		await User.update(
			{
				cartShop: cartShop,
			},
			{
				where: {
					id: id,
				},
			}
		);
		res.send("CartShop de usuario actualizado");
	} catch (error) {
		next(error);
	}
});

router.put("/favorite", async (req, res, next) => {
	try {
		//Asegurarse de vaciar esta propiedad al ejecutar esta compra
		const { id } = req.params;
		const { favorite } = req.body;
		await User.update(
			{
				favorite: favorite,
			},
			{
				where: {
					id: id,
				},
			}
		);
		res.send("Favoritos de usuario actualizado");
	} catch (error) {
		next(error);
	}
});

module.exports = router;
