import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

default_config = """const DEFAULT_PLAN = {
  mensalPrice: "245,00",
  mensalLink: "https://checkout.applyfy.com.br/checkout/cmpo9s6j30kdm08lgkpt3od3n?offer=Q5K3KIS",
  vitalicioPrice: "497,00",
  vitalicioLink: "https://checkout.applyfy.com.br/checkout/cmpo9s6j30kdm08lgkpt3od3n?offer=LRSCT3T"
};

const COUPONS"""

content = content.replace("const COUPONS", default_config)

# Replace Mensal Price Fallback
mensal_price_fallback_old = r'<div className="flex items-baseline justify-between w-full gap-2"><span className="text-3xl font-medium text-white">R\$ 245,00</span>'
mensal_price_fallback_new = r'<div className="flex items-baseline justify-between w-full gap-2"><span className="text-3xl font-medium text-white">R$ {DEFAULT_PLAN.mensalPrice}</span>'
content = re.sub(mensal_price_fallback_old, mensal_price_fallback_new, content)

# Replace Mensal Link Fallback
mensal_link_old = r'href=\{appliedCoupon \? appliedCoupon.mensalLink : "https://checkout.applyfy.com.br/checkout/cmpo9s6j30kdm08lgkpt3od3n\?offer=Q5K3KIS"\}'
mensal_link_new = r'href={appliedCoupon ? appliedCoupon.mensalLink : DEFAULT_PLAN.mensalLink}'
content = re.sub(mensal_link_old, mensal_link_new, content)

# Replace Vitalicio Price Fallback
vitalicio_price_fallback_old = r'<div className="flex items-baseline justify-between w-full gap-2"><span className="text-3xl font-medium text-white">R\$ 497,00</span>'
vitalicio_price_fallback_new = r'<div className="flex items-baseline justify-between w-full gap-2"><span className="text-3xl font-medium text-white">R$ {DEFAULT_PLAN.vitalicioPrice}</span>'
content = re.sub(vitalicio_price_fallback_old, vitalicio_price_fallback_new, content)

# Replace Vitalicio Link Fallback
vitalicio_link_old = r'href=\{appliedCoupon \? appliedCoupon.vitalicioLink : "https://checkout.applyfy.com.br/checkout/cmpo9s6j30kdm08lgkpt3od3n\?offer=LRSCT3T"\}'
vitalicio_link_new = r'href={appliedCoupon ? appliedCoupon.vitalicioLink : DEFAULT_PLAN.vitalicioLink}'
content = re.sub(vitalicio_link_old, vitalicio_link_new, content)


with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
