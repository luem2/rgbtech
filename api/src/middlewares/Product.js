const { Router } = require('express');
const { Product , Brand, Tag, Comment } = require('../db.js');
const { Op } = require('sequelize');



const router = Router();
router.get("/",async(req,res)=>{
const {pageNumber, order, column, name} = req.query;
const productsPerPage = 10;
const offset = (pageNumber * productsPerPage) - productsPerPage || 0
//orden
let sorting = []
!order && !column 
? null
: sorting.push([column, order])

let findName = {}
name 
? findName = { name : {[Op.iLike] : `%${name}%`}}   
: null


//tags
//nombre
//marca

let allProduct= await Product.findAll({
    where : findName,
    offset,
    order: sorting,
    limit: productsPerPage,
    include: [
        {model: Tag,
        through: { attributes: [] }},
        {model: Comment,
        through: { attributes: [] }}
]
    })
if (name) {
    let productName = allProduct.filter(e => { if (e && e.name) { return e.name.toLowerCase().includes(name.toLowerCase()) } });
        res.status(200).send(productName);
} else {
res.json(allProduct)
}

/* try { 

} catch (error) {
    res.send(error)
} */
})

router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
            let productEspecific = await Product.findByPk(id,
                {
                    include: {
                        model:Tag,
                        through: { attributes: [] },
                    }}
                    )
                    console.log(productEspecific)
             return   res.status(201).json(productEspecific)
    } catch (error) {
        res.send("No se encontro el Product del  Id")
    }
})

router.post("/", async (req, res) => {
    let { name, price, description, specifications, img, stock, onDiscount, discountPercentage, freeShipping,tag,brand} = req.body;
    if (!name || !price || !description || !specifications || !stock || !brand ) return res.status(404).send("Falta enviar datos obligatorios")
    try {
        console.log('entre al try')
        let productCreated = await Product.create({
            name,
            price,
            description,
            specifications,
            img,
            stock,
            onDiscount,
            discountPercentage,
            freeShipping,
        })
        await productCreated.setBrand(brand)
        await productCreated.addTags(tag)
        
        return res.send("Product created successfully")
    } catch (error) {
        return res.status(400).send("Error en alguno de los datos provistos")
    }
});

router.put('/:id', async(req,res,next)=>{
    try {
        const {id}=req.params
        const{name, price,description, specifications,img,stock, onDiscount,discountPercentage,freeShipping}=req.body
        await Product.update({
            name:name,
            price:price,
            description:description,
            specifications:specifications,
            img:img,
            stock:stock,
            onDiscount:onDiscount,
            discountPercentage:discountPercentage,
            freeShipping:freeShipping,
        },
        {
            where:{
                id:id
            }
        })
        res.send("updated product")

    } catch (error) {
        next(error)  
    }
} )

router.delete('/:id', async (req,res,next)=>{
    try {
        const {id}= req.params;
        await Product.destroy({
            where:{
                id:id
            }
        })
        res.send("Delete product")
    } catch (error) {
        next(error)
    }
})

module.exports = router;