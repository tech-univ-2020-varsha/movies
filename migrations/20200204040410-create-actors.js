
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('actors', {

    name: {
      type: Sequelize.TEXT,
    },
    movieid: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      primaryKey: true,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('actors'),
};
