import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

faq_data = """
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

"""

# Insert FAQ data after the COUPONS object
content = content.replace("export default function App() {", faq_data + "export default function App() {")

# Add state for FAQ
state_code = """  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };"""

content = re.sub(r'const \[appliedCoupon, setAppliedCoupon\] = useState<Coupon \| null>\(null\);', state_code, content)

# Replace the manual FAQ HTML with a map
old_faq_block = r'<div className="glass-premium rounded-\[2\.rem\] overflow-hidden border-white/\[0\.05\] bg-white/\[0\.02\] p-2">.*?</div>\s+</div>\s+</section>'

# Let's extract the exact old FAQ block first to make sure replacement works
import string
start_idx = content.find('<div className="glass-premium rounded-[2rem] overflow-hidden border-white/[0.05] bg-white/[0.02] p-2">')
end_idx = content.find('</section>', start_idx)

if start_idx != -1 and end_idx != -1:
    old_html = content[start_idx:end_idx]
    
    new_html = """<div className="glass-premium rounded-[2rem] overflow-hidden border-white/[0.05] bg-white/[0.02] p-2">
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
            """
            
    content = content[:start_idx] + new_html + content[end_idx:]

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
