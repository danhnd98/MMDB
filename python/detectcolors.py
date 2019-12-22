 # -*- coding: utf-8 -*-

from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import numpy as np
import cv2
from collections import Counter
from skimage.color import rgb2lab, deltaE_cie76
import os
import sys

# get_ipython().run_line_magic('matplotlib', 'inline')

imgLink = sys.argv[1]

def get_image(image_path):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    return image

def get_colors(image, number_of_colors, show_chart):

    modified_image = cv2.resize(
        image, (600, 400), interpolation=cv2.INTER_AREA)
    modified_image = modified_image.reshape(
        modified_image.shape[0]*modified_image.shape[1], 3)

    # n_clusters: số màu lấy ra
    clf = KMeans(n_clusters=number_of_colors)
    labels = clf.fit_predict(modified_image)

    counts = Counter(labels)

    center_colors = list(clf.cluster_centers_)
    max_value = max(counts.values())
    max_index = 0
    for key, value in counts.items():
        if value == max_value:
            max_index = key

    return list(center_colors[max_index])


x = get_colors(get_image(imgLink), 3, True)
print(x)