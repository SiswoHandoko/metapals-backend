'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('family_names', [
      {
        name: 'Acanthaceae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Adoxaceae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Blechnaceae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bombacaceae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Cannaceae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Caricaceae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Dipteridaceae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Dracaenaceae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Gelsemiaceae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Geraniaceae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Hydrangeaceae',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Ixonanthaceae',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('family_names', null, {});
  }
};
