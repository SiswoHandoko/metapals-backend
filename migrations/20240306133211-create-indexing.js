'use strict';

const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Add indexes
    await queryInterface.addIndex('species', ['name','common_name']);
    await queryInterface.addIndex('species', ['family_name_id']);
    await queryInterface.addIndex('species', ['native_habitat_id']);

    await queryInterface.addIndex('species_preferred_climate_zones', ['species_id']);
    await queryInterface.addIndex('species_preferred_climate_zones', ['preferred_climate_zone_id']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('species', ['name','common_name']);
    await queryInterface.removeIndex('species', ['family_name_id']);
    await queryInterface.removeIndex('species', ['native_habitat_id']);

    await queryInterface.removeIndex('species_preferred_climate_zones', ['species_id']);
    await queryInterface.removeIndex('species_preferred_climate_zones', ['preferred_climate_zone_id']);
  }
};
