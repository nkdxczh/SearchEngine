from splinter.browser import Browser
import requests
from selenium.common.exceptions import TimeoutException
import os.path

class metaCatcher:
    def __init__(self):
        self.browser = Browser()
        self.browser.driver.set_page_load_timeout(5)

    def set_url(self, url):
        self.url = url

    def download(self, url, name):
        if os.path.exists(name):
            return
        result = requests.get(url)
        if '</html>' in result.content:
            return
        output = open(name, 'w')
        output.write(result.content)
        output.close()

    def catch(self):
        self.browser.visit(self.url)
        items = self.browser.find_by_css('.dataset-heading')
        tmpitems = []
        setName = []
        for item in items:
            href = item.find_by_tag('a')
            setName.append(href[0].text)
            tmpitems.append(href[0]['href'])
        print setName
            
        i = -1
        for href in tmpitems:
            i += 1
            try:
                self.browser.visit(href)
            except TimeoutException:
                pass
            groups = self.browser.find_by_tag('a')
            for g in groups:
                #g.text
                downloadurl = str(g['href'])
                if g.text == 'Download Metadata':
                    #print downloadurl
                    #print downloadurl
                    name = setName[i]
                    self.download(downloadurl, './meta/Safety1/'+name + '.json')
