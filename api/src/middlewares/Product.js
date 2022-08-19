const { Router } = require('express');
const { Product , Brand, Tag, Comment } = require('../db.js');
const { Op } = require('sequelize');


function setQueryConditions (req, res, next) {
  const {order, column, name, tag, brand} = req.query;
  const sorting = [];
  column && order ? sorting.push([column, order]) : null
  //Search by name || brand
  const whereConditions = {}
  name ? whereConditions.name = {[Op.iLike] : `%${name}%`} : null
  brand ? whereConditions.brandId = {[Op.eq] : brand} : null
  //Search by tag
  const tagQuery = {}
  tag ? tagQuery.name = {[Op.iLike] : `%${tag}%`} : null
  // searchConditions
  const queryConditions = {
    order: sorting,
    where: whereConditions,
    include: {
        model: Tag,
        through : {attributes: []},
        where: tagQuery
    }
  }
  req.body.queryConditions = queryConditions
  next()
}



/* 

• Route.get('/products') -> retorna un array de productos(objeto) con la siguientes propiedades
product = {
  "name": string,
  "id": string,
  "price": float,
  "description": text,
  "specifications": array con un objeto. cada propiedad del objeto es una especificación
  "img": string
  "stock": integer,
  "onDiscount": boolean,
  "discountPercentage": float,
  "freeShipping": boolean,
  "brandId": string,
  "tags": array de objetos 
     → {id: string, name: string}
}
esta ruta puede recibir 5 querys:
  column : string 
  order : "ASC" || "DESC"
    columna y orden, ambos query son necesarias para realizar ordenamientos.
  name: string
    buscar productos por nombre
  tag: string
    filtrar productos por tag 
  brand: string 

• Route.get('/products/:id') -> retorna un objeto similar al anterior, pero tiene una propiedad más
  "comments": array de objetos
*/

const router = Router();

router.get("/", setQueryConditions, async(req,res)=>{
  try {
    const products = await Product.findAll(req.body.queryConditions)
    const count = products.length
    const response = {
      count,
      data : products
    }
    res.status(200).send(response)
  } catch (error) {
    res.status(500).send({msg: error})
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let productEspecific = await Product.findByPk(id, {
      include : [
        {
          model: Tag,
          through : {attributes: []}
        },
        {
          model: Comment,
          through : {attributes: []}
        }
      ]
    })
    return res.status(201).json(productEspecific)
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