'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditSuratPage({ params }) {
    const router = useRouter();
    const { id } = params;
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nomor_surat: '',
        jenis_surat: 'masuk',
        tanggal: '',
        perihal: '',
        pengirim: '',
        penerima: '',
        status: '',
        tanggal_diterima: '',
        sifat_surat: 'biasa'
    });

    useEffect(() => {
        fetchSurat();
    }, [id]);

    const fetchSurat = async () => {
        try {
            const res = await api.get(`/surat/${id}`);
            const data = res.data;
            if (data.tanggal) data.tanggal = data.tanggal.slice(0, 16);
            if (data.tanggal_diterima) data.tanggal_diterima = data.tanggal_diterima.slice(0, 16);
            setFormData(data);
            setLoading(false);
        } catch (error) {
            alert('Failed to fetch surat');
            router.push('/dashboard/surat');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/surat/${id}`, formData);
            router.push('/dashboard/surat');
        } catch (error) {
            alert('Failed to update surat');
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Link href="/dashboard/surat" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit">
                <ArrowLeft size={18} />
                Back to List
            </Link>

            <div>
                <h1 className="text-3xl font-bold text-white">Edit Surat</h1>
                <p className="text-gray-400">Update data surat</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 p-8 rounded-2xl space-y-6">
                {/* Simplified form reusing same fields as create, but populated */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Jenis Surat</label>
                        <select
                            className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.jenis_surat}
                            onChange={(e) => setFormData({ ...formData, jenis_surat: e.target.value })}
                        >
                            <option value="masuk">Surat Masuk</option>
                            <option value="keluar">Surat Keluar</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Tanggal</label>
                        <input
                            type="datetime-local"
                            required
                            className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.tanggal}
                            onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nomor Surat</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.nomor_surat}
                        onChange={(e) => setFormData({ ...formData, nomor_surat: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Perihal</label>
                    <textarea
                        required
                        className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 h-24"
                        value={formData.perihal}
                        onChange={(e) => setFormData({ ...formData, perihal: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Pengirim</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.pengirim}
                            onChange={(e) => setFormData({ ...formData, pengirim: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Penerima</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.penerima}
                            onChange={(e) => setFormData({ ...formData, penerima: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Tanggal Diterima</label>
                        <input
                            type="datetime-local"
                            className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.tanggal_diterima || ''}
                            onChange={(e) => setFormData({ ...formData, tanggal_diterima: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Sifat Surat</label>
                        <select
                            className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.sifat_surat || 'biasa'}
                            onChange={(e) => setFormData({ ...formData, sifat_surat: e.target.value })}
                        >
                            <option value="biasa">Biasa</option>
                            <option value="rahasia">Rahasia</option>
                            <option value="segera">Segera</option>
                            <option value="sangat segera">Sangat Segera</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Status Surat</label>
                    <select
                        className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="draft">Draft (Simpan Sementara)</option>
                        <option value="diajukan">Ajukan ke Pimpinan</option>
                    </select>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 rounded-xl font-medium shadow-lg shadow-blue-500/20 text-white transition-all flex justify-center items-center gap-2"
                    >
                        <Save size={18} />
                        Update Surat
                    </button>
                </div>
            </form>
        </div>
    );
}
