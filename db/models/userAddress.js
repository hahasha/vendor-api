'use strict';
module.exports = (sequelize, DataTypes) => {
  const userAddress = sequelize.define('userAddress', {
    name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    detail: DataTypes.STRING,
    label: DataTypes.STRING,
    user_id: DataTypes.NUMBER,
    is_delete: DataTypes.NUMBER,
    is_default: DataTypes.NUMBER,
    delete_time: DataTypes.NUMBER,
    update_time: DataTypes.NUMBER
  }, {});
  userAddress.associate = function(models) {
    // associations can be defined here
  };
  return userAddress;
};