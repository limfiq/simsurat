'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

export default function LaporanPage() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Re-use the existing dashboard stats endpoint which returns { summary, chart }
                const res = await api.get('/dashboard/stats');
                setStats(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-white">Loading...</div>;

    // Transform data for Pie Chart
    const pieData = [
        { name: 'Surat Masuk', value: stats?.summary?.suratMasuk || 0 },
        { name: 'Surat Keluar', value: stats?.summary?.suratKeluar || 0 },
    ];
    const COLORS = ['#10b981', '#3b82f6']; // Emerald, Blue

    // Transform data for Bar Chart (Monthly)
    // Assuming stats.chart has { labels, dataMasuk, dataKeluar }
    const barData = stats?.chart?.labels?.map((label, index) => ({
        name: label,
        Masuk: stats.chart.dataMasuk[index],
        Keluar: stats.chart.dataKeluar[index]
    })) || [];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Laporan & Statistik</h1>
                <p className="text-gray-400">Visualisasi data persuratan</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Pie Chart */}
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                    <h3 className="text-white font-bold mb-6">Distribusi Surat</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '8px' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                    <h3 className="text-white font-bold mb-6">Aktivitas Bulanan</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={barData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '8px' }} />
                                <Legend />
                                <Bar dataKey="Masuk" fill="#10b981" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Keluar" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl md:col-span-2">
                    <h3 className="text-white font-bold mb-4">Ringkasan Eksekutif</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
                            <p className="text-gray-500 text-sm">Total Pengguna</p>
                            <p className="text-2xl font-bold text-white mt-1">{stats?.summary?.users || 0}</p>
                        </div>
                        <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
                            <p className="text-gray-500 text-sm">Validasi QR Code</p>
                            <p className="text-2xl font-bold text-white mt-1">Aktif</p>
                        </div>
                        <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
                            <p className="text-gray-500 text-sm">Status Sistem</p>
                            <p className="text-2xl font-bold text-emerald-400 mt-1">Online</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
