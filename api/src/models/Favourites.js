const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define('favourite', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      product: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    }, {
        timestamps: false
    });
  };