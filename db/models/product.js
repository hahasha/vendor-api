'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    main_img_url: DataTypes.STRING,
    summary: DataTypes.STRING,
    img_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'product'
  });
  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};