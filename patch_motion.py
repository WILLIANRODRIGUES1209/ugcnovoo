import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

# 1. Import motion
if "motion/react" not in content:
    content = content.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect } from 'react';\nimport { motion } from 'motion/react';")

# 2. Add state for the active card in Como funciona
state_code = "const [activeStep, setActiveStep] = useState(0);"
if "const [activeStep, setActiveStep] = useState(0);" not in content:
    content = content.replace("const [openFaq, setOpenFaq] = useState<number | null>(null);", "const [openFaq, setOpenFaq] = useState<number | null>(null);\n  const [activeStep, setActiveStep] = useState(0);")

# 3. Refactor "Como funciona" cards logic
old_como_funciona = r'<div id="como-funciona" className="mt-40 mb-24">.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</section>'

# Actually, I will replace the <section id="como-funciona" (well it's just <div id="como-funciona" inside a section)
import string
start_idx = content.find('<div id="como-funciona" className="mt-40 mb-24">')
end_idx = content.find('</section>', start_idx) + len('</section>')

if start_idx != -1:
    old_html = content[start_idx:end_idx]
    
    new_html = """<motion.div 
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
            </section>"""
    content = content[:start_idx] + new_html + content[end_idx:]

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
