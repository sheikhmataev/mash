export const COLORS = {
  bgDeep: '#0B0D10',
  bgBase: '#111317',
  bgSurface: '#171A21',
  accentViolet: '#7B61FF',
  accentBlue: '#3AA8FF',
  accentCyan: '#00FFD1',
  accentMagenta: '#FF3CAC',
  textPrimary: '#F0F0F5',
  textSecondary: '#8A8F9E',
} as const;

export const NAV_LINKS = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Projects', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Partners', href: '#partners' },
  { label: 'About', href: '#about' },
] as const;

export const CAPABILITIES = [
  {
    title: 'AI Systems',
    subtitle: 'Intelligence at Scale',
    description: 'Custom machine learning pipelines, LLM integrations, and autonomous decision systems designed for enterprise-grade reliability.',
    icon: '⬡',
  },
  {
    title: 'Automation',
    subtitle: 'Zero Friction Operations',
    description: 'End-to-end workflow automation that eliminates repetitive tasks and connects every system in your stack.',
    icon: '◈',
  },
  {
    title: 'Generative AI',
    subtitle: 'Creation Amplified',
    description: 'Content generation, synthetic data, and creative AI tools that augment human capability exponentially.',
    icon: '◇',
  },
  {
    title: 'Digital Platforms',
    subtitle: 'Systems That Scale',
    description: 'Full-stack platforms built for performance — from real-time dashboards to multi-tenant SaaS architectures.',
    icon: '△',
  },
  {
    title: 'Web Experiences',
    subtitle: 'Interfaces That Impress',
    description: 'Premium web applications with cinematic motion, 3D interaction, and pixel-perfect attention to detail.',
    icon: '○',
  },
] as const;

export const PHILOSOPHY = [
  {
    title: 'Think in Systems',
    description: 'Every project is an interconnected system. We architect holistic solutions, not isolated features.',
  },
  {
    title: 'Build with AI First',
    description: 'AI isn\'t an add-on. It\'s the foundation. Every system we build is designed with intelligence at its core.',
  },
  {
    title: 'Automate Everything Possible',
    description: 'If a human repeats it, we automate it. Maximum leverage through intelligent process design.',
  },
] as const;

export const PROJECTS = [
  {
    title: 'Kronomods',
    tags: ['Luxury', 'E-Commerce', 'Brand'],
    description: 'Fine timekeeping storefront with premium visual language and polished product storytelling.',
    url: 'https://sheikhmataev.github.io/kronomods/',
    previewImage: '/assets/kronomods.webp',
  },
  {
    title: 'Lillehammer Moske',
    tags: ['Community', 'Information', 'Services'],
    description: 'Community-first website for prayer times, Ramadan updates, programs, and donations.',
    url: 'https://lillehammermoske.no/',
    previewImage: '/assets/lillehammer-moske.webp',
  },
  {
    title: 'Lillehammer Taxi 06565',
    tags: ['Transport', 'Booking', 'Local Business'],
    description: 'Modern taxi website focused on quick booking flow, service overview, and trust messaging.',
    url: 'https://sheikhmataev.github.io/06565/',
    previewImage: '/assets/lillehammer-taxi.webp',
  },
] as const;

export const PROCESS_STEPS = [
  { title: 'Discovery', description: 'Deep-dive into your systems, data, and goals.' },
  { title: 'AI Modeling', description: 'Architect the intelligence layer and data flows.' },
  { title: 'Build & Automate', description: 'Engineer, integrate, and automate the full pipeline.' },
  { title: 'Deploy & Evolve', description: 'Launch, monitor, and continuously optimize.' },
] as const;

export const PROCESS_PIPELINE_LABELS = [
  'UNIFY PRODUCT, DESIGN & ENGINEERING',
  'ENTERPRISE-GRADE RELIABILITY',
  'COLLABORATIVE DELIVERY PARTNERSHIP',
  'RAPID EXECUTION & SCALABLE SUPPORT',
  'AI ACCELERATION WITHOUT OVERHEAD',
  'Engineered to scale with your ambition',
] as const;

export const LAB_ENTRIES = [
  {
    title: 'AI Workflow Engine',
    status: 'Active Research',
    description: 'Self-optimizing task orchestration system that learns from execution patterns.',
  },
  {
    title: 'Autonomous Content System',
    status: 'Prototype',
    description: 'Fully autonomous content creation pipeline from ideation to multi-platform publishing.',
  },
  {
    title: 'Predictive Analytics Core',
    status: 'In Development',
    description: 'Real-time pattern recognition engine for enterprise data streams.',
  },
  {
    title: 'Neural Interface Prototype',
    status: 'Concept',
    description: 'Natural language interface for complex system administration and monitoring.',
  },
] as const;

export const TECH_CATEGORIES = [
  {
    name: 'AI / ML',
    items: ['TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'Hugging Face'],
  },
  {
    name: 'Cloud',
    items: ['AWS', 'GCP', 'Vercel', 'Docker', 'Kubernetes'],
  },
  {
    name: 'Frontend',
    items: ['Next.js', 'React', 'Three.js', 'Framer Motion', 'Tailwind'],
  },
  {
    name: 'Backend',
    items: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'GraphQL'],
  },
  {
    name: 'Automation',
    items: ['n8n', 'Zapier', 'Custom Pipelines', 'CI/CD', 'Terraform'],
  },
] as const;

export const METRICS = [
  { value: 50, suffix: '+', label: 'Systems Automated' },
  { value: 100, suffix: 'K+', label: 'Hours Saved' },
  { value: 30, suffix: '+', label: 'Platforms Built' },
] as const;
