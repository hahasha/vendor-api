'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_address', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      detail: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING
      },
      is_default: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_address');
  }
};