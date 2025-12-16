'use client';

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center font-bold text-white text-lg">
                        S
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        SimSurat
                    </span>
                </Link>

                <Link
                    href="/login"
                    className="px-5 py-2 bg-gray-100/10 hover:bg-gray-100/20 text-white rounded-full font-medium transition-all"
                >
                    Login Staff
                </Link>
            </div>
        </nav>
    );
}
