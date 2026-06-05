'use client'

import { useEffect, useState } from 'react'

const FB_PAGE = 'https://www.facebook.com/profile.php?id=61581811456373'

const btnStyle: React.CSSProperties = {
  display: 'block',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
  color: '#000',
  padding: '14px',
  borderRadius: '12px',
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: 800,
  marginBottom: '10px',
  boxShadow: '0 4px 20px rgba(245,158,11,0.4)',
}

export default function ResultBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!showBanner) return null

  return (
    <div
      style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'flex-end', justifyContent:'center', zIndex:200, padding:'0 0 20px' }}
      onClick={() => setShowBanner(false)}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width:'100%', maxWidth:420, margin:'0 16px', borderRadius:20, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.5)', animation:'slideUp 0.4s ease both' }}
      >
        <style>{`@keyframes slideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }`}</style>

        <div style={{ background:'linear-gradient(135deg, #3a1a00, #2a1000)', padding:'20px 20px 16px', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:'uppercase', color:'#F59E0B', marginBottom:8 }}>
            🔥 รู้จักตัวเองแล้ว ต่อยอดเลย
          </div>
          <div style={{ fontSize:20, fontWeight:800, color:'#fff', lineHeight:1.3 }}>
            สนใจพัฒนา<br />ติดต่อเลย
          </div>
        </div>

        <div style={{ background:'#111', padding:'16px 20px 20px' }}>
          <div style={{ fontSize:14, color:'#94A3B8', lineHeight:1.7, marginBottom:16 }}>
            รู้แล้วว่าตัวเองเป็นสายไหน ขั้นต่อไปคือพัฒนาทักษะให้ตรงจุด กับ Analyst ประสบการณ์ตรง Ex-Bitkub & Lazada
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:16 }}>
            {[
              { icon:'🗄️', text:'SQL + Excel + Tableau' },
              { icon:'💼', text:'เตรียมสัมภาษณ์จริง' },
              { icon:'📈', text:'Step up รายได้' },
              { icon:'🎯', text:'ข้อสอบจากบริษัทจริง' },
            ].map((item, i) => (
              <div key={i} style={{ background:'#1a1a1a', borderRadius:8, padding:'8px 10px', display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:16 }}>{item.icon}</span>
                <span style={{ fontSize:12, color:'#CBD5E1', fontWeight:500 }}>{item.text}</span>
              </div>
            ))}
          </div>

          <a href={FB_PAGE} target="_blank" rel="noopener noreferrer" style={btnStyle}>
            ทักแชทเลย →
          </a>

          <button
            onClick={() => setShowBanner(false)}
            style={{ width:'100%', background:'none', border:'none', color:'#475569', fontSize:13, cursor:'pointer', padding:'8px' }}
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  )
}
