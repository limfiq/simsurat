const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = require('./User');

const Surat = db.define('Surat', {
    nomor_surat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jenis_surat: {
        type: DataTypes.ENUM('masuk', 'keluar'),
        allowNull: false
    },
    tanggal: {
        type: DataTypes.DATE,
        allowNull: false
    },
    perihal: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    pengirim: {
        type: DataTypes.STRING,
        allowNull: false
    },
    penerima: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tanggal_diterima: {
        type: DataTypes.DATE,
        allowNull: true
    },
    sifat_surat: {
        type: DataTypes.ENUM('sangat segera', 'segera', 'rahasia', 'biasa'),
        defaultValue: 'biasa',
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('draft', 'diajukan', 'disetujui', 'ditolak', 'revisi', 'selesai'),
        defaultValue: 'draft'
    },
    file_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    approvedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true
});

Surat.belongsTo(User, { as: 'creator', foreignKey: 'createdBy' });
Surat.belongsTo(User, { as: 'approver', foreignKey: 'approvedBy' });

module.exports = Surat;
