'use strict';
module.exports = (sequelize, DataTypes) => {
  const userAddress = sequelize.define('userAddress', {
    name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    detail: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    label: DataTypes.STRING,
    is_default: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'user_address',
  });
  userAddress.associate = function(models) {
    // associations can be defined here
  };
  return userAddress;
};