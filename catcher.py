from splinter.browser import Browser

class catcher:
    def __init__(self):
        self.browser = Browser()
        self.browser.visit('http://google.com')
        print "end"

    def set_url(self, url):
        self.url = url
        print "set " + self.url

    def catch(self):
        print self.url
        self.browser.visit(self.url)
