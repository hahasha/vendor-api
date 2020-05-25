'use strict';
module.exports = (sequelize, DataTypes) => {
  const banner = sequelize.define('banner', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    timestamps:false,
    tableName: 'banner'
  });
  banner.associate = function(models) {
    // associations can be defined here
  };
  return banner;
};