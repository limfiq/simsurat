const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Surat = require('./Surat');
const User = require('./User');

const Disposisi = db.define('Disposisi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    surat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Surat,
            key: 'id'
        }
    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    tujuan: {
        type: DataTypes.STRING,
        allowNull: false // e.g., 'Petugas', 'Sekretaris', or specific user name
    },
    instruksi: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    catatan: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    batas_waktu: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true
});

// Associations
Disposisi.belongsTo(Surat, { foreignKey: 'surat_id' });
Surat.hasMany(Disposisi, { foreignKey: 'surat_id' });

Disposisi.belongsTo(User, { as: 'sender', foreignKey: 'sender_id' });

module.exports = Disposisi;
