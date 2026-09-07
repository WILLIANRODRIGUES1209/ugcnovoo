import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ChevronDown, Menu, ArrowRight, Store, Users, Play, Workflow, Clapperboard, Video, X } from 'lucide-react';

const DEFAULT_PLAN = {
  mensalPrice: "245,00",
  mensalLink: "https://checkout.applyfy.com.br/checkout/cmrmjhw9a0k3001pq2mwbr436?offer=LVYD5CS",
  vitalicioPrice: "497,00",
  vitalicioLink: "https://checkout.applyfy.com.br/checkout/cmrmjhw9a0k3001pq2mwbr436?offer=OVP8P7Y"
};

const COUPONS = {
  "CREATOR40": {
    mensalOriginal: "245,00",
    mensalPrice: "167,00",
    mensalLink: "https://checkout.applyfy.com.br/checkout/cmrmjhw9a0k3001pq2mwbr436?offer=4C8P2PM",
    vitalicioOriginal: "497,00",
    vitalicioInstallments: "12x 24,19",
    vitalicioCash: "227,00",
    vitalicioLink: "https://checkout.applyfy.com.br/checkout/cmrmjhw9a0k3001pq2mwbr436?offer=FRH8DCM",
    discountText: "- DESCONTO ESPECIAL",
    badgeText: "+ BIBLIOTECA DE PROMPTS DESBLOQUEADO",
  },
  "HOJE40": {
    mensalOriginal: "245,00",
    mensalPrice: "145,00",
    mensalLink: "https://checkout.applyfy.com.br/checkout/cmrjfn9730jr901olwnzyqr8p?offer=K6IXWWQ",
    vitalicioOriginal: "497,00",
    vitalicioInstallments: "12x 20,99",
    vitalicioCash: "197,00",
    vitalicioLink: "https://checkout.applyfy.com.br/checkout/cmrjfn9730jr901olwnzyqr8p?offer=OO947ZE",
    discountText: "- PROMOÇÃO ATIVADA",
    badgeText: "+ KIT VIRAL PREMIUM DESBLOQUEADO",
  }
};


const FAQS = [
  {
    question: "O que é o Creator Hub?",
    answer: "O Creator Hub é uma plataforma baseada em inteligência artificial que ajuda você a criar vídeos e imagens de alta qualidade para seus produtos em poucos minutos, sem precisar gravar ou editar. Nós fornecemos roteiros, dublagens, avatares e um estúdio virtual completo."
  },
  {
    question: "Preciso ter experiência com IA ou edição de vídeo?",
    answer: "Absolutamente não. A plataforma foi construída para ser 100% intuitiva. Você só precisa escolher o formato que deseja criar, inserir algumas informações sobre o produto, e a nossa inteligência artificial cuida de toda a parte técnica e complexa."
  },
  {
    question: "Posso usar meus próprios produtos?",
    answer: "Sim! Você pode fazer o upload das imagens ou vídeos dos seus produtos originais. A IA vai analisar, limpar o fundo se necessário, e colocá-los em cenários hiper-realistas para a geração do seu conteúdo de vendas."
  },
  {
    question: "Como funcionam os avatares?",
    answer: "Temos uma biblioteca de avatares digitais ultra-realistas. Você pode escolher um avatar, digitar o seu roteiro e a nossa tecnologia vai gerar um vídeo do avatar falando o seu texto com sincronia labial perfeita e entonação natural, ideal para vídeos no TikTok e Reels."
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim. O plano mensal não tem qualquer tipo de fidelidade ou multa. Você pode cancelar sua assinatura com apenas dois cliques diretamente no seu painel de controle antes da próxima cobrança."
  },
  {
    question: "As criações são minhas?",
    answer: "Sim. Tudo o que você gera usando o Creator Hub, sejam roteiros, vídeos, locuções ou imagens, tem a licença comercial 100% transferida para você. Você pode usar livremente para monetizar e anunciar."
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer: "Aceitamos Pix (liberação imediata), Cartões de Crédito de todas as bandeiras (com parcelamento em até 12x para o plano vitalício), e Boleto Bancário (liberação em até 2 dias úteis)."
  }
];

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFeatureId, setActiveFeatureId] = useState('vitrine');

  const FEATURES = [
    {
      id: "vitrine",
      title: "VITRINE",
      index: "01 / 05",
      heading: <>Descubra os campeões <span className="text-[#FF2D85]">antes da concorrência.</span></>,
      desc: "Uma vitrine viva, atualizada a cada hora, com os produtos que estão bombando no momento. Salve seus favoritos e dispare a criação de conteúdo direto do card.",
      bullets: [
        "Curadoria atualizada de hora em hora",
        "Filtros por nicho e tendência",
        "Geração de UGC com um clique"
      ],
      image: "/assets/vitrine.png",
      Icon: Store
    },
    {
      id: "avatares",
      title: "AVATARES",
      index: "02 / 05",
      heading: <>Rostos que geram <span className="text-[#FF2D85]">conexão e vendas.</span></>,
      desc: "Um elenco diversificado de avatares ultra-realistas prontos para representar sua marca. Encontre o perfil perfeito para o seu nicho e crie vídeos que engajam.",
      bullets: [
        "Dezenas de perfis e idades",
        "Sincronização labial perfeita",
        "Expressões naturais e persuasivas"
      ],
      image: "/assets/avatares.png",
      Icon: Users
    },
    {
      id: "revolucao",
      title: "REVOLUÇÃO",
      index: "03 / 05",
      heading: <>A <span className="text-[#FF2D85]">revolução</span> na criação de vídeos.</>,
      desc: "Deixe a inteligência artificial roteirizar e dirigir seus anúncios. Scripts validados por milhões de visualizações, adaptados para o seu produto em segundos.",
      bullets: [
        "Frameworks de alta conversão",
        "Geração instantânea de roteiros",
        "Vozes neurais ultra-realistas"
      ],
      image: "/assets/revolucao.png",
      Icon: Sparkles
    },
    {
      id: "fluxo",
      title: "FLUXO",
      index: "04 / 05",
      heading: <>Um <span className="text-[#FF2D85]">fluxo de trabalho</span> contínuo.</>,
      desc: "Gerencie todas as suas campanhas e criativos em um só lugar. Do planejamento à exportação, tudo foi desenhado para economizar o seu tempo.",
      bullets: [
        "Organização por projetos",
        "Histórico de versões",
        "Exportação em massa"
      ],
      image: "/assets/fluxo.png",
      Icon: Workflow
    },
    {
      id: "tokeditor",
      title: "TOK EDITOR",
      index: "05 / 05",
      heading: <><span className="text-[#FF2D85]">Tok Editor:</span> Nascido para viralizar.</>,
      desc: "Um editor de vídeo pensado exclusivamente para formatos curtos. Adicione legendas dinâmicas, transições virais e efeitos sonoros com poucos cliques.",
      bullets: [
        "Legendas animadas automáticas",
        "Biblioteca de sons virais",
        "Formatos otimizados para TikTok"
      ],
      image: "/assets/editor.jpg",
      Icon: Video
    }
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cupomParam = params.get('cupom');
    
    if (cupomParam) {
      const code = cupomParam.toUpperCase();
      if ((COUPONS as any)[code]) {
        setAppliedCoupon((COUPONS as any)[code]);
        setCouponInput(code);
      }
    }
  }, []);

  const activeFeature = FEATURES.find(f => f.id === activeFeatureId) || FEATURES[0];

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetId = (id === 'recursos' || id === 'galeria') ? 'solucoes' : id;
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleApplyCoupon = () => {
    const code = couponInput.toUpperCase().trim();
    if (COUPONS[code]) {
      setAppliedCoupon(COUPONS[code]);
    } else {
      alert('Cupom inválido ou expirado.');
    }
  };

  return (
    <>
<div>
  <div id="root">
    <div role="region" aria-label="Notifications (F8)" tabIndex={-1} style={{pointerEvents: 'none'}}>
      <ol tabIndex={-1} className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" />
    </div>
    <div className="min-h-screen bg-[#05060F] relative" >
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#05060F]">
        <div className="absolute inset-0 grid-bg opacity-100" />
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#FF2D85]/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF2D85]/5 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#080A18]/50 blur-[120px] rounded-full" />
      </div>
      <div className="relative z-10">
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl pointer-events-none">
          <nav className={`relative transition-all duration-300 ${mobileMenuOpen ? 'rounded-3xl' : 'rounded-full'} border shadow-2xl overflow-hidden pointer-events-auto backdrop-blur-2xl bg-[#080A18]/90 border-white/10`}>
            <div className="px-6 h-12 sm:h-14 flex items-center justify-between relative z-10"><a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="flex items-center gap-2"><img src="/assets/creator-hub-logo.png" alt="Creator Hub" width={24} height={24} className="h-6 w-auto" /><span className="font-medium text-white text-base tracking-tight hidden sm:inline-block font-sans">Creator Hub</span></a>
              <div className="hidden md:flex items-center gap-8"><a href="#solucoes" onClick={(e) => scrollToSection(e, 'solucoes')} className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Recursos</a><a href="#solucoes" onClick={(e) => scrollToSection(e, 'solucoes')} className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Galeria</a><a href="#como-funciona" onClick={(e) => scrollToSection(e, 'como-funciona')} className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Como funciona</a><a href="#planos" onClick={(e) => scrollToSection(e, 'planos')} className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">Planos</a><a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors">FAQ</a></div>
              <div className="hidden md:flex items-center gap-3"><a href="https://app.creattorhub.com.br/indique" className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[12px] font-bold hover:bg-white/10 transition-all uppercase tracking-wider">Entrar</a><a href="#planos" onClick={(e) => scrollToSection(e, 'planos')} className="px-5 py-2 rounded-full bg-[#FF2D85]/15 border border-[#FF2D85]/30 backdrop-blur-md text-white text-[12px] font-bold hover:bg-[#FF2D85]/25 transition-all hover:shadow-[0_0_15px_rgba(255,45,133,0.2)] uppercase tracking-wider relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF2D85]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /><span className="relative z-10">Assinar</span>
                </a></div><button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all hover:bg-white/10" aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-5 border-t border-white/10 flex flex-col gap-3 bg-[#0A0C1A]/95 backdrop-blur-3xl md:hidden"
                >
                  <a href="#solucoes" onClick={(e) => scrollToSection(e, 'solucoes')} className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors py-1">Recursos</a>
                  <a href="#solucoes" onClick={(e) => scrollToSection(e, 'solucoes')} className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors py-1">Galeria</a>
                  <a href="#como-funciona" onClick={(e) => scrollToSection(e, 'como-funciona')} className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors py-1">Como funciona</a>
                  <a href="#planos" onClick={(e) => scrollToSection(e, 'planos')} className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors py-1">Planos</a>
                  <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors py-1">FAQ</a>
                  <div className="pt-2 flex flex-col gap-2">
                    <a href="https://app.creattorhub.com.br/indique" className="w-full py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-center text-[12px] font-bold uppercase tracking-wider">Entrar</a>
                    <a href="#planos" onClick={(e) => scrollToSection(e, 'planos')} className="w-full py-2.5 rounded-full bg-[#FF2D85] text-white text-center text-[12px] font-bold uppercase tracking-wider">Assinar</a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
        <main>
          <section id="inicio" className="relative flex flex-col lg:min-h-screen lg:justify-end overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#0F0817] to-[#05060F]">
            <div className="relative w-full lg:absolute lg:inset-0 lg:z-0 lg:h-full">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05060F]/5 via-transparent to-[#05060F] z-10" /><img src="/assets/creator-hub-banner.png" alt="Creator Hub Background" loading="eager" className="block w-full h-auto lg:h-full lg:object-cover" />
              <div className="absolute inset-x-0 bottom-4 sm:bottom-8 z-20 lg:hidden">
                <div className="container mx-auto px-6 max-w-7xl">
                  <div className="flex flex-row items-center justify-center gap-3 w-full max-w-[400px] sm:max-w-[500px] mx-auto px-2" ><a href="#planos" onClick={(e) => scrollToSection(e, 'planos')} className="flex-1 px-4 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#FF2D85]/20 border border-[#FF2D85]/40 backdrop-blur-xl text-white text-[10px] xs:text-[11px] sm:text-[13px] font-bold hover:bg-[#FF2D85]/30 hover:shadow-[0_0_25px_rgba(255,45,133,0.2)] transition-all uppercase tracking-wider flex items-center justify-center gap-2 group relative overflow-hidden whitespace-nowrap"><span className="relative z-10 flex items-center gap-2">Assinar agora <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-3.5 h-3.5 group-hover:translate-x-1 transition-transform">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg></span></a><a href="#como-funciona" onClick={(e) => scrollToSection(e, 'como-funciona')} className="flex-1 px-4 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white/5 border border-white/20 backdrop-blur-md text-[#C9D2E3] text-[10px] xs:text-[11px] sm:text-[13px] font-medium hover:bg-white/10 transition-all text-center whitespace-nowrap">Ver como funciona</a></div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block container mx-auto px-6 max-w-7xl relative z-20 w-full mb-24">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                <div className="flex flex-row items-center justify-center gap-3" ><a href="#planos" onClick={(e) => scrollToSection(e, 'planos')} className="px-8 py-3.5 rounded-full bg-[#FF2D85]/20 border border-[#FF2D85]/40 backdrop-blur-xl text-white text-[13px] font-bold hover:bg-[#FF2D85]/30 hover:shadow-[0_0_25px_rgba(255,45,133,0.2)] transition-all uppercase tracking-wider flex items-center justify-center gap-2 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF2D85]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" /><span className="relative z-10 flex items-center gap-2">Assinar agora <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-3.5 h-3.5 group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg></span>
                  </a><a href="#como-funciona" onClick={(e) => scrollToSection(e, 'como-funciona')} className="px-8 py-3.5 rounded-full bg-white/5 border border-white/20 backdrop-blur-md text-[#C9D2E3] text-[13px] font-medium hover:bg-white/10 transition-all text-center whitespace-nowrap">Ver como funciona</a></div>
              </div>
            </div>
            <div className="w-full py-4 relative z-20 bg-black border-y border-white/5">
              <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
                <p className="text-[9px] font-bold text-[#FF2D85]/80 uppercase tracking-[0.2em] whitespace-nowrap">Marketplaces Integrados:</p>
                <div className="overflow-hidden relative flex-1 max-w-4xl">
                  <div className="flex gap-12 items-center animate-marquee whitespace-nowrap">
                    <div className="flex gap-12 items-center"><span className="text-xs font-bold text-white/40 uppercase tracking-widest">Shopee</span><span className="text-xs font-bold text-white/40 uppercase tracking-widest">Amazon</span><span className="text-xs font-bold text-white/40 uppercase tracking-widest">TikTok Shop</span><span className="text-xs font-bold text-white/40 uppercase tracking-widest">Mercado Livre</span><span className="text-xs font-bold text-white/40 uppercase tracking-widest">Aliexpress</span></div>
                    <div className="flex gap-12 items-center"><span className="text-xs font-bold text-white/40 uppercase tracking-widest">Shopee</span><span className="text-xs font-bold text-white/40 uppercase tracking-widest">Amazon</span><span className="text-xs font-bold text-white/40 uppercase tracking-widest">TikTok Shop</span><span className="text-xs font-bold text-white/40 uppercase tracking-widest">Mercado Livre</span><span className="text-xs font-bold text-white/40 uppercase tracking-widest">Aliexpress</span></div>
                    <div className="flex gap-12 items-center"><span className="text-xs font-bold text-white/40 uppercase tracking-widest">Shopee</span><span className="text-xs font-bold text-white/40 uppercase tracking-widest">Amazon</span><span className="text-xs font-bold text-white/40 uppercase tracking-widest">TikTok Shop</span><span className="text-xs font-bold text-white/40 uppercase tracking-widest">Mercado Livre</span><span className="text-xs font-bold text-white/40 uppercase tracking-widest">Aliexpress</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div >
            <section id="solucoes" className="py-24 relative overflow-hidden">
              <div id="recursos" className="absolute -top-24 left-0 pointer-events-none" />
              <div id="galeria" className="absolute -top-24 left-0 pointer-events-none" />
              <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
              <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-20">
                  <p className="text-[#FF2D85] text-[10px] font-bold tracking-[0.3em] uppercase mb-4">SOLUÇÕES INTELIGENTES</p>
                  <h2 className="text-4xl md:text-6xl font-medium mb-6 text-white tracking-tight">Tudo o que você precisa para <br /><span className="text-[#FF2D85]">escalar seus resultados.</span></h2>
                  <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-light mb-12">Descubra as ferramentas que vão transformar seu processo de criação de conteúdo.</p>
                </div>
                <div className="glass-premium rounded-[2.5rem] overflow-hidden border-white/[0.08] flex flex-col lg:flex-row min-h-[600px] mb-12 relative">
                  <motion.div 
                    key={activeFeature.id + "-content"}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="lg:w-[40%] p-8 sm:p-12 flex flex-col justify-center"
                  >
                    <div>
                      <div className="text-[11px] font-bold text-[#FF2D85]/60 tracking-[0.2em] mb-6 flex items-center gap-2"><span>{activeFeature.index}</span>
                        <div className="h-[1px] w-8 bg-white/10" /><span className="uppercase">{activeFeature.title}</span>
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-medium text-white mb-6 tracking-tight leading-tight">{activeFeature.heading}</h3>
                      <p className="text-[#94A3B8] font-light leading-relaxed mb-8">{activeFeature.desc}</p>
                      <div className="space-y-4">
                        {activeFeature.bullets.map((bullet, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#FF2D85]/10 border border-[#FF2D85]/20 flex items-center justify-center">
                              <Check className="w-3 h-3 text-[#FF2D85]" />
                            </div>
                            <span className="text-sm text-[#C9D2E3] font-light">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    key={activeFeature.id + "-image"}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="lg:w-[60%] bg-[#0A0C1A] relative border-l border-white/5 flex items-center justify-center p-8"
                  >
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
                      <img 
                        src={activeFeature.image} 
                        alt={activeFeature.title} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          if (target.src && !target.src.includes('vitrine.png')) {
                            target.src = '/assets/vitrine.png';
                          }
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-24">
                  {FEATURES.map((feature) => {
                    const isActive = activeFeatureId === feature.id;
                    const Icon = feature.Icon;
                    return (
                      <button 
                        key={feature.id}
                        onClick={() => setActiveFeatureId(feature.id)}
                        className={`px-5 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 group ${isActive ? 'bg-[#FF2D85]/20 border-[#FF2D85]/40 text-white shadow-[0_0_20px_rgba(255,45,133,0.15)]' : 'bg-white/[0.03] border-white/10 text-[#94A3B8] hover:bg-white/[0.08] backdrop-blur-md'}`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF2D85]' : 'text-[#94A3B8]'}`} />
                        <span className="text-[11px] font-medium uppercase tracking-widest">{feature.title}</span>
                      </button>
                    );
                  })}
                </div>
                <motion.div 
                  id="como-funciona" 
                  className="mt-40 mb-24"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="lg:w-1/2 text-left">
                      <p className="text-[#A78BFA] text-[10px] font-bold tracking-[0.3em] uppercase mb-4" >COMO FUNCIONA</p>
                      <h2 className="text-4xl md:text-6xl font-medium mb-6 text-white tracking-tight leading-tight" >Três passos. <br /><span className="text-gradient">Resultado de estúdio.</span></h2>
                      <p className="text-[#94A3B8] text-lg max-w-md font-light leading-relaxed mb-8" >Do briefing à publicação em minutos. Clique nos cards para trazer para frente e ler o fluxo completo.</p>
                    </div>
                    <div className="lg:w-1/2 relative h-[450px] w-full max-w-[500px] flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        {[
                          {
                            title: 'Escolha um produto',
                            desc: 'Selecione um produto ou envie o seu.',
                            step: '01'
                          },
                          {
                            title: 'Crie seu conteúdo',
                            desc: 'Gere vídeos, imagens e roteiros com IA.',
                            step: '02'
                          },
                          {
                            title: 'Publique e venda',
                            desc: 'Use o conteúdo em TikTok Shop, anúncios ou redes sociais.',
                            step: '03'
                          }
                        ].map((item, index) => {
                          const isActive = activeStep === index;
                          const offset = index - activeStep;
                          
                          // Configurações de posição para empilhar
                          let rotate = 0;
                          let translateX = 0;
                          let translateY = 0;
                          let zIndex = 30 - index;
                          
                          if (isActive) {
                            rotate = 0;
                            translateX = 0;
                            translateY = -20;
                            zIndex = 40;
                          } else if (index === (activeStep + 1) % 3) {
                            rotate = 8;
                            translateX = 30;
                            translateY = 10;
                            zIndex = 30;
                          } else {
                            rotate = -8;
                            translateX = -30;
                            translateY = 10;
                            zIndex = 20;
                          }
                          
                          return (
                            <motion.div 
                              key={index}
                              onClick={() => setActiveStep(index)}
                              initial={false}
                              animate={{ 
                                rotate: rotate, 
                                x: translateX, 
                                y: translateY,
                                scale: isActive ? 1 : 0.95
                              }}
                              transition={{ type: "spring", stiffness: 260, damping: 20 }}
                              style={{ zIndex }}
                              className="glass-premium rounded-[2.5rem] p-8 sm:p-10 w-[280px] sm:w-[320px] h-[380px] absolute border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between cursor-pointer bg-[#0A0C1A]/90 hover:border-white/20"
                            >
                              <div>
                                <div className="text-[10px] font-bold text-[#A78BFA]/80 tracking-[0.3em] mb-6 uppercase">PASSO {item.step}</div>
                                <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-[#94A3B8] text-sm font-light leading-relaxed">{item.desc}</p>
                              </div>
                              <div className="flex justify-between items-end">
                                <div className="h-[1px] bg-white/10 flex-1 mr-4 mb-2" />
                                <span className="text-[10px] font-mono text-[#A78BFA]/40">{item.step}/03</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
          <div >
            <motion.section id="planos" className="py-24 relative overflow-hidden" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF2D85]/5 blur-[150px] pointer-events-none" />
              <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                  <p className="text-[#FF2D85] text-[10px] font-bold tracking-[0.3em] uppercase mb-4" >PLANOS</p>
                  <h2 className="text-4xl md:text-6xl font-medium mb-6 text-white tracking-tight" >Escolha o ritmo da sua <br /><span className="text-[#FF2D85]">criação.</span></h2>
                  <p className="text-[#94A3B8] text-lg max-w-xl mx-auto font-light" >Cancele quando quiser. Sem letras miúdas.</p>
                  <div className="mt-10 flex flex-col items-center gap-4" >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
                      {appliedCoupon ? (
                        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-[#FF2D85]/20 to-[#9d174d]/20 border border-[#FF2D85]/30 rounded-2xl py-3 px-6 w-full text-center shadow-[0_0_20px_rgba(255,45,133,0.15)]">
                           <div className="flex items-center justify-center gap-2 mb-1">
                             <span className="text-xl">🎉</span>
                             <span className="text-[#FF2D85] font-bold text-[12px] tracking-widest uppercase">CUPOM APLICADO {appliedCoupon.discountText}</span>
                           </div>
                           <span className="text-white text-[10px] font-bold tracking-widest uppercase">{appliedCoupon.badgeText}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                          <div className="relative w-full max-w-[320px]">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                              <Sparkles className="w-4 h-4 text-white/20" />
                            </div>
                            <input type="text" placeholder="TEM UM CUPOM DE INDICAÇÃO?" className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-[10px] font-medium tracking-widest text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF2D85]/50 transition-colors uppercase" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
                          </div>
                          <button onClick={handleApplyCoupon} className="bg-[#FF2D85] hover:bg-[#E62976] disabled:opacity-50 text-white text-[10px] font-bold py-3 px-8 rounded-full transition-all uppercase tracking-widest flex items-center justify-center gap-2">Aplicar</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
                  <div className="relative glass-premium rounded-[1.5rem] p-6 flex flex-col h-full transition-all duration-500 border-white/[0.05] bg-white/[0.02] group/card" >
                    <div className="mb-4 relative z-10">
                      <h3 className="text-lg font-medium text-white mb-1">Mensal</h3>
                      <p className="text-[#94A3B8] text-[11px] font-light leading-relaxed max-w-[200px]">Acesso completo ao Creator Hub com flexibilidade total.</p>
                    </div>
                    <div className="mb-6 relative z-10">
                      {appliedCoupon ? (
                         <div className="flex flex-col items-start gap-1">
                           <div className="flex items-baseline justify-between w-full gap-2">
                             <span className="text-[#94A3B8] text-lg line-through font-medium">R$ {appliedCoupon.mensalOriginal}</span>
                             <span className="text-[#94A3B8] text-[9px] font-light uppercase tracking-wider">/MÊS</span>
                           </div>
                           <span className="text-4xl font-bold text-[#FF2D85] mb-2">R$ {appliedCoupon.mensalPrice}</span>
                         </div>
                      ) : (
                         <div className="flex items-baseline justify-between w-full gap-2"><span className="text-3xl font-medium text-white">R$ {DEFAULT_PLAN.mensalPrice}</span><span className="text-[#94A3B8] text-[9px] font-light uppercase tracking-wider">/MÊS</span></div>
                      )}
                    </div>
                    <div className="space-y-2 mb-6 flex-grow relative z-10">
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Acesso mensal à plataforma</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Espionagem de produtos em alta</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Gerador de vídeos com IA</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Gerador de imagens com IA</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Calendário de postagens</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Tutorial completo passo a passo</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Indique e Ganhe</span></div>
                    </div><a href={appliedCoupon ? appliedCoupon.mensalLink : DEFAULT_PLAN.mensalLink} className="w-full py-3.5 rounded-full font-medium text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-white shadow-inner relative z-10">ASSINAR MENSAL</a>
                  </div>
                  <div className="relative glass-premium rounded-[1.5rem] p-6 flex flex-col h-full transition-all duration-500 group/card shadow-[0_0_50px_rgba(255,45,133,0.1)] border-[#FF2D85]/30 bg-[#FF2D85]/[0.03]" >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#FF2D85] text-white text-[10px] font-bold flex items-center gap-2 whitespace-nowrap shadow-lg uppercase tracking-wider z-20 transition-transform duration-300 group-hover/card:scale-110">MELHOR CUSTO-BENEFÍCIO</div>
                    <div className="mb-4 relative z-10">
                      <h3 className="text-lg font-medium text-white mb-1">Vitalício</h3>
                      <p className="text-[#94A3B8] text-[11px] font-light leading-relaxed max-w-[200px]">Pague uma vez. Use para sempre, sem mensalidade.</p>
                    </div>
                    <div className="mb-6 relative z-10">
                      {appliedCoupon ? (
                         <div className="flex flex-col items-start gap-1">
                           <span className="text-[#94A3B8] text-sm line-through font-medium">R$ {appliedCoupon.vitalicioOriginal}</span>
                           <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D85] to-[#FF8A65] mb-2">{appliedCoupon.vitalicioInstallments}</span>
                           <div className="bg-[#FF2D85]/20 border border-[#FF2D85]/40 rounded-md py-1 px-3 mb-2 flex items-center gap-2">
                             <span className="text-[12px]">🔥</span>
                             <span className="text-[#FF2D85] font-bold text-[10px] tracking-wider">ACESSO VITALÍCIO LIBERADO</span>
                           </div>
                           <span className="text-[#FF2D85] text-[14px] font-bold">ou R$ {appliedCoupon.vitalicioCash} à vista</span>
                         </div>
                      ) : (
                         <div className="flex items-baseline justify-between w-full gap-2"><span className="text-3xl font-medium text-white">R$ {DEFAULT_PLAN.vitalicioPrice}</span><span className="text-[#94A3B8] text-[9px] font-light uppercase tracking-wider">PAGAMENTO ÚNICO</span></div>
                      )}
                    </div>
                    <div className="space-y-2 mb-6 flex-grow relative z-10">
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Tudo do plano Mensal</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Acesso vitalício à plataforma</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Gerador de vídeos com IA</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Gerador de imagens com IA</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Suporte prioritário</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Comunidade Exclusiva</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Treinamento Personalizado</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Indique e Ganhe</span></div>
                      <div className="flex items-center gap-2.5 group/item"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-2.5 h-2.5 text-[#FF2D85] opacity-50">
                          <path d="M20 6 9 17l-5-5" />
                        </svg><span className="text-[#94A3B8] text-[10px] font-light group-hover/item:text-white transition-colors">Bônus exclusivos</span></div>
                    </div><a href={appliedCoupon ? appliedCoupon.vitalicioLink : DEFAULT_PLAN.vitalicioLink} className="w-full py-3.5 rounded-full font-medium text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 hover:bg-white/[0.08] text-white shadow-inner relative z-10 hover:border-[#FF2D85]/30 bg-white/[0.05]">GARANTIR VITALÍCIO</a>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
          <div >
            <section id="faq" className="py-24 relative">
              <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="text-center mb-16">
                  <p className="text-[#FF2D85] text-[10px] font-bold tracking-[0.3em] uppercase mb-4" >PERGUNTAS FREQUENTES</p>
                  <h2 className="text-4xl md:text-6xl font-medium mb-6 text-white tracking-tight" >Tudo o que você <span className="text-[#FF2D85]">ainda quer descobrir.</span></h2>
                  <p className="text-[#94A3B8] text-lg font-light">Esclareça seus pontos e entenda como a Creator Hub vai impulsionar seu negócio.</p>
                </div>
                <div className="glass-premium rounded-[2rem] overflow-hidden border-white/[0.05] bg-white/[0.02] p-2">
                  {FAQS.map((faq, index) => (
                    <div key={index} className="border-b border-white/[0.05] last:border-0">
                      <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.03] transition-colors">
                        <h3 className="font-medium text-base text-white/90 pr-8">{faq.question}</h3>
                        <div className="flex-shrink-0" style={{transform: openFaq === index ? 'rotate(180deg)' : 'none'}}>
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down w-5 h-5 text-white/20 transition-transform duration-300">
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-6 pt-0 text-[#94A3B8] text-sm leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
          <div >
            <section className="py-32 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EC4899]/10 blur-[150px] pointer-events-none rounded-full" />
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#A78BFA]/10 blur-[150px] pointer-events-none rounded-full" />
              <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="glass-premium rounded-[2rem] p-8 sm:p-16 border-white/[0.05] bg-white/[0.02] flex flex-col lg:flex-row items-center gap-12 lg:gap-20" >
                  <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 leading-tight tracking-tight">Pronto para dominar <br /><span className="text-[#FF2D85]">o feed com Creator Hub?</span></h2>
                    <p className="text-base text-[#94A3B8] mb-12 max-w-md font-light leading-relaxed">Descubra o poder da criação sem limites onde cada pixel é pensado para converter e encantar seu público.</p>
                    <div className="flex flex-col sm:flex-row items-center gap-4"><a href="#planos" onClick={(e) => scrollToSection(e, 'planos')} className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF2D85] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,45,133,0.3)] hover:scale-105 transition-transform">Assinar agora<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg></a><a href="https://app.creattorhub.com.br/indique" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">Já tenho conta</a></div>
                  </div>
                  <div className="flex-1 w-full max-w-md space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                      <div className="w-10 h-10 rounded-full bg-[#FF2D85]/10 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-5 h-5 text-[#FF2D85]">
                          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                        </svg></div><span className="text-sm font-medium text-white/80 tracking-wide">Geração ultra veloz</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                      <div className="w-10 h-10 rounded-full bg-[#FF2D85]/10 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-5 h-5 text-[#FF2D85]">
                          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                        </svg></div><span className="text-sm font-medium text-white/80 tracking-wide">Segurança e privacidade total</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]">
                      <div className="w-10 h-10 rounded-full bg-[#FF2D85]/10 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles w-5 h-5 text-[#FF2D85]">
                          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                          <path d="M20 3v4" />
                          <path d="M22 5h-4" />
                          <path d="M4 17v2" />
                          <path d="M5 18H3" />
                        </svg></div><span className="text-sm font-medium text-white/80 tracking-wide">Recursos exclusivos Creator Hub</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <footer className="py-8 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-4"><a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="flex items-center gap-2"><img src="/assets/creator-hub-logo.png" alt="Creator Hub" className="h-6 w-auto" /><span className="font-medium text-white text-lg tracking-tight font-sans">Creator Hub</span></a><span className="hidden md:block text-[#64748B] text-sm">|</span>
                <p className="text-sm text-[#64748B]">© 2026 Creator Hub</p>
              </div>
              <div className="flex gap-8 text-sm items-center"><a href="#recursos" onClick={(e) => scrollToSection(e, 'recursos')} className="text-[#94A3B8] hover:text-white transition-colors">Recursos</a><a href="#planos" onClick={(e) => scrollToSection(e, 'planos')} className="text-[#94A3B8] hover:text-white transition-colors">Planos</a><a href="#" className="text-[#94A3B8] hover:text-white transition-colors">Entrar</a></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
  <aside id="lovable-badge" role="complementary" dir="ltr" lang="en" aria-label="Edit with Lovable">
    <a id="lovable-badge-cta" target="_blank" href="https://lovable.dev/projects/lovp_59th483qb191kby5x2b9vt2nwf?utm_source=lovable-badge" rel="noopener nofollow" aria-label="Edit with Lovable">
      <span id="lovable-badge-text">Edit with</span>
      <svg xmlns="http://www.w3.org/2000/svg" width={52} height={16} fill="none" viewBox="0 0 52 16">
        <path fill="#FCFBF8" fillRule="evenodd" d="M20.318 5.25c.643 0 1.206.14 1.69.418a2.81 2.81 0 0 1 1.118 1.191c.266.513.4 1.115.4 1.807s-.134 1.296-.4 1.812a2.81 2.81 0 0 1-1.118 1.193c-.484.278-1.047.418-1.69.418s-1.208-.14-1.695-.418a2.85 2.85 0 0 1-1.125-1.193c-.262-.516-.393-1.12-.393-1.812s.131-1.294.393-1.807a2.848 2.848 0 0 1 1.125-1.191c.487-.279 1.052-.418 1.695-.418Zm0 1.425c-.27 0-.504.076-.7.228-.193.147-.34.37-.443.67-.102.295-.153.66-.153 1.093 0 .435.05.801.153 1.1.102.3.25.524.443.676.196.147.43.22.7.22.27 0 .502-.073.694-.22.193-.152.341-.375.443-.67.103-.299.153-.667.153-1.106 0-.65-.112-1.145-.337-1.481a1.08 1.08 0 0 0-.953-.51ZM32.7 5.25c.61 0 1.127.1 1.549.3.422.197.74.48.953.849.217.368.325.809.325 1.32v2.704c0 .29.02.562.062.812.044.245.108.4.19.466V12h-1.935a5.895 5.895 0 0 1-.105-.684 7.745 7.745 0 0 1-.02-.228 2.293 2.293 0 0 1-.151.203c-.205.242-.47.437-.793.584-.32.143-.685.215-1.094.215-.406 0-.77-.08-1.094-.24a1.845 1.845 0 0 1-.756-.682 1.984 1.984 0 0 1-.27-1.045c0-.606.178-1.069.535-1.388.356-.324.87-.534 1.542-.633l1.125-.16c.225-.032.403-.074.534-.123a.622.622 0 0 0 .288-.196.549.549 0 0 0 .093-.327.65.65 0 0 0-.11-.367.702.702 0 0 0-.32-.27c-.14-.07-.31-.105-.51-.105-.32 0-.576.083-.768.251-.193.164-.298.39-.314.676h-1.923c.016-.434.147-.82.393-1.155.25-.34.596-.604 1.039-.792.442-.189.954-.283 1.535-.283Zm.99 3.498a.98.98 0 0 1-.215.14 2.49 2.49 0 0 1-.584.178l-.473.092c-.315.061-.553.156-.713.283-.155.127-.233.305-.233.534 0 .23.084.412.252.547.168.135.383.203.645.203s.494-.058.694-.173c.201-.118.355-.282.461-.49.11-.21.166-.448.166-.714v-.6Zm4.526-2.375c.065-.125.138-.243.221-.349.197-.25.437-.44.719-.571.282-.135.6-.203.952-.203.528 0 .988.138 1.377.412.389.275.688.67.896 1.186.21.512.314 1.12.314 1.824 0 .7-.107 1.309-.32 1.825-.213.512-.518.906-.915 1.18-.393.275-.854.412-1.383.412-.352 0-.667-.062-.946-.184a1.832 1.832 0 0 1-.7-.554 2.2 2.2 0 0 1-.234-.383V12h-1.843V3h1.862v3.373Zm1.284.296c-.274 0-.51.085-.707.253-.192.163-.338.397-.436.7a3.376 3.376 0 0 0-.148 1.05c0 .406.05.759.148 1.058.098.299.243.53.436.694.197.164.433.246.707.246.279 0 .512-.082.7-.246.193-.164.336-.395.43-.694.099-.3.148-.652.148-1.058 0-.405-.05-.757-.147-1.056-.095-.299-.238-.53-.43-.694a1.015 1.015 0 0 0-.7-.253Zm9.416-1.419c.602 0 1.136.131 1.604.393.466.262.829.643 1.086 1.143.263.5.394 1.097.394 1.794 0 .25-.002.449-.006.596H47.51c.018.288.071.538.164.75a1.3 1.3 0 0 0 .491.596c.214.13.465.196.757.196.319 0 .583-.082.792-.246.209-.167.34-.403.393-.706h1.862a2.48 2.48 0 0 1-.485 1.235 2.54 2.54 0 0 1-1.051.805c-.439.188-.949.283-1.53.283-.655 0-1.225-.125-1.708-.375a2.672 2.672 0 0 1-1.13-1.143c-.267-.508-.4-1.137-.4-1.887 0-.712.14-1.327.418-1.843a2.86 2.86 0 0 1 1.155-1.186c.491-.27 1.051-.405 1.678-.405Zm-.044 1.345c-.274 0-.516.068-.725.203a1.29 1.29 0 0 0-.479.59 2.045 2.045 0 0 0-.132.498h2.562a1.873 1.873 0 0 0-.138-.602 1.061 1.061 0 0 0-.418-.516 1.243 1.243 0 0 0-.67-.173Z" clipRule="evenodd" />
        <path fill="#FCFBF8" d="m26.605 9.995 1.342-4.566h1.924L27.628 12h-2.07l-2.33-6.57h1.98l1.397 4.565Zm-13.013.143h2.256c1.632 0 1.421 1.837 1.418 1.861h-5.603V3h1.93v7.138Zm31.516 1.861h-1.862V3h1.862v8.999Z" />
        <path fill="url(#a)" fillRule="evenodd" d="M2.7 3c1.492 0 2.7 1.192 2.7 2.663v1.012h.9c1.49 0 2.7 1.192 2.7 2.662S7.791 12 6.3 12H0V5.663C0 4.193 1.209 3 2.7 3Z" clipRule="evenodd" />
        <defs>
          <radialGradient id="a" cx={0} cy={0} r={1} gradientTransform="matrix(-1.54236 7.07838 -10.231 -2.15602 4.627 5.022)" gradientUnits="userSpaceOnUse">
            <stop offset=".106" stopColor="#FE7B02" />
            <stop offset=".394" stopColor="#FE3F21" />
            <stop offset=".608" stopColor="#F858BC" />
            <stop offset=".929" stopColor="#575ECF" />
          </radialGradient>
        </defs>
      </svg>
    </a>
    <span id="lovable-badge-divider" aria-hidden="true" />
    <button id="lovable-badge-close" aria-label="Dismiss" title="Dismiss" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M10.646 4.646a.5.5 0 1 1 .707.708L8.707 8l2.646 2.646a.5.5 0 1 1-.707.707L8 8.707l-2.646 2.646a.5.5 0 1 1-.708-.707L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708L8 7.293l2.646-2.647Z" />
      </svg>
    </button>
  </aside>
</div>

    </>
  );
}
