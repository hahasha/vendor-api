'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING,
    head_img_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    timestamps:false,
    tableName: 'category'
  });
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};