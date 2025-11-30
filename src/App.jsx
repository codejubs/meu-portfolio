import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { ArrowLeft, Bell, Shield, Smartphone, Loader2, ExternalLink, Cat, Menu, Sparkles, Lightbulb, Mic, Leaf, Mail, Github, Instagram, Send, Check, Star } from 'lucide-react';

/**
 * ==============================================================================
 * SEÇÃO 1: DADOS E CONSTANTES
 * ==============================================================================
 */

const SCRIPTS = [
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"
];

const FALLBACKS = {
  lumora: "https://images.unsplash.com/photo-1614064641938-3e85234e569c?auto=format&fit=crop&q=80&w=600",
  icon: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&q=80&w=200",
  mockup1: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=800",
  mockup2: "https://images.unsplash.com/photo-1512428559087-560fa5ce7d87?auto=format&fit=crop&q=80&w=800"
};

const TECH_ICONS = {
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  android: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  intellij: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  androidstudio: "/android-studio.png"
};

const IMAGES = {
  profile: "/eufoto.jpeg",
  
  // LUMORA
  lumora: "/capa-lumora.png",

  // CALMINA 
  calmina: "/capa-calmina.png",
  
  // MEOWME 
  meowme: "/tela-meowme.png",

  // ECOCARRY 
  ecocarry: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b43?auto=format&fit=crop&q=80&w=600",
};

const PROJECTS_DATA = [
  {
    id: 1,
    name: 'Lumora',
    url: 'https://github.com/Projeto-Lumora/Lumora_App',
    color: 'bg-purple-600',
    textColor: 'text-purple-600',
    lightColor: 'bg-purple-100',
    image: IMAGES.lumora,
    fallbackIcon: <Shield className="w-6 h-6 text-white" />,
    mockups: [ "/fundo-lumora.png", "/tela-lumora1.png", "/fundo-lumora.png", "/tela-lumora2.png"],
    shortDesc: 'Segurança para mulheres',
    fullDesc: 'Lumora é um aplicativo criado com empatia, tecnologia e propósito. Ele oferece ferramentas práticas para proteger, informar e acolher mulheres em situações de vulnerabilidade e tudo isso de forma leve, acessível e com muito carinho.',
    footer: 'Vencedor no DEMODAY 2025 do Instituto Proa.',
    features: ["Camuflagem (Uma calculadora funcional)", "Botão SOS rápido por Botão Atalho", "Áreas de Risco marcadas no mapa"]
  },
  {
    id: 2,
    name: 'Calmina',
    url: 'https://github.com/codejubs/Calmina-APP',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-600',
    lightColor: 'bg-yellow-100',
    image: IMAGES.calmina,
    fallbackIcon: <Bell className="w-6 h-6 text-white" />,
    mockups: [ "/mockup-calmina.png", "/tela-calmina.png", "/mockup-calmina.png", "/tela-calmina2.png"],
    shortDesc: 'Acalme sua mente',
    fullDesc: 'Calmina é um aplicativo desenvolvido para cuidar da saúde mental, ajudando a aliviar o estresse e a ansiedade do dia a dia.',
    footer: 'Desenvolvido usando linguagem KOTLIN.',
    features: ["Sons da Natureza e Ruídos", "Design Simples e Aconchegante", "Acalma a mente",]
  },
  {
    id: 3,
    name: 'MeowMe',
    url: 'https://github.com/codejubs/MeowMe-APP',
    color: 'bg-pink-400',
    textColor: 'text-pink-600',
    lightColor: 'bg-pink-100',
    image: IMAGES.meowme,
    fallbackIcon: <Smartphone className="w-6 h-6 text-white" />,
    mockups: [ "/fundo-meowme.png", "/meowme-tela2.png", "/fundo-meowme.png", "/meowme-tela.png"],
    shortDesc: 'Qual sua personalidade felina?',
    fullDesc: 'O projeto MeowMe é um aplicativo móvel com foco na personalidade felina, desenvolvido para a plataforma Android usando a linguagem Kotlin. O objetivo principal é permitir que os usuários descubram qual perfil de gato mais se alinha à sua própria personalidade.',
    footer: 'Desenvolvido usando linguagem KOTLIN.',
    features: ["Escolha Intuitiva", "Cores Confortantes", "Perfis Detalhados"]
  },
  {
    id: 4,
    name: 'Ecocarry',
    url: 'https://ecocarry.app',
    color: 'bg-emerald-600',
    textColor: 'text-emerald-600',
    lightColor: 'bg-emerald-100',
    image: IMAGES.ecocarry,
    fallbackIcon: <Leaf className="w-6 h-6 text-white" />,
    mockups: [IMAGES.ecocarryMockup1, IMAGES.ecocarryMockup2],
    shortDesc: 'E-commerce Sustentável',
    fullDesc: 'Ecocarry facilita a transição para um estilo de vida zero lixo.',
    footer: 'Em desenvolvimento.',
    features: ["Mapa a Granel", "Gamificação", "Guia Reciclagem", "Impacto Zero"]
  }
];

function useGsapLoader() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const loadScripts = async () => {
      if (window.gsap && window.Flip && window.ScrollTrigger && window.ScrollToPlugin) { setReady(true); return; }
      try {
        for (const src of SCRIPTS) {
          await new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
            const script = document.createElement('script'); script.src = src; script.async = true;
            script.onload = resolve; script.onerror = reject; document.body.appendChild(script);
          });
        }
        setTimeout(() => { if (window.gsap) { try { window.gsap.registerPlugin(window.Flip, window.ScrollTrigger, window.ScrollToPlugin); } catch (e) { console.warn(e); } setReady(true); } }, 200);
      } catch (error) { console.error("GSAP Load Error:", error); }
    };
    loadScripts();
  }, []);
  return ready;
}

const SafeImage = ({ src, fallbackSrc, alt, className, style, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => { setImgSrc(src); }, [src]);
  return ( <img src={imgSrc} alt={alt} className={className} style={style} onError={() => setImgSrc(fallbackSrc)} {...props} /> );
};

// --- TELA 1: HOME ---
const HomeView = ({ onScrollTo }) => {
  return (
    <div className="home-view fixed inset-0 w-full h-full bg-[#FFF8E7] z-0 flex flex-col overflow-hidden">
      <nav className="w-full px-6 py-6 md:px-12 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
           <div className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center bg-white shadow-sm"><Cat className="w-5 h-5 text-stone-800" /></div>
           <span className="text-xl font-bold text-stone-800 underline decoration-2 underline-offset-4 decoration-[#8B5CF6]">Home</span>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-stone-600">
           <button onClick={() => onScrollTo("#projects-section")} className="hover:text-stone-900 transition-colors">Projetos</button>
           <button className="hover:text-stone-900 transition-colors cursor-not-allowed opacity-50">Sobre</button>
           <button onClick={() => onScrollTo("#contact-section")} className="hover:text-stone-900 transition-colors">Contato</button>
        </div>
        <button className="md:hidden text-stone-800"><Menu /></button>
      </nav>
      <div className="flex-grow container mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-24 relative">
         <div className="home-text-content w-full lg:w-1/2 flex flex-col items-start text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-[#4A3B32] mb-2 leading-tight">Olá, eu sou a Jubs</h1>
            <h2 className="text-xl md:text-2xl text-stone-500 font-medium mb-8">Dev. Mobile & Design de Interfaces <br/> (Web/Mobile)</h2>
            <p className="text-lg md:text-xl text-[#5D4E44] leading-relaxed max-w-lg mb-8">O design vai além da aparência, é sobre como algo faz sentir. É criar experiências humanas, intuitivas e cheias de significado.</p>
            <button onClick={() => onScrollTo("#projects-section")} className="group flex items-center gap-2 text-stone-800 font-bold border-b-2 border-stone-800 pb-1 hover:text-purple-600 hover:border-purple-600 transition-all cursor-pointer z-50">Ver Projetos <ArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" size={20} /></button>
         </div>
         <div className="home-image-content w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative w-64 h-64 md:w-96 md:h-96">
               <div className="absolute inset-0 bg-stone-200 z-0 shadow-xl" style={{ borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%", backgroundImage: `url(${IMAGES.profile})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
               <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-stone-100 z-10 animate-bounce-slow"><Cat className="w-10 h-10 text-stone-700" /></div>
            </div>
         </div>
      </div>
      <div className="home-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-400 animate-pulse flex flex-col items-center"><span className="text-xs uppercase tracking-widest mb-2">Role para ver</span><div className="w-px h-8 bg-stone-300"></div></div>
    </div>
  );
};

// --- TELA 2: PROJETOS ---
const ProjectsGrid = ({ projects, onProjectClick }) => {
  return (
    <div id="projects-section" className="relative z-10 w-full min-h-screen bg-[#FDF6F0] rounded-t-3xl shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)] mt-[100vh] pt-24 pb-12">
       <div className="container mx-auto px-4 flex flex-col items-center justify-center">
         <header className="mb-16 text-center w-full">
           <h1 className="text-4xl md:text-5xl font-bold mb-4 text-stone-700">Meus Projetos</h1>
           <p className="text-stone-500 text-lg">Selecione para ver detalhes</p>
         </header>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
           {projects.map((project) => <ProjectCard key={project.id} project={project} onClick={onProjectClick} />)}
         </div>
       </div>
    </div>
  );
};

const ProjectCard = ({ project, onClick }) => {
  return (
    <div onClick={() => onClick(project)} className="project-card-wrapper cursor-pointer group perspective-1000">
      <div className={`project-card-${project.id} relative bg-white rounded-3xl p-2 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-[500px] flex flex-col items-center justify-between border border-stone-100`}>
        <div className="flex-grow flex items-center justify-center w-full relative overflow-hidden rounded-xl">
          <SafeImage src={project.image} fallbackSrc={FALLBACKS.lumora} alt={project.name} className={`grid-image w-full h-full object-cover rounded-xl drop-shadow-sm z-10`} />
        </div>
        <div className="text-center mt-3 mb-2">
          <h3 className="text-2xl font-bold mb-1 text-stone-700">{project.name}</h3>
          <p className="text-stone-400 text-sm font-medium">{project.shortDesc}</p>
        </div>
      </div>
    </div>
  );
};

// --- TELA 4: CONTATO ---
const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  useLayoutEffect(() => {
    window.gsap.to(".tech-icon-float", { y: -15, duration: 2, stagger: { each: 0.2, yoyo: true, repeat: -1 }, ease: "sine.inOut" });
  }, []);
  const handleSubmit = (e) => { e.preventDefault(); alert("Mensagem enviada com sucesso! (Demo)"); };
  const handleCopyEmail = () => { navigator.clipboard.writeText("dev.juliasilva@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div id="contact-section" className="relative z-10 w-full min-h-screen bg-[#FDF6F0] flex items-center py-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
         <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start z-20">
            <div className="flex gap-4 items-center justify-start w-full max-w-md mb-6">
                <button onClick={handleCopyEmail} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100 hover:scale-110 hover:border-red-200 hover:shadow-md transition-all group">{copied ? <Check className="w-5 h-5 text-green-500" /> : <Mail className="w-5 h-5 text-stone-400 group-hover:text-red-500 transition-colors" />}</button>
                <a href="https://instagram.com/jubsvisuals" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100 hover:scale-110 hover:border-pink-200 hover:shadow-md transition-all group"><Instagram className="w-5 h-5 text-stone-400 group-hover:text-pink-500 transition-colors" /></a>
                <a href="https://github.com/codejubs" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-100 hover:scale-110 hover:border-stone-400 hover:shadow-md transition-all group"><Github className="w-5 h-5 text-stone-400 group-hover:text-stone-800 transition-colors" /></a>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-stone-100 w-full max-w-md relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
               <Cat className="absolute top-6 right-6 text-stone-800 w-6 h-6 animate-pulse" />
               <h2 className="text-3xl font-extrabold text-stone-800 mb-8 tracking-tight">Entre em Contato</h2>
               <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex gap-4"><div className="w-1/2"><label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Nome</label><input type="text" placeholder="Jubs" className="w-full border-b-2 border-stone-100 py-2 text-stone-800 font-medium focus:outline-none focus:border-purple-500 transition-colors bg-transparent placeholder-stone-300" /></div><div className="w-1/2"><label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Sobrenome</label><input type="text" placeholder="Silva" className="w-full border-b-2 border-stone-100 py-2 text-stone-800 font-medium focus:outline-none focus:border-purple-500 transition-colors bg-transparent placeholder-stone-300" /></div></div>
                  <div><label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Telefone</label><input type="tel" placeholder="+55 (11) 99999-9999" className="w-full border-b-2 border-stone-100 py-2 text-stone-800 font-medium focus:outline-none focus:border-purple-500 transition-colors bg-transparent placeholder-stone-300" /></div>
                  <div><label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Email</label><input type="email" placeholder="dev.jubs@exemplo.com" className="w-full border-b-2 border-stone-100 py-2 text-stone-800 font-medium focus:outline-none focus:border-purple-500 transition-colors bg-transparent placeholder-stone-300" /></div>
                  <button type="submit" className="mt-4 w-full bg-stone-900 text-white font-bold py-4 rounded-xl hover:bg-purple-600 transition-all shadow-lg flex justify-center items-center gap-2 group active:scale-95">ENVIAR MENSAGEM <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></button>
               </form>
            </div>
         </div>
         <div className="w-full lg:w-1/2 flex justify-center items-center relative h-[400px] lg:h-[600px]">
            <div className="relative w-full h-full max-w-lg flex items-center justify-center">
               <img src={TECH_ICONS.android} className="tech-icon-float absolute top-10 left-0 w-24 h-24 md:w-32 md:h-32 drop-shadow-xl rotate-[-15deg] z-10" alt="Android" />
               <img src={TECH_ICONS.kotlin} className="tech-icon-float absolute top-0 right-10 w-24 h-24 md:w-32 md:h-32 drop-shadow-xl rotate-[15deg] z-10" style={{ animationDelay: '0.3s' }} alt="Kotlin" />
               <div className="tech-icon-float relative w-40 h-40 md:w-48 md:h-48 bg-[#1E1E1E] rounded-[40px] flex items-center justify-center shadow-2xl z-20" style={{ animationDelay: '0.6s' }}><img src={TECH_ICONS.figma} className="w-24 h-24 md:w-28 md:h-28" alt="Figma" /></div>
               <img src={TECH_ICONS.androidstudio} className="tech-icon-float absolute bottom-32 right-0 w-20 h-20 md:w-24 md:h-24 drop-shadow-xl rotate-[10deg] z-15" style={{ animationDelay: '1.2s' }} alt="Android Studio" />
               <div className="tech-icon-float absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 md:gap-6 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full border border-white/40 shadow-lg z-30 w-max" style={{ animationDelay: '0.9s' }}>
                  <img src={TECH_ICONS.mongodb} className="w-8 h-8 hover:scale-125 transition-transform object-contain" alt="MongoDB" />
                  <img src={TECH_ICONS.html} className="w-8 h-8 hover:scale-125 transition-transform object-contain" alt="HTML" />
                  <img src={TECH_ICONS.css} className="w-8 h-8 hover:scale-125 transition-transform object-contain" alt="CSS" />
                  <img src={TECH_ICONS.git} className="w-8 h-8 hover:scale-125 transition-transform object-contain" alt="Git" />
                  <img src={TECH_ICONS.intellij} className="w-8 h-8 hover:scale-125 transition-transform object-contain" alt="IntelliJ" />
               </div>
            </div>
         </div>
      </div>
      <div className="absolute bottom-4 w-full text-center text-stone-400 text-sm"><p>© 2025 Jubs Visuals.</p></div>
    </div>
  );
};

// --- TELA 3: DETALHES ---
const ProjectDetail = ({ project, onBack }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#FDF6F0] z-50 overflow-y-auto">
      <nav className="fixed top-0 left-0 w-full p-6 z-[80] flex justify-between items-center pointer-events-none">
         <div onClick={onBack} className="pointer-events-auto cursor-pointer bg-white/80 backdrop-blur-md p-3 rounded-full shadow-sm hover:scale-110 transition-transform text-stone-600 flex items-center gap-2"><ArrowLeft size={20} /> <span className="text-sm font-semibold">Voltar</span></div>
      </nav>
      <div className="container mx-auto px-4 pt-24 pb-12 flex flex-col lg:flex-row gap-8 items-start justify-center min-h-[90vh]">
        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start relative z-20">
          <div className="relative w-full aspect-[3/4] sticky top-24">
             <div className={`detail-bg opacity-0 absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full ${project.color} blur-2xl`}></div>
             <SafeImage src={project.image} fallbackSrc={FALLBACKS.lumora} alt={project.name} className="detail-main-image w-full h-full object-cover rounded-2xl drop-shadow-2xl relative z-10 opacity-0 translate-y-8" />
          </div>
        </div>
        <div className="detail-content w-full lg:w-2/3 flex flex-col text-left lg:pt-4 opacity-0 translate-y-8">
          <div className="mb-8">
            <h1 className="text-5xl lg:text-6xl font-bold mb-2 text-stone-800">{project.name}</h1>
            <a href={project.url} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 ${project.textColor} hover:opacity-75 transition-opacity font-medium group text-lg`}><ExternalLink size={20} className="group-hover:scale-110 transition-transform"/> <span className="underline decoration-transparent group-hover:decoration-current transition-all">{project.url}</span></a>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full items-start">
            <div className="flex flex-col gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-stone-100">
                    <h2 className="text-2xl font-bold text-stone-700 mb-3">Sobre o Projeto</h2>
                    <p className="text-lg text-stone-600 leading-relaxed">{project.fullDesc}</p>
                    {project.footer && <p className="text-sm text-stone-400 mt-4 italic">{project.footer}</p>}
                </div>
                {project.features && (
                    <div className="w-full">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2"><Star className="w-4 h-4" /> Funcionalidades</h3>
                        <div className="flex flex-col gap-3">
                            {project.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                                    <div className={`flex-shrink-0 p-2 rounded-full ${project.lightColor}`}><Check className={`w-5 h-5 ${project.textColor}`} /></div>
                                    <span className="text-stone-700 font-medium text-base">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-8 w-full">
                <h3 className="text-lg font-bold text-stone-400 uppercase tracking-widest mb-2 xl:hidden">Galeria</h3>
                
                {/* BLOCO 1: CARD 3D */}
                {project.mockups && project.mockups.length >= 2 && (
                    <div className="w-full">
                        <div className="relative w-full h-[240px] group perspective-1000 z-10">
                            <div className="absolute inset-0 bg-white rounded-[32px] p-2 shadow-xl border border-stone-100 z-0 transition-transform duration-500 group-hover:scale-[1.02]">
                                 <SafeImage src={project.mockups[0]} fallbackSrc={FALLBACKS.mockup1} className="w-full h-full object-cover rounded-[24px]" alt="Fundo do Card" />
                            </div>
                            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-visible">
                                <div className="relative transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) transform-gpu group-hover:rotate-x-[8deg] group-hover:rotate-y-[-12deg] group-hover:translate-y-[-40px] group-hover:scale-105">
                                    <SafeImage src={project.mockups[1]} fallbackSrc={FALLBACKS.mockup2} className="w-auto drop-shadow-2xl pointer-events-none" style={{ height: '400px' }} alt="Mockup 3D" />
                                </div>
                            </div>
                        </div>
                         <p className="text-center text-stone-400 text-sm mt-4 italic">Passe o mouse para interagir</p>
                    </div>
                )}

                {/* BLOCO 2: CARD 3D SECUNDÁRIO */}
                {project.mockups && project.mockups.length >= 4 && (
                    <div className="w-full mt-12">
                        <div className="relative w-full h-[240px] group perspective-1000 z-0">
                            <div className="absolute inset-0 bg-white rounded-[32px] p-2 shadow-xl border border-stone-100 z-0 transition-transform duration-500 group-hover:scale-[1.02]">
                                 <SafeImage src={project.mockups[2]} fallbackSrc={FALLBACKS.mockup1} className="w-full h-full object-cover rounded-[24px]" alt="Fundo do Card 2" />
                            </div>
                            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-visible">
                                <div className="relative transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) transform-gpu group-hover:rotate-x-[8deg] group-hover:rotate-y-[12deg] group-hover:translate-y-[-40px] group-hover:scale-105">
                                    <SafeImage src={project.mockups[3]} fallbackSrc={FALLBACKS.mockup2} className="w-auto object-contain drop-shadow-2xl pointer-events-none" style={{ height: '400px', maxHeight: 'none' }} alt="Mockup 3D Flutuante 2" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- APP MAIN ---
export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const gsapReady = useGsapLoader();
  const isAnimating = useRef(false);

  useLayoutEffect(() => {
    if (!gsapReady) return;
    const ctx = window.gsap.context(() => {
      window.gsap.to(".home-text-content", { scrollTrigger: { trigger: document.body, start: "top top", end: "50% top", scrub: 0.5 }, y: -50, opacity: 0 });
      window.gsap.to(".home-image-content", { scrollTrigger: { trigger: document.body, start: "top top", end: "50% top", scrub: 0.5 }, y: -30, opacity: 0, scale: 0.95 });
      window.gsap.to(".home-scroll-indicator", { scrollTrigger: { trigger: document.body, start: "10px top", end: "100px top", scrub: true }, opacity: 0 });
      window.gsap.from(".home-text-content > *", { y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 });
      window.gsap.from(".home-image-content", { scale: 0.8, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.6)", delay: 0.4 });
    });
    return () => ctx.revert();
  }, [gsapReady]);

  const scrollToSection = (id) => { if (window.gsap) window.gsap.to(window, { duration: 0.1, scrollTo: id }); };
  const handleProjectClick = (project) => { if (isAnimating.current || !gsapReady) return; setSelectedProject(project); };

  const handleBackFromDetail = () => {
    if (isAnimating.current || !selectedProject || !gsapReady) return;
    isAnimating.current = true;
    const tl = window.gsap.timeline({ onComplete: () => { isAnimating.current = false; setSelectedProject(null); } });
    
    // Animações de saída (SEM O ÍCONE)
    tl.to(".detail-main-image", { y: 50, opacity: 0, scale: 0.95, duration: 0.6, ease: "power2.inOut" }, 0.1);
    tl.to([".detail-content", ".detail-extras", ".detail-bg"], { opacity: 0, y: 20, duration: 0.5, ease: "power2.inOut" }, 0.1);
  };

  useLayoutEffect(() => {
    if (!gsapReady) return;
    const ctx = window.gsap.context(() => {
      if (selectedProject) {
        // Animações de entrada (SEM O ÍCONE)
        window.gsap.fromTo(".detail-main-image", { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out", delay: 0.1 });
        window.gsap.to(".detail-content", { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power2.out" });
        window.gsap.to(".detail-extras", { opacity: 0.8, y: 0, duration: 0.6, delay: 0.5, ease: "power2.out" });
        window.gsap.fromTo(".detail-bg", { opacity: 0, scale: 0.5 }, { opacity: 0.2, scale: 1, duration: 1, delay: 0.2, ease: "power2.out" });
      }
    });
    return () => ctx.revert();
  }, [selectedProject, gsapReady]);

  if (!gsapReady) { return ( <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center text-stone-600 gap-2"> <Loader2 className="animate-spin text-purple-600" /> Carregando... </div> ); }

  return (
    <div className="bg-[#FFF8E7] font-sans text-stone-800 w-full min-h-screen relative">
      <HomeView onScrollTo={scrollToSection} />
      <div className="relative z-10 w-full">
         <ProjectsGrid projects={PROJECTS_DATA} onProjectClick={handleProjectClick} />
         <ContactSection />
      </div>
      {selectedProject && <ProjectDetail project={selectedProject} onBack={handleBackFromDetail} />}
    </div>
  );
}