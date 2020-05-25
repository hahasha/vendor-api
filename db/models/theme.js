'use strict';
module.exports = (sequelize, DataTypes) => {
  const theme = sequelize.define('theme', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    topic_img_id: DataTypes.INTEGER,
    head_img_id: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    timestamps: false,
    tableName: 'theme'
  });
  theme.associate = function(models) {
    // associations can be defined here
  };
  return theme;
};