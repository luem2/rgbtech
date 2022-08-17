const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id : {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    specifications: {
      type: DataTypes.JSON,
      allowNull: false
    },
    img:{
      type: DataTypes.STRING
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    onDiscount: {
      type: DataTypes.BOOLEAN
    },
    discountPercentage:{
      type: DataTypes.FLOAT
    },
    freeShipping: {
      type: DataTypes.BOOLEAN
    }
  })
}