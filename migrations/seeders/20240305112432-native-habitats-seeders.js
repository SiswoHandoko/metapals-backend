'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('native_habitats', [
      {
        name: 'Aquatic',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Marine',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Shoreline',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Terrestrial',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('native_habitats', null, {});
  }
};
