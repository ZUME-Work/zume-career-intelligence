'use client'

import { useEffect, useState } from 'react'

const FB_PAGE = 'https://www.facebook.com/profile.php?id=61581811456373'

interface Props {
  isGoodScore: boolean
  pct: number
}

export default function ResultClient({ isGoodScore, pct }: Props) {
  const [showBanner, setShowBanner] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Listen for privacy link click from EmailGate
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
      {/* Popup Banner */}
      {showBanner && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'flex-end', justifyContent:'center', zIndex:200, padding:'0 0 20px' }}
          onClick={() => setShowBanner(false)}>
          <div onClick={e => e.stopPropagation()} style={{ width:'100%', maxWidth:420, margin:'0 16px', borderRadius:20, overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.5)', animation:'slideUp 0.4s ease both' }}>
            <style>{`@keyframes slideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }`}</style>

            {/* Header ตามผลลัพธ์ */}
            <div style={{ background: isGoodScore ? 'linear-gradient(135deg, #1a3a1a, #0f2a0f)' : 'linear-gradient(135deg, #3a1a00, #2a1000)', padding:'20px 20px 16px', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:1.5, textTransform:'uppercase', color: isGoodScore ? '#10B981' : '#F59E0B', marginBottom:8 }}>
                {isGoodScore ? '✅ สกิลคุณพร้อมแล้ว' : '🔥 พร้อมพัฒนาให้ถึงเป้า'}
              </div>
              <div style={{ fontSize:20, fontWeight:800, color:'#fff', lineHeight:1.3 }}>
                {isGoodScore
                  ? 'นัด Consult ได้เลย\nคุยฟรีไม่มีค่าใช้จ่าย'
                  : 'สนใจพัฒนา\nติดต่อเลย'}
              </div>
            </div>

            {/* Body */}
            <div style={{ background:'#111', padding:'16px 20px 20px' }}>
              <div style={{ fontSize:14, color:'#94A3B8', lineHeight:1.7, marginBottom:16 }}>
                {isGoodScore
                  ? `คะแนน ${pct}% ของคุณพร้อมสำหรับตลาดงานแล้ว ปรึกษา Analyst จาก Ex-Bitkub & Lazada ฟรี เพื่อวางแผน Career ต่อไป`
                  : `เรียนรู้ SQL, Excel, Tableau ครบจบในคอร์สเดียว กับ Analyst ประสบการณ์ตรง Ex-Bitkub & Lazada`}
              </div>

              {/* Course highlights */}
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

              {/* CTA Buttons */}
              <a href={FB_PAGE} target="_blank" rel="noopener noreferrer"
                style={{ display:'block', textAlign:'center', background: isGoodScore ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #F59E0B, #EF4444)', color:'#000', padding:'14px', borderRadius:12, textDecoration:'none', fontSize:15, fontWeight:800, marginBottom:10, boxShadow:`0 4px 20px ${isGoodScore ? 'rgba(16,185,129,0.4)' : 'rgba(245,158,11,0.4)'}` }}>
                {isGoodScore ? 'นัด Consult ฟรีเลย →' : 'ทักแชทเลย →'}
              </a>

              <button onClick={() => setShowBanner(false)}
                style={{ width:'100%', background:'none', border:'none', color:'#475569', fontSize:13, cursor:'pointer', padding:'8px' }}>
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:300, padding:'1rem' }}
          onClick={() => setShowPrivacy(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background:'#111', borderRadius:20, maxWidth:480, width:'100%', maxHeight:'80vh', overflow:'hidden', display:'flex', flexDirection:'column', border:'1px solid #333' }}>

            {/* Header */}
            <div style={{ padding:'20px 24px 16px', borderBottom:'1px solid #222', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ fontSize:17, fontWeight:700, color:'#fff' }}>นโยบายความเป็นส่วนตัว</div>
              <button onClick={() => setShowPrivacy(false)} style={{ background:'none', border:'none', color:'#666', fontSize:20, cursor:'pointer', lineHeight:1 }}>✕</button>
            </div>

            {/* Content */}
            <div style={{ padding:'20px 24px', overflowY:'auto', fontSize:14, color:'#94A3B8', lineHeight:1.9 }}>
              <div style={{ fontSize:12, color:'#475569', marginBottom:16 }}>มีผลบังคับใช้: 1 มิถุนายน 2569</div>

              <div style={{ fontWeight:700, color:'#CBD5E1', marginBottom:8 }}>1. ข้อมูลที่เก็บรวบรวม</div>
              <p style={{ marginBottom:16 }}>ZUME Datalab เก็บรวบรวมข้อมูลส่วนบุคคล ได้แก่ อีเมล ตำแหน่งงาน ระดับประสบการณ์ และตำแหน่งที่ต้องการ เพื่อวัตถุประสงค์ในการส่งรายงานผลการทดสอบและข้อมูลที่เป็นประโยชน์</p>

              <div style={{ fontWeight:700, color:'#CBD5E1', marginBottom:8 }}>2. วัตถุประสงค์การใช้ข้อมูล</div>
              <p style={{ marginBottom:16 }}>ข้อมูลของคุณถูกใช้เพื่อ (1) ส่งรายงานผลการทดสอบทักษะ (2) แนะนำเนื้อหาที่เหมาะสมกับระดับและเป้าหมายของคุณ (3) ปรับปรุงคุณภาพแบบทดสอบ</p>

              <div style={{ fontWeight:700, color:'#CBD5E1', marginBottom:8 }}>3. การเปิดเผยข้อมูล</div>
              <p style={{ marginBottom:16 }}>ZUME Datalab ไม่ขาย ไม่แลกเปลี่ยน และไม่เปิดเผยข้อมูลส่วนบุคคลของคุณแก่บุคคลภายนอก ยกเว้นกรณีที่กฎหมายกำหนด</p>

              <div style={{ fontWeight:700, color:'#CBD5E1', marginBottom:8 }}>4. ระยะเวลาเก็บข้อมูล</div>
              <p style={{ marginBottom:16 }}>ข้อมูลจะถูกเก็บไว้ตราบเท่าที่จำเป็น หรือจนกว่าคุณจะขอลบข้อมูล</p>

              <div style={{ fontWeight:700, color:'#CBD5E1', marginBottom:8 }}>5. สิทธิ์ของคุณ</div>
              <p style={{ marginBottom:16 }}>คุณมีสิทธิ์เข้าถึง แก้ไข หรือขอลบข้อมูลส่วนบุคคลได้ทุกเมื่อ โดยติดต่อผ่านเพจ Facebook: ZUME Datalab</p>

              <div style={{ fontWeight:700, color:'#CBD5E1', marginBottom:8 }}>6. ติดต่อเรา</div>
              <p>หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว สามารถติดต่อได้ที่ Facebook: ZUME Datalab</p>
            </div>

            <div style={{ padding:'16px 24px', borderTop:'1px solid #222' }}>
              <button onClick={() => setShowPrivacy(false)} style={{ width:'100%', background:'#3B82F6', color:'#fff', border:'none', padding:'12px', borderRadius:10, fontSize:14, fontWeight:600, cursor:'pointer' }}>
                รับทราบ
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
