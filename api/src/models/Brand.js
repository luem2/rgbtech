const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('brand', {
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      logoImg:{
        type:DataTypes.STRING,
      }
  })}