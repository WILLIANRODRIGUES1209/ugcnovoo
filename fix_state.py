import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

# I need to ensure activeStep is defined inside the App component, or globally
# If it was placed outside or before App component by mistake, I'll fix it.

content = content.replace("  const [activeStep, setActiveStep] = useState(0);", "")

# Add it right inside export default function App() {
content = content.replace("export default function App() {", """export default function App() {
  const [activeStep, setActiveStep] = useState(0);""")

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
