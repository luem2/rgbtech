const  { products } = require('./product.js') 
const { Product } = require('../db');
const createAllProducts = () =>{
    products.map(async (product, index) =>{
        const {name, sales,description, price, specifications, img, stock, onDiscount, discountPercentage, freeShipping, brand, tag} = product
        const newProduct = await Product.create({
            name,
            description, 
            price, 
            specifications, 
            img, 
            stock, 
            onDiscount, 
            discountPercentage, 
            freeShipping,
            sales
        })
        await newProduct.setBrand(brand)
        await newProduct.addTags(tag)

    })
    console.log("Products added to db") 
}
   
    module.exports = createAllProducts;
  
  