from bs4 import BeautifulSoup
import requests

url = 'https://webscraper.io/test-sites/e-commerce/allinone/phones'
data = requests.get(url).content
soup = BeautifulSoup(data, "html.parser")

span = soup.find("h1", {"class": "page-header"})
page = span.text if span else "Title not found"

span3 = soup.find("a", text="LG Optimus")
phone = span3.text if span3 else "TV not found"

span4 = soup.find("h4", {"class": "float-end price card-title pull-right"})
price = span4.text if span4 else "Price not found"

print("Page: %s\nPhone: %s, Price: %s" % (page, phone, price))
