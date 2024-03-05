'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let i = 0; i < 10; i++) {
      const data = [];
      for (let j = 0; j < 100; j++) {
        data.push(
          {
            family_name_id: Math.floor(Math.random() * 12) + 1,
            native_habitat_id: Math.floor(Math.random() * 4) + 1,
            name: faker.person.fullName(),
            common_name : [faker.person.firstName(),faker.person.middleName(),faker.person.lastName()],
            tag : 'plant',
            image: faker.image.urlLoremFlickr(),
            created_at: new Date(),
            updated_at: new Date()
          }
        )
      }
      // insert data
      await queryInterface.bulkInsert('species', data, {}); 
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('species', null, {});
  }
};
