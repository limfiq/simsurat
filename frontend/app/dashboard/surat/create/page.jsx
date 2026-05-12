'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { ArrowLeft, Upload } from 'lucide-react';
import Link from 'next/link';

export default function CreateSuratPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nomor_surat: '',
        jenis_surat: 'masuk',
        tanggal: '',
        perihal: '',
        pengirim: '',
        penerima: '',
        tanggal_diterima: '',
        sifat_surat: 'biasa'
    });
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            if (file) data.append('file', file);

            await api.post('/surat', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            router.push('/dashboard/surat');
        } catch (error) {
            alert('Failed to create surat. ' + (error.response?.data?.message || ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Link href="/dashboard/surat" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit">
                <ArrowLeft size={18} />
                Back to List
            </Link>

            <div>
                <h1 className="text-3xl font-bold text-white">Buat Surat Baru</h1>
                <p className="text-gray-400">Input data surat masuk atau keluar</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 p-8 rounded-2xl space-y-6">
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
                        placeholder="ex: 001/INV/XII/2023"
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
                            value={formData.tanggal_diterima}
                            onChange={(e) => setFormData({ ...formData, tanggal_diterima: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Sifat Surat</label>
                        <select
                            className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.sifat_surat}
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
                    <label className="block text-sm font-medium text-gray-400 mb-2">Upload Lampiran (PDF/Image)</label>
                    <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:bg-gray-950/50 transition-colors">
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                            <Upload className="text-gray-500" />
                            <span className="text-sm text-gray-400">
                                {file ? file.name : "Click to upload file"}
                            </span>
                        </label>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 rounded-xl font-medium shadow-lg shadow-blue-500/20 text-white transition-all disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Simpan Surat'}
                    </button>
                </div>

            </form>
        </div>
    );
}
