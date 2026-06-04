'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { archetypeInfo, type ArchetypeKey } from '@/lib/archetypeQuestions'
import Link from 'next/link'

function ResultContent() {
  const searchParams = useSearchParams()
  const type = (searchParams.get('type') ?? 'detective') as ArchetypeKey
  const info = archetypeInfo[type] ?? archetypeInfo.detective

  const allTypes = Object.entries(archetypeInfo) as [ArchetypeKey, typeof archetypeInfo[ArchetypeKey]][]

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade1 { animation: fadeUp 0.5s ease both; }
        .fade2 { animation: fadeUp 0.5s ease 0.1s both; }
        .fade3 { animation: fadeUp 0.5s ease 0.2s both; }
        .fade4 { animation: fadeUp 0.5s ease 0.3s both; }
        .fade5 { animation: fadeUp 0.5s ease 0.4s both; }
        .animal-float { animation: float 3s ease-in-out infinite; }
        .archetype-chip:hover { opacity: 0.8; }
        @media (max-width: 640px) {
          .result-inner { padding: 1.5rem 1rem !important; }
          .animal-emoji { font-size: 80px !important; }
          .arch-title { font-size: 2rem !important; }
          .strength-grid { grid-template-columns: 1fr 1fr !important; }
          .career-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <main style={{ minHeight: '100vh', background: '#080C14', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>

        {/* Hero */}
        <div style={{ background: info.bgGradient, padding: '3rem 1rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, ${info.color}15 0%, transparent 70%)` }} />

          <div className="fade1" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: info.color, textTransform: 'uppercase', marginBottom: '1rem', position: 'relative' }}>
            Data Archetype
          </div>

          <div className="animal-float" style={{ fontSize: 100, marginBottom: '1rem', lineHeight: 1, position: 'relative' }}>
            {info.emoji}
          </div>

          <div className="fade2 arch-title" style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', position: 'relative' }}>
            {info.name}
          </div>

          <div className="fade3" style={{ fontSize: 16, color: info.color, fontWeight: 600, marginBottom: '1.25rem', position: 'relative' }}>
            {info.tagline}
          </div>

          <div className="fade4" style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.8, maxWidth: 480, margin: '0 auto', position: 'relative' }}>
            {info.description}
          </div>
        </div>

        {/* Content */}
        <div className="result-inner" style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1.5rem' }}>

          {/* Strengths */}
          <div className="fade3" style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#475569', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Superpowers ของคุณ
            </div>
            <div className="strength-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {info.strengths.map((s, i) => (
                <div key={i} style={{ background: '#0F172A', border: `0.5px solid ${info.color}44`, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: info.color, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, color: '#CBD5E1' }}>{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Blind spot */}
          <div className="fade4" style={{ marginBottom: '1.5rem', background: '#0F172A', border: '0.5px solid #F59E0B44', borderRadius: 12, padding: '1rem 1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#F59E0B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Blind Spot
            </div>
            <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{info.blindspot}</div>
          </div>

          {/* Career paths */}
          <div className="fade4" style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#475569', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Career ที่เหมาะกับคุณ
            </div>
            <div className="career-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {info.careers.map((c, i) => (
                <div key={i} style={{ background: '#0F172A', border: `0.5px solid ${info.color}33`, borderRadius: 8, padding: '10px 12px', textAlign: 'center', fontSize: 12, color: info.color, fontWeight: 600 }}>
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* Other archetypes */}
          <div className="fade5" style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#475569', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Archetypes อื่นๆ
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {allTypes.filter(([k]) => k !== type).map(([k, v]) => (
                <div key={k} className="archetype-chip" style={{ background: '#0F172A', border: `0.5px solid ${v.color}44`, borderRadius: 20, padding: '6px 14px', fontSize: 13, color: v.color, cursor: 'default' }}>
                  {v.emoji} {v.name.replace('The ', '')}
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="fade5" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link href="/assessment/sql" style={{ display: 'block', textAlign: 'center', background: `linear-gradient(135deg, ${info.color}, ${info.color}99)`, color: '#000', padding: '14px', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 15 }}>
              ทดสอบ Skill จริงๆ ดูไหม? →
            </Link>
            <Link href="/archetype" style={{ display: 'block', textAlign: 'center', background: '#0F172A', border: '0.5px solid #1E293B', color: '#64748B', padding: '12px', borderRadius: 12, textDecoration: 'none', fontWeight: 500, fontSize: 14 }}>
              ทำแบบทดสอบใหม่อีกครั้ง
            </Link>
          </div>

        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '1.5rem', fontSize: 11, color: '#1E293B' }}>
          © 2026 ZUME Datalab · All rights reserved
        </div>
      </main>
    </>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#080C14', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>Loading...</div>}>
      <ResultContent />
    </Suspense>
  )
}