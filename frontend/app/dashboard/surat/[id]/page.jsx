'use client';

import { useEffect, useState, use } from 'react';
import api from '@/services/api';
import { ArrowLeft, FileText, Download, Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';
import QRCode from 'react-qr-code';

export default function SuratDetailPage({ params }) {
    const { id } = use(params);
    const [surat, setSurat] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSurat = async () => {
            try {
                const res = await api.get(`/surat/${id}`);
                setSurat(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchSurat();
    }, [id]);

    if (loading) return <div className="text-white p-6">Loading...</div>;
    if (!surat) return <div className="text-white p-6">Surat not found</div>;

    const isSuratKeluarApproved = surat.jenis_surat === 'keluar' && surat.status === 'disetujui';
    // Use a real URL based on environment or fallback to localhost
    const validationUrl = `${window.location.origin}/?search=${encodeURIComponent(surat.nomor_surat)}`;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Link href="/dashboard/surat" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit">
                <ArrowLeft size={18} />
                Kembali ke Daftar
            </Link>

            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Detail Surat</h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${surat.jenis_surat === 'masuk' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                        }`}>
                        Surat {surat.jenis_surat === 'masuk' ? 'Masuk' : 'Keluar'}
                    </span>
                </div>
                {surat.status && (
                    <span className={`px-4 py-2 rounded-xl text-sm font-bold capitalize ${surat.status === 'disetujui' ? 'bg-emerald-500/20 text-emerald-400' :
                            surat.status === 'ditolak' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                        Status: {surat.status}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-4">
                        <div>
                            <h3 className="text-gray-500 text-sm mb-1">Perihal</h3>
                            <p className="text-white text-lg font-medium">{surat.perihal}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-gray-500 text-sm mb-1">Nomor Surat</h3>
                                <p className="text-white font-mono">{surat.nomor_surat}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm mb-1">Tanggal</h3>
                                <div className="flex items-center gap-2 text-white">
                                    <Calendar size={16} className="text-gray-400" />
                                    {surat.tanggal}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                            <div>
                                <h3 className="text-gray-500 text-sm mb-1">Pengirim</h3>
                                <div className="flex items-center gap-2 text-white">
                                    <User size={16} className="text-gray-400" />
                                    {surat.pengirim}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm mb-1">Penerima</h3>
                                <div className="flex items-center gap-2 text-white">
                                    <User size={16} className="text-gray-400" />
                                    {surat.penerima}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* File Attachment */}
                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                        <h3 className="text-gray-500 text-sm mb-4">Lampiran File</h3>
                        {surat.file_url ? (
                            <div className="flex items-center justify-between bg-gray-950 p-4 rounded-xl border border-gray-800">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium truncate max-w-[200px]">
                                            {surat.file_url.split('/').pop()}
                                        </p>
                                        <p className="text-gray-500 text-xs">Document</p>
                                    </div>
                                </div>
                                <a
                                    href={`http://localhost:5000/${surat.file_url}`}
                                    target="_blank"
                                    className="p-2 hover:bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors"
                                    download
                                >
                                    <Download size={20} />
                                </a>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">Tidak ada lampiran file.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar / QR Code */}
                <div className="space-y-6">
                    {isSuratKeluarApproved && (
                        <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-xl shadow-white/5">
                            <h3 className="text-gray-900 font-bold">Validasi Digital</h3>
                            <div className="p-2 bg-white rounded-lg border-2 border-gray-100">
                                <QRCode
                                    value={validationUrl}
                                    size={128}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                            <p className="text-gray-500 text-xs">
                                Scan QR Code ini untuk memverifikasi keaslian surat secara online.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
