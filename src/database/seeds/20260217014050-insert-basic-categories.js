'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        name: 'Ferretería',
        description: 'Artículos de ferretería general',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Pinturas',
        description: 'Pinturas, brochas y accesorios',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Construcción',
        description: 'Materiales pesados de construcción',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Electricidad',
        description: 'Cables, enchufes y material eléctrico',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Plomería',
        description: 'Tubos, conexiones y accesorios de baño',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Herramientas',
        description: 'Herramientas manuales y eléctricas',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
