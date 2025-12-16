'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';
import Link from 'next/link';

export default function ApprovalPage() {
    const [pendingSurat, setPendingSurat] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPending();
    }, []);

    const fetchPending = async () => {
        try {
            const res = await api.get('/surat', {
                params: { status: 'diajukan' }
            });
            setPendingSurat(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        if (!confirm(`Are you sure you want to ${action} this surat?`)) return;
        try {
            await api.put(`/surat/approve/${id}`, { action });
            fetchPending();
        } catch (error) {
            alert('Failed to process action');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Persetujuan Surat</h1>
                <p className="text-gray-400">Review surat yang perlu persetujuan</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400">
                        <thead className="bg-gray-950 text-gray-300 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Nomor Surat</th>
                                <th className="px-6 py-4">Perihal</th>
                                <th className="px-6 py-4">Jenis</th>
                                <th className="px-6 py-4">Pengirim</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {loading ? (
                                <tr><td colSpan="5" className="p-6 text-center">Loading...</td></tr>
                            ) : pendingSurat.length === 0 ? (
                                <tr><td colSpan="5" className="p-6 text-center">Tidak ada surat pending</td></tr>
                            ) : (
                                pendingSurat.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">{item.nomor_surat}</td>
                                        <td className="px-6 py-4 max-w-xs truncate">{item.perihal}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-medium ${item.jenis_surat === 'masuk' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                                                }`}>
                                                {item.jenis_surat.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{item.pengirim}</td>
                                        <td className="px-6 py-4 flex justify-center gap-3">
                                            <button
                                                onClick={() => handleAction(item.id, 'approve')}
                                                className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500/20 tooltip"
                                                title="Setujui"
                                            >
                                                <CheckCircle size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleAction(item.id, 'revise')}
                                                className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500/20"
                                                title="Minta Revisi"
                                            >
                                                <AlertCircle size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleAction(item.id, 'reject')}
                                                className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"
                                                title="Tolak"
                                            >
                                                <XCircle size={20} />
                                            </button>
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
