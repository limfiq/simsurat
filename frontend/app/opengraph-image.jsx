import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SimSurat - Aplikasi Manajemen Surat';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#030712', // Tailwind gray-950
          backgroundImage: 'radial-gradient(circle at 50% 0%, #1e3a8a 0%, #030712 70%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            padding: '60px 80px',
            borderRadius: '40px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontFamily: 'sans-serif',
              fontWeight: 900,
              color: 'white',
              letterSpacing: '-0.05em',
              marginBottom: 20,
              display: 'flex',
            }}
          >
            SimSurat
          </div>
          <div
            style={{
              fontSize: 42,
              fontFamily: 'sans-serif',
              color: '#9ca3af', // gray-400
              textAlign: 'center',
              fontWeight: 500,
              maxWidth: 800,
            }}
          >
            Sistem Manajemen Persuratan Digital
          </div>
        </div>
        
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            color: '#6b7280', // gray-500
            fontSize: 28,
            fontFamily: 'sans-serif',
            fontWeight: 600,
          }}
        >
          STIKOM PGRI Banyuwangi
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
