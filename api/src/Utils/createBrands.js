const brands = require("./brands.js");
const {Brand} = require("../db.js")
const crypto = require('crypto')

const addBrands = async () => {
 const result = brands.map((brand) => {
  const brandId = crypto.createHash('md5').update(brand.name).digest('hex')
  return {
    ...brand,
    id: brandId
  }
 })
 try{
  await Brand.bulkCreate(result)
  console.log('Brands added to db')
 } catch (error){
  console.error(error)
 }
}

module.exports = addBrands
