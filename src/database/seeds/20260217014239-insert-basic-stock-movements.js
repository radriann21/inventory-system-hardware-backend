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

    const getRandomProduct = () => products[Math.floor(Math.random() * products.length)];
    const getRandomUser = () => users[Math.floor(Math.random() * users.length)].id;
    const getRandomDate = (daysAgo) => {
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      return date;
    };

    await queryInterface.bulkInsert('stock_movements', [
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 100,
        type: 'ENTRY',
        description: 'Compra inicial de inventario',
        created_at: getRandomDate(30),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 50,
        type: 'ENTRY',
        description: 'Reposición de stock',
        created_at: getRandomDate(28),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 200,
        type: 'ENTRY',
        description: 'Pedido de proveedor',
        created_at: getRandomDate(25),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 15,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(24),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 30,
        type: 'EXIT',
        description: 'Venta mayorista',
        created_at: getRandomDate(22),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 75,
        type: 'ENTRY',
        description: 'Recepción de mercancía',
        created_at: getRandomDate(20),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 5,
        type: 'ADJUSTMENT',
        description: 'Ajuste por inventario físico - faltante',
        created_at: getRandomDate(18),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 20,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(17),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 150,
        type: 'ENTRY',
        description: 'Compra de stock',
        created_at: getRandomDate(15),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 8,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(14),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 3,
        type: 'ADJUSTMENT',
        description: 'Ajuste por producto dañado',
        created_at: getRandomDate(12),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 45,
        type: 'EXIT',
        description: 'Venta mayorista',
        created_at: getRandomDate(11),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 100,
        type: 'ENTRY',
        description: 'Reposición de stock',
        created_at: getRandomDate(10),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 12,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(9),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 25,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(8),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 80,
        type: 'ENTRY',
        description: 'Pedido de proveedor',
        created_at: getRandomDate(7),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 10,
        type: 'ADJUSTMENT',
        description: 'Ajuste por inventario físico - sobrante',
        created_at: getRandomDate(6),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 18,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(5),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 60,
        type: 'ENTRY',
        description: 'Compra de stock',
        created_at: getRandomDate(4),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 22,
        type: 'EXIT',
        description: 'Venta mayorista',
        created_at: getRandomDate(3),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 35,
        type: 'EXIT',
        description: 'Venta a cliente',
        created_at: getRandomDate(2),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
        quantity: 120,
        type: 'ENTRY',
        description: 'Recepción de mercancía',
        created_at: getRandomDate(1),
      },
      {
        product_id: getRandomProduct().id,
        user_id: getRandomUser(),
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
