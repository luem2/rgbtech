const {User} = require('../db')
const users = require("./users");


const createUsers = async () => {
  try {
    await User.bulkCreate(users) 
    console.log('users added to db')
  } catch (error) {
   console.error(error)
    
  }
}
module.exports = createUsers