const { Router } = require('express');
const { Product } = require('../db');



const router = Router();
router.get("/",async(req,res)=>{
try {
    let  allProduct= await Product.findAll()
    res.json(allProduct)
    
} catch (error) {
    res.send("La consulta  a la DB de Temperament salio mal")
}
})


module.exports = router;