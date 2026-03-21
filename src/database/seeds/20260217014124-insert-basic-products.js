'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const measures = await queryInterface.sequelize.query(
      'SELECT id, abbreviation FROM measures',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM categories',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getMeasureId = (abbr) => {
      const measure = measures.find(m => m.abbreviation.trim() === abbr);
      return measure?.id;
    };

    const getCategoryId = (name) => {
      const category = categories.find(c => c.name === name);
      return category?.id;
    };

    await queryInterface.bulkInsert('products', [
      {
        id: uuidv4(),
        name: 'Tornillo Hexagonal 1/2"',
        description: 'Tornillo hexagonal galvanizado de 1/2 pulgada',
        price_usd: 0.15,
        actual_stock: 500,
        min_stock: 100,
        measure_id: getMeasureId('und'),
        category_id: getCategoryId('Ferretería'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Pintura Látex Blanco',
        description: 'Pintura látex interior/exterior color blanco',
        price_usd: 12.50,
        actual_stock: 80,
        min_stock: 20,
        measure_id: getMeasureId('gal'),
        category_id: getCategoryId('Pinturas'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Cemento Gris',
        description: 'Cemento Portland gris de uso general',
        price_usd: 8.75,
        actual_stock: 150,
        min_stock: 50,
        measure_id: getMeasureId('sco'),
        category_id: getCategoryId('Construcción'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Cable Eléctrico 12 AWG',
        description: 'Cable eléctrico calibre 12 AWG, THHN',
        price_usd: 1.25,
        actual_stock: 300,
        min_stock: 50,
        measure_id: getMeasureId('m'),
        category_id: getCategoryId('Electricidad'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Tubo PVC 1/2"',
        description: 'Tubo PVC sanitario 1/2 pulgada',
        price_usd: 2.80,
        actual_stock: 200,
        min_stock: 40,
        measure_id: getMeasureId('und'),
        category_id: getCategoryId('Plomería'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Martillo Carpintero',
        description: 'Martillo de carpintero 16 oz con mango de fibra',
        price_usd: 15.00,
        actual_stock: 45,
        min_stock: 10,
        measure_id: getMeasureId('und'),
        category_id: getCategoryId('Herramientas'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Cerradura de Pomo',
        description: 'Cerradura de pomo para puerta interior',
        price_usd: 18.50,
        actual_stock: 30,
        min_stock: 8,
        measure_id: getMeasureId('und'),
        category_id: getCategoryId('Ferretería'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Lija para Madera Grano 80',
        description: 'Papel de lija para madera grano 80',
        price_usd: 0.75,
        actual_stock: 250,
        min_stock: 50,
        measure_id: getMeasureId('und'),
        category_id: getCategoryId('Ferretería'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Cinta Métrica 5m',
        description: 'Cinta métrica retráctil de 5 metros',
        price_usd: 8.00,
        actual_stock: 60,
        min_stock: 15,
        measure_id: getMeasureId('und'),
        category_id: getCategoryId('Herramientas'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Clavos 3"',
        description: 'Clavos de acero de 3 pulgadas',
        price_usd: 4.50,
        actual_stock: 100,
        min_stock: 20,
        measure_id: getMeasureId('kg'),
        category_id: getCategoryId('Ferretería'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Destornillador Plano 6"',
        description: 'Destornillador plano de 6 pulgadas',
        price_usd: 5.50,
        actual_stock: 75,
        min_stock: 15,
        measure_id: getMeasureId('und'),
        category_id: getCategoryId('Herramientas'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Silicón Transparente',
        description: 'Silicón sellador transparente uso general',
        price_usd: 3.25,
        actual_stock: 120,
        min_stock: 30,
        measure_id: getMeasureId('und'),
        category_id: getCategoryId('Ferretería'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Bisagra 3"',
        description: 'Bisagra de acero inoxidable de 3 pulgadas',
        price_usd: 2.00,
        actual_stock: 180,
        min_stock: 40,
        measure_id: getMeasureId('par'),
        category_id: getCategoryId('Ferretería'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Thinner Acrílico',
        description: 'Thinner acrílico para dilución de pinturas',
        price_usd: 4.00,
        actual_stock: 90,
        min_stock: 20,
        measure_id: getMeasureId('L'),
        category_id: getCategoryId('Pinturas'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Candado 40mm',
        description: 'Candado de seguridad de 40mm',
        price_usd: 12.00,
        actual_stock: 50,
        min_stock: 12,
        measure_id: getMeasureId('und'),
        category_id: getCategoryId('Ferretería'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Brocha 2"',
        description: 'Brocha para pintura de 2 pulgadas',
        price_usd: 3.50,
        actual_stock: 100,
        min_stock: 25,
        measure_id: getMeasureId('und'),
        category_id: getCategoryId('Pinturas'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Rodillo para Pintura',
        description: 'Rodillo de espuma para pintura 9"',
        price_usd: 4.75,
        actual_stock: 85,
        min_stock: 20,
        measure_id: getMeasureId('und'),
        category_id: getCategoryId('Pinturas'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Alambre Galvanizado',
        description: 'Alambre galvanizado calibre 18',
        price_usd: 6.50,
        actual_stock: 70,
        min_stock: 15,
        measure_id: getMeasureId('kg'),
        category_id: getCategoryId('Ferretería'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Llave Inglesa 10"',
        description: 'Llave inglesa ajustable de 10 pulgadas',
        price_usd: 14.00,
        actual_stock: 40,
        min_stock: 10,
        measure_id: getMeasureId('und'),
        category_id: getCategoryId('Herramientas'),
        tax_percentage: 16,
      },
      {
        id: uuidv4(),
        name: 'Cinta Aislante',
        description: 'Cinta aislante eléctrica negra',
        price_usd: 1.50,
        actual_stock: 200,
        min_stock: 50,
        measure_id: getMeasureId('rll'),
        category_id: getCategoryId('Electricidad'),
        tax_percentage: 16,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
