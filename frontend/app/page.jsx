'use client';

import { useState } from 'react';
import api from '@/services/api';
import Navbar from '@/components/Navbar';
import { Search, CheckCircle, XCircle, Download } from 'lucide-react';

export default function LandingPage() {
    const [nomor, setNomor] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!nomor) return;

        setLoading(true);
        setError('');
        setResult(null);
        setSearched(true);

        try {
            // Direct call to axios without interceptors if possible, or handle public route with existing api instance
            // The current api instance attaches token if present, which is fine.
            const res = await api.get(`/surat/public/search`, {
                params: { nomor }
            });
            setResult(res.data);
        } catch (err) {
            if (err.response?.status === 404) {
                setError('Surat tidak ditemukan atau tidak valid.');
            } else {
                setError('Terjadi kesalahan saat mencari surat.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center px-6 pt-20">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        Cek Validitas <br /> Surat Keluar
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Masukkan nomor surat untuk memverifikasi keaslian dan status surat yang diterbitkan oleh instansi kami.
                    </p>
                </div>

                <div className="w-full max-w-lg mb-12">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            value={nomor}
                            onChange={(e) => setNomor(e.target.value)}
                            placeholder="Contoh: 001/INV/XII/2023"
                            className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-800 rounded-2xl text-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-600"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-all"
                        >
                            {loading ? 'Cari...' : 'Cek Surat'}
                        </button>
                    </form>
                </div>

                {searched && (
                    <div className={`w-full max-w-2xl p-6 rounded-2xl border ${result ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'} animation-fade-in`}>
                        {result ? (
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500">
                                    <CheckCircle size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Surat Valid & Terdaftar</h3>
                                    <p className="text-gray-400 mb-4">Detail surat ditemukan dalam database kami.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div className="p-4 bg-gray-900/50 rounded-xl">
                                            <span className="block text-gray-500 mb-1">Nomor Surat</span>
                                            <span className="font-mono text-white">{result.nomor_surat}</span>
                                        </div>
                                        <div className="p-4 bg-gray-900/50 rounded-xl">
                                            <span className="block text-gray-500 mb-1">Tanggal Surat</span>
                                            <span className="text-white">{result.tanggal}</span>
                                        </div>
                                        <div className="p-4 bg-gray-900/50 rounded-xl md:col-span-2">
                                            <span className="block text-gray-500 mb-1">Perihal</span>
                                            <span className="text-white">{result.perihal}</span>
                                        </div>
                                        {result.file_url && (
                                            <div className="p-4 bg-blue-500/10 rounded-xl md:col-span-2 border border-blue-500/20">
                                                <span className="block text-blue-400 mb-2 font-medium">Dokumen Surat</span>
                                                <a
                                                    href={`${api.defaults.baseURL.replace('/api', '')}/${result.file_url}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white underline hover:text-blue-300 text-sm flex items-center gap-2"
                                                >
                                                    <Download size={16} />
                                                    Lihat / Download Dokumen
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-red-500/10 rounded-full text-red-500">
                                    <XCircle size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Surat Tidak Ditemukan</h3>
                                    <p className="text-red-400/80">{error}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-20 text-center text-sm text-gray-600">
                    &copy; {new Date().getFullYear()} SimSurat Instansi. All rights reserved.
                </div>
            </main>
        </div>
    );
}