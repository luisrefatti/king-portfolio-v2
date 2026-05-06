import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Briefcase,
  Code,
  Mail,
  ChevronRight,
  ChevronLeft,
  Github,
  Linkedin,
  BookOpen,
  Award,
  Globe,
  Cpu,
  Coffee,
  Menu,
  X,
  Star,
  Heart,
  Zap,
  Smile,
  Languages,
  Clock,
  Instagram,
  MessageCircle,
  Palette,
  Wand2,
  CheckCircle2,
  Video,
  LayoutTemplate,
  ShieldAlert,
  Link as LinkIcon
} from 'lucide-react';

// --- Utilitários ---

const calculateReadTime = (text) => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes;
};

// --- Dicionários de Tradução ---

const translations = {
  pt: {
    role: "Inteligência de Negócios | Planejamento Estratégico",
    summary: "Especialista em Inteligência de Negócios transformando grandes volumes de dados em insights estratégicos. Atuo na interseção entre tecnologia e estratégia de negócios, utilizando IA e automação para eficiência organizacional.",
    vision: "Meu objetivo é atuar na interseção entre tecnologia e estratégia de negócios, utilizando o potencial da Inteligência Artificial e das Automações.",
    nav: {
      presentation: "Apresentação",
      experience: "Experiência",
      blog: "Blog",
      contact: "Contato",
      kingmagic: "KingMagic"
    },
    sections: {
      presentation: "Apresentação",
      experience: "Background",
      blog: "Blog",
      contact: "Connect",
      professional: "Trajetória Profissional",
      education: "Formação",
      skills: "Hard Skills",
      languages: "Línguas",
      certificates: "Certificados",
      volunteering: "Voluntariado",
      honors: "Honors & Awards",
      interests: "Interesses",
      curiosities: "Curiosidades",
      kingmagic: "Serviços KingMagic"
    },
    contact: {
      text: "Vamos conversar sobre dados, estratégia ou tecnologia? Escolha seu canal preferido abaixo:",
      socials: "Redes Sociais",
      sendBtn: "enviarMensagem()"
    },
    codeBlock: {
      about: "// Sobre mim",
      focus: "foco",
      passion: "paixao",
      location: "localizacao",
      status: "status",
      openToWork: "Ocupado"
    },
    blog: {
      readTimeLabel: "min leitura",
      moreComing: "// Mais conteúdo em breve...",
      interests: "Interesses: IA, Tech, Finanças",
      back: "cd .."
    },
    kingmagic: {
      manifestoTitle: "O Mago",
      manifesto: "Comecei essa jornada com uma insatisfação profunda lá em 2020: o mercado digital estava preguiçoso. Todo mundo utilizando os mesmos templates enlatados, entregando marcas sem alma e códigos que não escalam.\n\nA KingMagic DIGITAL nasceu como a antítese desse movimento: tudo é construído do zero, sob medida e com intenção.\n\nÉ sobre separar o útil do ruído. É KING e ponto.",
      arsenalTitle: "Nosso Domínio",
      social: "Design de Redes Sociais",
      branding: "Identidade Visual",
      web: "Engenharia Web",
      video: "Audiovisual",
      rules: "Protocolos",
      btn: "Iniciar projeto"
    }
  },
  en: {
    role: "Business Intelligence | Strategic Planning",
    summary: "Business Intelligence Specialist transforming large volumes of data into strategic insights. I work at the intersection of technology and business strategy, using AI and automation for organizational efficiency.",
    vision: "My goal is to work at the intersection of technology and business strategy, using the potential of Artificial Intelligence and Automations.",
    nav: {
      presentation: "Presentation",
      experience: "Experience",
      blog: "Blog",
      contact: "Contact",
      kingmagic: "KingMagic"
    },
    sections: {
      presentation: "Presentation",
      experience: "Background",
      blog: "Blog",
      contact: "Connect",
      professional: "Professional Path",
      education: "Education",
      skills: "Hard Skills",
      languages: "Languages",
      certificates: "Certificates",
      volunteering: "Volunteering",
      honors: "Honors & Awards",
      interests: "Interests",
      curiosities: "Curiosities",
      kingmagic: "KingMagic Services"
    },
    contact: {
      text: "Let's talk about data, strategy, or technology? Choose your preferred channel below:",
      socials: "Socials",
      sendBtn: "sendMessage()"
    },
    codeBlock: {
      about: "// About me",
      focus: "focus",
      passion: "passion",
      location: "location",
      status: "status",
      openToWork: "Busy"
    },
    blog: {
      readTimeLabel: "min read",
      moreComing: "// More content coming soon...",
      interests: "Interests: AI, Tech, Finance",
      back: "cd .."
    },
    kingmagic: {
      manifestoTitle: "The Magician",
      manifesto: "I started this journey with a deep dissatisfaction back there in 2020: the digital market was lazy. Everyone was using the same canned templates, delivering soulless brands and AI code that doesn't scale.\n\nKingMagic DIGITAL was born as the antithesis of this movement: everything is built from scratch, custom-made, and with intention.\n\nIt's about separating the signal from the noise. It's KING and period.",
      arsenalTitle: "Our Domain",
      social: "Social Media Design",
      branding: "Visual Identity",
      web: "Web Engineering",
      video: "Audiovisual",
      rules: "Protocols",
      btn: "Contact"
    }
  }
};

// --- Dados Dinâmicos ---

const personalData = {
  name: "Luis Fernando Refatti Boff",
  contacts: {
    phone: "+55 (54) 99991-8886",
    email: "luisfernandoboff@gmail.com",
    portfolio: "https://www.behance.net/lfboff",
    linkedin: "https://www.linkedin.com/in/luisfrefattiboff/",
    github: "https://github.com/luisrefatti",
    instagram: "https://www.instagram.com/lf.boff/",
    whatsapp: "https://wa.me/5554999918886",
    behance: "https://www.behance.net/lfboff"
  },
  profileImage: "profileimage.jpg"
};

const skills = [
  { name: "Excel (Adv)", level: 90 },
  { name: "UI Path", level: 70 },
  { name: "App Script", level: 85 },
  { name: "Salesforce CRM", level: 90 },
  { name: "HTML/CSS/JS", level: 80 },
  { name: "Photoshop", level: 95 },
  { name: "AI Native", level: 80 }
];

const languagesData = {
  pt: [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Fluente" },
    { name: "Espanhol", level: "Básico" }
  ],
  en: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Spanish", level: "Basic" }
  ]
};

const experienceData = {
  pt: [
    {
      company: "Cresol Centro Sul - Sede",
      period: "Nov 2025 - Presente",
      role: "Analista de Informações Gerenciais",
      desc: "Integro o time de Planejamento Estratégico com foco em Inteligência de Negócios. Responsável por análises avançadas e insights estratégicos.",
      type: "work"
    },
    {
      company: "Cresol Centro Norte / Centro Sul - Sede",
      period: "Jul 2024 - Out 2025",
      role: "Auxiliar de Informações Gerenciais",
      desc: "Ponto focal da área de Inteligência de Mercado. Apoio à tomada de decisão e identificação de oportunidades.",
      type: "work"
    },
    {
      company: "Cresol Centro Norte - Agência Marcelino Ramos",
      period: "Mai 2023 - Jul 2024",
      role: "Caixa - Agência",
      desc: "Atuação direta no atendimento e operações bancárias.",
      type: "work"
    },
    {
      company: "Cresol Centro Norte - Sede",
      period: "Ago 2022 - Mai 2023",
      role: "Jovem Aprendiz",
      desc: "Início da trajetória na cooperativa.",
      type: "work"
    },
    {
      company: "KING Design",
      period: "Jan 2021 - Presente",
      role: "Designer Gráfico Freelancer",
      desc: "Desenvolvimento de identidade visual para empresas locais e eventos sob demanda.",
      type: "work"
    },
    {
      company: "URI Erechim",
      period: "Cursando (7º Semestre)",
      role: "Bacharelado em Ciência da Computação",
      desc: "Base sólida em computação, algoritmos e desenvolvimento.",
      type: "education"
    },
    {
      company: "Oxford International Study Centre (OISC) - Oxford (UK)",
      period: "Winter 2024",
      role: "Oxford Winter Programme",
      desc: "Curso linguístico de inglês avançado (Nível C1) e vivência internacional.",
      type: "education"
    },
    {
      company: "Instituto de Educação Estadual Marcelino Ramos",
      period: "Concluído",
      role: "Ensino Médio",
      desc: "Ensino médio completo.",
      type: "education"
    }
  ],
  en: [
    {
      company: "Cresol Centro Sul - HQ",
      period: "Nov 2025 - Present",
      role: "Management Information Analyst",
      desc: "Part of the Strategic Planning team focused on Business Intelligence. Responsible for advanced analysis and strategic insights.",
      type: "work"
    },
    {
      company: "Cresol Centro Norte / Centro Sul - HQ",
      period: "Jul 2024 - Oct 2025",
      role: "Management Information Assistant",
      desc: "Focal point for Market Intelligence. Supporting decision-making and identifying opportunities.",
      type: "work"
    },
    {
      company: "Cresol Centro Norte - Ag. Marcelino Ramos",
      period: "May 2023 - Jul 2024",
      role: "Bank Teller",
      desc: "Direct customer service and banking operations.",
      type: "work"
    },
    {
      company: "Cresol Centro Norte - HQ",
      period: "Aug 2022 - May 2023",
      role: "Intern",
      desc: "Beginning of the trajectory in the cooperative.",
      type: "work"
    },
    {
      company: "KING Design",
      period: "Jan 2021 - Present",
      role: "Freelance Graphic Designer",
      desc: "Visual identity development for local businesses and events on demand.",
      type: "work"
    },
    {
      company: "URI Erechim",
      period: "In Progress (7th Semester)",
      role: "B.Sc. in Computer Science",
      desc: "Solid foundation in computing, algorithms, and development.",
      type: "education"
    },
    {
      company: "Oxford Internation Study Centre (OISC) - Oxford (UK)",
      period: "Winter 2024",
      role: "Oxford Winter Programme",
      desc: "Advanced English language course (C1 Level) and international experience.",
      type: "education"
    },
    {
      company: "Instituto de Educação Estadual Marcelino Ramos",
      period: "Completed",
      role: "High School",
      desc: "High school education.",
      type: "education"
    }
  ]
};

const certificatesData = {
  pt: [
    "CCAA - Inglês Fluente",
    "OISC - Oxford Winter Programme 2024",
    "MIT - Introduction to Aerospace Engineering: Astronautics and Human Spaceflight - 16.00x"
  ],
  en: [
    "CCAA - Fluent English",
    "OISC - Oxford Winter Programme 2024",
    "MIT - Introduction to Aerospace Engineering: Astronautics and Human Spaceflight - 16.00x"
  ]
};

const honorsData = {
  pt: [
    "OBMEP 2021 - Menção Honrosa",
    "OBMEP 2022 - Menção Honrosa",
    "5º Lugar | GP do Conhecimento",
    "940 na redação ENEM 2021",
    "920 na redação ENEM 2022"
  ],
  en: [
    "OBMEP 2021 - Honorable Mention",
    "OBMEP 2022 - Honorable Mention",
    "5th Place | Knowledge GP",
    "940 in ENEM Essay 2021",
    "920 in ENEM Essay 2022"
  ]
};

const volunteeringData = {
  pt: [
    { role: "Primeiro Tesoureiro", org: "GEM" },
    { role: "Diretor de Marketing", org: "AAAEAURIE" }
  ],
  en: [
    { role: "First Treasurer", org: "GEM" },
    { role: "Marketing Director", org: "AAAEAURIE" }
  ]
};

const interestsData = {
  pt: ["Tecnologia", "IA", "Programacao", "Bolsa de Valores", "Criptomoedas", "Mercado Financeiro", "Cooperativismo"],
  en: ["Technology", "AI", "Code", "Stock Market", "Cryptocurrencies", "Financial Market", "Cooperativism"]
};

const curiositiesData = {
  pt: [
    "Apaixonado por café",
    "Leitor voraz",
    "Movido à carros antigos",
    "Investidor de renda fixa, variável e criptoativos desde 2020",
    "Quando criança, sonhava em ser astronauta"
  ],
  en: [
    "Coffee lover",
    "Avid reader",
    "Driven by vintage cars",
    "Investor in fixed income, variable income, and crypto since 2020",
    "As a child, I dreamed of being an astronaut"
  ]
};

const blogPostsData = {
  pt: [
    {
      id: 1,
      title: "Em breve",
      date: "12 Dez 2024",
      category: "Tech",
      excerpt: "...",
      content: `...`
    },
    {
      id: 2,
      title: "Em breve",
      date: "15 Abr 2024",
      category: "Viagem",
      excerpt: "...",
      content: `...`
    },
    {
      id: 3,
      title: "Em breve",
      date: "10 Out 2024",
      category: "Dev",
      excerpt: "...",
      content: `...`
    }
  ],
  en: [
    {
      id: 1,
      title: "Coming soon",
      date: "Dec 12, 2024",
      category: "Tech",
      excerpt: "...",
      content: `...`
    },
    {
      id: 2,
      title: "Coming soon",
      date: "Apr 15, 2024",
      category: "Travel",
      excerpt: "...",
      content: `...`
    },
    {
      id: 3,
      title: "Coming soon",
      date: "Oct 10, 2024",
      category: "Dev",
      excerpt: "...",
      content: `...`
    }
  ]
};

// --- Componentes ---

const NavLink = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-4 md:p-3 rounded-lg transition-all duration-300 font-mono text-sm group ${active
      ? 'bg-blue-500/10 text-blue-400'
      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
      }`}
  >
    <Icon size={20} className={active ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-100'} />
    <span className="md:hidden lg:block text-base md:text-sm font-semibold md:font-normal">{label}</span>
  </button>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-xl md:text-2xl font-mono text-slate-100 mb-6 md:mb-8 flex items-center gap-2">
    <span className="text-blue-500">const</span>
    <span className="text-yellow-400">{children}</span>
    <span className="text-slate-500">= () ={'>'}</span>
  </h2>
);

const CodeBlock = ({ children, className = "" }) => (
  <div className={`font-mono text-xs md:text-sm bg-slate-900/50 p-4 rounded-lg border border-slate-800 ${className}`}>
    {children}
  </div>
);

const TypeWriter = ({ text, delay = 50 }) => {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    let i = 0;
    setCurrentText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        i++;
        setCurrentText(text.slice(0, i));
      } else {
        clearInterval(timer);
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);

  return <span>{currentText}</span>;
};

// --- App Principal ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('pt'); // 'pt' or 'en'
  const [expandedPostId, setExpandedPostId] = useState(null); // Estado para controlar post expandido

  const t = translations[lang];

  // Reset expanded post only when switching tabs
  // Reset expanded post only when switching tabs & Generate Favicon
  useEffect(() => {
    // 1. Define o Título da Aba
    document.title = "LFRB";
    setExpandedPostId(null);

    // 2. Geração Dinâmica do Favicon "<LB/>"
    const generateFavicon = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      // Fundo (Slate 950 - #0f172a)
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.beginPath();
      // Criando bordas arredondadas manualmente para garantir compatibilidade
      const r = 12; // raio da borda
      const w = 64;
      const h = 64;
      ctx.moveTo(r, 0);
      ctx.lineTo(w - r, 0);
      ctx.quadraticCurveTo(w, 0, w, r);
      ctx.lineTo(w, h - r);
      ctx.quadraticCurveTo(w, h, w - r, h);
      ctx.lineTo(r, h);
      ctx.quadraticCurveTo(0, h, 0, h - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.fill();

      ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Texto "<LB/>"
      ctx.fillStyle = '#60a5fa';
      ctx.font = 'bold 20px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('<LB/>', 32, 33);

      // Injeta no HTML
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = canvas.toDataURL();
    };

    generateFavicon();
  }, [activeTab]);

  // Estilos globais para a scrollbar e novas fontes
  const GlobalStyles = () => (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      
      .font-playfair {
        font-family: 'Playfair Display', serif;
      }
      .font-space {
        font-family: 'Space Grotesk', sans-serif;
      }

      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #0f172a; 
      }
      ::-webkit-scrollbar-thumb {
        background: #334155; 
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #475569; 
      }
    `}</style>
  );

  const Presentation = () => (
    <div className="space-y-6 md:space-y-8 animate-fadeIn">
      <div className="space-y-4">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/20">
          v2.0.0 Portfolio
        </div>
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-slate-100 font-mono leading-tight">
          {lang === 'pt' ? 'Olá, eu sou ' : 'Hi, I am '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 block md:inline mt-1 md:mt-0">{personalData.name}</span>
        </h1>
        <p className="text-sm md:text-xl text-slate-400 max-w-2xl font-mono min-h-[60px] md:min-h-[60px]">
          {`> `} <TypeWriter key={lang} text={t.role} />
          <span className="animate-pulse">_</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <CodeBlock className="h-full">
          <p className="text-slate-500 mb-2">{t.codeBlock.about}</p>
          <p className="text-purple-400">const <span className="text-yellow-400">profile</span> = {'{'}</p>
          <div className="pl-4 text-slate-300 space-y-1">
            <p>{t.codeBlock.focus}: <span className="text-green-400">'{lang === 'pt' ? 'Inteligência de Negócios' : 'Business Intelligence'}'</span>,</p>
            <p>{t.codeBlock.passion}: <span className="text-green-400">'{lang === 'pt' ? 'Dados & Estratégia' : 'Data & Strategy'}'</span>,</p>
            <p>{t.codeBlock.location}: <span className="text-green-400">'{lang === 'pt' ? 'Brasil' : 'Brazil'}'</span>,</p>
            <p>{t.codeBlock.status}: <span className="text-green-400">'{t.codeBlock.openToWork}'</span></p>
          </div>
          <p className="text-purple-400">{'};'}</p>
        </CodeBlock>

        <div className="space-y-4">
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            {t.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 4).map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs md:text-sm rounded border border-slate-700 font-mono hover:border-blue-500/50 transition-colors">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Experience = () => (
    <div className="animate-fadeIn space-y-10">
      <SectionTitle>{t.sections.experience}</SectionTitle>

      <div className="grid md:grid-cols-12 gap-8">

        {/* Coluna Principal: Timeline + Voluntariado */}
        <div className="md:col-span-7 space-y-10">

          <section>
            <h3 className="text-lg text-slate-300 font-bold mb-6 flex items-center gap-2">
              <span className="text-blue-500 font-mono">01.</span> {t.sections.professional}
            </h3>

            <div className="relative border-l border-slate-800 ml-2 md:ml-3 space-y-8 pb-4">
              {experienceData[lang].filter(e => e.type === 'work').map((job, idx) => (
                <div key={idx} className="relative pl-6 md:pl-8 group">
                  <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600 group-hover:bg-blue-500 group-hover:border-blue-500 transition-colors z-10" />

                  <div className="transition-all relative">
                    <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                      <h4 className="text-base text-slate-200 font-bold leading-tight">{job.role}</h4>
                      <span className="text-[10px] md:text-xs text-slate-500 font-mono border border-slate-800 px-2 py-0.5 rounded whitespace-nowrap">{job.period}</span>
                    </div>
                    <p className="text-blue-400 text-xs font-mono mb-2">{job.company}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{job.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Grupo Secundário: Voluntariado e Honors */}
          <div className="grid sm:grid-cols-2 gap-8">
            <section>
              <h3 className="text-lg text-slate-300 font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-500 font-mono">02.</span> {t.sections.volunteering}
              </h3>
              <div className="space-y-4">
                {volunteeringData[lang].map((vol, idx) => (
                  <div key={idx} className="border-l-2 border-slate-800 pl-4 hover:border-red-500/50 transition-colors">
                    <h4 className="text-slate-200 font-semibold text-sm">{vol.role}</h4>
                    <p className="text-slate-500 text-xs font-mono">{vol.org}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg text-slate-300 font-bold mb-4 flex items-center gap-2">
                <span className="text-blue-500 font-mono">03.</span> {t.sections.honors}
              </h3>
              <ul className="space-y-2">
                {honorsData[lang].map((honor, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="text-yellow-500 mt-0.5">★</span>
                    <span>{honor}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

        </div>

        {/* Coluna Lateral: Educação, Certificados, Skills */}
        <div className="md:col-span-5 space-y-10">

          <section>
            <h3 className="text-lg text-slate-300 font-bold mb-6 flex items-center gap-2">
              <span className="text-purple-400 font-mono">04.</span> {t.sections.education}
            </h3>
            <div className="space-y-6">
              {experienceData[lang].filter(e => e.type === 'education').map((edu, idx) => (
                <div key={idx} className="relative">
                  <h4 className="text-slate-200 font-semibold text-sm">{edu.role}</h4>
                  <p className="text-purple-400 text-xs font-mono mt-0.5">{edu.company}</p>
                  {edu.period && <p className="text-xs text-slate-500 mt-1">{edu.period}</p>}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg text-slate-300 font-bold mb-4 flex items-center gap-2">
              <span className="text-orange-400 font-mono">05.</span> {t.sections.certificates}
            </h3>
            <ul className="space-y-3">
              {certificatesData[lang].map((cert, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex gap-2 items-start border-b border-slate-900 pb-2 last:border-0">
                  <div className="mt-1 min-w-[4px] min-h-[4px] rounded-full bg-orange-400" />
                  {cert}
                </li>
              ))}
            </ul>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section>
              <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-wider">{t.sections.languages}</h3>
              <div className="space-y-2">
                {languagesData[lang].map((l, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-slate-300 text-sm">{l.name}</span>
                    <span className="text-xs text-slate-600">{l.level}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase tracking-wider">{t.sections.skills}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-900 mt-8">

        <section>
          <h3 className="text-sm font-mono text-yellow-500/80 mb-4 flex items-center gap-2 uppercase tracking-wider">
            <Zap size={14} /> {t.sections.interests}
          </h3>
          <div className="flex flex-wrap gap-2">
            {interestsData[lang].map((item, idx) => (
              <span key={idx} className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-default">
                #{item.toLowerCase().replace(/\s/g, '')}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-mono text-pink-400/80 mb-4 flex items-center gap-2 uppercase tracking-wider">
            <Smile size={14} /> {t.sections.curiosities}
          </h3>
          <ul className="space-y-2">
            {curiositiesData[lang].map((curiosity, idx) => (
              <li key={idx} className="text-xs text-slate-500 italic">
                      // {curiosity}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );

  const Blog = () => {
    // Se tiver um post selecionado, mostra a visualização completa
    if (expandedPostId) {
      const post = blogPostsData[lang].find(p => p.id === expandedPostId);
      const readTime = calculateReadTime(post.content);

      return (
        <div className="animate-fadeIn">
          <button
            onClick={() => setExpandedPostId(null)}
            className="flex items-center gap-2 text-blue-400 font-mono mb-6 hover:text-blue-300 transition-colors"
          >
            <ChevronLeft size={16} />
            <span>{t.blog.back}</span>
          </button>

          <article className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 md:p-10">
            <div className="flex flex-wrap gap-4 justify-between items-start mb-6 pb-6 border-b border-slate-800">
              <div>
                <span className="text-blue-400 font-mono text-sm mb-2 block">{post.category}</span>
                <h1 className="text-2xl md:text-4xl font-bold text-slate-100 mb-2">{post.title}</h1>
              </div>
              <div className="flex items-center gap-4 text-slate-500 font-mono text-sm">
                <span className="flex items-center gap-2"><Clock size={16} /> {post.date}</span>
                <span className="flex items-center gap-2"><Coffee size={16} /> {readTime} {t.blog.readTimeLabel}</span>
              </div>
            </div>

            <div className="prose prose-invert prose-sm md:prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-slate-300 mb-4 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-800 flex justify-between text-slate-500 font-mono text-xs">
              <span>ID: {post.id}</span>
              <span>EOF</span>
            </div>
          </article>
        </div>
      );
    }

    // Visualização da lista de cards
    return (
      <div className="animate-fadeIn">
        <SectionTitle>{t.sections.blog}</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPostsData[lang].map((post) => {
            const readTime = calculateReadTime(post.content);
            return (
              <article
                key={post.id}
                onClick={() => setExpandedPostId(post.id)}
                className="bg-slate-800/20 border border-slate-800 rounded-lg p-6 hover:bg-slate-800/40 transition-all hover:-translate-y-1 hover:border-blue-500/30 group cursor-pointer flex flex-col h-full"
              >
                <div className="flex justify-between items-center mb-4 text-xs font-mono">
                  <span className="text-blue-400">{post.category}</span>
                  <span className="text-slate-500">{post.date}</span>
                </div>
                <h3 className="text-xl text-slate-100 font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono pt-4 border-t border-slate-800/50">
                  <Coffee size={14} />
                  <span>{readTime} {t.blog.readTimeLabel}</span>
                  <ChevronRight size={14} className="ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-slate-900/50 border border-slate-800 rounded-lg text-center">
          <p className="text-slate-400 font-mono mb-4">{t.blog.moreComing}</p>
          <div className="inline-flex gap-4">
            <span className="flex items-center gap-2 text-slate-500 text-sm">
              <Cpu size={16} /> {t.blog.interests}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const Contact = () => {
    const contactLinks = [
      { name: "GitHub", icon: Github, url: personalData.contacts.github, color: "hover:text-white" },
      { name: "LinkedIn", icon: Linkedin, url: personalData.contacts.linkedin, color: "hover:text-blue-500" },
      { name: "Instagram", icon: Instagram, url: personalData.contacts.instagram, color: "hover:text-pink-500" },
      { name: "WhatsApp", icon: MessageCircle, url: personalData.contacts.whatsapp, color: "hover:text-green-500" },
      { name: "Email", icon: Mail, url: `mailto:${personalData.contacts.email}`, color: "hover:text-red-400" },
      { name: "Behance", icon: Palette, url: personalData.contacts.behance, color: "hover:text-blue-400" }
    ];

    return (
      <div className="animate-fadeIn max-w-4xl mx-auto">
        <SectionTitle>{t.sections.contact}</SectionTitle>

        <p className="text-slate-400 text-lg mb-10 max-w-2xl font-mono">
          {`// ${t.contact.text}`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`
                            bg-slate-800/30 border border-slate-800 p-6 rounded-xl 
                            flex flex-col items-center gap-4 group transition-all duration-300
                            hover:bg-slate-800 hover:-translate-y-1 hover:border-slate-700
                            ${link.color}
                        `}
            >
              <div className="p-4 bg-slate-900 rounded-full border border-slate-800 group-hover:border-current transition-colors">
                <link.icon size={28} className="text-slate-400 group-hover:text-current transition-colors" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-slate-200 group-hover:text-white">{link.name}</h3>
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1 justify-center mt-1">
                  <span>link.open()</span>
                  <LinkIcon size={10} />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm font-mono">
          <p>/* {lang === 'pt' ? 'Disponível para freelancing' : 'Available for freelance'} */</p>
        </div>
      </div>
    );
  };

  const KingMagic = () => {
    const t = translations[lang];

    return (
      <div className="animate-fadeIn space-y-16 max-w-4xl mx-auto pb-12">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2 mb-8">
          <ChevronRight className="text-purple-500" /> {t.sections.kingmagic}
        </h2>

        {/* ==========================================
          0. INTRODUÇÃO / MANIFESTO 
      ========================================== */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 border border-indigo-500/20 p-8 md:p-12 rounded-xl relative overflow-hidden group shadow-lg">
          <div className="absolute -right-10 -bottom-10 text-indigo-500/5 transition-transform duration-700 group-hover:scale-110">
            <Wand2 size={250} />
          </div>

          <div className="relative z-10 flex items-baseline gap-2 mb-4">
            <span className="text-4xl md:text-5xl font-black tracking-tighter text-slate-100 font-space">KING</span>
            <span className="text-5xl md:text-6xl font-playfair italic bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 to-fuchsia-400 -ml-2">Magic.</span>
          </div>

          <p className="text-sm font-mono text-slate-400 mb-8 uppercase tracking-widest relative z-10 border-l-2 border-indigo-500 pl-4">Ouse ser Diferente.</p>

          <div className="prose prose-invert prose-sm md:prose-base text-slate-300 relative z-10 whitespace-pre-line font-space leading-relaxed max-w-2xl">
            {t.kingmagic.manifesto}
          </div>

          <div className="mt-10 flex gap-4 relative z-10">
            <a href={personalData.contacts.whatsapp} target="_blank" rel="noreferrer" className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-8 py-3 rounded font-mono text-sm hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <Terminal size={16} /> {t.kingmagic.btn}
            </a>
          </div>
        </div>


        {/* ==========================================
          1. OS SERVIÇOS (O QUE FAZEMOS)
      ========================================== */}
        <div className="space-y-8">
          <h3 className="text-2xl text-slate-100 font-playfair italic flex items-center gap-3 border-b border-slate-800 pb-4">
            <span className="text-yellow-400 font-space not-italic font-black">01.</span> {t.kingmagic.arsenalTitle}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-lg hover:border-yellow-400/50 transition-colors">
              <Palette className="text-yellow-400 mb-6" size={28} />
              <h4 className="font-bold text-slate-100 mb-3 font-space text-lg">Identidade Visual</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-space">Construímos marcas que dominam o mercado. Posicionamento premium, tipografia autoral e design estratégico que separa a sua empresa do ruído visual.</p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-lg hover:border-blue-400/50 transition-colors">
              <Code className="text-blue-400 mb-6" size={28} />
              <h4 className="font-bold text-slate-100 mb-3 font-space text-lg">Engenharia Web</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-space">Não usamos construtores genéricos. Criamos landing pages de alta conversão, sites e sistemas complexos com código limpo e arquitetura robusta.</p>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-lg hover:border-pink-400/50 transition-colors">
              <Video className="text-pink-400 mb-6" size={28} />
              <h4 className="font-bold text-slate-100 mb-3 font-space text-lg">Audiovisual</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-space">Foco em retenção extrema. Decupagem dinâmica, sound design e edição voltada para prender a atenção em vídeos curtos ou narrativas longas.</p>
            </div>
          </div>
        </div>


        {/* ==========================================
          2. VALORES E ENTREGÁVEIS (O QUE VOCÊ LEVA)
      ========================================== */}
        <div className="space-y-12">
          <h3 className="text-2xl text-slate-100 font-playfair italic flex items-center gap-3 border-b border-slate-800 pb-4">
            <span className="text-indigo-400 font-space not-italic font-black">02.</span> Investimento e Entregáveis
          </h3>

          {/* 2.1 Identidade Visual */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 md:p-10 hover:border-indigo-500/30 transition-colors">
            <h4 className="text-slate-100 font-bold mb-8 flex items-center gap-3 font-space text-2xl">
              <LayoutTemplate className="text-indigo-400" size={28} /> {t.kingmagic.branding}
            </h4>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Pacote 1 */}
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg flex flex-col">
                <div className="text-indigo-400 font-mono text-xs mb-2">PACOTE 01</div>
                <h5 className="font-bold text-slate-100 text-xl mb-1">Essencial</h5>
                <div className="text-2xl font-bold text-slate-100 mb-6 border-b border-slate-800 pb-4">R$ 550</div>
                <ul className="space-y-3 text-sm text-slate-400 flex-grow mb-6">
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Logo Principal</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Variações (Claro, Escuro, P&B)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Guia Visual de Cores e Fontes</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Arquivos em PNG via Google Drive</li>
                </ul>
                <div className="text-xs font-mono text-slate-500"><Clock size={12} className="inline mr-1" /> 7 a 10 dias úteis</div>
              </div>

              {/* Pacote 2 (Destaque) */}
              <div className="bg-slate-900/80 border border-indigo-500/50 p-6 rounded-lg flex flex-col relative shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recomendado
                </div>
                <div className="text-indigo-400 font-mono text-xs mb-2 mt-2">PACOTE 02</div>
                <h5 className="font-bold text-indigo-300 text-xl mb-1">Profissional</h5>
                <div className="text-2xl font-bold text-slate-100 mb-6 border-b border-slate-800 pb-4">R$ 1.100</div>
                <ul className="space-y-3 text-sm text-slate-400 flex-grow mb-6">
                  <li className="flex items-start gap-2 text-indigo-300 font-medium"><CheckCircle2 size={16} className="text-indigo-400 shrink-0 mt-0.5" /> Tudo do Essencial +</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Kit Redes Sociais (Perfil/Capa)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> 3 Mockups Realistas (Aplicações)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> 6 Ícones para Destaques (Instagram)</li>
                </ul>
                <div className="text-xs font-mono text-slate-500"><Clock size={12} className="inline mr-1" /> 10 a 15 dias úteis</div>
              </div>

              {/* Pacote 3 */}
              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg flex flex-col">
                <div className="text-indigo-400 font-mono text-xs mb-2">PACOTE 03</div>
                <h5 className="font-bold text-slate-100 text-xl mb-1">Premium</h5>
                <div className="text-2xl font-bold text-slate-100 mb-6 border-b border-slate-800 pb-4">R$ 1.400</div>
                <ul className="space-y-3 text-sm text-slate-400 flex-grow mb-6">
                  <li className="flex items-start gap-2 text-indigo-300 font-medium"><CheckCircle2 size={16} className="text-indigo-400 shrink-0 mt-0.5" /> Tudo do Profissional +</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Brand Book Completo (Manual)</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> Naming, Bordão e Estratégia de Bio</li>
                  <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> 3 Templates Editáveis (Canva)</li>
                </ul>
                <div className="text-xs font-mono text-slate-500"><Clock size={12} className="inline mr-1" /> 15 a 20 dias úteis</div>
              </div>
            </div>
          </div>

          {/* 2.2 Redes Sociais */}
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 md:p-10">
            <h4 className="text-slate-100 font-bold mb-6 flex items-center gap-3 font-space text-2xl">
              <Palette className="text-yellow-400" size={28} /> {t.kingmagic.social}
            </h4>

            {/* Caixa de Clareza - O que está incluso */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-5 mb-8">
              <h5 className="text-yellow-400 font-bold text-sm mb-3">O QUE ESTÁ INCLUSO EM TODAS AS ARTES:</h5>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-slate-300">
                <span className="flex gap-2"><CheckCircle2 size={18} className="text-yellow-500 shrink-0" /> Design 100% autoral (Zero templates)</span>
                <span className="flex gap-2"><CheckCircle2 size={18} className="text-yellow-500 shrink-0" /> Formatos nativos (Feed ou Stories)</span>
                <span className="flex gap-2"><CheckCircle2 size={18} className="text-yellow-500 shrink-0" /> Fidelidade total à sua paleta de cores</span>
                <span className="flex gap-2"><CheckCircle2 size={18} className="text-yellow-500 shrink-0" /> Exportação em PNG/JPG máxima resolução</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500">
                    <th className="pb-4 font-normal">Volume</th>
                    <th className="pb-4 font-normal">Valor Total</th>
                    <th className="pb-4 font-normal hidden sm:table-cell">Valor Unitário</th>
                    <th className="pb-4 font-normal text-right">Prazo</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="py-4">1 Arte (Avulsa)</td>
                    <td className="py-4 text-yellow-400 font-bold text-base">R$ 80,00</td>
                    <td className="py-4 text-slate-500 hidden sm:table-cell">R$ 80,00</td>
                    <td className="py-4 text-right">Até 3 dias</td>
                  </tr>
                  <tr className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="py-4">2 Artes</td>
                    <td className="py-4 text-yellow-400 font-bold text-base">R$ 150,00</td>
                    <td className="py-4 text-slate-500 hidden sm:table-cell">R$ 75,00</td>
                    <td className="py-4 text-right">Até 3 dias</td>
                  </tr>
                  <tr className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="py-4">3 Artes</td>
                    <td className="py-4 text-yellow-400 font-bold text-base">R$ 210,00</td>
                    <td className="py-4 text-slate-500 hidden sm:table-cell">R$ 70,00</td>
                    <td className="py-4 text-right">Até 3 dias</td>
                  </tr>
                  <tr className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="py-4">4 Artes</td>
                    <td className="py-4 text-yellow-400 font-bold text-base">R$ 260,00</td>
                    <td className="py-4 text-slate-500 hidden sm:table-cell">R$ 65,00</td>
                    <td className="py-4 text-right">Até 5 dias</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4">5 Artes</td>
                    <td className="py-4 text-yellow-400 font-bold text-base">R$ 300,00</td>
                    <td className="py-4 text-slate-500 hidden sm:table-cell">R$ 60,00</td>
                    <td className="py-4 text-right">Até 5 dias</td>
                  </tr>
                  <tr className="hover:bg-slate-800/20 transition-colors">
                    <td className="py-4">Outros pacotes, a combinar.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2.3 Audio e Dev (Side by Side) */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Video */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 flex flex-col">
              <h4 className="text-slate-100 font-bold mb-6 flex items-center gap-3 font-space text-xl">
                <Video className="text-pink-400" size={24} /> {t.kingmagic.video}
              </h4>

              <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4 mb-6 text-sm text-slate-300 flex-grow">
                <p className="mb-2"><strong className="text-pink-400">Vídeos Curtos:</strong> Cortes secos, edição cativante, sound design e legendas dinâmicas.</p>
                <p><strong className="text-pink-400">Vídeos Longos:</strong> Ritmo imersivo e avaliação técnica por minutagem.</p>
              </div>

              <ul className="space-y-4 font-mono text-sm text-slate-300">
                <li className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span>Vídeo Curto Avulso (Até 60s)</span> <span className="text-pink-400 font-bold text-base">R$ 100,00</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span>Pacote 4 Vídeos Curtos</span> <span className="text-pink-400 font-bold text-base">R$ 350,00</span>
                </li>
                <li className="flex justify-between items-center pt-2">
                  <span className="text-slate-400">Narrativas Longas (YouTube)</span>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">A partir de</span>
                    <span className="text-pink-400 font-bold text-base">R$ 400,00</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Dev */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 flex flex-col">
              <h4 className="text-slate-100 font-bold mb-6 flex items-center gap-3 font-space text-xl">
                <Code className="text-blue-400" size={24} /> {t.kingmagic.web}
              </h4>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6 text-sm text-slate-300 flex-grow">
                <p className="mb-2"><strong className="text-blue-400">Landing Pages:</strong> Páginas focadas 100% em conversão e velocidade.</p>
                <p><strong className="text-blue-400">Sistemas e Sites:</strong> Arquitetura backend/frontend customizada, integrações e SEO.</p>
              </div>

              <ul className="space-y-4 font-mono text-sm text-slate-300">
                <li className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div>
                    <p>Landing Pages</p>
                    <p className="text-[10px] text-slate-500 mt-1">10 a 15 dias úteis</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">A partir de</span>
                    <span className="text-blue-400 font-bold text-base">R$ 1.000,00</span>
                  </div>
                </li>
                <li className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div>
                    <p>Sites Institucionais</p>
                    <p className="text-[10px] text-slate-500 mt-1">20 a 30 dias úteis</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">A partir de</span>
                    <span className="text-blue-400 font-bold text-base">R$ 2.500,00</span>
                  </div>
                </li>
                <li className="flex justify-between items-center pt-2">
                  <span className="text-slate-400">Sistemas & Apps (Sob demanda)</span>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">Taxa Base / Hora</span>
                    <span className="text-blue-400 font-bold text-base">A combinar.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>


        {/* ==========================================
          3. PROTOCOLOS (COMO FUNCIONAMOS)
      ========================================== */}
        <div className="space-y-8">
          <h3 className="text-2xl text-slate-100 font-playfair italic flex items-center gap-3 border-b border-slate-800 pb-4">
            <span className="text-green-400 font-space not-italic font-black">03.</span> {t.kingmagic.rules}
          </h3>

          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="text-green-400 shrink-0 mt-1" size={24} />
                <div>
                  <h5 className="font-bold text-slate-200 mb-2 font-space text-lg">I. Cronograma & Trava</h5>
                  <p className="text-sm text-slate-400 font-space leading-relaxed">Nossos prazos são em dias úteis. O relógio só inicia após a entrada financeira (50%) constar na conta e o briefing/materiais exigidos estarem inteiramente nas nossas mãos.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CheckCircle2 className="text-green-400 shrink-0 mt-1" size={24} />
                <div>
                  <h5 className="font-bold text-slate-200 mb-2 font-space text-lg">II. Engenharia de Refações</h5>
                  <p className="text-sm text-slate-400 font-space leading-relaxed">Projetos de marca e design exigem assertividade conceitual. Oferecemos 3 rodadas de ajustes rigorosas inclusas no valor. Modificações excedentes geram taxas à parte.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CheckCircle2 className="text-green-400 shrink-0 mt-1" size={24} />
                <div>
                  <h5 className="font-bold text-slate-200 mb-2 font-space text-lg">III. Gargalos Terceiros</h5>
                  <p className="text-sm text-slate-400 font-space leading-relaxed">Se precisarmos de uma aprovação sua ou de um acesso técnico e houver demora na resposta, o cronograma é sumariamente pausado para não furar a fila da produtora.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CheckCircle2 className="text-green-400 shrink-0 mt-1" size={24} />
                <div>
                  <h5 className="font-bold text-slate-200 mb-2 font-space text-lg">IV. Fechamento Financeiro</h5>
                  <p className="text-sm text-slate-400 font-space leading-relaxed">Modelo de segurança mútua: 50% de entrada para firmar o compromisso e 50% na aprovação técnica final, obrigatoriamente antes da entrega dos arquivos fonte.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Presentation />;
      case 'experience': return <Experience />;
      case 'blog': return <Blog />;
      case 'contact': return <Contact />;
      case 'kingmagic': return <KingMagic />;
      default: return <Presentation />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden">
      <GlobalStyles />

      {/* Mobile Header - Improved Glassmorphism and Spacing */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <span className="font-mono font-bold text-blue-400 text-lg">{`<LFRB/>`}</span>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="text-xl p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            {lang === 'pt' ? '🇺🇸' : '🇧🇷'}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-400 p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-screen container mx-auto max-w-7xl overflow-hidden">

        {/* Sidebar Navigation - Full Height Mobile Drawer */}
        <aside className={`
          fixed inset-0 z-40 bg-slate-950 md:bg-transparent md:static md:w-64 md:block border-r border-slate-800
          transition-transform duration-300 ease-in-out p-6 overflow-y-auto pt-24 md:pt-6
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="flex flex-col h-full">
            <div className="block mb-10 text-center md:text-left">

              {/* Avatar / Profile Pic */}
              <div className="mb-4">
                <img
                  src={personalData.profileImage}
                  alt="Profile - Luis Fernando Refatti Boff"
                  className="w-24 h-24 rounded-xl object-cover shadow-lg shadow-blue-500/20 border-2 border-slate-800 mx-auto md:mx-0"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback caso a imagem não carregue */}
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl hidden items-center justify-center text-3xl font-bold text-white shadow-lg shadow-blue-500/20 mx-auto md:mx-0 mb-4">
                  LB
                </div>
              </div>

              <h1 className="font-bold text-lg text-blue-400 mt-4 font-mono">{`<LFRB/>`}</h1>
              <p className="text-xs text-slate-500 font-mono mt-1">Analyst & Dev</p>
            </div>

            <nav className="space-y-3 md:space-y-2 flex-1">
              <NavLink
                active={activeTab === 'home'}
                onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }}
                icon={Terminal}
                label={t.nav.presentation}
              />
              <NavLink
                active={activeTab === 'experience'}
                onClick={() => { setActiveTab('experience'); setIsMobileMenuOpen(false); }}
                icon={Briefcase}
                label={t.nav.experience}
              />
              <NavLink
                active={activeTab === 'blog'}
                onClick={() => { setActiveTab('blog'); setIsMobileMenuOpen(false); }}
                icon={BookOpen}
                label={t.nav.blog}
              />
              <NavLink
                active={activeTab === 'contact'}
                onClick={() => { setActiveTab('contact'); setIsMobileMenuOpen(false); }}
                icon={Mail}
                label={t.nav.contact}
              />
              {/* Novo Link KINGMagic */}
              <NavLink
                active={activeTab === 'kingmagic'}
                onClick={() => { setActiveTab('kingmagic'); setIsMobileMenuOpen(false); }}
                icon={Wand2}
                label={t.nav.kingmagic}
              />
            </nav>

            <div className="pt-8 mt-auto border-t border-slate-800">
              <p className="text-xs text-slate-600 font-mono mb-4 text-center">
                Audaces Fortuna Juvat
              </p>
              <div className="flex justify-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full relative">

          {/* Top Bar Decoration (Desktop Only) */}
          <div className="hidden md:flex justify-between items-center px-12 py-4 text-sm font-mono text-slate-500 border-b border-slate-800 bg-slate-950 z-30">
            <span>{`src/pages/${activeTab}.tsx`}</span>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
                className="hover:text-slate-100 transition-colors flex items-center gap-2 border border-slate-800 px-3 py-1 rounded bg-slate-900"
              >
                <Languages size={14} />
                <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
              </button>
              <div className="flex gap-4 text-xs">
                <span>UTF-8</span>
                <span>cmd</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Online</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-12 scroll-smooth">
            <div className="max-w-4xl mx-auto pb-20 md:pb-0">
              {renderContent()}
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}