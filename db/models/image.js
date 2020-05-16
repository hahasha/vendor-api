'use strict';
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    url: DataTypes.STRING
  }, {
    timestamps:false,
    tableName: 'image'
  });
  image.associate = function(models) {
    // associations can be defined here
  };
  return image;
}