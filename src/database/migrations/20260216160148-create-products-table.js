'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      price_usd: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      actual_stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      min_stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      measure_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'measures',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      tax_percentage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 16
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      provider_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'providers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
