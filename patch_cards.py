import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

# Replace the parent container of the cards to include 'group' class
old_parent = r'<div className="relative w-full h-full flex items-center justify-center">'
new_parent = r'<div className="relative w-full h-full flex items-center justify-center group">'
content = content.replace(old_parent, new_parent)

# Card 1
old_card1 = r'style={{zIndex: 10, marginTop: 0, opacity: 0, transform: \'translateX\(20px\) rotate\(-8deg\)\'}}'
new_card1 = r'style={{zIndex: 10}} className="glass-premium rounded-[2.5rem] p-8 sm:p-10 w-[280px] sm:w-[320px] h-[380px] absolute border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all duration-500 cursor-pointer bg-[#0A0C1A]/80 transform rotate-[-8deg] -translate-x-4 translate-y-4 group-hover:rotate-[-15deg] group-hover:-translate-x-24 group-hover:translate-y-0 opacity-100"'
content = re.sub(r'className="glass-premium rounded-\[2.5rem\][^"]+" style=\{\{zIndex: 10, marginTop: 0, opacity: 0, transform: \'translateX\(20px\) rotate\(-8deg\)\'\}\}', new_card1, content)

# Card 2
old_card2 = r'style={{zIndex: 11, marginTop: 10, opacity: 0, transform: \'translateX\(20px\)\'}}'
new_card2 = r'style={{zIndex: 11}} className="glass-premium rounded-[2.5rem] p-8 sm:p-10 w-[280px] sm:w-[320px] h-[380px] absolute border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all duration-500 cursor-pointer bg-[#0A0C1A]/80 transform rotate-[0deg] translate-y-0 group-hover:-translate-y-8 opacity-100"'
content = re.sub(r'className="glass-premium rounded-\[2.5rem\][^"]+" style=\{\{zIndex: 11, marginTop: 10, opacity: 0, transform: \'translateX\(20px\)\'\}\}', new_card2, content)

# Card 3
old_card3 = r'style={{zIndex: 12, marginTop: 20, opacity: 0, transform: \'translateX\(20px\) rotate\(8deg\)\'}}'
new_card3 = r'style={{zIndex: 12}} className="glass-premium rounded-[2.5rem] p-8 sm:p-10 w-[280px] sm:w-[320px] h-[380px] absolute border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between transition-all duration-500 cursor-pointer bg-[#0A0C1A]/80 transform rotate-[8deg] translate-x-4 -translate-y-4 group-hover:rotate-[15deg] group-hover:translate-x-24 group-hover:translate-y-0 opacity-100"'
content = re.sub(r'className="glass-premium rounded-\[2.5rem\][^"]+" style=\{\{zIndex: 12, marginTop: 20, opacity: 0, transform: \'translateX\(20px\) rotate\(8deg\)\'\}\}', new_card3, content)

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
