'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('theme_product', {
      theme_id: {
        foreignKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        foreignKey: true,
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('theme_product');
  }
};