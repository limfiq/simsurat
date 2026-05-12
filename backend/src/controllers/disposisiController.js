const Disposisi = require('../models/Disposisi');
const Surat = require('../models/Surat');
const Log = require('../models/Log');
const User = require('../models/User');

exports.createDisposisi = async (req, res) => {
    try {
        const { surat_id, tujuan, instruksi, catatan, batas_waktu } = req.body;

        const surat = await Surat.findByPk(surat_id);
        if (!surat) return res.status(404).json({ message: 'Surat not found' });

        const disposisi = await Disposisi.create({
            surat_id,
            sender_id: req.user.id,
            tujuan,
            instruksi,
            catatan: catatan || null,
            batas_waktu: batas_waktu ? batas_waktu : null
        });

        // Update surat status optional, maybe mark as 'didisposisikan'
        // surat.status = 'didisposisikan';
        // await surat.save();

        await Log.create({
            user_id: req.user.id,
            action: `Disposisi Created for Surat ${surat.nomor_surat}`,
            details: JSON.stringify({ disposisi_id: disposisi.id })
        });

        res.status(201).json({ message: 'Disposisi created', disposisi });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getDisposisiBySurat = async (req, res) => {
    try {
        const { suratId } = req.params;
        const list = await Disposisi.findAll({
            where: { surat_id: suratId },
            include: [{ model: User, as: 'sender', attributes: ['nama'] }],
            order: [['createdAt', 'DESC']]
        });
        res.json(list);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
