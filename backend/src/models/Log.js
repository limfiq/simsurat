const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./User');

const Log = db.define('Log', {
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
    updatedAt: false
});

Log.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Log;
