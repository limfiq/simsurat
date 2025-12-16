const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Role = db.define('Role', {
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});

module.exports = Role;
