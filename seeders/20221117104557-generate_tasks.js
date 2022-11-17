'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('tasks', [
      {id: 1, description: 'Prueba 1', createdAt: new Date(), updatedAt: new Date()},
      {id: 2, description: 'Prueba 2', createdAt: new Date(), updatedAt: new Date()}
    ], {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('tasks', null, {});
  }
};
