'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('measures', [
      { id: 1, name: 'Unidad', abbreviation: 'und', is_active: true },
      { id: 2, name: 'Metro', abbreviation: 'm', is_active: true },
      { id: 3, name: 'Centímetro', abbreviation: 'cm', is_active: true },
      { id: 4, name: 'Milímetro', abbreviation: 'mm', is_active: true },
      { id: 5, name: 'Pulgada', abbreviation: 'in', is_active: true },
      { id: 6, name: 'Pie', abbreviation: 'ft', is_active: true },
      { id: 7, name: 'Kilogramo', abbreviation: 'kg', is_active: true },
      { id: 8, name: 'Gramo', abbreviation: 'g', is_active: true },
      { id: 9, name: 'Libra', abbreviation: 'lb', is_active: true },
      { id: 10, name: 'Onza', abbreviation: 'oz', is_active: true },
      { id: 11, name: 'Litro', abbreviation: 'L', is_active: true },
      { id: 12, name: 'Mililitro', abbreviation: 'ml', is_active: true },
      { id: 13, name: 'Galón', abbreviation: 'gal', is_active: true },
      { id: 14, name: 'Metro cuadrado', abbreviation: 'm²', is_active: true },
      { id: 15, name: 'Metro cúbico', abbreviation: 'm³', is_active: true },
      { id: 16, name: 'Caja', abbreviation: 'cja', is_active: true },
      { id: 17, name: 'Paquete', abbreviation: 'paq', is_active: true },
      { id: 18, name: 'Rollo', abbreviation: 'rll', is_active: true },
      { id: 19, name: 'Saco', abbreviation: 'sco', is_active: true },
      { id: 20, name: 'Bolsa', abbreviation: 'bls', is_active: true },
      { id: 21, name: 'Juego', abbreviation: 'jgo', is_active: true },
      { id: 22, name: 'Par', abbreviation: 'par', is_active: true },
      { id: 23, name: 'Docena', abbreviation: 'doc', is_active: true },
      { id: 24, name: 'Plancha', abbreviation: 'plc', is_active: true },
      { id: 25, name: 'Tubo', abbreviation: 'tbo', is_active: true },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('measures', null, {});
  }
};
