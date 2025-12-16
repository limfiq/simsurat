'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Mail, FileText, Users, LogOut, BarChart3 } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const links = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Manajemen Surat', href: '/dashboard/surat', icon: Mail },
    ];

    if (user?.role === 'Admin') {
        links.push({ name: 'Manajemen User', href: '/dashboard/users', icon: Users });
    }

    if (user?.role === 'Pimpinan') {
        links.push({ name: 'Persetujuan Surat', href: '/dashboard/approval', icon: FileText });
    }

    // Add Laporan for all authenticated users (or restrict as needed)
    links.push({ name: 'Laporan & Statistik', href: '/dashboard/laporan', icon: BarChart3 });

    return (
        <div className="flex flex-col h-screen w-64 bg-gray-900 text-white border-r border-gray-800">
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                    SimSurat
                </h1>
                <p className="text-xs text-gray-500 mt-1">Sistem Manajemen Surat</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                                isActive
                                    ? 'bg-blue-600/10 text-blue-400 font-medium'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            )}
                        >
                            <Icon size={20} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                        {user?.nama?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{user?.nama}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.role}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
