'use strict';
module.exports = (sequelize, DataTypes) => {
  const productImage = sequelize.define('productImage', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    img_id: DataTypes.INTEGER,
    order: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'product_image'
  });
  productImage.associate = function(models) {
    // associations can be defined here
  };
  return productImage;
};