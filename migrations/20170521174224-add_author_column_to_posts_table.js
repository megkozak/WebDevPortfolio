'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return(queryInterface.addColumn('posts', 'author', {
			type:         Sequelize.STRING,
			allowNull:    false,
			defaultValue: ''
		}));
  },

  down: function (queryInterface, Sequelize) {
    return(queryInterface.removeColumn('posts', 'author'));
  }
};
