import urllib.request
import ssl
import sys

def download_image(url, filename):
    try:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE

        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, context=ctx) as r, open(filename, 'wb') as f:
            f.write(r.read())
        print(f"Successfully downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

bisleri_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Bisleri_bottle.png/320px-Bisleri_bottle.png"
download_image(bisleri_url, "c:/Users/praku/OneDrive/Desktop/My new pro/public/bisleri_water_real.png")

# Using a generic water bottle from Wikimedia for Bailley if we can't find a specific one, or another Bisleri variant
bailley_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Plastic_water_bottle.jpg/320px-Plastic_water_bottle.jpg"
download_image(bailley_url, "c:/Users/praku/OneDrive/Desktop/My new pro/public/bailley_water_real.png")
