'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = await queryInterface.sequelize.query(
      'SELECT id, name FROM products LIMIT 20',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users LIMIT 5',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const providers = await queryInterface.sequelize.query(
      'SELECT id FROM providers',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getRandomProduct = () => products[Math.floor(Math.random() * products.length)];
    const getRandomUser = () => users[Math.floor(Math.random() * users.length)].id;
    const getRandomProvider = () => providers[Math.floor(Math.random() * providers.length)].id;
    const getRandomInvoice = () => `INV-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const getRandomDate = (daysAgo) => {
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      return date;
    };

    await queryInterface.bulkInsert('stock_movements', [
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: getRandomProvider(),
        ref_invoice: getRandomInvoice(),
        quantity: 100,
        type: 'ENTRY',
        description: 'Compra inicial de inventario',
        created_at: getRandomDate(30),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: getRandomProvider(),
        ref_invoice: getRandomInvoice(),
        quantity: 50,
        type: 'ENTRY',
        description: 'Reposición de stock',
        created_at: getRandomDate(28),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: getRandomProvider(),
        ref_invoice: getRandomInvoice(),
        quantity: 200,
        type: 'ENTRY',
        description: 'Pedido de proveedor',
        created_at: getRandomDate(25),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 15,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(24),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 30,
        type: 'EXIT',
        description: 'Venta mayorista',
        created_at: getRandomDate(22),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: getRandomProvider(),
        ref_invoice: getRandomInvoice(),
        quantity: 75,
        type: 'ENTRY',
        description: 'Recepción de mercancía',
        created_at: getRandomDate(20),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 5,
        type: 'ADJUSTMENT',
        description: 'Ajuste por inventario físico - faltante',
        created_at: getRandomDate(18),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 20,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(17),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: getRandomProvider(),
        ref_invoice: getRandomInvoice(),
        quantity: 150,
        type: 'ENTRY',
        description: 'Compra de stock',
        created_at: getRandomDate(15),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 8,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(14),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 3,
        type: 'ADJUSTMENT',
        description: 'Ajuste por producto dañado',
        created_at: getRandomDate(12),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 45,
        type: 'EXIT',
        description: 'Venta mayorista',
        created_at: getRandomDate(11),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: getRandomProvider(),
        ref_invoice: getRandomInvoice(),
        quantity: 100,
        type: 'ENTRY',
        description: 'Reposición de stock',
        created_at: getRandomDate(10),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 12,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(9),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 25,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(8),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: getRandomProvider(),
        ref_invoice: getRandomInvoice(),
        quantity: 80,
        type: 'ENTRY',
        description: 'Pedido de proveedor',
        created_at: getRandomDate(7),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 10,
        type: 'ADJUSTMENT',
        description: 'Ajuste por inventario físico - sobrante',
        created_at: getRandomDate(6),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 18,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(5),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: getRandomProvider(),
        ref_invoice: getRandomInvoice(),
        quantity: 60,
        type: 'ENTRY',
        description: 'Compra de stock',
        created_at: getRandomDate(4),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 22,
        type: 'EXIT',
        description: 'Venta mayorista',
        created_at: getRandomDate(3),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 35,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(2),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: getRandomProvider(),
        ref_invoice: getRandomInvoice(),
        quantity: 120,
        type: 'ENTRY',
        description: 'Recepción de mercancía',
        created_at: getRandomDate(1),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        provider_id: null,
        ref_invoice: null,
        quantity: 7,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stock_movements', null, {});
  }
};
