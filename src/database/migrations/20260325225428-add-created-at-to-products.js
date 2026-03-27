'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'created_at', {
      type: Sequelize.DATE,
      allowNull: true
    });
    
    await queryInterface.sequelize.query(
      "UPDATE products SET created_at = NOW() WHERE created_at IS NULL"
    );
    
    await queryInterface.changeColumn('products', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'created_at');
  }
};
