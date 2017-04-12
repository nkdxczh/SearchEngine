from os import listdir
from os.path import isfile, join
import json
import csv
from elasticsearch import Elasticsearch, helpers

es = Elasticsearch()

mypath = 'data/Education/'
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

j = 0
f = 0
for i in onlyfiles:
    #if f <= 10:
    #    f += 1
    #    continue
    #if f > 20:
    #    break
    f += 1
    print i, f
    input = open(mypath+i, 'r')
    title = i

    reader = csv.DictReader(input)
    rows = list(reader)

    l = 1
    tmpl = []
    for row in rows:
        row['file'] = i
        row['line'] = l
        
        tmp = dict()
        tmp['_type'] = 'line'
        tmp['_index'] = 'lines'
        tmp['_id'] = j
        tmp['_source'] = row

        l += 1
        #try:
        #    outjson = json.dumps(row)
        #except:
        #    continue
        tmpl.append(tmp)

        #es.index(index='lines', doc_type='line', id=j, body=outjson)
        #output.write('{ "index" : { "_index" : "line", "_type" : "line", "_id" : "' + str(j) +'" } }\n')
        j += 1
        #output.write(outjson + '\n')
    try:
        helpers.bulk(es,tmpl)
    except:
        print 'error!'
        continue
