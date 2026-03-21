'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'internal_sku');
    await queryInterface.removeColumn('products', 'brand');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'internal_sku', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('products', 'brand', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
