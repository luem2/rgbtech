const { Router } = require("express");
const { User, Sale, Product, Brand, Tag, conn } = require("../db");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {validateToken} = require("../middlewares/userMiddleware.js");


const router = Router();


router.post('/sale', async(req, res) => {
  const {userId, products} = req.body
  products.map(async (product) => {
    const {productId, name, productPrice, tags, brand, month, year, amount} = product
    const newSale = await Sale.create({
      productId,
      name,
      productPrice,
      month,
      year,
      amount,
      totalPrice: productPrice * amount
    })
    await newSale.addTags(tags)
    await newSale.setBrand(brand)
    await newSale.setUser(userId)

    const stockProduct = await Product.findByPk(productId)
    const updatedStock = stockProduct.stock - amount
    await Product.update({
      stock: updatedStock
    },
    {
      where:{id:productId}
    })
    })
  res.send('producto comprado')
})

router.get('/', async(req, res) => {
  const {year} = req.query
  const conditions = {}
  year ? conditions.year = year : null
  let stock = await Product.findAll({attributes: [[conn.fn('SUM', conn.col('stock')), "totalStock"]]})
  let totalSales = await Sale.findAll({attributes: [[conn.fn('SUM', conn.col('totalPrice')), "totalSales"]]})
  stock = stock[0]
  totalSales = totalSales[0]

  
  const users = await User.findAndCountAll({attributes: {exclude:['password']} })
  let sales = await Sale.findAll({
    include: [
      {
        model: Tag,
        through: { attributes: [] },
      }
    ],
  });



  const monthSales = {}
  sales.forEach((sale) => {
    const month = sale.month
    if(!monthSales.hasOwnProperty(month)){
      monthSales[month] = sale.totalPrice
    } else {
      monthSales[month] = monthSales[month] + sale.totalPrice
    }
   })

  const productSale = {}
  sales.forEach((sale)=> {
    const month = sale.month
    if(!productSale.hasOwnProperty(month)){
      productSale[month] = sale.amount
    } else {
      productSale[month] = productSale[month] + sale.amount
    }
  }) 

  res.json({
    monthSales,
    productSale,
    sales,
    totalSales,
    stock,
    users
  })
})


module.exports = router;