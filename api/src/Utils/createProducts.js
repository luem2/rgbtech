const  { products } = require('./product.js') 
const { Product } = require('../db');


const createAllProducts = () =>{
    Product.bulkCreate(products)
    console.log("Products added to db") 
}
   
    module.exports = createAllProducts;
  