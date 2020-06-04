'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    create_time: DataTypes.DATE
  }, {
    timestamps: false,
    tableName: 'user',
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};