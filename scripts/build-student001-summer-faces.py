#!/usr/bin/env python3
"""Reproducible summer calm-anchored six-expression prototype, student-001 only.

Only source for character pixels is the approved summer calm PNG. Build at 3x
for smooth curves, inpaint the old calm mouth, and generate a shared alpha
face sheet. Every new outfit must be independently landmarked, not inherit
these face coordinates.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import cv2
import numpy as np
import hashlib, json

BASE=Path('web/assets/characters/students/student-001/student-001-base-uniform-summer.png')
DEST=BASE.parent
OUT=DEST/'student-001-face-sheet-uniform-summer.png'
META=DEST/'student-001-face-sheet-uniform-summer.json'
BOX=(392,241,659,444)
W,H=BOX[2]-BOX[0],BOX[3]-BOX[1]
S=3
NAMES=['calm','happy','angry','sad','surprised','embarrassed']
im=Image.open(BASE).convert('RGBA')
assert im.size==(1024,1536)

def erase_mouth(image):
    a=np.array(image)
    mask=np.zeros(a.shape[:2],np.uint8)
    cv2.ellipse(mask,(531,379),(35,10),0,0,360,255,-1)
    cv2.ellipse(mask,(530,391),(15,4),0,0,360,255,-1)
    bgr=cv2.cvtColor(a[:,:,:3],cv2.COLOR_RGB2BGR)
    rgb=cv2.inpaint(bgr,mask,11,cv2.INPAINT_TELEA)
    a[:,:,:3]=cv2.cvtColor(rgb,cv2.COLOR_BGR2RGB)
    return Image.fromarray(a,'RGBA')

def bezier(a,b,c,d,steps=65):
    result=[]
    for t in np.linspace(0,1,steps):
        pt=(1-t)**3*np.array(a)+3*t*(1-t)**2*np.array(b)+3*t*t*(1-t)*np.array(c)+t**3*np.array(d)
        result.append(tuple(round(float(z)*S) for z in pt))
    return result

def paint(kind):
    work=im.copy() if kind=='calm' else erase_mouth(im)
    picture=work.resize((1024*S,1536*S),Image.Resampling.LANCZOS)
    d=ImageDraw.Draw(picture,'RGBA')
    def line(points,color,width):
        d.line(points,fill=color,width=max(1,round(width*S)),joint='curve')
    def ellipse(box,fill=None,outline=None,width=1):
        d.ellipse(tuple(round(z*S) for z in box),fill=fill,outline=outline,width=max(1,round(width*S)))
    def polygon(points,color):
        d.polygon([(round(x*S),round(y*S)) for x,y in points],fill=color)
    if kind=='happy':
        top=bezier((506,375),(518,369),(540,371),(558,375))
        bottom=bezier((558,375),(552,406),(520,408),(506,375))
        polygon([(x/S,y/S) for x,y in top+bottom],(105,52,59,255))
        line(top,(75,40,42,255),1.7)
        line(bottom,(99,51,54,255),1.4)
        line(bezier((512,377),(524,382),(541,382),(550,377)),(254,233,223,255),2.8)
        ellipse((523,392,548,403),fill=(216,113,122,255))
    elif kind=='angry':
        line(bezier((424,285),(441,284),(468,289),(487,301)),(77,47,43,255),2.3)
        line(bezier((558,299),(570,286),(607,281),(622,282)),(70,43,39,255),2.2)
        line(bezier((514,384),(524,381),(539,380),(551,384)),(91,49,52,255),2.3)
        line(bezier((516,385),(526,387),(542,387),(550,384)),(146,77,76,205),1)
    elif kind=='sad':
        line(bezier((429,271),(443,270),(461,263),(480,264)),(100,65,58,220),1.4)
        line(bezier((563,264),(577,257),(591,266),(606,272)),(100,65,58,220),1.3)
        line(bezier((518,387),(524,377),(538,378),(546,388)),(91,55,59,255),2)
        for x,y in [(428,323),(618,318)]:
            ellipse((x-3,y-1,x+3,y+7),fill=(229,245,255,220),outline=(181,208,230,190),width=.5)
            ellipse((x-1,y,x+1,y+2),fill=(255,255,255,230))
    elif kind=='surprised':
        ellipse((521,373,541,399),fill=(116,59,67,255),outline=(76,44,46,255),width=1.5)
        ellipse((526,388,538,397),fill=(226,129,128,255))
        line(bezier((430,268),(444,258),(466,257),(482,266)),(101,64,57,160),1.2)
        line(bezier((561,257),(579,248),(605,248),(615,258)),(101,64,57,150),1.2)
    elif kind=='embarrassed':
        line(bezier((524,384),(532,386),(542,383),(547,382)),(117,65,62,255),1.6)
        glow=Image.new('RGBA',picture.size,(0,0,0,0))
        gd=ImageDraw.Draw(glow,'RGBA')
        for x,y,rx,ry in [(445,337,26,11),(601,330,24,10)]:
            gd.ellipse(tuple(round(z*S) for z in (x-rx,y-ry,x+rx,y+ry)),fill=(233,80,104,115))
        glow=glow.filter(ImageFilter.GaussianBlur(10*S))
        picture=Image.alpha_composite(picture,glow)
        d=ImageDraw.Draw(picture,'RGBA')
        for x,y in [(434,338),(441,340),(590,333),(597,335)]:
            line([(x*S,y*S),((x+3)*S,(y+4)*S)],(205,81,95,100),.8)
    return picture.resize((1024,1536),Image.Resampling.LANCZOS)

def ellipse(mask,x,y,rx,ry):
    cv2.ellipse(mask,(x-BOX[0],y-BOX[1]),(rx,ry),0,0,360,255,-1)

# All six tiles must use the same safe alpha geometry; every pixel outside this
# mask is 100% transparent. Six different transparent crops are not acceptable.
union=np.zeros((H,W),np.uint8)
ellipse(union,531,384,43,27)
for x,y,rx,ry in [(454,292,45,21),(591,291,45,25),
                   (453,267,36,14),(590,263,35,15),
                   (428,329,10,13),(619,327,10,13),
                   (452,268,36,16),(589,262,37,16),
                   (445,336,40,24),(600,330,40,26)]:
    ellipse(union,x,y,rx,ry)
union=cv2.GaussianBlur(union,(11,11),2)
sheet=Image.new('RGBA',(W*3,H*2),(0,0,0,0))
for i,name in enumerate(NAMES):
    tile=np.array(paint(name).crop(BOX))
    tile[:,:,3]=union
    sheet.alpha_composite(Image.fromarray(tile,'RGBA'),((i%3)*W,(i//3)*H))
sheet.save(OUT,optimize=True,compress_level=9)

meta={
  'version':1,'studentId':'student-001','outfit':'uniform-summer',
  'base':BASE.name,'sheet':OUT.name,
  'canvas':{'width':1024,'height':1536},
  'face':{'x':BOX[0],'y':BOX[1],'width':W,'height':H},
  'sheetLayout':{'columns':3,'rows':2,'order':NAMES},
  'transitionMs':180,'baseSha256':hashlib.sha256(BASE.read_bytes()).hexdigest(),
  'status':'preview-candidate-needs-user-approval',
  'note':'Summer five expressions generated anew from approved calm; preview visual approval pending.'
}
META.write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

# Fail fast on geometrical and source consistency mistakes.
assert Image.open(OUT).size==(W*3,H*2)
assert meta['baseSha256']==hashlib.sha256(BASE.read_bytes()).hexdigest()
print('Summer double-image six-expression sheet prepared:',OUT,OUT.stat().st_size,'bytes')
