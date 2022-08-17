const { Router } = require('express');
const { User } = require('../db');
const bcrypt  = require('bcrypt')

const router = Router();
router.post("/", async (req, res) => {
    let { user,password, mail,profilePhoto } = req.body;
    console.log(req.body)

    if (!user || !password || !mail ) return res.status(404).send("Falta enviar datos obligatorios")
    password = await bcrypt.hash(password, 10);
    try {
        let userCreate = await User.create({
            user,
            password,
            mail,
            profilePhoto,
            isAdmin:false,
        })
        return res.send("Usuario creado con exito")
    } catch (error) {
        return res.status(404).send("Error en alguno de los datos provistos")
    }
});

module.exports = router;
