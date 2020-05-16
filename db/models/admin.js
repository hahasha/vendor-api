'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    timestamps:false,
    tableName: 'admin'
  });
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};