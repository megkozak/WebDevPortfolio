'use strict';
module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define('comment', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Comment;
};
