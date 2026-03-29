'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = await queryInterface.sequelize.query(
      'SELECT id FROM products',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const providers = await queryInterface.sequelize.query(
      'SELECT id FROM providers',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const getRandomProvider = () => providers[Math.floor(Math.random() * providers.length)].id;
    const getRandomPrice = () => (Math.random() * 50 + 5).toFixed(2);

    const catalogProviderData = products.map((product, index) => ({
      id: uuidv4(),
      product_id: product.id,
      provider_id: getRandomProvider(),
      provider_sku: `PROV-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      is_main: index % 3 === 0,
      is_active: true,
      last_purchase_price: getRandomPrice(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert('catalog_provider', catalogProviderData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('catalog_provider', null, {});
  }
};
