import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#FAF8F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <line x1="16" y1="15" x2="16" y2="4" stroke="#5E8350" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="16" y1="15" x2="26" y2="23" stroke="#5E8350" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="16" y1="15" x2="6" y2="23" stroke="#5E8350" strokeWidth="2.2" strokeLinecap="round"/>
          <circle cx="16" cy="4" r="3.5" fill="#B99055"/>
          <circle cx="26" cy="23" r="3.5" fill="#B99055"/>
          <circle cx="6" cy="23" r="3.5" fill="#B99055"/>
          <circle cx="16" cy="15" r="5.5" fill="#5E8350"/>
        </svg>
      </div>
    ),
    { ...size }
  )
}
