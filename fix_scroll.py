import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

# I need to ensure scrollToSection is defined inside the App component, or globally
# If it was placed outside or before App component by mistake, I'll fix it.

content = content.replace("""  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };""", "")

# Add it right inside export default function App() {
content = content.replace("export default function App() {", """export default function App() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };""")

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
