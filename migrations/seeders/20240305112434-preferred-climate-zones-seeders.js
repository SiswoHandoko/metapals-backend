'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('preferred_climate_zones', [
      {
        name: 'Desert / Arid',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Highland / Montane',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mediterranean',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sub-Arctic',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sub-Tropical / Monsoonal',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Temperate',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tropical',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('preferred_climate_zones', null, {});
  }
};
