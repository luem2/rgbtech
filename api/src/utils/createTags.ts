const tags = require("./tags.js");
const {Tag} = require("../db.js")
const crypto = require('crypto')

const addTags = async () => {
  try{      //↓string
    tags.map((tag) => {
      const tagId = crypto.createHash('md5').update(tag).digest('hex')
      Tag.create({
        name: tag,
        id: tagId
      }) 
    })
   console.log('Tags added to db')
  } catch (error){
   console.error(error)
  }
}
 
 module.exports = addTags