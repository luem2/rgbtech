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

const router = Router();

router.post(
	"/register",
	checkSingupBody,
	uploadNewUserPhoto,
	async (req, res) => {
		let { password, newUser } = req.body;
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			await User.create({
				...newUser,
				password: hashedPassword,
			});
			return res.status(201).send("User created successfully");
		} catch (error) {
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
			if (await bcrypt.compare(password, findedUser.password)) {
				const { id, user, mail, profilePhoto, isAdmin } = findedUser;
				const logedUser = {
					id,
					user,
					mail,
					profilePhoto,
					cartShop,
					favorite,
					isAdmin,
				};
				console.log("logedUser", logedUser);
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
