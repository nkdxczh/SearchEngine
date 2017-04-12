from metadata import metaCatcher
from catcher import catcher

c = metaCatcher()
base = 'https://catalog.data.gov/dataset?res_format=CSV&groups=safety3175'
c.set_url(base)
c.catch()
#c.download('https://www2.ed.gov/rschstat/statistics/surveys/mbk/Living-arrangements_verified_2014_0731_1331.csv','tmp')
