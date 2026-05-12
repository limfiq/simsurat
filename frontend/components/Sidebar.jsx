'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LayoutDashboard, Mail, FileText, Users, BarChart3 } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuth();

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
            <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                <img src="/logo.png" alt="SimSurat Logo" className="w-10 h-10 object-contain" />
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 leading-none">
                        SimSurat
                    </h1>
                    <p className="text-xs text-gray-500 mt-1.5">Sistem Manajemen Surat</p>
                </div>
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
        </div>
    );
}
