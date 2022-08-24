const { Router } = require('express');
const { User } = require('../db');
const bcrypt  = require('bcrypt')
const jwt = require("jsonwebtoken")
const { cloudinary } =require('../Utils/cloudinary.js')
const {
    validateToken
} = require("../middlewares/userMiddleware.js");

const router = Router();

router.post("/", async (req, res) => {
    try{ let { user,password, mail,profilePhoto } = req.body;
    console.log(req.body)

    if (!user || !password || !mail ) return res.status(404).send("Falta enviar datos obligatorios")
    password = await bcrypt.hash(password, 10);

    if(profilePhoto){const uploadedResponse = await cloudinary.uploader.
    upload(profilePhoto,{
        upload_preset:'RGBtech'})
    profilePhoto = uploadedResponse.secure_url }
        else{
            profilePhoto = "Image_Default"
        }
    await User.create({
        user,
        password,
        mail,
        profilePhoto:profilePhoto,
        isAdmin:false,
    })
        return res.send("User created successfully")
    } catch (error) {
        return res.status(404).send("Error in any of the data provided")
    }
});


router.post("/login", async (req, res) => {
    try {
        const { user, password } = req.body;
        if (!user) {
            res.sendStatus(404)
        };

        const authUser = await User.findAll({
            where: {
                user: user
            }
        })

        if (authUser.length === 0) {
            return res.json({ message: "usuario no encontrado, intente denuevo" })
        }

        const findUser = authUser.find(user => user.user)

        if (!bcrypt.compareSync(password, findUser.password)) {
            return res.json({ message: "contraseña incorrecta" })
        }

        const accessToken = generateAccessToken(user);
        return res.header("authorized", accessToken).json({
            mssage: "usuario autenticado",
            token: accessToken
        })
    } catch (error) {
        res.json({ message: error })
    }

});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.SECRET)
}



module.exports = router;
