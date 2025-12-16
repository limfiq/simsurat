'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditUserPage({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        role_id: ''
    });
    const [password, setPassword] = useState('');

    useEffect(() => {
        // We don't have get user by ID endpoint in current userController plan generally, 
        // but typically getAllUsers returns all. 
        // Wait, the backend actually didn't implement getById in userController.js explicitly in Phase 1 summary?
        // Let's check userController.js. If missing, I might need to implement it or reuse getAllUsers if possible.
        // Assuming /users returns list, we can't easily findOne without fetching all.
        // Let's assume userController implemented generic CRUD. 
        // If not, I'll fetch object from list locally or fix backend.
        // Actually, let's just implement a quick fetch logic assuming backend might fail if getById is missing.
        fetchUser();
    }, [id]);

    const fetchUser = async () => {
        try {
            // Warning: userController.js might not have getById. 
            // If it fails, I'll fix userController next.
            // But for now let's try direct edit route if standard.
            // Actually, looking at previous summary, I implemented CRUD. 
            // Let's double check backend file content if needed.
            // Just proceed with assumption it might be there or I fix it.
            const res = await api.get('/users');
            const found = res.data.find(u => u.id == id);
            if (found) {
                setFormData({
                    nama: found.nama,
                    email: found.email,
                    role_id: found.role_id
                });
            }
        } catch (error) {
            alert('Failed to fetch user');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData };
            if (password) payload.password = password; // Only send if updating

            await api.put(`/users/${id}`, payload);
            router.push('/dashboard/users');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to update user');
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <Link href="/dashboard/users" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-fit">
                <ArrowLeft size={18} />
                Back to List
            </Link>

            <div>
                <h1 className="text-3xl font-bold text-white">Edit User</h1>
                <p className="text-gray-400">Update data pengguna</p>
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
                    <label className="block text-sm font-medium text-gray-400 mb-2">Password (Kosongkan jika tetap)</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2.5 bg-gray-950 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Biarkan kosong..."
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
                        Update User
                    </button>
                </div>
            </form>
        </div>
    );
}
