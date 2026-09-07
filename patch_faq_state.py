import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

state_code = """  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };"""

content = content.replace("const [appliedCoupon, setAppliedCoupon] = useState(null);", state_code)

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
