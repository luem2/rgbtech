const { Router } = require('express');
const { Tag } = require('../db.js');

const router = Router();
router.post("/", async (req, res) => {

    let { name, id} = req.body;
    
    if (!name || !id ) return res.status(404).send("Falta enviar datos obligatorios")
    try {
        await Tag.create({
            name,
            id,
        })
        return res.send("Tag created successfully")
    } catch (error) {
        return res.status(404).send("Error en alguno de los datos provistos")
    }
});
module.exports = router;