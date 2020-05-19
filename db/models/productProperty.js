'use strict';
module.exports = (sequelize, DataTypes) => {
  const productProperty = sequelize.define('productProperty', {
    name: DataTypes.STRING,
    detail: DataTypes.STRING,
    product_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'product_property'
  });
  productProperty.associate = function(models) {
    // associations can be defined here
  };
  return productProperty;
};