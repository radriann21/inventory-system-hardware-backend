'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('providers', [
      {
        id: uuidv4(),
        name: 'Ferretería Central',
        phone_number: '+58-212-555-0101',
        contact_name: 'Carlos Rodríguez',
        address: 'Av. Principal, Caracas',
      },
      {
        id: uuidv4(),
        name: 'Distribuidora El Tornillo',
        phone_number: '+58-212-555-0102',
        contact_name: 'María González',
        address: 'Calle Comercio, Valencia',
      },
      {
        id: uuidv4(),
        name: 'Pinturas y Acabados CA',
        phone_number: '+58-212-555-0103',
        contact_name: 'José Martínez',
        address: 'Zona Industrial, Maracay',
      },
      {
        id: uuidv4(),
        name: 'Herramientas Profesionales',
        phone_number: '+58-212-555-0104',
        contact_name: 'Ana López',
        address: 'Centro Comercial Las Américas',
      },
      {
        id: uuidv4(),
        name: 'Materiales de Construcción Del Sur',
        phone_number: '+58-212-555-0105',
        contact_name: 'Pedro Ramírez',
        address: 'Carretera Nacional, Barquisimeto',
      },
      {
        id: uuidv4(),
        name: 'Eléctricos y Plomería Express',
        phone_number: '+58-212-555-0106',
        contact_name: 'Laura Fernández',
        address: 'Av. Bolívar, Maracaibo',
      },
      {
        id: uuidv4(),
        name: 'Cerrajería y Seguridad Total',
        phone_number: '+58-212-555-0107',
        contact_name: 'Roberto Silva',
        address: 'Calle 72, Valencia',
      },
      {
        id: uuidv4(),
        name: 'Maderas y Tableros Industriales',
        phone_number: '+58-212-555-0108',
        contact_name: 'Carmen Díaz',
        address: 'Zona Industrial Norte',
      },
      {
        id: uuidv4(),
        name: 'Importadora de Herramientas',
        phone_number: '+58-212-555-0109',
        contact_name: 'Luis Pérez',
        address: 'Puerto La Guaira',
      },
      {
        id: uuidv4(),
        name: 'Suministros Generales',
        phone_number: '+58-212-555-0110',
        contact_name: 'Elena Torres',
        address: 'Centro, Caracas',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('providers', null, {});
  }
};
