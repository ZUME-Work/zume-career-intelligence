'use client'

import { useEffect, useState } from 'react'

const FB_PAGE = 'https://www.facebook.com/profile.php?id=61581811456373'

interface Props {
  isGoodScore: boolean
  pct: number
}

const goodBtnStyle: React.CSSProperties = {
  display: 'block', textAlign: 'center',
  background: '#16A34A', color: '#fff',
  padding: '16px', borderRadius: '12px',
  textDecoration: 'none', fontSize: '17px', fontWeight: 800,
  marginBottom: '10px',
}

const badBtnStyle: React.CSSProperties = {
  display: 'block', textAlign: 'center',
  background: '#F59E0B', color: '#000',
  padding: '16px', borderRadius: '12px',
  textDecoration: 'none', fontSize: '17px', fontWeight: 800,
  marginBottom: '10px',
}

export default function ResultClient({ isGoodScore, pct }: Props) {
  const [showBanner, setShowBanner] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(true), 6000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.textContent?.includes('นโยบายความเป็นส่วนตัว')) {
        e.preventDefault()
        e.stopPropagation()
        setShowPrivacy(true)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <>
      {showBanner && (
        <div onClick={() => setShowBanner(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'flex-end', justifyContent:'center', zIndex:200, padding:'0 16px 24px' }}>
          <style>{`@keyframes slideUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }`}</style>
          <div onClick={e => e.stopPropagation()} style={{ width:'100%', maxWidth:440, background:'#fff', borderRadius:20, overflow:'hidden', boxShadow:'0 8px 40px rgba(0,0,0,0.15)', animation:'slideUp 0.35s ease both' }}>

            <div style={{ background: isGoodScore ? '#F0FDF4' : '#FFF8E7', padding:'22px 22px 16px', borderBottom: isGoodScore ? '1px solid #BBF7D0' : '1px solid #FDE68A' }}>
              <div style={{ fontSize:13, fontWeight:700, color: isGoodScore ? '#16A34A' : '#D97706', letterSpacing:1, textTransform:'uppercase', marginBottom:10 }}>
                ZUME Datalab
              </div>
              <div style={{ fontSize:22, fontWeight:800, color:'#111', lineHeight:1.3 }}>
                {isGoodScore ? <>สกิลคุณพร้อมแล้ว<br />นัด Consult ได้เลย</> : <>สนใจพัฒนา?<br />ปรึกษาฟรีเลย</>}
              </div>
            </div>

            <div style={{ padding:'18px 22px 22px', background:'#fff' }}>
              <p style={{ fontSize:16, color:'#444', lineHeight:1.8, marginBottom:18 }}>
                {isGoodScore
                  ? `คะแนน ${pct}% ของคุณพร้อมแล้ว ปรึกษา Analyst จาก Ex-Bitkub & Lazada ฟรี เพื่อวางแผน Career ต่อไป`
                  : 'เรียน SQL, Excel, Tableau ครบจบในคอร์สเดียว กับ Analyst จาก Ex-Bitkub & Lazada'}
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

              <a href={FB_PAGE} target="_blank" rel="noopener noreferrer" style={isGoodScore ? goodBtnStyle : badBtnStyle}>
                {isGoodScore ? 'นัด Consult ฟรีเลย →' : 'ทักแชทเลย →'}
              </a>

              <button onClick={() => setShowBanner(false)} style={{ width:'100%', background:'none', border:'none', color:'#aaa', fontSize:14, cursor:'pointer', padding:'8px' }}>
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div onClick={() => setShowPrivacy(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:300, padding:'1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:20, maxWidth:480, width:'100%', maxHeight:'80vh', overflow:'hidden', display:'flex', flexDirection:'column' }}>
            <div style={{ padding:'20px 24px 16px', borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontSize:18, fontWeight:700, color:'#111' }}>นโยบายความเป็นส่วนตัว</div>
              <button onClick={() => setShowPrivacy(false)} style={{ background:'none', border:'none', color:'#aaa', fontSize:22, cursor:'pointer', lineHeight:1 }}>✕</button>
            </div>
            <div style={{ padding:'20px 24px', overflowY:'auto', fontSize:15, color:'#555', lineHeight:1.9 }}>
              <div style={{ fontSize:13, color:'#aaa', marginBottom:16 }}>มีผลบังคับใช้: 1 มิถุนายน 2569</div>
              <p style={{ fontWeight:700, color:'#333', marginBottom:8 }}>1. ข้อมูลที่เก็บรวบรวม</p>
              <p style={{ marginBottom:16 }}>ZUME Datalab เก็บรวบรวมอีเมล ตำแหน่งงาน และระดับประสบการณ์ เพื่อส่งรายงานและข้อมูลที่เป็นประโยชน์</p>
              <p style={{ fontWeight:700, color:'#333', marginBottom:8 }}>2. วัตถุประสงค์</p>
              <p style={{ marginBottom:16 }}>ใช้เพื่อส่งรายงานผลการทดสอบ และแนะนำเนื้อหาที่เหมาะกับคุณเท่านั้น</p>
              <p style={{ fontWeight:700, color:'#333', marginBottom:8 }}>3. การเปิดเผยข้อมูล</p>
              <p style={{ marginBottom:16 }}>ไม่ขาย ไม่แลกเปลี่ยน และไม่เปิดเผยข้อมูลของคุณแก่บุคคลภายนอก</p>
              <p style={{ fontWeight:700, color:'#333', marginBottom:8 }}>4. สิทธิ์ของคุณ</p>
              <p style={{ marginBottom:16 }}>คุณสามารถขอแก้ไขหรือลบข้อมูลได้ทุกเมื่อ ผ่านเพจ Facebook: ZUME Datalab</p>
            </div>
            <div style={{ padding:'16px 24px', borderTop:'1px solid #eee' }}>
              <button onClick={() => setShowPrivacy(false)} style={{ width:'100%', background:'#4F46E5', color:'#fff', border:'none', padding:'13px', borderRadius:10, fontSize:15, fontWeight:600, cursor:'pointer' }}>
                รับทราบ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
