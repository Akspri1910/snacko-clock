from pathlib import Path
from PIL import Image, ImageOps

source = Path(r'C:\Users\PRIYANKA\Downloads\Photos-1-001')
out = Path(__file__).parent / 'dist/assets'
poster = Image.open(source / 'file_00000000b8a48209a2c9760b05919bbb.png')
for name, box in {'puri':(165,400,375,530),'sandwich':(390,400,650,535),'maggi':(660,400,885,540),'fries':(165,595,385,735),'burger':(410,595,640,735),'pizza':(660,590,880,740),'waffle':(420,805,640,945),'drink':(700,795,860,945)}.items():
    poster.crop(box).save(out / f'{name}.webp', quality=92)
for name, filename in [('night','20260630_234107.jpg'),('shop','image-1785066325227.jpg'),('poster','file_00000000b8a48209a2c9760b05919bbb.png')]:
    im=ImageOps.exif_transpose(Image.open(source / filename)); im.thumbnail((1500,1600)); im.save(out / f'{name}.webp',quality=85)
poster.crop((355,0,700,325)).save(out / 'logo.webp',quality=90)
assert all((out/f'{name}.webp').is_file() for name in ['puri','sandwich','night','logo'])
