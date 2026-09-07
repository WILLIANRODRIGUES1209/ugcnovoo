import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

# Replace Entrar and Já tenho conta links
content = content.replace(
    '<a href="https://app.ugclab.com.br/auth" className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[12px] font-bold hover:bg-white/10 transition-all uppercase tracking-wider">Entrar</a>',
    '<a href="https://app.creattorhub.com.br/indique" className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[12px] font-bold hover:bg-white/10 transition-all uppercase tracking-wider">Entrar</a>'
)

content = content.replace(
    '<a href="https://app.ugclab.com.br/auth" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">Já tenho conta</a>',
    '<a href="https://app.creattorhub.com.br/indique" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">Já tenho conta</a>'
)

# Replace the Assinar agora link that was going to auth
content = content.replace(
    '<a href="https://app.ugclab.com.br/auth" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF2D85] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,45,133,0.3)] hover:scale-105 transition-transform">Assinar agora',
    '<a href="#planos" onClick={(e) => scrollToSection(e, \'planos\')} className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF2D85] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,45,133,0.3)] hover:scale-105 transition-transform">Assinar agora'
)

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
