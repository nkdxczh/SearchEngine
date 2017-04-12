from os import listdir
from os.path import isfile, join
import json

mypath = '../data/Education/'
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
output = open('../raw.json','w')

j = 0
for i in onlyfiles:
    if j > 5:
        break
    j += 1
    print i
    input = open(mypath+i, 'r')
    tmpd = dict()
    tmpd['title'] = i
    tmpc = input.readline()
    while not ',' in tmpc:
        tmpc = input.readline()
    tmpd['column'] = tmpc.split(',')
    try:
        tmpd['content'] = input.read().encode('iso-8859-1')
    except:
        continue
    outjson = json.dumps(tmpd)
    output.write('{ "index" : { "_index" : "raw", "_type" : "file", "_id" : "' + str(j) +'" } }\n')
    output.write(outjson)
    output.write('\n')

output.close()
