'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Plus, Edit, Trash, User } from 'lucide-react';
import Link from 'next/link';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        try {
            await api.delete(`/users/${id}`);
            fetchUsers();
        } catch (error) {
            alert('Failed to delete user');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Manajemen User</h1>
                    <p className="text-gray-400">Kelola pengguna aplikasi</p>
                </div>
                <Link href="/dashboard/users/create" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium flex items-center gap-2 transition-all">
                    <Plus size={20} />
                    Tambah User
                </Link>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400">
                        <thead className="bg-gray-950 text-gray-300 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Nama</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {loading ? (
                                <tr><td colSpan="4" className="p-6 text-center">Loading...</td></tr>
                            ) : users.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                                            <User size={16} />
                                        </div>
                                        {u.nama}
                                    </td>
                                    <td className="px-6 py-4">{u.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs font-medium">
                                            {u.Role ? u.Role.role_name : 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex justify-center gap-3">
                                        <Link href={`/dashboard/users/${u.id}/edit`} className="text-blue-400 hover:text-blue-300">
                                            <Edit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(u.id)} className="text-red-400 hover:text-red-300">
                                            <Trash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
