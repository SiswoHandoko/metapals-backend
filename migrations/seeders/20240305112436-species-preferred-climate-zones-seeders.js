'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let i = 0; i < 20; i++) {
      const data = [];
      for (let j = 0; j < 100; j++) {
        data.push(
          {
            species_id: Math.floor(Math.random() * 1000) + 1,
            preferred_climate_zone_id: Math.floor(Math.random() * 7) + 1,
            created_at: new Date(),
            updated_at: new Date()
          }
        )
      }
      // insert data
      await queryInterface.bulkInsert('species_preferred_climate_zones', data, {}); 
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('species_preferred_climate_zones', null, {});
  }
};
