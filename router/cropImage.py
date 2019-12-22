import sys
from PIL import Image
# print(sys.argv[4])]
img = Image.open(sys.argv[1])
crop_img = img.crop((int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5]), int(sys.argv[6])))
crop_img.save(sys.argv[2])
print(sys.argv[1])
