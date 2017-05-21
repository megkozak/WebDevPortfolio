'use strict';
module.exports = function(sequelize, DataTypes) {
	return(sequelize.define('post', {
		title: {
			type:      DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Title is required'
				}
			}
		},
		body: {
			type:      DataTypes.TEXT,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Body is required'
				}
			}
		},
    author: {
			type:      DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Author is required'
				}
			}
		},
		imageFilename: {
			type:         DataTypes.STRING,
			allowNull:    false,
			defaultValue: '',
			validate: {
				notEmpty: {
					msg: 'Image is required'
				}
			}
		}
	}, {
		defaultScope: {
			order: [['createdAt', 'DESC']]
		},
	  getterMethods: {
			url: function() {
				return(`/portfolio/${this.id}`);
			},
			imageUrl: function() {
				return(`/images/posts/${this.imageFilename}`);
			},
			imageThumbnailUrl: function() {
				return(`${this.imageUrl}-thumbnail`);
			}
	  },
    classMethods: {
      associate: function(models) {
        models.post.hasMany(models.comment);
      },
			findById: function(Id) {
				return(this.findOne({
					where: {
						Id: Id
					},
					include: [
						sequelize.models.comment
					],
					order: [
						[sequelize.models.comment, 'createdAt', 'DESC']
					]
				}));
			}
    }
	}));
};
