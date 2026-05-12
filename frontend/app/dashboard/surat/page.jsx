'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/services/api';
import { Plus, Search, Filter, Eye, Edit, Trash, Share2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SuratListPage() {
    const [suratList, setSuratList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, masuk, keluar
    const { user } = useAuth();

    useEffect(() => {
        fetchSurat();
    }, []);

    const fetchSurat = async () => {
        try {
            const res = await api.get('/surat');
            setSuratList(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this surat?')) return;
        try {
            await api.delete(`/surat/${id}`);
            fetchSurat();
        } catch (error) {
            alert('Failed to delete surat');
        }
    };

    const filteredSurat = suratList.filter(item =>
        filter === 'all' ? true : item.jenis_surat === filter
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Manajemen Surat</h1>
                    <p className="text-gray-400">Kelola surat masuk dan keluar</p>
                </div>
                <Link
                    href="/dashboard/surat/create"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors font-medium shadow-lg shadow-blue-500/20"
                >
                    <Plus size={18} />
                    Buat Surat Baru
                </Link>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-4 bg-gray-900/50 p-2 rounded-xl border border-gray-800 w-fit">
                {['all', 'masuk', 'keluar'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                            ? 'bg-gray-800 text-white shadow-sm'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400">
                        <thead className="bg-gray-950 text-gray-300 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Nomor Surat</th>
                                <th className="px-6 py-4">Perihal</th>
                                <th className="px-6 py-4">Jenis</th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {loading ? (
                                <tr><td colSpan="6" className="p-6 text-center">Loading...</td></tr>
                            ) : filteredSurat.length === 0 ? (
                                <tr><td colSpan="6" className="p-6 text-center">Tidak ada data surat</td></tr>
                            ) : (
                                filteredSurat.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">{item.nomor_surat}</td>
                                        <td className="px-6 py-4 max-w-xs truncate">{item.perihal}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${item.jenis_surat === 'masuk' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                                                }`}>
                                                {item.jenis_surat.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{item.tanggal}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${item.status === 'disetujui' ? 'bg-emerald-500/10 text-emerald-400' :
                                                item.status === 'ditolak' ? 'bg-red-500/10 text-red-400' :
                                                    'bg-yellow-500/10 text-yellow-400'
                                                }`}>
                                                {item.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex justify-end gap-2">
                                            {item.jenis_surat === 'masuk' && (
                                                <Link
                                                    href={`/dashboard/surat/${item.id}/disposisi`}
                                                    className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 tooltip"
                                                    title="Lihat/Buat Disposisi"
                                                >
                                                    <Share2 size={18} />
                                                </Link>
                                            )}
                                            <Link href={`/dashboard/surat/${item.id}`} className="p-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white">
                                                <Eye size={18} />
                                            </Link>
                                            {(user?.role === 'Admin' || user?.role === 'Petugas') && (
                                                <>
                                                    <Link href={`/dashboard/surat/${item.id}/edit`} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20">
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
                                                    >
                                                        <Trash size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
