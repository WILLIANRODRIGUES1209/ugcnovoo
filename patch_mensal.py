import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

# Replace Mensal price display
old_mensal = r'<div className="flex items-baseline gap-2"><span className="text-3xl font-medium text-white">R\$ \{appliedCoupon \? appliedCoupon.mensalPrice : "245,00"\}</span><span className="text-\[#94A3B8\] text-\[9px\] font-light uppercase tracking-wider">/MÊS</span></div>'

new_mensal = """{appliedCoupon ? (
                         <div className="flex flex-col items-start gap-1">
                           <div className="flex items-baseline gap-2">
                             <span className="text-[#94A3B8] text-lg line-through font-medium">R$ {appliedCoupon.mensalOriginal}</span>
                             <span className="text-[#94A3B8] text-[9px] font-light uppercase tracking-wider">/MÊS</span>
                           </div>
                           <span className="text-4xl font-bold text-[#FF2D85] mb-2">R$ {appliedCoupon.mensalPrice}</span>
                         </div>
                      ) : (
                         <div className="flex items-baseline gap-2"><span className="text-3xl font-medium text-white">R$ 245,00</span><span className="text-[#94A3B8] text-[9px] font-light uppercase tracking-wider">/MÊS</span></div>
                      )}"""

content = re.sub(old_mensal, new_mensal, content)

# Change the coupon object to match the user request
old_coupons = r'const COUPONS = \{[\s\S]*?\};\n\nexport default'

new_coupons = """const COUPONS = {
  "DESCONTO": {
    mensalOriginal: "245,00",
    mensalPrice: "167,00",
    mensalLink: "https://checkout.exemplo.com/mensal-desconto",
    vitalicioOriginal: "497,00",
    vitalicioInstallments: "12x 24,19",
    vitalicioCash: "227,00",
    vitalicioLink: "https://checkout.exemplo.com/vitalicio-desconto",
    discountText: "- DESCONTO ESPECIAL",
    badgeText: "+ BIBLIOTECA DE PROMPTS DESBLOQUEADO",
  },
  "PROMO": {
    mensalOriginal: "245,00",
    mensalPrice: "145,00",
    mensalLink: "https://checkout.exemplo.com/mensal-promo",
    vitalicioOriginal: "497,00",
    vitalicioInstallments: "12x 20,99",
    vitalicioCash: "197,00",
    vitalicioLink: "https://checkout.exemplo.com/vitalicio-promo",
    discountText: "- PROMOÇÃO ATIVADA",
    badgeText: "+ KIT VIRAL PREMIUM DESBLOQUEADO",
  }
};

export default"""

content = re.sub(old_coupons, new_coupons, content)

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
