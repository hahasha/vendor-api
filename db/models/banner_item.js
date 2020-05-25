'use strict';
module.exports = (sequelize, DataTypes) => {
  const banner_item = sequelize.define('banner_item', {
    img_id: DataTypes.INTEGER,
    banner_id: DataTypes.INTEGER
  }, {
    timestamps:false,
    tableName: 'banner_item'
  });
  banner_item.associate = function(models) {
    // associations can be defined here
  };
  return banner_item;
};