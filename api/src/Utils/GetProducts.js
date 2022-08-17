const  { products } = require('../Utils/product.js') 
const { Product } = require('../db');


const getAllProduct = () =>{
    Product.bulkCreate(products)
    console.log("Los Productos ya fueron guardado en la base de Datos") 
}
   
    module.exports = getAllProduct;
  