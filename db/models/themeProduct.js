'use strict';
module.exports = (sequelize, DataTypes) => {
  const themeProduct = sequelize.define('themeProduct', {
    theme_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'theme_product',
    paranoid: true // 删除而不是软删除
  });
  themeProduct.associate = function(models) {
    // associations can be defined here
  };
  return themeProduct;
};