'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('field_categories', [
      {
        name: 'Name',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Biogeography',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('field_categories', null, {});
  }
};
