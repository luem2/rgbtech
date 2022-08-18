const { Router } = require('express');
const { Brand } = require('../db.js');

const router = Router();
router.post("/", async (req, res) => {

    let { name,id,logo } = req.body;

    if (!name || !id ) return res.status(404).send("Falta enviar datos obligatorios")
    try {
        console.log("entre al try")
        await Brand.create({
            name,
            id,
            logo
        })
        return res.send("Brand created successfully")
        
    } catch (error) {
        console.log("entre al catch")
        return res.status(404).send("Error en alguno de los datos provistos")
    }
});
module.exports = router;