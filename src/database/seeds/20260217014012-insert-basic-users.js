'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        name: 'Admin',
        lastname: 'Sistema',
        username: 'admin',
        password_hash: hashedPassword,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Juan',
        lastname: 'Pérez',
        username: 'jperez',
        password_hash: hashedPassword,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'María',
        lastname: 'González',
        username: 'mgonzalez',
        password_hash: hashedPassword,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Carlos',
        lastname: 'Rodríguez',
        username: 'crodriguez',
        password_hash: hashedPassword,
        created_at: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Ana',
        lastname: 'Martínez',
        username: 'amartinez',
        password_hash: hashedPassword,
        created_at: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
