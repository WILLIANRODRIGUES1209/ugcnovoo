import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

# We need to add a useEffect to read URL parameters (e.g. ?cupom=BF50) 
# and automatically apply the coupon if it matches one of the valid coupons.

effect_code = """
  // Extract URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cupomParam = params.get('cupom');
    
    if (cupomParam) {
      const code = cupomParam.toUpperCase();
      if (COUPONS[code]) {
        setAppliedCoupon({ code, discount: COUPONS[code] });
        setCouponInput(code);
      }
    }
  }, []);
"""

# Insert right after the scrollToSection function inside App component
# Let's find: `export default function App() {` 
# and the scrollToSection definition

def insert_effect(match):
    return match.group(0) + effect_code

content = re.sub(r'(element\.scrollIntoView\({ behavior: \'smooth\' }\);\s+}\s+};)', insert_effect, content)

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(content)
