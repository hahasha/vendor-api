'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    status: DataTypes.INTEGER,
    create_time: DataTypes.DATE,
  }, {
    timestamps:false,
    tableName: 'admin'
  });
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};