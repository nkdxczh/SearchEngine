import csv
import json

with open('data/Education/Alcohol-use.g12_2014_0731_0900.csv') as f:
    reader = csv.DictReader(f)
    rows = list(reader)
 
print rows[0]
#with open('test.json', 'w') as f:
#    json.dump(rows, f)
