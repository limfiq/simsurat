import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | SimSurat',
    default: 'SimSurat - Aplikasi Manajemen Surat Digital',
  },
  description: 'Sistem Informasi Manajemen Surat (SimSurat) untuk pengelolaan administrasi surat masuk, surat keluar, dan pelacakan disposisi instansi secara digital dan efisien.',
  keywords: ['manajemen surat', 'surat digital', 'aplikasi persuratan', 'disposisi surat', 'simsurat', 'arsip digital', 'sistem informasi surat'],
  authors: [{ name: 'SimSurat Team' }],
  creator: 'SimSurat',
  openGraph: {
    title: 'SimSurat - Aplikasi Manajemen Surat Digital',
    description: 'Kelola administrasi persuratan instansi Anda dengan mudah, cepat, dan terintegrasi melalui SimSurat.',
    url: 'https://sid3mi.limfiq.my.id',
    siteName: 'SimSurat',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SimSurat - Aplikasi Manajemen Surat',
    description: 'Aplikasi pengelolaan surat masuk, surat keluar, dan disposisi.',
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
