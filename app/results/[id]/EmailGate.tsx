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
  'Data Analyst',
  'Business Analyst', 
  'Data Engineer',
  'Data Scientist',
  'BI Developer',
  'Marketing Analyst',
  'Financial Analyst',
  'Student / Fresh Grad',
  'Other',
]

const TARGET_ROLES = [
  'Data Analyst',
  'Senior Data Analyst',
  'Data Scientist',
  'Data Engineer',
  'Analytics Manager',
  'BI Developer',
  'Other',
]

const EXP_OPTIONS = [
  'นักเรียน / นักศึกษา',
  '0-1 ปี',
  '1-3 ปี',
  '3-5 ปี',
  '5+ ปี',
]

const SALARY_OPTIONS = [
  'ต่ำกว่า 20,000',
  '20,000 - 35,000',
  '35,000 - 55,000',
  '55,000 - 80,000',
  '80,000 - 120,000',
  '120,000+',
]

export default function EmailGate({ assessmentId, initialUnlocked, percentile, skillLabel }: Props) {
  const [step, setStep] = useState<Step>(initialUnlocked ? 'unlocked' : 'locked')
  const [email, setEmail] = useState('')
  const [roleCurrentVal, setRoleCurrentVal] = useState('')
  const [yearsExpVal, setYearsExpVal] = useState('')
  const [targetRoleVal, setTargetRoleVal] = useState('')
  const [salaryBandVal, setSalaryBandVal] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailSubmit = async () => {
    if (!email) return
    setLoading(true)
    setError('')

    const res = await fetch('/api/unlock-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, assessmentId }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Something went wrong')
      setLoading(false)
      return
    }

    setLoading(false)
    setStep('profile')
  }

  const handleProfileSubmit = async () => {
    setLoading(true)
    await fetch('/api/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        roleCurrent: roleCurrentVal,
        yearsExp: yearsExpVal,
        targetRole: targetRoleVal,
        salaryBand: salaryBandVal,
      }),
    })
    setLoading(false)
    setStep('unlocked')
  }

  const handleSkipProfile = () => setStep('unlocked')

  const inputStyle = {
    width: '100%',
    background: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: 8,
    padding: '10px 14px',
    color: '#fff',
    fontSize: '0.875rem',
    appearance: 'none' as const,
    cursor: 'pointer',
  }

  const btnPrimary = (disabled?: boolean) => ({
    width: '100%',
    background: disabled ? '#333' : '#3B82F6',
    color: '#fff',
    border: 'none',
    padding: '0.75rem',
    borderRadius: 8,
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: disabled ? 'default' : 'pointer',
    marginBottom: '0.5rem',
  } as React.CSSProperties)

  // Locked state
  if (step === 'locked') return (
    <div style={{ background: '#111', border: '1px solid #333', borderRadius: 16, padding: '1.5rem' }}>
      <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.4rem' }}>🔒 Full Report</div>
      <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>See how you rank vs peers</div>
      <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>Percentile · Skill breakdown · Personalized roadmap</div>
      <button onClick={() => setStep('email')} style={{ background: '#3B82F6', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', width: '100%' }}>
        Unlock Free Report
      </button>
    </div>
  )

  // Email step
  if (step === 'email') return (
    <div style={{ background: '#111', border: '1px solid #333', borderRadius: 16, padding: '1.75rem' }}>
      <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Get Your Full Report</div>
      <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1.25rem' }}>Step 1 of 2 · Free · ใช้เวลา 30 วินาที</div>

      {/* Progress */}
      <div style={{ height: 3, background: '#222', borderRadius: 2, marginBottom: '1.25rem' }}>
        <div style={{ width: '50%', height: '100%', background: '#3B82F6', borderRadius: 2 }} />
      </div>

      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()}
        style={{ ...inputStyle, marginBottom: '0.75rem' }}
      />
      {error && <div style={{ fontSize: '0.75rem', color: '#EF4444', marginBottom: '0.5rem' }}>{error}</div>}
      <button onClick={handleEmailSubmit} disabled={loading || !email} style={btnPrimary(!email || loading)}>
        {loading ? 'Saving...' : 'Next →'}
      </button>
      <button onClick={() => setStep('locked')} style={{ background: 'none', border: 'none', color: '#555', fontSize: '0.8rem', cursor: 'pointer', width: '100%' }}>
        Cancel
      </button>
    </div>
  )

  // Profile step
  if (step === 'profile') return (
    <div style={{ background: '#111', border: '1px solid #3B82F6', borderRadius: 16, padding: '1.75rem' }}>
      <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Where are you in Data?</div>
      <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1.25rem' }}>Step 2 of 2 · ช่วย personalize report ของคุณ</div>

      {/* Progress */}
      <div style={{ height: 3, background: '#222', borderRadius: 2, marginBottom: '1.25rem' }}>
        <div style={{ width: '100%', height: '100%', background: '#3B82F6', borderRadius: 2 }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4, display: 'block' }}>Current Role</label>
          <select value={roleCurrentVal} onChange={e => setRoleCurrentVal(e.target.value)} style={inputStyle}>
            <option value="">เลือก role ปัจจุบัน</option>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4, display: 'block' }}>Years of Experience</label>
          <select value={yearsExpVal} onChange={e => setYearsExpVal(e.target.value)} style={inputStyle}>
            <option value="">เลือกประสบการณ์</option>
            {EXP_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4, display: 'block' }}>Target Role</label>
          <select value={targetRoleVal} onChange={e => setTargetRoleVal(e.target.value)} style={inputStyle}>
            <option value="">เลือก target role</option>
            {TARGET_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4, display: 'block' }}>Monthly Salary (THB)</label>
          <select value={salaryBandVal} onChange={e => setSalaryBandVal(e.target.value)} style={inputStyle}>
            <option value="">เลือก salary band</option>
            {SALARY_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

      </div>

      <button onClick={handleProfileSubmit} disabled={loading} style={btnPrimary(loading)}>
        {loading ? 'Saving...' : 'See My Report →'}
      </button>
      <button onClick={handleSkipProfile} style={{ background: 'none', border: 'none', color: '#555', fontSize: '0.8rem', cursor: 'pointer', width: '100%' }}>
        Skip for now
      </button>
    </div>
  )

  // Unlocked state
  return (
    <div style={{ background: '#0f2a1a', border: '1px solid #10B981', borderRadius: 16, padding: '1.5rem' }}>
      <div style={{ fontSize: '0.85rem', color: '#10B981', marginBottom: '0.5rem' }}>✅ Report Unlocked</div>
      <div style={{ fontSize: '1rem', fontWeight: 600 }}>
        {percentile
          ? `You're in the top ${(100 - percentile).toFixed(0)}% of ${skillLabel} test takers`
          : 'Percentile will be available once more users complete this assessment'}
      </div>
      {percentile && (
        <div style={{ marginTop: '1rem', height: 6, background: '#0a1a10', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${100 - percentile}%`, background: '#10B981', borderRadius: 3 }} />
        </div>
      )}
    </div>
  )
}