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

const router = Router();

router.get("/", setQueryConditions, async(req,res)=>{
  try {
    const limit = 10;
    const offset =  (limit * req.query.pageNumber) - limit || 0
    let count = await Product.findAll(req.body.queryConditions)
    count = count.length
    const pageNumbers = Math.ceil(count/limit)
    
    if(!req.query.pageNumber) {
      if(req.originalUrl.includes('?')) req.originalUrl = `${req.originalUrl}&pageNumber=1`
      else req.originalUrl = `${req.originalUrl}?pageNumber=1`
      req.query.pageNumber = 1
    }
    let previous = null
    let next = null
    if(req.query.pageNumber > 1) {
      previousUrl = req.originalUrl.replace(`pageNumber=${req.query.pageNumber}`, `pageNumber=${Number(req.query.pageNumber)- 1}`)
      previous = `${req.protocol}://${req.get('host')}${previousUrl}`
    }
    if(pageNumbers > req.query.pageNumber){
      nextUrl = req.originalUrl.replace(`pageNumber=${req.query.pageNumber}`, `pageNumber=${Number(req.query.pageNumber)+ 1}`)
      console.log(req.originalUrl)
      next = `${req.protocol}://${req.get('host')}${nextUrl}`
    }

    const products = await Product.findAll({...req.body.queryConditions, limit, offset})
    const response = {
      count,
      data : products,
      next,
      previous
    }
    res.status(200).send(response)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
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

function checkPost (req, res, next) {
  const {
    name,
    price,
    description,
    specifications,
    img,
    stock,
    onDiscount,
    discountPercentage,
    freeShipping,
    tags,
    brand
  } = req.body;

  if(name && price && description && specifications && stock && brand && tags) {
    let productCreate = {
      name,
      price,
      description,
      specifications,
      stock,
      tags,
      brand,
      img
    }
    onDiscount ? productCreate = {...productCreate, onDiscount, discountPercentage}: null;
    freeShipping ? productCreate = {...productCreate, freeShipping} : null;
    req.body.product = productCreate
    return next()
  } else {
    res.status(404).send('Falta enviar datos obligatorios')
  }
}
router.post("/", checkPost, async (req, res) => {
  try{
    const newProduct = await Product.create(req.body.product)
    await newProduct.setBrand(brand)
    await newProduct.addTags(tag)
    return res.status(201).send({msg: 'Product created successfully', statusCode : 201})
  } catch (error) {
    return res.status(400).send({msg: 'Ops! Something went wrong', statusCode : 400})
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