'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { ArrowLeft, Send, Clock, User } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/AuthContext';

export default function DisposisiPage({ params }) {
    const { user } = useAuth();
    const router = useRouter();
    const { id } = params;
    const [surat, setSurat] = useState(null);
    const [history, setHistory] = useState([]);
    const [systemUsers, setSystemUsers] = useState([]);
    const [formData, setFormData] = useState({
        tujuan: '',
        instruksi: '',
        catatan: '',
        batas_waktu: ''
    });
    const [loading, setLoading] = useState(true);

    const canDispose = user?.role === 'Pimpinan' || ((user?.role === 'Petugas' || user?.role === 'Admin') && history.length > 0);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const [resSurat, resHistory, resUsers] = await Promise.all([
                api.get(`/surat/${id}`),
                api.get(`/disposisi/${id}`),
                api.get('/users').catch(() => ({ data: [] }))
            ]);
            setSurat(resSurat.data);
            setHistory(resHistory.data);
            setSystemUsers(resUsers.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const finalTujuan = user?.role === 'Pimpinan' ? 'Staff' : formData.tujuan;
            await api.post('/disposisi', {
                surat_id: id,
                ...formData,
                tujuan: finalTujuan
            });
            alert('Disposisi berhasil dikirim');
            setFormData({ tujuan: '', instruksi: '', catatan: '', batas_waktu: '' });
            fetchData(); // Refresh list
        } catch (error) {
            console.error(error.response?.data || error);
            alert('Gagal mengirim disposisi: ' + (error.response?.data?.message || error.message));
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className={`grid grid-cols-1 ${canDispose ? 'lg:grid-cols-2' : ''} gap-8`}>
            {/* Left: Surat Detail & History */}
            <div className="space-y-6">
                <Link href="/dashboard/surat" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit">
                    <ArrowLeft size={18} />
                    Kembali
                </Link>

                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                    <h2 className="text-xl font-bold text-white mb-4">Detail Surat</h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-gray-800 pb-2">
                            <span className="text-gray-500">Nomor</span>
                            <span className="text-white font-mono">{surat.nomor_surat}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-800 pb-2">
                            <span className="text-gray-500">Perihal</span>
                            <span className="text-white text-right">{surat.perihal}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-800 pb-2">
                            <span className="text-gray-500">Pengirim</span>
                            <span className="text-white">{surat.pengirim}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Riwayat Disposisi</h3>
                    <div className="space-y-4">
                        {history.map((item) => (
                            <div key={item.id} className="bg-gray-900 border border-gray-800 p-4 rounded-xl relative">
                                <div className="flex items-center gap-2 mb-2">
                                    <User size={16} className="text-blue-500" />
                                    <span className="text-sm font-bold text-white">Dari: {item.sender?.nama}</span>
                                    <span className="text-gray-600 text-xs">• {new Date(item.createdAt).toLocaleString('id-ID')}</span>
                                </div>
                                <div className="text-gray-300 text-sm mb-2">
                                    <span className="text-gray-500 block text-xs uppercase tracking-wide">Kepada</span>
                                    {item.tujuan}
                                </div>
                                <div className="text-gray-300 text-sm mb-2">
                                    <span className="text-gray-500 block text-xs uppercase tracking-wide">Instruksi</span>
                                    {item.instruksi}
                                </div>
                                {item.batas_waktu && (
                                    <div className="mt-3 flex items-center gap-2 text-xs text-yellow-500 bg-yellow-500/10 w-fit px-2 py-1 rounded">
                                        <Clock size={12} />
                                        Batas Waktu: {new Date(item.batas_waktu).toLocaleString('id-ID')}
                                    </div>
                                )}
                            </div>
                        ))}
                        {history.length === 0 && <p className="text-gray-600 text-sm italic">Belum ada riwayat disposisi.</p>}
                    </div>
                </div>
            </div>

            {/* Right: Disposisi Form */}
            {canDispose && (
            <div>
                <div className="sticky top-6">
                    <h2 className="text-2xl font-bold text-white mb-1">Buat Disposisi</h2>
                    <p className="text-gray-400 mb-6">Berikan instruksi tindak lanjut surat ini</p>

                    <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 p-8 rounded-2xl space-y-5">
                        {user?.role === 'Pimpinan' ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Tujuan Disposisi</label>
                                <input
                                    type="text"
                                    readOnly
                                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-gray-500 outline-none cursor-not-allowed"
                                    value="Staff / Bagian Administrasi"
                                />
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Tujuan Disposisi (Pilih User)</label>
                                <select
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.tujuan}
                                    onChange={(e) => setFormData({ ...formData, tujuan: e.target.value })}
                                >
                                    <option value="" disabled>-- Pilih Tujuan User --</option>
                                    {systemUsers.map(u => (
                                        <option key={u.id} value={u.nama}>{u.nama} ({u.Role?.role_name})</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Instruksi / Perintah</label>
                            <textarea
                                required
                                placeholder="Apa yang harus dilakukan?"
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 h-24"
                                value={formData.instruksi}
                                onChange={(e) => setFormData({ ...formData, instruksi: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Catatan Tambahan (Opsional)</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.catatan}
                                onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Batas Waktu Penyelesaian</label>
                            <input
                                type="datetime-local"
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.batas_waktu}
                                onChange={(e) => setFormData({ ...formData, batas_waktu: e.target.value })}
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-medium text-white transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-500/20"
                            >
                                <Send size={18} />
                                Kirim Disposisi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            )}
        </div>
    );
}
