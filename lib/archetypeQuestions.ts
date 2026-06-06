export type ArchetypeKey = 'detective' | 'architect' | 'storyteller' | 'engineer' | 'scientist' | 'strategist'

export interface ArchetypeQuestion {
  id: number
  scenario: string
  emoji: string
  options: {
    text: string
    scores: Partial<Record<ArchetypeKey, number>>
  }[]
}

export const archetypeQuestions: ArchetypeQuestion[] = [
  {
    id: 1,
    scenario: 'ยอดขายเดือนนี้ลดลง 30% โดยไม่มีสัญญาณเตือนมาก่อน คุณจะทำอะไรก่อน?',
    emoji: '📉',
    options: [
      { text: '🔍 ลงไปดูข้อมูลดิบทันทีว่าเกิดอะไรขึ้น', scores: { detective: 3, scientist: 1 } },
      { text: '📊 วาดกราฟเปรียบเทียบกับข้อมูลในอดีต', scores: { storyteller: 3, detective: 1 } },
      { text: '⚙️ ตรวจสอบระบบดึงข้อมูลก่อนว่ามีปัญหาไหม', scores: { engineer: 3, architect: 1 } },
      { text: '🎯 แจ้งทีมงานและเสนอแผนแก้ไขทันที', scores: { strategist: 3, architect: 1 } },
    ],
  },
  {
    id: 2,
    scenario: 'ได้รับข้อมูลชุดใหม่ขนาดใหญ่ที่ไม่เคยเห็นมาก่อน สิ่งแรกที่คุณทำคืออะไร?',
    emoji: '📦',
    options: [
      { text: '🧹 ดูก่อนว่าข้อมูลมีปัญหาไหม เช่น หายหรือผิดปกติ', scores: { scientist: 3, engineer: 1 } },
      { text: '🗺️ วางแผน structure และ schema ให้ชัดเจนก่อน', scores: { architect: 3, engineer: 1 } },
      { text: '💡 หาว่ามีอะไรน่าสนใจซ่อนอยู่บ้าง', scores: { detective: 3, storyteller: 1 } },
      { text: '📈 คิดก่อนว่าข้อมูลนี้จะช่วยตัดสินใจอะไรได้บ้าง', scores: { strategist: 3, storyteller: 1 } },
    ],
  },
  {
    id: 3,
    scenario: 'ต้องนำเสนอ analysis ให้ผู้บริหารที่ไม่ได้มีพื้นหลัง data คุณจะเน้นอะไร?',
    emoji: '🎤',
    options: [
      { text: '📖 เล่าเรื่องจากข้อมูลให้ทุกคนเข้าใจได้ง่าย', scores: { storyteller: 3, strategist: 1 } },
      { text: '🎯 พูดถึงผลลัพธ์และสิ่งที่ควรทำต่อ', scores: { strategist: 3, storyteller: 1 } },
      { text: '🔬 แสดงวิธีการคิดให้ครบ เพื่อให้น่าเชื่อถือ', scores: { scientist: 3, architect: 1 } },
      { text: '📊 ทำแดชบอร์ดที่คนอื่นกดดูเองได้', scores: { engineer: 2, storyteller: 2 } },
    ],
  },
  {
    id: 4,
    scenario: 'ทีมกำลังถกเถียงเรื่องโปรแกรมใหม่ที่จะใช้งาน คุณคิดยังไง?',
    emoji: '🛠️',
    options: [
      { text: '⚖️ ต้องดูก่อนว่าจะใช้ทำอะไร ไม่มีเครื่องมือไหนดีที่สุดในทุกสถานการณ์', scores: { architect: 3, strategist: 1 } },
      { text: '🚀 ลองใช้เลยดีกว่า เรียนรู้จากของจริง', scores: { engineer: 3, detective: 1 } },
      { text: '📐 ต้องวางแผนภาพรวมทั้งหมดก่อนค่อยเลือกเครื่องมือ', scores: { architect: 3, engineer: 1 } },
      { text: '👥 ถามก่อนว่าคนที่ใช้จริงต้องการอะไร แล้วค่อยเลือก', scores: { storyteller: 2, strategist: 2 } },
    ],
  },
  {
    id: 5,
    scenario: 'คุณเจอสิ่งที่น่าสนใจในข้อมูล แต่ยังพิสูจน์ไม่ได้ 100% คุณจะทำยังไง?',
    emoji: '💎',
    options: [
      { text: '🧪 ทดสอบดูก่อนว่าสิ่งที่คิดไว้ถูกต้องไหม', scores: { scientist: 3, detective: 1 } },
      { text: '📢 บอกทีมถึงสิ่งที่เจอ พร้อมบอกว่าส่วนไหนยังไม่แน่ใจ', scores: { storyteller: 2, strategist: 2 } },
      { text: '🔍 หาข้อมูลเพิ่มจากที่อื่นเพื่อยืนยัน', scores: { detective: 3, scientist: 1 } },
      { text: '⏳ รอให้แน่ใจก่อนค่อยบอกใคร', scores: { scientist: 2, architect: 2 } },
    ],
  },
  {
    id: 6,
    scenario: 'ถ้าให้เลือก superpower ด้าน data คุณอยากได้อะไร?',
    emoji: '⚡',
    options: [
      { text: '🔭 มองเห็น pattern ที่คนอื่นมองไม่เห็น', scores: { detective: 3, scientist: 1 } },
      { text: '🏗️ สร้างระบบที่รองรับการเติบโตได้ไม่มีวันล่ม', scores: { engineer: 3, architect: 1 } },
      { text: '🗣️ ทำให้ทุกคนเข้าใจข้อมูลได้ทันที', scores: { storyteller: 3, strategist: 1 } },
      { text: '♟️ แปลงข้อมูลเป็นการตัดสินใจที่ถูกต้อง', scores: { strategist: 3, architect: 1 } },
    ],
  },
  {
    id: 7,
    scenario: 'ต้องส่งงานพรุ่งนี้ แต่ข้อมูลที่ได้มายังไม่สะอาด คุณจะทำยังไง?',
    emoji: '⏰',
    options: [
      { text: '🧹 ทำความสะอาดข้อมูลก่อนทุกอย่าง แม้จะใช้เวลานาน', scores: { engineer: 3, scientist: 1 } },
      { text: '🎯 เลือกใช้ข้อมูลที่ดีที่สุดที่มี แล้วบอกข้อสมมติให้ชัด', scores: { strategist: 3, storyteller: 1 } },
      { text: '🔬 วิเคราะห์เฉพาะส่วนที่ข้อมูลน่าเชื่อถือ แล้วบอกข้อจำกัดด้วย', scores: { scientist: 3, detective: 1 } },
      { text: '📞 คุยขอเลื่อนกำหนดส่งก่อน', scores: { strategist: 2, architect: 2 } },
    ],
  },
  {
    id: 8,
    scenario: 'คนในทีมบอกว่ารายงานที่คุณทำ "ดูยากเกินไป" คุณจะทำยังไง?',
    emoji: '😅',
    options: [
      { text: '🎨 รีบแก้ทันที เพราะคนใช้ต้องเข้าใจได้', scores: { storyteller: 3, strategist: 1 } },
      { text: '🤔 ขอความคิดเห็นเพิ่ม อยากรู้ว่างงตรงไหน', scores: { detective: 2, scientist: 2 } },
      { text: '📚 สอนให้คนอื่นอ่านได้ บางอย่างซับซ้อนเป็นเรื่องปกติ', scores: { architect: 2, engineer: 2 } },
      { text: '✂️ ทำให้เข้าใจง่ายทันที ตัดส่วนที่ไม่จำเป็นออก', scores: { storyteller: 2, strategist: 2 } },
    ],
  },
  {
    id: 9,
    scenario: 'ถ้าต้องอธิบายว่าทำไมโปรเจคด้านข้อมูลถึงล้มเหลวบ่อย คุณจะบอกว่า?',
    emoji: '💔',
    options: [
      { text: '🏗️ ไม่ได้วางโครงสร้างข้อมูลให้ดีตั้งแต่แรก', scores: { architect: 3, engineer: 1 } },
      { text: '🗣️ ไม่ได้สื่อสารผลลัพธ์ให้ทีมงานเข้าใจ', scores: { storyteller: 3, strategist: 1 } },
      { text: '❓ ไม่ได้ตั้งคำถามให้ชัดก่อนเริ่มวิเคราะห์', scores: { scientist: 3, detective: 1 } },
      { text: '🎯 ไม่ได้เชื่อมโยงงานกับเป้าหมายของธุรกิจจริงๆ', scores: { strategist: 3, architect: 1 } },
    ],
  },
  {
    id: 10,
    scenario: 'วันหยุดยาว คุณอยากทำโปรเจคส่วนตัวด้านข้อมูลอะไร?',
    emoji: '🏖️',
    options: [
      { text: '🕵️ ดึงข้อมูลมาแล้วหาสิ่งที่ไม่มีใครเคยค้นพบมาก่อน', scores: { detective: 3, scientist: 1 } },
      { text: '⚙️ สร้างระบบดึงข้อมูลอัตโนมัติที่ทำงานได้เองโดยไม่ต้องแตะ', scores: { engineer: 3, architect: 1 } },
      { text: '📊 ทำกราฟและชาร์ตที่เล่าเรื่องราวจากข้อมูลได้สวยงาม', scores: { storyteller: 3, detective: 1 } },
      { text: '📐 ออกแบบโครงสร้างข้อมูลที่เหมาะกับการใช้งานจริง', scores: { architect: 3, strategist: 1 } },
    ],
  },
  {
    id: 11,
    scenario: 'ผลการวิเคราะห์ของคุณขัดแย้งกับความเชื่อของหัวหน้า คุณจะทำยังไง?',
    emoji: '😬',
    options: [
      { text: '📋 นำเสนอตรงๆ พร้อมหลักฐานให้ครบ', scores: { scientist: 3, detective: 1 } },
      { text: '🎭 เลือกวิธีพูดที่ทำให้คนฟังเข้าใจและเชื่อได้', scores: { storyteller: 3, strategist: 1 } },
      { text: '🤝 หาจุดที่เห็นตรงกันก่อน แล้วค่อยๆ นำข้อมูลเข้ามาเสริม', scores: { strategist: 3, storyteller: 1 } },
      { text: '🔒 ตรวจสอบซ้ำก่อน ต้องมั่นใจก่อนบอกใคร', scores: { scientist: 2, architect: 2 } },
    ],
  },
  {
    id: 12,
    scenario: 'ถ้าต้องเลือกทำงานในทีมแบบไหน คุณจะเลือกอะไร?',
    emoji: '👥',
    options: [
      { text: '🔬 ทีมวิจัย — ขุดหาความจริงที่ซ่อนอยู่ในข้อมูล', scores: { detective: 2, scientist: 2 } },
      { text: '🏗️ ทีมระบบ — สร้างเครื่องมือให้ทุกคนในองค์กรใช้ได้', scores: { engineer: 3, architect: 1 } },
      { text: '📣 ทีมวิเคราะห์ — ช่วยให้ทีมงานตัดสินใจได้ดีขึ้น', scores: { strategist: 2, storyteller: 2 } },
      { text: '🎨 ทีมสื่อสารข้อมูล — ทำให้ตัวเลขเข้าใจง่ายสำหรับทุกคน', scores: { storyteller: 3, strategist: 1 } },
    ],
  },
  {
    id: 13,
    scenario: 'คุณ value อะไรมากที่สุดใน data work?',
    emoji: '💫',
    options: [
      { text: '✅ ความแม่นยำ — ข้อมูลต้องถูกต้องเสมอ', scores: { scientist: 3, engineer: 1 } },
      { text: '💡 การค้นพบ — ต้องเจอสิ่งที่ไม่มีใครรู้มาก่อน', scores: { detective: 3, scientist: 1 } },
      { text: '🚀 ผลลัพธ์จริง — ต้องเปลี่ยนแปลงธุรกิจได้จริงๆ', scores: { strategist: 3, storyteller: 1 } },
      { text: '🌉 ความชัดเจน — ทุกคนต้องเข้าใจได้', scores: { storyteller: 3, architect: 1 } },
    ],
  },
  {
    id: 14,
    scenario: 'เพื่อนร่วมงานบอกว่างานของคุณ "ใช้ได้แต่เข้าใจยาก" คุณจะทำยังไง?',
    emoji: '💻',
    options: [
      { text: '😤 ถ้าใช้งานได้ก็โอเค ความเร็วสำคัญกว่าความสวยงาม', scores: { engineer: 2, detective: 2 } },
      { text: '📝 แก้ทันที เพราะโปรแกรมที่ดีต้องอ่านเข้าใจได้เองโดยไม่ต้องอธิบาย', scores: { architect: 3, engineer: 1 } },
      { text: '🤷 เพิ่มคำอธิบายให้ครบก็พอ ไม่จำเป็นต้องเขียนใหม่ทั้งหมด', scores: { strategist: 2, scientist: 2 } },
      { text: '👨‍🏫 นัดนั่งทำงานด้วยกันเพื่ออธิบายว่าคิดยังไง', scores: { storyteller: 3, architect: 1 } },
    ],
  },
  {
    id: 15,
    scenario: 'ถ้าต้องบอกว่า "คนทำงานด้านข้อมูลที่ดี" คือแบบไหน คุณจะบอกว่า?',
    emoji: '🏆',
    options: [
      { text: '🔭 คนที่มองเห็นโอกาสในข้อมูลที่คนอื่นมองข้าม', scores: { detective: 3, strategist: 1 } },
      { text: '🌉 คนที่เชื่อมช่องว่างระหว่างข้อมูลกับธุรกิจ', scores: { strategist: 2, storyteller: 2 } },
      { text: '🏗️ คนที่สร้างระบบที่เชื่อถือได้และรองรับการเติบโต', scores: { engineer: 2, architect: 2 } },
      { text: '🧪 คนที่พิสูจน์และตรวจสอบทุกอย่างอย่างละเอียดรอบคอบ', scores: { scientist: 3, architect: 1 } },
    ],
  },
]

export const archetypeInfo: Record<ArchetypeKey, {
  name: string
  emoji: string
  tagline: string
  description: string
  strengths: string[]
  blindspot: string
  careers: string[]
  color: string
  bgGradient: string
}> = {
  detective: {
    name: 'The Detective',
    emoji: '🦊',
    tagline: 'Insight Hunter',
    description: 'คุณมีสัญชาตญาณในการรู้ว่ามีอะไรซ่อนอยู่ เจอ anomaly คนแรก ขุดหา root cause ลึกกว่าคนอื่น และไม่หยุดจนกว่าจะเจอคำตอบ',
    strengths: ['Root cause analysis', 'Pattern recognition', 'Exploratory analysis', 'Asking the right questions'],
    blindspot: 'อาจ over-analyze และลืม communicate ผลให้คนอื่นเข้าใจ',
    careers: ['Data Analyst', 'Analytics Engineer', 'Business Intelligence'],
    color: '#F59E0B',
    bgGradient: 'linear-gradient(135deg, #1a1200 0%, #2d2000 50%, #1a1200 100%)',
  },
  architect: {
    name: 'The Architect',
    emoji: '🦅',
    tagline: 'System Thinker',
    description: 'คุณมองเห็นภาพรวมที่คนอื่นมองข้าม ชอบวางระบบ ที่ elegant และ scalable คิดถึงอนาคตก่อนเสมอ',
    strengths: ['System design', 'Data modeling', 'Long-term thinking', 'Structure & organization'],
    blindspot: 'อาจ over-engineer สิ่งที่ต้องการแค่ solution เรียบง่าย',
    careers: ['Data Architect', 'Senior Data Engineer', 'Analytics Lead'],
    color: '#3B82F6',
    bgGradient: 'linear-gradient(135deg, #00101a 0%, #001828 50%, #00101a 100%)',
  },
  storyteller: {
    name: 'The Storyteller',
    emoji: '🦋',
    tagline: 'Data Communicator',
    description: 'คุณมีพรสวรรค์ในการแปลง data ที่ซับซ้อนให้เป็นเรื่องราวที่ทุกคนเข้าใจและรู้สึกได้ ทำให้ data มีชีวิต',
    strengths: ['Data visualization', 'Stakeholder communication', 'Dashboard design', 'Simplifying complexity'],
    blindspot: 'อาจ sacrifice depth เพื่อ simplicity มากเกินไป',
    careers: ['BI Developer', 'Analytics Translator', 'Data Product Manager'],
    color: '#EC4899',
    bgGradient: 'linear-gradient(135deg, #1a0015 0%, #280020 50%, #1a0015 100%)',
  },
  engineer: {
    name: 'The Engineer',
    emoji: '🦫',
    tagline: 'Pipeline Builder',
    description: 'คุณ enjoy ใน process มากกว่า outcome ชอบ build สิ่งที่ reliable ทำงานได้ตลอด 24/7 และ elegant ในเชิง technical',
    strengths: ['ETL/ELT pipelines', 'Automation', 'Data quality', 'Technical reliability'],
    blindspot: 'อาจ focus ที่ technical perfection มากกว่า business value',
    careers: ['Data Engineer', 'Analytics Engineer', 'Platform Engineer'],
    color: '#10B981',
    bgGradient: 'linear-gradient(135deg, #001a0f 0%, #002518 50%, #001a0f 100%)',
  },
  scientist: {
    name: 'The Scientist',
    emoji: '🦉',
    tagline: 'Hypothesis Tester',
    description: 'คุณไม่เชื่ออะไรง่ายๆ ต้องการหลักฐานและ statistical rigor ก่อนสรุป เป็นคนที่ทำให้ทีม data น่าเชื่อถือ',
    strengths: ['Statistical analysis', 'A/B testing', 'Experimental design', 'Critical thinking'],
    blindspot: 'อาจ analysis paralysis รอหลักฐานมากเกินไปก่อน act',
    careers: ['Data Scientist', 'Research Analyst', 'Quantitative Analyst'],
    color: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, #0f001a 0%, #180028 50%, #0f001a 100%)',
  },
  strategist: {
    name: 'The Strategist',
    emoji: '🐆',
    tagline: 'Impact Driver',
    description: 'คุณ connect dots ระหว่าง data กับ business ได้เก่งมาก มองทุกอย่างผ่านเลนส์ว่ามัน impact อะไร เสมอ',
    strengths: ['Business acumen', 'Decision making', 'Prioritization', 'Cross-functional collaboration'],
    blindspot: 'อาจ move too fast และ skip detail ที่สำคัญ',
    careers: ['Analytics Manager', 'Chief Data Officer', 'Strategy & Insights'],
    color: '#EF4444',
    bgGradient: 'linear-gradient(135deg, #1a0000 0%, #280000 50%, #1a0000 100%)',
  },
}
