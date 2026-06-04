'use client'

import { useState } from 'react'

interface Props {
  assessmentId: string
  initialUnlocked: boolean
  percentile?: number
  skillLabel: string
}

export default function EmailGate({ assessmentId, initialUnlocked, percentile, skillLabel }: Props) {
  const [unlocked, setUnlocked] = useState(initialUnlocked)
  const [email, setEmail] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleUnlock = async () => {
    if (!email) return
    setLoading(true)
    const res = await fetch('/api/unlock-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, assessmentId }),
    })
    if (res.ok) {
      setUnlocked(true)
      setShowModal(false)
    }
    setLoading(false)
  }

  if (unlocked) {
    return (
      <div style={{ background:'#0f2a1a', border:'1px solid #10B981', borderRadius:16, padding:'1.5rem' }}>
        <div style={{ fontSize:'0.85rem', color:'#10B981', marginBottom:'0.5rem' }}>✅ Report Unlocked</div>
        <div style={{ fontSize:'1rem', fontWeight:600 }}>
          {percentile
            ? `You're in the top ${(100 - percentile).toFixed(0)}% of ${skillLabel} test takers`
            : 'Percentile available once more users complete this assessment'}
        </div>
      </div>
    )
  }

  return (
    <>
      <div style={{ background:'#111', border:'1px solid #333', borderRadius:16, padding:'1.5rem' }}>
        <div style={{ fontSize:'0.85rem', color:'#666', marginBottom:'0.5rem' }}>🔒 Full Report</div>
        <div style={{ fontSize:'1rem', fontWeight:600, marginBottom:'0.25rem' }}>See how you rank vs peers</div>
        <div style={{ fontSize:'0.8rem', color:'#666', marginBottom:'1rem' }}>Percentile • Skill breakdown • Study roadmap</div>
        <button
          onClick={() => setShowModal(true)}
          style={{ background:'#3B82F6', color:'#fff', border:'none', padding:'0.75rem 2rem', borderRadius:8, fontWeight:600, fontSize:'0.9rem', cursor:'pointer', width:'100%' }}
        >
          Unlock Free Report
        </button>
      </div>

      {showModal && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50 }}>
          <div style={{ background:'#111', border:'1px solid #333', borderRadius:16, padding:'2rem', maxWidth:400, width:'90%', textAlign:'center' }}>
            <div style={{ fontSize:'1.25rem', fontWeight:700, marginBottom:'0.5rem' }}>Get Your Full Report</div>
            <div style={{ fontSize:'0.85rem', color:'#666', marginBottom:'1.5rem' }}>Free — takes 5 seconds</div>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleUnlock()}
              style={{ width:'100%', background:'#1a1a1a', border:'1px solid #333', borderRadius:8, padding:'0.75rem 1rem', color:'#fff', fontSize:'0.9rem', marginBottom:'1rem', boxSizing:'border-box' }}
            />
            <button
              onClick={handleUnlock}
              disabled={loading || !email}
              style={{ width:'100%', background: email ? '#3B82F6' : '#333', color:'#fff', border:'none', padding:'0.75rem', borderRadius:8, fontWeight:600, fontSize:'0.9rem', cursor: email ? 'pointer' : 'default', marginBottom:'0.75rem' }}
            >
              {loading ? 'Saving...' : 'Send Me My Report →'}
            </button>
            <button
              onClick={() => setShowModal(false)}
              style={{ background:'none', border:'none', color:'#666', fontSize:'0.8rem', cursor:'pointer' }}
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </>
  )
}