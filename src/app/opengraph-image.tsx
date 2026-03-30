import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'ReduceLink - Raccourcisseur de liens gratuit'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: 'white',
            display: 'flex',
            marginBottom: '16px',
          }}
        >
          Reduce
          <span style={{ color: '#bfdbfe' }}>Link</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: '#dbeafe',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Raccourcisseur de liens gratuit
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            marginTop: '40px',
            fontSize: 22,
            color: '#e0e7ff',
          }}
        >
          <span>✓ Gratuit</span>
          <span>✓ Sans inscription</span>
          <span>✓ QR Code</span>
          <span>✓ Statistiques</span>
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: 24,
            color: '#93c5fd',
          }}
        >
          reducelink.arthurp.fr
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
