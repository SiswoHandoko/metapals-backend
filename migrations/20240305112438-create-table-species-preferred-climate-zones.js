'use strict';

const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('species_preferred_climate_zones', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      speciesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'species_id',
        references: {
          model: 'species',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      preferredClimateZoneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'preferred_climate_zone_id',
        references: {
          model: 'preferred_climate_zones',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('species_preferred_climate_zones');
  }
};
