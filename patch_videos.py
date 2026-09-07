import re

with open('/app/applet/src/App.tsx', 'r') as f:
    content = f.read()

# For each video tag, we want to add src="/videos/video-X.mp4" autoPlay muted
# Currently it looks like: <video poster="/videos/video-1.jpg" loop playsInline preload="none" className="..."/>
# Note: we need to remove preload="none" because we want them to play.

def repl(match):
    poster_num = match.group(1)
    # create the new tag
    return f'<video src="/videos/video-{poster_num}.mp4" poster="/videos/video-{poster_num}.jpg" autoPlay muted loop playsInline'

pattern = r'<video poster="/videos/video-(\d+).jpg" loop playsInline preload="none"'

new_content = re.sub(pattern, repl, content)

with open('/app/applet/src/App.tsx', 'w') as f:
    f.write(new_content)
