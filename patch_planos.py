import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

# Replace <section id="planos"... with <motion.section...
content = content.replace(
    '<section id="planos" className="py-24 relative overflow-hidden">',
    '<motion.section id="planos" className="py-24 relative overflow-hidden" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>'
)
content = content.replace('</section>\n          </div>\n          <div >\n            <section id="faq"', '</motion.section>\n          </div>\n          <div >\n            <section id="faq"')

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
