const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('brand', {
    id : {
        type: DataTypes.STRING,
        primaryKey: true
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    logo:{
        type:DataTypes.STRING,
      }
  },{
    timestamps: false
  })}