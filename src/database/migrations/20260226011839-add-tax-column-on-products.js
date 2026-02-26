'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'tax_percentage', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 16
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'tax_percentage')
  }
};
