'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { ArrowUpRight, ArrowDownRight, Users, FileCheck, Share2, Eye } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function DashboardPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState(null);
    const [suratList, setSuratList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [statsRes, suratRes] = await Promise.all([
                api.get('/dashboard/stats').catch(() => ({ data: null })),
                api.get('/surat').catch(() => ({ data: [] }))
            ]);
            setStats(statsRes.data);
            
            // Menyesuaikan daftar surat yang tampil di dasbor berdasarkan hak akses
            // - User biasa: suratRes.data secara otomatis hanya memuat surat disposisi untuknya
            // - Pimpinan/Staff/Admin: memfilter surat masuk terbaru agar dasbor tetap hidup dan informatif
            const list = suratRes.data || [];
            const filteredList = user?.role === 'User' 
                ? list 
                : list.filter(s => s.jenis_surat === 'masuk').slice(0, 5);
                
            setSuratList(filteredList);
        } catch (error) {
            console.error('Failed to fetch dashboard data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

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
            label: user?.role === 'User' ? 'Surat Disposisi Anda' : 'Surat Masuk Aktif',
            value: suratList.length || 0,
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

    // Menyusun ulang data format dari backend agar kompatibel dengan Recharts
    const chartData = stats?.chart?.labels?.map((label, index) => ({
        name: label,
        Masuk: stats.chart.dataMasuk[index] || 0,
        Keluar: stats.chart.dataKeluar[index] || 0,
    })) || [];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-950 border border-gray-800 p-3 rounded-xl shadow-xl">
                    <p className="text-white font-bold text-sm mb-1">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-xs font-medium" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-gray-400">Selamat datang kembali di sistem SimSurat</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {cards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-sm">
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

            {/* Grafik Statistik Bulanan (Recharts Integration) */}
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-white mb-6">Statistik Persuratan Bulanan</h3>
                <div className="h-80 w-full pt-2">
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={{ stroke: '#374151' }} />
                                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={{ stroke: '#374151' }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} />
                                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '12px', color: '#9ca3af' }} />
                                <Bar dataKey="Masuk" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={30} />
                                <Bar dataKey="Keluar" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 bg-gray-950/30 rounded-xl border border-dashed border-gray-800 text-sm">
                            Memuat data statistik...
                        </div>
                    )}
                </div>
            </div>

            {/* Daftar Surat Masuk / Tugas Disposisi */}
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-sm">
                <h3 className="text-xl font-bold text-white mb-6">
                    {user?.role === 'User' ? 'Surat & Tugas Disposisi Anda' : 'Surat Masuk Terbaru'}
                </h3>
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-8 text-gray-500 text-sm">Memuat data surat...</div>
                    ) : suratList.length > 0 ? (
                        suratList.map((surat) => (
                            <div key={surat.id} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-950/50 border border-gray-800/60 p-4 rounded-xl hover:border-gray-700 transition-all gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 uppercase tracking-wider">
                                            {surat.jenis_surat}
                                        </span>
                                        <span className="text-xs text-gray-500 font-mono">{surat.nomor_surat}</span>
                                    </div>
                                    <p className="font-semibold text-white text-base">{surat.perihal}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Dari: <span className="text-gray-300">{surat.pengirim}</span> • Tanggal: {surat.tanggal ? new Date(surat.tanggal).toLocaleDateString('id-ID') : '-'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 self-end md:self-center">
                                    <button
                                        onClick={() => router.push(`/dashboard/surat/${surat.id}`)}
                                        className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors tooltip"
                                        title="Lihat Detail Surat"
                                    >
                                        <Eye size={18} />
                                    </button>
                                    {surat.jenis_surat === 'masuk' && user?.role !== 'User' && (
                                        <button
                                            onClick={() => router.push(`/dashboard/surat/${surat.id}/disposisi`)}
                                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-md shadow-blue-600/20"
                                        >
                                            <Share2 size={14} />
                                            Disposisi
                                        </button>
                                    )}
                                    {user?.role === 'User' && (
                                        <button
                                            onClick={() => router.push(`/dashboard/surat/${surat.id}/disposisi`)}
                                            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all shadow-md shadow-emerald-600/20"
                                        >
                                            <Share2 size={14} />
                                            Lihat Tugas / Instruksi
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500 bg-gray-950/30 rounded-xl border border-dashed border-gray-800 text-sm">
                            Tidak ada surat yang terdaftar di bagian ini.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}