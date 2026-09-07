import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

# Change Card 1 zIndex to 12
content = content.replace(r'<div style={{zIndex: 10}} className="glass-premium rounded-[2.5rem] p-8 sm:p-10 w-[280px] sm:w-[320px] h-[380px] absolute', r'<div style={{zIndex: 12}} className="glass-premium rounded-[2.5rem] p-8 sm:p-10 w-[280px] sm:w-[320px] h-[380px] absolute')

# Change Card 3 zIndex to 10
content = content.replace(r'<div style={{zIndex: 12}} className="glass-premium rounded-[2.5rem] p-8 sm:p-10 w-[280px] sm:w-[320px] h-[380px] absolute', r'<div style={{zIndex: 10}} className="glass-premium rounded-[2.5rem] p-8 sm:p-10 w-[280px] sm:w-[320px] h-[380px] absolute')

# Let's adjust hover for Card 1 (top): hover translate up and left
content = content.replace(r'group-hover:rotate-[-15deg] group-hover:-translate-x-24 group-hover:translate-y-0', r'group-hover:rotate-[-15deg] group-hover:-translate-x-28 group-hover:-translate-y-8')

# Card 2 (middle): hover translate up
content = content.replace(r'group-hover:-translate-y-8', r'group-hover:-translate-y-16')

# Card 3 (bottom): hover translate right
content = content.replace(r'group-hover:rotate-[15deg] group-hover:translate-x-24 group-hover:translate-y-0', r'group-hover:rotate-[15deg] group-hover:translate-x-28 group-hover:translate-y-8')

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
