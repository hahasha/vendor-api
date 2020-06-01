'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    order_no: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL,
    total_count: DataTypes.INTEGER,
    status: DataTypes.INTEGER, // 1：未支付， 2：已支付，3：已发货 , 4: 已支付，但库存不足
    snap_img: DataTypes.STRING,
    snap_name: DataTypes.STRING,
    snap_address: DataTypes.JSON,
    snap_items: DataTypes.JSON,
    create_time: DataTypes.INTEGER,
    gmt_create: DataTypes.STRING,
    trade_no: DataTypes.STRING,
    gmt_payment: DataTypes.STRING
  }, {
    timestamps:false,
    tableName: 'order'
  });
  order.associate = function(models) {
    // associations can be defined here
  };
  return order;
};