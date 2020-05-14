'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    timestamps:false,
    freezeTableName: true,
    tableName: 'admin'
  });
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};