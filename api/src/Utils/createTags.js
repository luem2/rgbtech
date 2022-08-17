const tags = require("./tags.js");
const {Tag} = require("../db.js")
const crypto = require('crypto')

const addTags = async () => {
  const result = tags.map((tag) => {
   const tagId = crypto.createHash('md5').update(tag).digest('hex')
   return {
     name: tag,
     id: tagId
   }
  })
  try{
   await Tag.bulkCreate(result)
   console.log('Tags added to db')
  } catch (error){
   console.error(error)
  }
 }
 
 module.exports = addTags