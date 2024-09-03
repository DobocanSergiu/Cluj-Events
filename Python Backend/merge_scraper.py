import clujlife_scraper as scrapper1
import iabilet_scraper as scrapper2
import threading
import json


def executeScraper1():
    scrapper1.clujlifeScraperMain()
def executeScraper2():
    scrapper2.iabiletScraperMain()

thread1 = threading.Thread(target=executeScraper1)
thread2 = threading.Thread(target=executeScraper2)
thread1.start()
thread2.start()
thread1.join()
thread2.join()

with open('clujlife_event_details.json') as clujlifeFile:
    clujlifeData = json.load(clujlifeFile)
with open('iabilet_event_details.json') as iabiletFile:
    iabiletData = json.load(iabiletFile)



mergedData = clujlifeData+iabiletData

with open('merged_event_details.json', 'w', encoding="utf-8") as file:
    json.dump(mergedData, file, indent=4)


