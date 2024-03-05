'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('fields', [
      {
        field_category_id: 1,
        name: 'Family Name',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        field_category_id: 1,
        name: 'Common Name',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        field_category_id: 2,
        name: 'Native Habitat',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        field_category_id: 2,
        name: 'Preferred Climate Zones',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fields', null, {});
  }
};
