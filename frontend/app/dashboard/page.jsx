'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Mail, ArrowUpRight, ArrowDownRight, Users, FileCheck } from 'lucide-react';

function DisposisiModal({ surat, onClose, onDisposisiSubmit }) {
    const [tujuan, setTujuan] = useState('');
    const [instruksi, setInstruksi] = useState('');
    const [catatan, setCatatan] = useState('');

    if (!surat) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onDisposisiSubmit(surat.id, {
            tujuan,
            instruksi,
            catatan,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg w-full max-w-2xl p-8 m-4">
                <h2 className="text-2xl font-bold text-white mb-6">Disposisi Surat: {surat.perihal}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="tujuan" className="block text-sm font-medium text-gray-400 mb-2">Teruskan Kepada</label>
                        <input
                            id="tujuan"
                            type="text"
                            value={tujuan}
                            onChange={(e) => setTujuan(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Sekretaris, Kepala Bagian Keuangan"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="instruksi" className="block text-sm font-medium text-gray-400 mb-2">Instruksi</label>
                        <textarea
                            id="instruksi"
                            rows="3"
                            value={instruksi}
                            onChange={(e) => setInstruksi(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Mohon ditindaklanjuti, Untuk diarsipkan"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="catatan" className="block text-sm font-medium text-gray-400 mb-2">Catatan (Opsional)</label>
                        <textarea
                            id="catatan"
                            rows="3"
                            value={catatan}
                            onChange={(e) => setCatatan(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tambahkan catatan atau informasi tambahan..."
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-semibold text-gray-300 rounded-lg hover:bg-gray-800 focus:outline-none">
                            Batal
                        </button>
                        <button type="submit" className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                            Kirim Disposisi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [disposisiList, setDisposisiList] = useState([]);
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = async () => {
        try {
            const [statsRes, disposisiRes] = await Promise.all([
                api.get('/dashboard/stats'),
                api.get('/surat?status=diajukan')
            ]);
            setStats(statsRes.data);
            setDisposisiList(disposisiRes.data);
        } catch (error) {
            console.error('Failed to fetch dashboard data', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenModal = (surat) => {
        setSelectedSurat(surat);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedSurat(null);
        setIsModalOpen(false);
    };

    const handleDisposisiSubmit = async (suratId, disposisiData) => {
        try {
            const payload = {
                ...disposisiData,
                surat_id: suratId
            };
            await api.post('/disposisi', payload);

            fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Failed to submit disposisi', error);
        }
    };

    const cards = [
        {
            label: 'Surat Masuk',
            value: stats?.summary?.suratMasuk || 0,
            icon: ArrowDownRight,
            color: 'bg-emerald-500/10 text-emerald-500',
        },
        {
            label: 'Surat Keluar',
            value: stats?.summary?.suratKeluar || 0,
            icon: ArrowUpRight,
            color: 'bg-blue-500/10 text-blue-500',
        },
        {
            label: 'Menunggu Disposisi',
            value: disposisiList.length || 0,
            icon: FileCheck,
            color: 'bg-yellow-500/10 text-yellow-500',
        },
        {
            label: 'Total Users',
            value: stats?.summary?.users || 0,
            icon: Users,
            color: 'bg-purple-500/10 text-purple-500',
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome back to SimSurat Dashboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {cards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm font-medium">{card.label}</p>
                                    <h3 className="text-3xl font-bold text-white mt-2">{card.value}</h3>
                                </div>
                                <div className={`p-3 rounded-lg ${card.color}`}>
                                    <Icon size={24} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Statistik Bulanan</h3>
                <div className="h-64 flex items-center justify-center text-gray-500 bg-gray-950/50 rounded-xl border border-dashed border-gray-800">
                    Chart Component Placeholder (Requires Chart.js or Recharts)
                </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6">Menunggu Disposisi</h3>
                <div className="space-y-4">
                    {disposisiList.length > 0 ? (
                        disposisiList.map((surat) => (
                            <div key={surat.id} className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-colors">
                                <div>
                                    <p className="font-semibold text-white">{surat.perihal}</p>
                                    <p className="text-sm text-gray-400">{surat.nomor_surat} - Dari: {surat.pengirim}</p>
                                </div>
                                <button
                                    onClick={() => handleOpenModal(surat)}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                >
                                    Lihat & Disposisi
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500 bg-gray-950/50 rounded-xl border border-dashed border-gray-800">
                            Tidak ada surat yang memerlukan disposisi saat ini.
                        </div>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <DisposisiModal
                    surat={selectedSurat}
                    onClose={handleCloseModal}
                    onDisposisiSubmit={handleDisposisiSubmit}
                />
            )}
        </div>
    );
}