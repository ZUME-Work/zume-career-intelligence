'use client'

import { useState } from 'react'

interface Props {
  assessmentId: string
  initialUnlocked: boolean
  percentile?: number
  skillLabel: string
}

type Step = 'locked' | 'email' | 'profile' | 'unlocked'

const ROLES = [
  'Data Analyst','Business Analyst','Data Engineer','Data Scientist',
  'BI Developer','Marketing Analyst','Financial Analyst','Student / Fresh Grad','อื่นๆ',
]
const TARGET_ROLES = [
  'Data Analyst','Senior Data Analyst','Data Scientist','Data Engineer',
  'Analytics Manager','BI Developer','อื่นๆ',
]
const EXP_OPTIONS = ['นักเรียน / นักศึกษา','0-1 ปี','1-3 ปี','3-5 ปี','5+ ปี']

const isValidEmail = (val: string) => /^[a-zA-Z0-9._%+\-]+@(gmail|yahoo|hotmail|outlook|icloud|live|msn|me|mac|protonmail|proton|ymail|rocketmail|aol|zoho|tutanota|fastmail|yandex|gmx|web)\.com$|^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.(com|co\.th|th|net|org|edu|ac\.th)$/.test(val.trim().toLowerCase())

export default function EmailGate({ assessmentId, initialUnlocked, percentile, skillLabel }: Props) {
  const [step, setStep] = useState<Step>(initialUnlocked ? 'unlocked' : 'locked')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [roleCurrentVal, setRoleCurrentVal] = useState('')
  const [roleCurrentOther, setRoleCurrentOther] = useState('')
  const [targetRoleVal, setTargetRoleVal] = useState('')
  const [targetRoleOther, setTargetRoleOther] = useState('')
  const [yearsExpVal, setYearsExpVal] = useState('')
  const [profileError, setProfileError] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailSubmit = async () => {
    let hasError = false
    if (!email.trim()) { setEmailError('กรุณากรอกอีเมลก่อนนะ'); hasError = true }
    else if (!isValidEmail(email)) { setEmailError('อีเมลไม่ถูกต้อง เช่น name@email.com'); hasError = true }
    else setEmailError('')
    if (!consent) { setConsentError(true); hasError = true }
    else setConsentError(false)
    if (hasError) return

    setLoading(true)
    setError('')
    const res = await fetch('/api/unlock-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), assessmentId }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'เกิดข้อผิดพลาด ลองใหม่อีกครั้ง'); setLoading(false); return }
    setLoading(false)
    setStep('profile')
  }

  const handleProfileSubmit = async () => {
    // บังคับกรอกทุกช่อง
    if (!roleCurrentVal || !yearsExpVal || !targetRoleVal) {
      setProfileError('กรุณากรอกข้อมูลให้ครบทุกช่องก่อนนะ')
      return
    }
    if (roleCurrentVal === 'อื่นๆ' && !roleCurrentOther.trim()) {
      setProfileError('กรุณาระบุตำแหน่งปัจจุบันด้วย')
      return
    }
    if (targetRoleVal === 'อื่นๆ' && !targetRoleOther.trim()) {
      setProfileError('กรุณาระบุตำแหน่งที่อยากเป็นด้วย')
      return
    }
    setProfileError('')
    setLoading(true)
    const finalRole = roleCurrentVal === 'อื่นๆ' ? roleCurrentOther.trim() : roleCurrentVal
    const finalTarget = targetRoleVal === 'อื่นๆ' ? targetRoleOther.trim() : targetRoleVal
    await fetch('/api/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        roleCurrent: finalRole,
        yearsExp: yearsExpVal,
        targetRole: finalTarget,
      }),
    })
    setLoading(false)
    setStep('unlocked')
  }

  const selectStyle = {
    width:'100%', background:'#1a1a1a', border:'1px solid #333',
    borderRadius:8, padding:'10px 14px', color:'#fff', fontSize:'0.875rem', cursor:'pointer',
  } as React.CSSProperties

  const inputStyle = (hasError?: boolean) => ({
    width:'100%', background:'#1a1a1a',
    border:`1px solid ${hasError ? '#EF4444' : '#333'}`,
    borderRadius:8, padding:'12px 14px', color:'#fff',
    fontSize:'0.9rem', outline:'none',
  } as React.CSSProperties)

  const otherInputStyle = {
    width:'100%', background:'#111', border:'1px solid #3B82F6',
    borderRadius:8, padding:'10px 14px', color:'#fff',
    fontSize:'0.875rem', outline:'none', marginTop:8,
  } as React.CSSProperties

  if (step === 'locked') return (
    <div style={{ background:'#111', border:'1px solid #333', borderRadius:16, padding:'1.5rem' }}>
      <div style={{ fontSize:'0.8rem', color:'#666', marginBottom:'0.4rem' }}>🔒 รายงานฉบับเต็ม</div>
      <div style={{ fontSize:'1rem', fontWeight:600, marginBottom:'0.25rem' }}>ดูว่าคุณอยู่ระดับไหน</div>
      <div style={{ fontSize:'0.8rem', color:'#666', marginBottom:'1rem' }}>Percentile · วิเคราะห์จุดแข็ง · แนะนำสิ่งที่ควรพัฒนา</div>
      <button onClick={() => setStep('email')} style={{ background:'#3B82F6', color:'#fff', border:'none', padding:'0.75rem 2rem', borderRadius:8, fontWeight:600, fontSize:'0.9rem', cursor:'pointer', width:'100%' }}>
        ปลดล็อกรายงานฟรี
      </button>
    </div>
  )

  if (step === 'email') return (
    <div style={{ background:'#111', border:'1px solid #333', borderRadius:16, padding:'1.75rem' }}>
      <div style={{ fontSize:'1.1rem', fontWeight:700, marginBottom:'0.4rem' }}>รับรายงานของคุณ</div>
      <div style={{ fontSize:'0.8rem', color:'#666', marginBottom:'1.25rem' }}>ขั้นตอนที่ 1/2 · ฟรี · ใช้เวลา 30 วินาที</div>

      <div style={{ height:3, background:'#222', borderRadius:2, marginBottom:'1.25rem' }}>
        <div style={{ width:'50%', height:'100%', background:'#3B82F6', borderRadius:2 }} />
      </div>

      <div style={{ marginBottom:'1rem' }}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setEmailError('') }}
          onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()}
          style={inputStyle(!!emailError)}
        />
        {emailError && <div style={{ fontSize:'0.78rem', color:'#EF4444', marginTop:6 }}>⚠️ {emailError}</div>}
      </div>

      {/* PDPA Consent */}
      <div
        onClick={() => { setConsent(c => !c); setConsentError(false) }}
        style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:'0.75rem', cursor:'pointer', padding:'12px', borderRadius:10, background: consentError ? '#2a0a0a' : '#0f0f0f', border:`1px solid ${consentError ? '#EF4444' : '#222'}`, transition:'border-color 0.15s' }}
      >
        <div style={{ width:20, height:20, borderRadius:5, border:`2px solid ${consent ? '#3B82F6' : consentError ? '#EF4444' : '#444'}`, background: consent ? '#3B82F6' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, transition:'all 0.15s' }}>
          {consent && <svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        <div style={{ fontSize:'0.8rem', color: consentError ? '#FCA5A5' : '#888', lineHeight:1.6 }}>
          ฉันยินยอมให้ ZUME Datalab จัดเก็บอีเมลและข้อมูลที่กรอก เพื่อใช้ส่งรายงานและข่าวสารที่เป็นประโยชน์เกี่ยวกับสาย Data
        </div>
      </div>
      {consentError && <div style={{ fontSize:'0.78rem', color:'#EF4444', marginBottom:'0.75rem' }}>⚠️ กรุณายอมรับเงื่อนไขก่อนดำเนินการต่อ</div>}
      {error && <div style={{ fontSize:'0.78rem', color:'#EF4444', marginBottom:'0.75rem' }}>{error}</div>}

      <button onClick={handleEmailSubmit} disabled={loading} style={{ width:'100%', background:loading ? '#333' : '#3B82F6', color:'#fff', border:'none', padding:'0.75rem', borderRadius:8, fontWeight:600, fontSize:'0.9rem', cursor:loading ? 'default' : 'pointer', marginBottom:'0.5rem' }}>
        {loading ? 'กำลังบันทึก...' : 'ถัดไป →'}
      </button>
      <button onClick={() => setStep('locked')} style={{ background:'none', border:'none', color:'#555', fontSize:'0.8rem', cursor:'pointer', width:'100%' }}>ยกเลิก</button>
    </div>
  )

  if (step === 'profile') return (
    <div style={{ background:'#111', border:'1px solid #3B82F6', borderRadius:16, padding:'1.75rem' }}>
      <div style={{ fontSize:'1.1rem', fontWeight:700, marginBottom:'0.4rem' }}>คุณอยู่ตรงไหนในสาย Data?</div>
      <div style={{ fontSize:'0.8rem', color:'#666', marginBottom:'1.25rem' }}>ขั้นตอนที่ 2/2 · กรอกให้ครบเพื่อรับรายงาน</div>

      <div style={{ height:3, background:'#222', borderRadius:2, marginBottom:'1.25rem' }}>
        <div style={{ width:'100%', height:'100%', background:'#3B82F6', borderRadius:2 }} />
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1rem' }}>

        <div>
          <label style={{ fontSize:'0.75rem', color:'#888', marginBottom:4, display:'block' }}>
            ตำแหน่งปัจจุบัน <span style={{ color:'#EF4444' }}>*</span>
          </label>
          <select value={roleCurrentVal} onChange={e => { setRoleCurrentVal(e.target.value); setRoleCurrentOther(''); setProfileError('') }} style={selectStyle}>
            <option value="">เลือกตำแหน่ง</option>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          {roleCurrentVal === 'อื่นๆ' && (
            <input type="text" placeholder="โปรดระบุตำแหน่ง" value={roleCurrentOther} onChange={e => { setRoleCurrentOther(e.target.value); setProfileError('') }} style={otherInputStyle} />
          )}
        </div>

        <div>
          <label style={{ fontSize:'0.75rem', color:'#888', marginBottom:4, display:'block' }}>
            ประสบการณ์ <span style={{ color:'#EF4444' }}>*</span>
          </label>
          <select value={yearsExpVal} onChange={e => { setYearsExpVal(e.target.value); setProfileError('') }} style={selectStyle}>
            <option value="">เลือกประสบการณ์</option>
            {EXP_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize:'0.75rem', color:'#888', marginBottom:4, display:'block' }}>
            ตำแหน่งที่อยากเป็น <span style={{ color:'#EF4444' }}>*</span>
          </label>
          <select value={targetRoleVal} onChange={e => { setTargetRoleVal(e.target.value); setTargetRoleOther(''); setProfileError('') }} style={selectStyle}>
            <option value="">เลือกเป้าหมาย</option>
            {TARGET_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          {targetRoleVal === 'อื่นๆ' && (
            <input type="text" placeholder="โปรดระบุตำแหน่งที่อยากเป็น" value={targetRoleOther} onChange={e => { setTargetRoleOther(e.target.value); setProfileError('') }} style={otherInputStyle} />
          )}
        </div>

      </div>

      {profileError && (
        <div style={{ fontSize:'0.8rem', color:'#EF4444', marginBottom:'0.75rem', padding:'10px 12px', background:'#2a0a0a', borderRadius:8, border:'1px solid #EF444433' }}>
          ⚠️ {profileError}
        </div>
      )}

      <button onClick={handleProfileSubmit} disabled={loading} style={{ width:'100%', background:loading ? '#333' : '#3B82F6', color:'#fff', border:'none', padding:'0.75rem', borderRadius:8, fontWeight:600, fontSize:'0.9rem', cursor:loading ? 'default' : 'pointer' }}>
        {loading ? 'กำลังบันทึก...' : 'ดูรายงานเลย →'}
      </button>
    </div>
  )

  return (
    <div style={{ background:'#0f2a1a', border:'1px solid #10B981', borderRadius:16, padding:'1.5rem' }}>
      <div style={{ fontSize:'0.85rem', color:'#10B981', marginBottom:'0.5rem' }}>✅ ปลดล็อกแล้ว</div>
      <div style={{ fontSize:'1rem', fontWeight:600 }}>
        {percentile
          ? `คุณอยู่ใน Top ${(100 - percentile).toFixed(0)}% ของผู้ทำ ${skillLabel}`
          : 'Percentile จะแสดงเมื่อมีผู้ทดสอบมากขึ้น'}
      </div>
      {percentile && (
        <div style={{ marginTop:'1rem', height:6, background:'#0a1a10', borderRadius:3, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${100 - percentile}%`, background:'#10B981', borderRadius:3 }} />
        </div>
      )}
    </div>
  )
}
