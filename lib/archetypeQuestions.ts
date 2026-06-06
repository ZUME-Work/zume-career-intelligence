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
    scenario: 'ยอดขายเดือนนี้ดรอปลง 30% โดยไม่มีสัญญาณเตือนล่วงหน้า คุณจะทำอะไรก่อน?',
    emoji: '📉',
    options: [
      { text: '🔍 ขุด raw data หา root cause ทันที', scores: { detective: 3, scientist: 1 } },
      { text: '📊 ทำ visualization เปรียบเทียบ historical trend', scores: { storyteller: 3, detective: 1 } },
      { text: '⚙️ เช็ค pipeline และ data source ว่ามี bug ไหม', scores: { engineer: 3, architect: 1 } },
      { text: '🎯 แจ้ง stakeholder และเสนอ action plan ทันที', scores: { strategist: 3, architect: 1 } },
    ],
  },
  {
    id: 2,
    scenario: 'ได้รับ dataset ใหม่ขนาดใหญ่ที่ไม่เคยเห็นมาก่อน สิ่งแรกที่คุณทำคือ?',
    emoji: '📦',
    options: [
      { text: '🧹 ดูก่อนเลยว่าข้อมูลมีปัญหาไหม เช่น ข้อมูลหาย หรือผิดปกติ', scores: { scientist: 3, engineer: 1 } },
      { text: '🗺️ วางแผน structure และ schema ให้ชัดเจนก่อน', scores: { architect: 3, engineer: 1 } },
      { text: '💡 หาว่ามีอะไรน่าสนใจซ่อนอยู่ในข้อมูลบ้าง', scores: { detective: 3, storyteller: 1 } },
      { text: '📈 คิดก่อนว่าข้อมูลนี้จะตอบคำถามอะไรให้ธุรกิจได้', scores: { strategist: 3, storyteller: 1 } },
    ],
  },
  {
    id: 3,
    scenario: 'ต้องนำเสนอ analysis ให้ผู้บริหารที่ไม่ได้มีพื้นหลัง data คุณจะเน้นอะไร?',
    emoji: '🎤',
    options: [
      { text: '📖 เล่าเรื่องด้วย data ให้เข้าใจง่าย มี narrative', scores: { storyteller: 3, strategist: 1 } },
      { text: '🎯 focus ที่ business impact และ recommendation', scores: { strategist: 3, storyteller: 1 } },
      { text: '🔬 แสดง methodology ให้ครบ ต้องการความน่าเชื่อถือ', scores: { scientist: 3, architect: 1 } },
      { text: '📊 ทำ dashboard แบบ interactive ให้ explore เองได้', scores: { engineer: 2, storyteller: 2 } },
    ],
  },
  {
    id: 4,
    scenario: 'ทีมกำลังถกเถียงเรื่อง tool ใหม่ คุณมีความเห็นยังไง?',
    emoji: '🛠️',
    options: [
      { text: '⚖️ ต้องดู use case ก่อน ไม่มี tool ไหนดีที่สุดในทุกสถานการณ์', scores: { architect: 3, strategist: 1 } },
      { text: '🚀 ลองเลย เรียนรู้จากการใช้จริงดีกว่า', scores: { engineer: 3, detective: 1 } },
      { text: '📐 ต้องออกแบบ architecture ทั้ง ecosystem ก่อนเลือก tool', scores: { architect: 3, engineer: 1 } },
      { text: '👥 ถามว่า end user จะใช้ยังไง แล้วค่อยเลือก', scores: { storyteller: 2, strategist: 2 } },
    ],
  },
  {
    id: 5,
    scenario: 'คุณเจอ insight ที่น่าสนใจมากในข้อมูล แต่ยังพิสูจน์ไม่ได้ 100% คุณจะทำยังไง?',
    emoji: '💎',
    options: [
      { text: '🧪 ออกแบบการทดสอบเพื่อพิสูจน์ว่าที่คิดไว้ถูกไหม', scores: { scientist: 3, detective: 1 } },
      { text: '📢 บอกทีมถึงสิ่งที่พบ พร้อมบอกด้วยว่ายังไม่แน่ใจตรงไหน', scores: { storyteller: 2, strategist: 2 } },
      { text: '🔍 หาข้อมูลเพิ่มจากแหล่งอื่นเพื่อยืนยัน', scores: { detective: 3, scientist: 1 } },
      { text: '⏳ รอให้มั่นใจก่อนค่อยนำเสนอ', scores: { scientist: 2, architect: 2 } },
    ],
  },
  {
    id: 6,
    scenario: 'ถ้าให้เลือก superpower ด้าน data คุณอยากได้อะไร?',
    emoji: '⚡',
    options: [
      { text: '🔭 มองเห็น pattern ที่คนอื่นมองไม่เห็น', scores: { detective: 3, scientist: 1 } },
      { text: '🏗️ build system ที่ scale ได้ไม่มีวันพัง', scores: { engineer: 3, architect: 1 } },
      { text: '🗣️ ทำให้ทุกคนเข้าใจ data ได้ทันที', scores: { storyteller: 3, strategist: 1 } },
      { text: '♟️ แปลง data เป็น decision ที่ถูกต้องเสมอ', scores: { strategist: 3, architect: 1 } },
    ],
  },
  {
    id: 7,
    scenario: 'deadline พรุ่งนี้ แต่ data ที่ได้มา dirty มาก คุณจะทำยังไง?',
    emoji: '⏰',
    options: [
      { text: '🧹 ทำความสะอาดข้อมูลก่อนทุกอย่าง แม้จะใช้เวลานาน', scores: { engineer: 3, scientist: 1 } },
      { text: '🎯 เลือกใช้ข้อมูลที่ดีที่สุดที่มี แล้วบอกข้อสมมติให้ชัด', scores: { strategist: 3, storyteller: 1 } },
      { text: '🔬 วิเคราะห์เฉพาะส่วนที่ข้อมูลดี แล้วบอกข้อจำกัดให้ชัด', scores: { scientist: 3, detective: 1 } },
      { text: '📞 คุยกับทีมเพื่อขยับ deadline ก่อน', scores: { strategist: 2, architect: 2 } },
    ],
  },
  {
    id: 8,
    scenario: 'คนในทีมบอกว่า dashboard ที่คุณทำ "ดูยากเกินไป" คุณรู้สึกยังไง?',
    emoji: '😅',
    options: [
      { text: '🎨 รีบปรับทันที ความเข้าใจของ user สำคัญที่สุด', scores: { storyteller: 3, strategist: 1 } },
      { text: '🤔 ขอ feedback เพิ่มเติม อยากรู้ว่า confusing ตรงไหน', scores: { detective: 2, scientist: 2 } },
      { text: '📚 สอน user ให้อ่าน dashboard ได้ บาง complexity จำเป็น', scores: { architect: 2, engineer: 2 } },
      { text: '✂️ simplify ทันที ตัดส่วนที่ไม่จำเป็นออก', scores: { storyteller: 2, strategist: 2 } },
    ],
  },
  {
    id: 9,
    scenario: 'ถ้าต้องอธิบายว่าทำไม data project ถึง fail บ่อย คุณจะบอกว่า?',
    emoji: '💔',
    options: [
      { text: '🏗️ ไม่มี proper data architecture ตั้งแต่แรก', scores: { architect: 3, engineer: 1 } },
      { text: '🗣️ ไม่ได้ communicate ผลลัพธ์ให้ business เข้าใจ', scores: { storyteller: 3, strategist: 1 } },
      { text: '❓ ไม่ได้ตั้ง hypothesis ที่ชัดเจนก่อนทำ', scores: { scientist: 3, detective: 1 } },
      { text: '🎯 ไม่ได้ผูก project กับ business goal จริงๆ', scores: { strategist: 3, architect: 1 } },
    ],
  },
  {
    id: 10,
    scenario: 'วันหยุดยาว คุณอยากทำ side project ด้าน data อะไร?',
    emoji: '🏖️',
    options: [
      { text: '🕵️ scrape data แล้วหา pattern ที่ไม่มีใครเคยค้นพบ', scores: { detective: 3, scientist: 1 } },
      { text: '⚙️ สร้างระบบดึงข้อมูลอัตโนมัติที่ทำงานได้เองโดยไม่ต้องแตะ', scores: { engineer: 3, architect: 1 } },
      { text: '📊 ทำกราฟและชาร์ตที่เล่าเรื่องราวจากข้อมูลได้สวยงาม', scores: { storyteller: 3, detective: 1 } },
      { text: '📐 ออกแบบโครงสร้างข้อมูลที่เหมาะกับการใช้งานจริง', scores: { architect: 3, strategist: 1 } },
    ],
  },
  {
    id: 11,
    scenario: 'ผลการ analysis ของคุณขัดแย้งกับความเชื่อของ CEO คุณจะทำยังไง?',
    emoji: '😬',
    options: [
      { text: '📋 นำเสนอข้อมูลตรงๆ พร้อมหลักฐานให้ครบ', scores: { scientist: 3, detective: 1 } },
      { text: '🎭 เลือกวิธีนำเสนอที่ทำให้ข้อมูลเข้าใจง่ายและน่าเชื่อถือ', scores: { storyteller: 3, strategist: 1 } },
      { text: '🤝 หาสิ่งที่เห็นด้วยกันก่อน แล้วค่อยๆ นำข้อมูลเข้ามา', scores: { strategist: 3, storyteller: 1 } },
      { text: '🔒 ตรวจสอบการวิเคราะห์ซ้ำก่อน ต้องมั่นใจก่อนบอกใคร', scores: { scientist: 2, architect: 2 } },
    ],
  },
  {
    id: 12,
    scenario: 'ถ้าต้องเลือกทำงานใน data team แบบไหน คุณจะเลือกอะไร?',
    emoji: '👥',
    options: [
      { text: '🔬 Research team — ขุดหา insight ลึกๆ', scores: { detective: 2, scientist: 2 } },
      { text: '🏗️ Platform team — build infrastructure ให้ทุกคนใช้', scores: { engineer: 3, architect: 1 } },
      { text: '📣 Analytics team — support business decision making', scores: { strategist: 2, storyteller: 2 } },
      { text: '🎨 Data viz team — communicate data ให้ทุกคนเข้าใจ', scores: { storyteller: 3, strategist: 1 } },
    ],
  },
  {
    id: 13,
    scenario: 'คุณ value อะไรมากที่สุดใน data work?',
    emoji: '💫',
    options: [
      { text: '✅ Accuracy — ข้อมูลต้องถูกต้องเสมอ', scores: { scientist: 3, engineer: 1 } },
      { text: '💡 Insight — ต้องค้นพบสิ่งที่ไม่เคยรู้', scores: { detective: 3, scientist: 1 } },
      { text: '🚀 Impact — ต้องเปลี่ยน business ได้จริง', scores: { strategist: 3, storyteller: 1 } },
      { text: '🌉 Clarity — ทุกคนต้องเข้าใจได้', scores: { storyteller: 3, architect: 1 } },
    ],
  },
  {
    id: 14,
    scenario: 'เพื่อนร่วมงานบอกว่า code ของคุณ "ทำงานได้แต่อ่านยาก" คุณรู้สึกยังไง?',
    emoji: '💻',
    options: [
      { text: '😤 ถ้าใช้งานได้ก็โอเค ขอให้เร็วก่อน อ่านง่ายทีหลัง', scores: { engineer: 2, detective: 2 } },
      { text: '📝 แก้ code ทันที เพราะ code ที่ดีควรอ่านเข้าใจได้เองโดยไม่ต้องอธิบาย', scores: { architect: 3, engineer: 1 } },
      { text: '🤷 เพิ่มคำอธิบายใน code ให้ครบก็พอ ไม่จำเป็นต้องเขียนใหม่ทั้งหมด', scores: { strategist: 2, scientist: 2 } },
      { text: '👨‍🏫 นัดนั่งเขียน code ด้วยกันเพื่อช่วยอธิบาย logic', scores: { storyteller: 3, architect: 1 } },
    ],
  },
  {
    id: 15,
    scenario: 'ถ้าให้นิยาม "Data Professional ที่ดี" คุณจะบอกว่าคือ?',
    emoji: '🏆',
    options: [
      { text: '🔭 คนที่มองเห็น opportunity ใน data ที่คนอื่นมองข้าม', scores: { detective: 3, strategist: 1 } },
      { text: '🌉 คนที่ bridge gap ระหว่าง data กับ business', scores: { strategist: 2, storyteller: 2 } },
      { text: '🏗️ คนที่ build system ที่ reliable และ scalable', scores: { engineer: 2, architect: 2 } },
      { text: '🧪 คนที่ rigorous ในการพิสูจน์และ validate ทุกอย่าง', scores: { scientist: 3, architect: 1 } },
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
    description: 'คุณมองเห็น big picture ที่คนอื่นมองไม่เห็น ชอบ design system ที่ elegant และ scalable คิดถึงอนาคตก่อนเสมอ',
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
