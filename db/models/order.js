'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    order_no: DataTypes.STRING
  }, {});
  order.associate = function(models) {
    // associations can be defined here
  };
  return order;
};