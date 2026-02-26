'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('catalog_provider', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      provider_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'providers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      provider_sku: {
        type: Sequelize.STRING,
        allowNull: true
      },
      last_purchase_price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true
      }
    });

    await queryInterface.removeColumn('products', 'provider_id');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'provider_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'providers',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });

    await queryInterface.dropTable('catalog_provider');
  }
};
