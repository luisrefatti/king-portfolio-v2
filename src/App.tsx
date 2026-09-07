import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import {
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Mail,
  Palette,
  ArrowUpRight,
  ArrowUp,
  Menu,
  X,
  Send,
} from 'lucide-react';
import { FORM_ENDPOINT } from './config';

type Lang = 'pt' | 'en';

// --- Dados pessoais ---

const personalData = {
  name: 'Luis Fernando Refatti Boff',
  location: 'Brazil',
  contacts: {
    phone: '+55 (54) 99991-8886',
    email: 'luisfernandoboff@gmail.com',
    linkedin: 'https://www.linkedin.com/in/luisfrefattiboff/',
    github: 'https://github.com/luisrefatti',
    instagram: 'https://www.instagram.com/lf.boff/',
    whatsapp: 'https://wa.me/5554999918886',
    behance: 'https://www.behance.net/lfboff',
  },
  profileImage: 'profileimage.jpg',
};

const skills: Record<Lang, { name: string; level: number }[]> = {
  pt: [
    { name: 'Análise de Dados Avançada', level: 92 },
    { name: 'Excel avançado', level: 90 },
    { name: 'Salesforce CRM', level: 90 },
    { name: 'Matemática Financeira', level: 85 },
    { name: 'Photoshop', level: 95 },
    { name: 'App Script', level: 85 },
    { name: 'Python, C++, C# e .NET MAUI', level: 80 },
    { name: 'IA aplicada', level: 80 },
    { name: 'UI Path', level: 70 },
  ],
  en: [
    { name: 'Advanced Data Analysis', level: 92 },
    { name: 'Advanced Excel', level: 90 },
    { name: 'Salesforce CRM', level: 90 },
    { name: 'Financial Mathematics', level: 85 },
    { name: 'Photoshop', level: 95 },
    { name: 'App Script', level: 85 },
    { name: 'Python, C++, C# & .NET MAUI', level: 80 },
    { name: 'Applied AI', level: 80 },
    { name: 'UI Path', level: 70 },
  ],
};

const languagesData: Record<Lang, { name: string; level: string }[]> = {
  pt: [
    { name: 'Português', level: 'Nativo' },
    { name: 'Inglês', level: 'Fluente' },
    { name: 'Espanhol', level: 'Básico' },
  ],
  en: [
    { name: 'Portuguese', level: 'Native' },
    { name: 'English', level: 'Fluent' },
    { name: 'Spanish', level: 'Basic' },
  ],
};

const experienceData: Record<
  Lang,
  { company: string; period: string; role: string; desc: string; type: 'work' | 'education'; tag?: string }[]
> = {
  pt: [
    {
      company: 'Cresol Centro Sul — Sede',
      period: 'Nov 2025 — Presente',
      role: 'Analista de Informações Gerenciais',
      desc: 'Integro o time de Desenvolvimento de Negócios, com foco em Inteligência de Negócios. Atuo como ponto central das ações comerciais e de CRM — incluindo envios massificados — além de estratégias e análises de dados com insights estratégicos.',
      type: 'work',
      tag: 'Inteligência de Negócios',
    },
    {
      company: 'Cresol Centro Norte / Centro Sul — Sede',
      period: 'Jul 2024 — Out 2025',
      role: 'Auxiliar de Informações Gerenciais',
      desc: 'Ponto focal da área de Inteligência de Mercado, apoiando a tomada de decisão e a identificação de oportunidades.',
      type: 'work',
      tag: 'Inteligência de Negócios',
    },
    {
      company: 'Cresol Centro Norte — Agência Marcelino Ramos',
      period: 'Mai 2023 — Jul 2024',
      role: 'Caixa — Agência',
      desc: 'Atuação direta no atendimento aos cooperados e nas operações transacionais.',
      type: 'work',
    },
    {
      company: 'Cresol Centro Norte — Sede',
      period: 'Ago 2022 — Mai 2023',
      role: 'Jovem Aprendiz',
      desc: 'Início da trajetória dentro da cooperativa.',
      type: 'work',
    },
    {
      company: 'KING Design',
      period: 'Jan 2021 — Presente',
      role: 'Designer Gráfico Freelancer',
      desc: 'Desenvolvimento de identidade visual para empresas locais e eventos, sob demanda.',
      type: 'work',
    },
    {
      company: 'URI Erechim',
      period: 'Cursando — 7º semestre',
      role: 'Bacharelado em Ciência da Computação',
      desc: 'Base sólida em computação, algoritmos e desenvolvimento.',
      type: 'education',
    },
    {
      company: 'Oxford International Study Centre (OISC) — Oxford, UK',
      period: 'Inverno de 2024',
      role: 'Oxford Winter Programme',
      desc: 'Curso de inglês avançado (nível C1) e imersão internacional no Reino Unido.',
      type: 'education',
      tag: 'Internacional',
    },
    {
      company: 'Instituto de Educação Estadual Marcelino Ramos',
      period: 'Concluído',
      role: 'Ensino Médio',
      desc: 'Ensino médio completo.',
      type: 'education',
    },
  ],
  en: [
    {
      company: 'Cresol Centro Sul — HQ',
      period: 'Nov 2025 — Present',
      role: 'Management Information Analyst',
      desc: 'Part of the Business Development team, focused on Business Intelligence. I act as the central point for commercial and CRM actions — including mass communications — as well as data-driven strategy and analysis with strategic insights.',
      type: 'work',
      tag: 'Business Intelligence',
    },
    {
      company: 'Cresol Centro Norte / Centro Sul — HQ',
      period: 'Jul 2024 — Oct 2025',
      role: 'Management Information Assistant',
      desc: 'Focal point for Market Intelligence, supporting decision-making and identifying opportunities.',
      type: 'work',
      tag: 'Business Intelligence',
    },
    {
      company: 'Cresol Centro Norte — Marcelino Ramos Branch',
      period: 'May 2023 — Jul 2024',
      role: 'Bank Teller',
      desc: 'Direct customer service and banking operations.',
      type: 'work',
    },
    {
      company: 'Cresol Centro Norte — HQ',
      period: 'Aug 2022 — May 2023',
      role: 'Apprentice',
      desc: 'Beginning of the journey within the cooperative.',
      type: 'work',
    },
    {
      company: 'KING Design',
      period: 'Jan 2021 — Present',
      role: 'Freelance Graphic Designer',
      desc: 'Visual identity development for local businesses and events, on demand.',
      type: 'work',
    },
    {
      company: 'URI Erechim',
      period: 'In progress — 7th semester',
      role: 'B.Sc. in Computer Science',
      desc: 'Solid foundation in computing, algorithms and development.',
      type: 'education',
    },
    {
      company: 'Oxford International Study Centre (OISC) — Oxford, UK',
      period: 'Winter 2024',
      role: 'Oxford Winter Programme',
      desc: 'Advanced English course (C1 level) and an international immersion in the UK.',
      type: 'education',
      tag: 'International',
    },
    {
      company: 'Instituto de Educação Estadual Marcelino Ramos',
      period: 'Completed',
      role: 'High School',
      desc: 'Full high school education.',
      type: 'education',
    },
  ],
};

const certificatesData: Record<Lang, string[]> = {
  pt: [
    'CCAA — Inglês Fluente',
    'OISC — Oxford Winter Programme 2024',
    'MIT — Introduction to Aerospace Engineering: Astronautics and Human Spaceflight (16.00x)',
  ],
  en: [
    'CCAA — Fluent English',
    'OISC — Oxford Winter Programme 2024',
    'MIT — Introduction to Aerospace Engineering: Astronautics and Human Spaceflight (16.00x)',
  ],
};

const honorsData: Record<Lang, string[]> = {
  pt: [
    'OBMEP 2021 — Menção Honrosa',
    'OBMEP 2022 — Menção Honrosa',
    '5º lugar — GP do Conhecimento',
    '940 pontos na redação do ENEM 2021',
    '920 pontos na redação do ENEM 2022',
  ],
  en: [
    'OBMEP 2021 — Honorable Mention',
    'OBMEP 2022 — Honorable Mention',
    '5th place — Knowledge GP',
    '940 points on the ENEM essay, 2021',
    '920 points on the ENEM essay, 2022',
  ],
};

const volunteeringData: Record<Lang, { role: string; org: string }[]> = {
  pt: [
    { role: 'Primeiro Tesoureiro', org: 'GEM' },
    { role: 'Diretor de Marketing', org: 'AAAEAURIE' },
  ],
  en: [
    { role: 'First Treasurer', org: 'GEM' },
    { role: 'Marketing Director', org: 'AAAEAURIE' },
  ],
};

const interestsData: Record<Lang, string[]> = {
  pt: ['Tecnologia', 'Inteligência Artificial', 'Programação', 'Bolsa de valores', 'Criptomoedas', 'Mercado financeiro', 'Cooperativismo', 'Pintura e desenho'],
  en: ['Technology', 'Artificial Intelligence', 'Code', 'Stock market', 'Cryptocurrencies', 'Financial market', 'Cooperativism', 'Painting and drawing'],
};

const curiositiesData: Record<Lang, string[]> = {
  pt: [
    'Apaixonado por café',
    'Leitor voraz',
    'Movido a carros antigos',
    'Investidor de renda fixa, variável e criptoativos desde 2020',
    'Quando criança, sonhava em ser astronauta',
  ],
  en: [
    'Coffee lover',
    'Avid reader',
    'Driven by vintage cars',
    'Investor in fixed income, equities and crypto since 2020',
    'As a child, dreamed of being an astronaut',
  ],
};

const writingTopics: Record<Lang, string[]> = {
  pt: ['Inteligência de dados', 'Desenvolvimento e automação', 'Mercado financeiro'],
  en: ['Data intelligence', 'Development and automation', 'Financial markets'],
};

// --- Traduções ---

const translations: Record<
  Lang,
  {
    nav: { about: string; path: string; writing: string; contact: string };
    role: string;
    summary: string;
    vision: string;
    meta: {
      focus: string;
      focusValue: string;
      passion: string;
      passionValue: string;
      international: string;
      internationalValue: string;
      status: string;
      statusValue: string;
    };
    cta: { contact: string; path: string };
    sections: {
      professional: string;
      education: string;
      skills: string;
      languages: string;
      certificates: string;
      volunteering: string;
      honors: string;
      interests: string;
      curiosities: string;
    };
    writing: { title: string; body: string; label: string };
    notify: { placeholder: string; button: string; sending: string; success: string; error: string };
    contact: { title: string; text: string; freelance: string };
    form: {
      name: string;
      email: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      or: string;
    };
  }
> = {
  pt: {
    nav: { about: 'Sobre', path: 'Trajetória', writing: 'Escrita', contact: 'Contato' },
    role: 'Inteligência de Negócios & Planejamento Estratégico',
    summary:
      'Especialista em Inteligência de Negócios, transformo grandes volumes de dados em insights estratégicos. Atuo na interseção entre tecnologia e negócios, usando IA e automação para ganhar eficiência comercial — com uma visão ampliada pela vivência internacional em Oxford, no Reino Unido.',
    vision:
      'Meu objetivo é atuar na interseção entre tecnologia e estratégia de negócios, usando o potencial da inteligência artificial e da automação.',
    meta: {
      focus: 'Foco',
      focusValue: 'Inteligência de Negócios',
      passion: 'Interesse',
      passionValue: 'Dados & Estratégia Comercial',
      international: 'Internacional',
      internationalValue: 'Oxford, Reino Unido (2024)',
      status: 'Situação',
      statusValue: 'Ocupado',
    },
    cta: { contact: 'Entrar em contato', path: 'Ver trajetória' },
    sections: {
      professional: 'Experiência profissional',
      education: 'Formação',
      skills: 'Habilidades',
      languages: 'Línguas',
      certificates: 'Certificados',
      volunteering: 'Voluntariado',
      honors: 'Prêmios e reconhecimentos',
      interests: 'Interesses',
      curiosities: 'Curiosidades',
    },
    writing: {
      title: 'Escrita',
      body: 'Ainda não publiquei nada por aqui — os primeiros textos estão em andamento. A ideia é escrever sobre os temas que ocupam meu dia a dia:',
      label: 'Avise-me quando publicar',
    },
    notify: {
      placeholder: 'seu@email.com',
      button: 'Avisar-me',
      sending: 'Enviando...',
      success: 'Feito! Aviso você assim que publicar algo novo.',
      error: 'Não consegui registrar agora. Tente de novo em instantes.',
    },
    contact: {
      title: 'Contato',
      text: 'Vamos conversar sobre dados, estratégia ou tecnologia? Escolha o canal que preferir.',
      freelance: 'ou envie uma mensagem abaixo.',
    },
    form: {
      name: 'Nome',
      email: 'Email',
      message: 'Mensagem',
      messagePlaceholder: 'Fala aí...',
      submit: 'Enviar mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada! Retorno em breve.',
      error: 'Não consegui enviar agora. Tente por email ou WhatsApp.',
      or: 'ou, se preferir, use um dos canais abaixo',
    },
  },
  en: {
    nav: { about: 'About', path: 'Path', writing: 'Writing', contact: 'Contact' },
    role: 'Business Intelligence & Strategic Planning',
    summary:
      'A Business Intelligence specialist, I turn large volumes of data into strategic insight. I work at the intersection of technology and business, using AI and automation to gain comercial efficiency — with a broader perspective shaped by international experience in Oxford, UK.',
    vision:
      'My goal is to work at the intersection of technology and business strategy, using the potential of artificial intelligence and automation.',
    meta: {
      focus: 'Focus',
      focusValue: 'Business Intelligence',
      passion: 'Interest',
      passionValue: 'Data & Comercial Strategy',
      international: 'International',
      internationalValue: 'Oxford, United Kingdom (2024)',
      status: 'Status',
      statusValue: 'Busy',
    },
    cta: { contact: 'Get in touch', path: 'See my path' },
    sections: {
      professional: 'Professional experience',
      education: 'Education',
      skills: 'Skills',
      languages: 'Languages',
      certificates: 'Certificates',
      volunteering: 'Volunteering',
      honors: 'Honors & awards',
      interests: 'Interests',
      curiosities: 'Curiosities',
    },
    writing: {
      title: 'Writing',
      body: "Nothing published here yet — the first pieces are in the works. The plan is to write about what fills my day to day:",
      label: 'Let me know when it\u2019s live',
    },
    notify: {
      placeholder: 'you@email.com',
      button: 'Notify me',
      sending: 'Sending...',
      success: "Done! I'll let you know as soon as something new is up.",
      error: "Couldn't register that right now. Please try again shortly.",
    },
    contact: {
      title: 'Contact',
      text: "Want to talk about data, strategy, or technology? Pick the channel you prefer.",
      freelance: 'or send a message below.',
    },
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      messagePlaceholder: "Tell me a bit about what's on your mind...",
      submit: 'Send message',
      sending: 'Sending...',
      success: "Message sent! I'll get back to you soon.",
      error: "Couldn't send it right now. Try email or WhatsApp instead.",
      or: 'or, if you prefer, use one of the channels below',
    },
  },
};

// --- Componentes de apoio ---

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const Reveal = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}>
      {children}
    </div>
  );
};

const NavAnchor = ({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className={`text-sm transition-colors ${active ? 'text-gold' : 'text-ink-soft hover:text-ink'}`}
  >
    {label}
  </a>
);

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div>
    <div className="flex items-baseline justify-between mb-1.5">
      <span className="text-sm text-ink">{name}</span>
      <span className="text-xs text-ink-faint tabular-nums">{level}</span>
    </div>
    <div className="h-[3px] bg-line">
      <div className="h-full bg-gold" style={{ width: `${level}%` }} />
    </div>
  </div>
);

const ContactLink = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group flex items-center justify-between gap-4 py-5 border-b border-line hover:border-ink transition-colors"
  >
    <span className="flex items-center gap-4">
      <Icon size={18} className="text-ink-faint group-hover:text-gold transition-colors shrink-0" />
      <span className="flex flex-col">
        <span className="text-base text-ink">{label}</span>
        <span className="text-sm text-ink-faint">{value}</span>
      </span>
    </span>
    <ArrowUpRight size={18} className="text-ink-faint group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
  </a>
);

// --- App principal ---

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function App() {
  const [lang, setLang] = useState<Lang>('pt');
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyStatus, setNotifyStatus] = useState<FormStatus>('idle');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState('topo');
  const t = translations[lang];

  const sectionIds = useMemo(() => ['topo', 'trajetoria', 'escrita', 'contato'], []);

  useEffect(() => {
    document.title = `${personalData.name} — LFRB`;
  }, [lang]);

  // Barra de progresso de leitura, header com borda ao rolar e botão "voltar ao topo".
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 8);
      setShowTop(scrollTop > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Destaca o item de navegação correspondente à seção visível.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORM_ENDPOINT) {
      setFormStatus('error');
      return;
    }
    setFormStatus('sending');
    try {
      // O Apps Script não permite ler a resposta entre domínios, então usamos
      // "no-cors" e tratamos o disparo da requisição como sucesso.
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ type: 'contact', ...form, lang, page: window.location.href }),
      });
      setFormStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setFormStatus('error');
    }
  };

  const handleNotifySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORM_ENDPOINT) {
      setNotifyStatus('error');
      return;
    }
    setNotifyStatus('sending');
    try {
      await fetch(FORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ type: 'notify', email: notifyEmail, lang, page: window.location.href }),
      });
      setNotifyStatus('success');
      setNotifyEmail('');
    } catch {
      setNotifyStatus('error');
    }
  };

  const contactLinks = [
    { name: 'Email', value: personalData.contacts.email, icon: Mail, url: `mailto:${personalData.contacts.email}` },
    { name: 'WhatsApp', value: personalData.contacts.phone, icon: MessageCircle, url: personalData.contacts.whatsapp },
    { name: 'LinkedIn', value: 'luisfrefattiboff', icon: Linkedin, url: personalData.contacts.linkedin },
    { name: 'GitHub', value: 'luisrefatti', icon: Github, url: personalData.contacts.github },
    { name: 'Behance', value: 'lfboff', icon: Palette, url: personalData.contacts.behance },
    { name: 'Instagram', value: 'lf.boff', icon: Instagram, url: personalData.contacts.instagram },
  ];

  const navItems = [
    { href: '#topo', label: t.nav.about, id: 'topo' },
    { href: '#trajetoria', label: t.nav.path, id: 'trajetoria' },
    { href: '#escrita', label: t.nav.writing, id: 'escrita' },
    { href: '#contato', label: t.nav.contact, id: 'contato' },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink font-sans">
      {/* Barra de progresso de leitura */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
        <div className="h-full bg-gold transition-[width] duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-40 bg-paper/90 backdrop-blur border-b transition-colors ${scrolled ? 'border-line' : 'border-transparent'
          }`}
      >
        <div className="max-w-content mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a href="#topo" className="font-serif text-lg tracking-tight">
            LFRB
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavAnchor key={item.href} href={item.href} label={item.label} active={activeSection === item.id} />
            ))}
            <button
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="text-sm text-ink-soft hover:text-ink border border-line hover:border-ink px-3 py-1 transition-colors"
            >
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
          </nav>

          <button
            className="md:hidden text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden border-t border-line bg-paper transition-[max-height] duration-300 ease-out ${menuOpen ? 'max-h-64' : 'max-h-0 border-t-0'
            }`}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <NavAnchor
                key={item.href}
                href={item.href}
                label={item.label}
                active={activeSection === item.id}
                onClick={() => setMenuOpen(false)}
              />
            ))}
            <button
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="text-sm text-ink-soft self-start border border-line px-3 py-1"
            >
              {lang === 'pt' ? 'EN' : 'PT'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="topo" className="max-w-content mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="animate-fadeUp mb-10 md:mb-14">
          <p className="text-sm text-ink-faint mb-6">{personalData.location}</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight lg:whitespace-nowrap">
            Luis Fernando<br className="lg:hidden" /> Refatti Boff
          </h1>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-7 animate-fadeUp">
            <p className="text-lg md:text-xl text-ink-soft mb-8 max-w-xl">{t.role}</p>
            <p className="text-base text-ink-soft leading-relaxed max-w-lg mb-10">{t.summary}</p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#contato"
                className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 text-sm hover:bg-gold transition-colors"
              >
                {t.cta.contact}
              </a>
              <a
                href="#trajetoria"
                className="inline-flex items-center gap-2 border border-line px-6 py-3 text-sm hover:border-ink transition-colors"
              >
                {t.cta.path}
              </a>
            </div>

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl border-t border-line pt-6">
              <div>
                <dt className="text-xs text-ink-faint mb-1">{t.meta.focus}</dt>
                <dd className="text-sm text-ink">{t.meta.focusValue}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-faint mb-1">{t.meta.passion}</dt>
                <dd className="text-sm text-ink">{t.meta.passionValue}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-faint mb-1">{t.meta.international}</dt>
                <dd className="text-sm text-gold">{t.meta.internationalValue}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink-faint mb-1">{t.meta.status}</dt>
                <dd className="text-sm text-ink">{t.meta.statusValue}</dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-5 relative animate-fadeUp" style={{ animationDelay: '0.1s' }}>
            <div className="relative max-w-sm mx-auto md:mx-0 md:ml-auto">
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold" />
              <img
                src={personalData.profileImage}
                alt={`Foto de ${personalData.name}`}
                className="relative w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="border-y border-line bg-paper-soft">
        <div className="max-w-content mx-auto px-6 md:px-10 py-16 md:py-20">
          <Reveal>
            <p className="font-serif italic text-2xl md:text-3xl leading-snug max-w-3xl text-ink">
              &ldquo;{t.vision}&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      {/* Trajetória */}
      <section id="trajetoria" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl mb-14">{t.nav.path}</h2>

          <div className="grid md:grid-cols-12 gap-14">
            {/* Coluna principal: timeline profissional */}
            <div className="md:col-span-7">
              <h3 className="text-sm text-ink-faint mb-8">{t.sections.professional}</h3>
              <div className="space-y-10">
                {experienceData[lang]
                  .filter((e) => e.type === 'work')
                  .map((job, idx) => (
                    <div key={idx} className="grid grid-cols-[auto,1fr] gap-6 border-t border-line pt-6 first:border-0 first:pt-0">
                      <span className="text-sm text-ink-faint whitespace-nowrap pt-0.5">{job.period}</span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <h4 className="text-base text-ink font-medium">{job.role}</h4>
                          {job.tag && (
                            <span className="text-[11px] text-gold border border-gold/40 px-2 py-0.5">{job.tag}</span>
                          )}
                        </div>
                        <p className="text-sm text-gold mb-2">{job.company}</p>
                        <p className="text-sm text-ink-soft leading-relaxed">{job.desc}</p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-10 mt-16">
                <div>
                  <h3 className="text-sm text-ink-faint mb-6">{t.sections.volunteering}</h3>
                  <div className="space-y-4">
                    {volunteeringData[lang].map((vol, idx) => (
                      <div key={idx}>
                        <p className="text-sm text-ink">{vol.role}</p>
                        <p className="text-sm text-ink-faint">{vol.org}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-ink-faint mb-6">{t.sections.honors}</h3>
                  <ul className="space-y-2.5">
                    {honorsData[lang].map((honor, idx) => (
                      <li key={idx} className="text-sm text-ink-soft leading-relaxed">
                        {honor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Coluna lateral: educação, certificados, skills, línguas */}
            <div className="md:col-span-5 space-y-14">
              <div>
                <h3 className="text-sm text-ink-faint mb-6">{t.sections.education}</h3>
                <div className="space-y-6">
                  {experienceData[lang]
                    .filter((e) => e.type === 'education')
                    .map((edu, idx) => (
                      <div key={idx}>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm text-ink font-medium">{edu.role}</h4>
                          {edu.tag && (
                            <span className="text-[11px] text-gold border border-gold/40 px-2 py-0.5">{edu.tag}</span>
                          )}
                        </div>
                        <p className="text-sm text-gold mt-0.5">{edu.company}</p>
                        <p className="text-xs text-ink-faint mt-1">{edu.period}</p>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm text-ink-faint mb-6">{t.sections.certificates}</h3>
                <ul className="space-y-3">
                  {certificatesData[lang].map((cert, idx) => (
                    <li key={idx} className="text-sm text-ink-soft leading-relaxed border-b border-line pb-3 last:border-0">
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm text-ink-faint mb-6">{t.sections.skills}</h3>
                <div className="space-y-4">
                  {skills[lang].map((skill, idx) => (
                    <SkillBar key={idx} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm text-ink-faint mb-6">{t.sections.languages}</h3>
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  {languagesData[lang].map((l, idx) => (
                    <div key={idx}>
                      <p className="text-sm text-ink">{l.name}</p>
                      <p className="text-xs text-ink-faint">{l.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-14 mt-20 pt-14 border-t border-line">
            <div>
              <h3 className="text-sm text-ink-faint mb-6">{t.sections.interests}</h3>
              <div className="flex flex-wrap gap-2">
                {interestsData[lang].map((item, idx) => (
                  <span key={idx} className="text-sm text-ink-soft border border-line px-3 py-1">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm text-ink-faint mb-6">{t.sections.curiosities}</h3>
              <ul className="space-y-2.5">
                {curiositiesData[lang].map((curiosity, idx) => (
                  <li key={idx} className="text-sm text-ink-soft leading-relaxed">
                    {curiosity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Escrita */}
      <section id="escrita" className="border-t border-line bg-paper-soft">
        <div className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">{t.writing.title}</h2>
            <p className="text-base text-ink-soft leading-relaxed max-w-lg mb-8">{t.writing.body}</p>
            <div className="flex flex-wrap gap-2 mb-10">
              {writingTopics[lang].map((topic, idx) => (
                <span key={idx} className="text-sm text-ink border border-line px-3 py-1">
                  {topic}
                </span>
              ))}
            </div>

            <p className="text-xs text-ink-faint mb-3">{t.writing.label}</p>
            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                required
                placeholder={t.notify.placeholder}
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                className="flex-1 bg-transparent border-b border-line focus:border-ink outline-none py-2 text-sm text-ink placeholder:text-ink-faint/70 transition-colors"
              />
              <button
                type="submit"
                disabled={notifyStatus === 'sending'}
                className="inline-flex items-center justify-center gap-2 border border-line px-5 py-2.5 text-sm hover:border-gold hover:text-gold transition-colors disabled:opacity-60 whitespace-nowrap"
              >
                {notifyStatus === 'sending' ? t.notify.sending : t.notify.button}
                <ArrowUpRight size={14} />
              </button>
            </form>
            {notifyStatus === 'success' && <p className="text-sm text-gold mt-4">{t.notify.success}</p>}
            {notifyStatus === 'error' && <p className="text-sm text-ink-soft mt-4">{t.notify.error}</p>}
          </Reveal>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="max-w-content mx-auto px-6 md:px-10 py-20 md:py-28">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">{t.contact.title}</h2>
          <p className="text-base text-ink-soft leading-relaxed max-w-lg mb-4">{t.contact.text}</p>
          <p className="text-sm text-gold mb-12">{t.contact.freelance}</p>

          <form onSubmit={handleFormSubmit} className="max-w-lg mb-16">
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-xs text-ink-faint mb-2">
                  {t.form.name}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-line focus:border-ink outline-none py-2 text-sm text-ink transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs text-ink-faint mb-2">
                  {t.form.email}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-line focus:border-ink outline-none py-2 text-sm text-ink transition-colors"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-xs text-ink-faint mb-2">
                {t.form.message}
              </label>
              <textarea
                id="message"
                required
                rows={4}
                placeholder={t.form.messagePlaceholder}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border-b border-line focus:border-ink outline-none py-2 text-sm text-ink placeholder:text-ink-faint/70 resize-none transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 text-sm hover:bg-gold transition-colors disabled:opacity-60"
              >
                {formStatus === 'sending' ? t.form.sending : t.form.submit}
                <Send size={14} />
              </button>
              {formStatus === 'success' && (
                <span className="text-sm text-gold">{t.form.success}</span>
              )}
              {formStatus === 'error' && (
                <span className="text-sm text-ink-soft">{t.form.error}</span>
              )}
            </div>
          </form>

          <p className="text-xs text-ink-faint mb-6">{t.form.or}</p>

          <div className="grid sm:grid-cols-2 gap-x-12">
            {contactLinks.map((link, idx) => (
              <ContactLink key={idx} icon={link.icon} label={link.name} value={link.value} href={link.url} />
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-line">
        <div className="max-w-content mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-ink-faint">© {new Date().getFullYear()} {personalData.name}</p>
          <p className="text-xs text-ink-faint">
            {lang === 'pt' ? 'Audaces Fortuna Juvat' : 'Audaces Fortuna Juvat'}
          </p>
        </div>
      </footer>

      {showTop && (
        <a
          href="#topo"
          aria-label={lang === 'pt' ? 'Voltar ao topo' : 'Back to top'}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 flex items-center justify-center border border-line bg-paper/90 backdrop-blur text-ink-soft hover:border-gold hover:text-gold transition-colors"
        >
          <ArrowUp size={18} />
        </a>
      )}
    </div>
  );
}
