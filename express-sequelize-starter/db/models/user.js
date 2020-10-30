"use strict";
const { Model } = require("sequelize");
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
		validatePassword = function (password) {
			return bcrypt.compareSync(password, this.hashedPassword.toString());
		};
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);

	return User;
};
