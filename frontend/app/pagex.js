'use client';

import { useState } from 'react';
import api from '@/services/api';
import { ShieldCheck, Clock, Archive } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white text-gray-800 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {/* You can add your logo here */}
          <span className="text-xl font-bold">SimSurat</span>
        </div>
        <nav>
          <a href="/login" className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
            Login Pegawai
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-white text-gray-600 py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} SimSurat. All rights reserved.</p>
      </div>
    </footer>
  );
}

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200/80">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

export default function HomePage() {
  const [nomorSurat, setNomorSurat] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearchResult(null);

    try {
      const res = await api.get(`/surat/public/search?nomor=${nomorSurat}`);
      setSearchResult(res.data);
    } catch (err) {
      setError('Surat tidak ditemukan atau tidak valid.');
      setSearchResult(null);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-16 sm:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Manajemen Surat <span className="text-blue-600">Terintegrasi</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12">
            Platform digital untuk pengelolaan surat masuk dan keluar yang efisien, aman, dan transparan.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-24">
            <input
              type="text"
              value={nomorSurat}
              onChange={(e) => setNomorSurat(e.target.value)}
              placeholder="Masukkan Nomor Surat untuk Verifikasi..."
              className="flex-grow px-5 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-105 disabled:bg-blue-400 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Mencari...' : 'Cek Validitas'}
            </button>
          </form>

          {error && <p className="text-red-500 mt-6 text-lg">{error}</p>}

          {searchResult && (
            <div className="mt-10 p-8 rounded-xl bg-white border border-gray-200 text-left max-w-2xl mx-auto shadow-lg animate-fade-in">
              <h3 className="text-2xl font-bold text-green-600 mb-6">Surat Ditemukan dan Valid</h3>
              <div className="space-y-4 text-lg">
                <p><strong className="font-semibold text-gray-700">Nomor Surat:</strong> {searchResult.nomor_surat}</p>
                <p><strong className="font-semibold text-gray-700">Tanggal:</strong> {new Date(searchResult.tanggal).toLocaleDateString()}</p>
                <p><strong className="font-semibold text-gray-700">Perihal:</strong> {searchResult.perihal}</p>
                <p><strong className="font-semibold text-gray-700">Pengirim:</strong> {searchResult.pengirim}</p>
                <p><strong className="font-semibold text-gray-700">Status:</strong> <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm">{searchResult.status}</span></p>
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24">
          <FeatureCard icon={<ShieldCheck size={24} />} title="Keamanan Terjamin">
            Sistem autentikasi berlapis dan enkripsi data untuk menjamin kerahasiaan dokumen.
          </FeatureCard>
          <FeatureCard icon={<Clock size={24} />} title="Real-time Tracking">
            Pantau status surat masuk dan keluar secara real-time dari dashboard terpusat.
          </FeatureCard>
          <FeatureCard icon={<Archive size={24} />} title="Arsip Digital">
            Penyimpanan dokumen digital yang terorganisir memudahkan pencarian kembali.
          </FeatureCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}