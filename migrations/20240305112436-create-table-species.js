'use strict';

const { DataType } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('species', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      familyNameId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'family_name_id',
        references: {
          model: 'family_names',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nativeHabitatId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'native_habitat_id',
        references: {
          model: 'native_habitats',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        field: 'name',
        allowNull: false
      },
      commonName: {
        type: Sequelize.TEXT,
        field: 'common_name',
        allowNull: true
      },
      tag: {
        type: DataType.ENUM,
        values: [
          'animal',
          'plant'
        ],
        allowNull: false,
      },
      image: {
        type: Sequelize.TEXT,
        field: 'image',
        allowNull: false
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
    return queryInterface.dropTable('species');
  }
};
