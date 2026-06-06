'use client'

import { useEffect, useState } from 'react'

const FB_PAGE = 'https://www.facebook.com/profile.php?id=61581811456373'

const btnStyle: React.CSSProperties = {
  display: 'block', textAlign: 'center',
  background: '#F59E0B', color: '#000',
  padding: '16px', borderRadius: '12px',
  textDecoration: 'none', fontSize: '17px', fontWeight: 800,
  marginBottom: '10px',
}

export default function ResultBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 6000)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <div onClick={() => setShow(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'flex-end', justifyContent:'center', zIndex:200, padding:'0 16px 24px' }}>
      <style>{`@keyframes slideUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }`}</style>
      <div onClick={e => e.stopPropagation()} style={{ width:'100%', maxWidth:440, background:'#fff', borderRadius:20, overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,0.15)', animation:'slideUp 0.35s ease both' }}>

        <div style={{ background:'#FFF8E7', padding:'22px 22px 16px', borderBottom:'1px solid #FDE68A' }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#D97706', letterSpacing:1, textTransform:'uppercase', marginBottom:10 }}>
            ZUME Datalab
          </div>
          <div style={{ fontSize:22, fontWeight:800, color:'#111', lineHeight:1.3 }}>
            รู้จักตัวเองแล้ว<br />พัฒนาต่อเลย
          </div>
        </div>

        <div style={{ padding:'18px 22px 22px', background:'#fff' }}>
          <p style={{ fontSize:16, color:'#444', lineHeight:1.8, marginBottom:18 }}>
            เรียน SQL, Excel, Tableau ครบจบในคอร์สเดียว กับ Analyst จาก Ex-Bitkub & Lazada
          </p>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:20 }}>
            {[
              { icon:'🗄️', text:'SQL + Excel + Tableau' },
              { icon:'💼', text:'เตรียมสัมภาษณ์จริง' },
              { icon:'📈', text:'เพิ่มรายได้' },
              { icon:'🎯', text:'ข้อสอบจากบริษัทจริง' },
            ].map((item, i) => (
              <div key={i} style={{ background:'#F9F9F9', borderRadius:10, padding:'10px 12px', display:'flex', alignItems:'center', gap:8, border:'1px solid #eee' }}>
                <span style={{ fontSize:18 }}>{item.icon}</span>
                <span style={{ fontSize:14, color:'#333', fontWeight:500 }}>{item.text}</span>
              </div>
            ))}
          </div>

          <a href={FB_PAGE} target="_blank" rel="noopener noreferrer" style={btnStyle}>
            ทักแชทเลย →
          </a>

          <button onClick={() => setShow(false)} style={{ width:'100%', background:'none', border:'none', color:'#aaa', fontSize:14, cursor:'pointer', padding:'8px' }}>
            ปิด
          </button>
        </div>
      </div>
    </div>
  )
}
