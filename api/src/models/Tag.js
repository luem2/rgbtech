const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('tag', {
    id : {
        type: DataTypes.STRING,
        primaryKey: true
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
  }, {
    timestamps: false
  })}