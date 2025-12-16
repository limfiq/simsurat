'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function CreateUserPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        password: '',
        role_id: '2' // Default: Petugas
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/users', formData);
            router.push('/dashboard/users');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create user');
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <Link href="/dashboard/users" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit">
                <ArrowLeft size={18} />
                Back to List
            </Link>

            <div>
                <h1 className="text-3xl font-bold text-white">Tambah User</h1>
                <p className="text-gray-400">Buat akun pengguna baru</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 p-8 rounded-2xl space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Nama Lengkap</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                    <select
                        className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.role_id}
                        onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                    >
                        <option value="1">Admin</option>
                        <option value="2">Petugas</option>
                        <option value="3">Pimpinan</option>
                        <option value="4">User Biasa</option>
                    </select>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium text-white transition-all flex justify-center items-center gap-2"
                    >
                        <Save size={18} />
                        Simpan User
                    </button>
                </div>
            </form>
        </div>
    );
}
