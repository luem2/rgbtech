const { Router } = require('express');
const { Product } = require('../db');



const router = Router();
router.get("/",async(req,res)=>{
try { 
    let { name } = req.query;
    let  allProduct= await Product.findAll()
    if (name) {
        let productName = allProduct.filter(e => { if (e && e.name) { return e.name.toLowerCase().includes(name.toLowerCase()) } });
            res.status(200).send(productName);
    } else {
    res.json(allProduct)
    }
} catch (error) {
    res.send("La consulta  a la DB de Temperament salio mal")
}
})

router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
            let productEspecific = await Product.findByPk(id)
             return   res.status(201).json(productEspecific)
    } catch (error) {
        res.send("No se encontro el Product del  Id")
    }
})


module.exports = router;