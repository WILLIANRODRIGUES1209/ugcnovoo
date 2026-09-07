import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

# Add smooth scroll function inside App component
scroll_fn = """  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };"""

content = content.replace("const [openFaq, setOpenFaq] = useState<number | null>(null);", "const [openFaq, setOpenFaq] = useState<number | null>(null);\n\n" + scroll_fn)

# Replace all <a href="#something"> with <a href="#something" onClick={(e) => scrollToSection(e, 'something')}>
def repl_anchor(match):
    full_match = match.group(0)
    id_name = match.group(1)
    # Be careful not to replace it if it already has onClick
    if 'onClick=' in full_match:
        return full_match
    # inject onClick
    return full_match.replace(f'href="#{id_name}"', f'href="#{id_name}" onClick={{(e) => scrollToSection(e, \'{id_name}\')}}')

content = re.sub(r'<a[^>]*href="#([^"]+)"[^>]*>', repl_anchor, content)

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
