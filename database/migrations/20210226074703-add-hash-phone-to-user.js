'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'hashedPhoneNumber', { type: Sequelize.STRING, defaultValue: "" });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'hashedPhoneNumber');
  }
};
