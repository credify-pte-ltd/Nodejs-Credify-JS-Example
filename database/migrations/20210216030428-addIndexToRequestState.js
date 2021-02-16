'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Requests', ['state']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Requests', ['state']);
  }
};
