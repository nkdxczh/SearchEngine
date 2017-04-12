import json
from os import listdir
from os.path import isfile, join
import os.path

path = 'meta/Safety1/'
data_path = 'data/Safety1/'
location = 'Safety1/'
files = [f for f in listdir(path) if isfile(join(path, f))]
output = open('safety1_meta.json', 'w')
have = set()

count = 1
for f in files:
    print f
    data = json.load(open(path + f, 'r'))
    
    tmpd = dict()
    tmpd['field'] = 'Safety1'
    tmpd['set'] = data['title']
    tmpd['description'] = data['description']
    if 'issued' in data:
        tmpd['issued'] = data['issued']
    tmpd['keyword'] = data['keyword']
    tmpd['modified'] = data['modified']

    for d in data['distribution']:
        if 'format' in d and (d['format'] == 'csv' or d['format'] == 'CSV'):
           name = f.split('.')[0]
           if not os.path.exists(data_path + name + '.csv') or name in have:
               continue
           tmpd['name'] = name
           if 'downloadURL' in d:
               tmpd['url'] = d['downloadURL']
           data_file = open(data_path + name, 'r')
           tmpc = data_file.readline()
           while not ',' in tmpc:
               tmpc = data_file.readline()
           tmpd['column'] = tmpc.split(',')
           tmpd['location'] = location + name
           output.write('{ "index" : { "_index" : "meta", "_type" : "file", "_id" : "' + str(len(have)) +'" } }\n')
           outjson = json.dumps(tmpd)
           output.write(outjson + '\n')
           have.add(name)


output.close()
