import json
import time
from datetime import datetime

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from unidecode import unidecode

def scrapeEventDetails(eventUrl):
    print(f'Scraping page {eventUrl}')
    r=requests.get(eventUrl)
    soup=BeautifulSoup(r.content,'html5lib')


    try:
        #scape title of event
        titleTag=soup.find(class_="header-text")
        if titleTag:
            titleText = titleTag.get_text(" ",strip=True)

        else:
            titleText=None

        #scrape description of event
        descriptionTag=soup.find(class_="short-desc")
        if descriptionTag:
            descriptionText=descriptionTag.get_text(" ",strip=True)
        else:
            descriptionText=""
        longDescriptionTag=soup.find(class_="event-detail")
        if longDescriptionTag:
            descriptionText=descriptionText + '\n' + longDescriptionTag.get_text(" ",strip=True)
        if(descriptionText==""):
            descriptionText=None


        #scrape picture of event
        pictureATag=soup.find(class_="poster-image")
        if pictureATag:
            pictureImgTag=pictureATag.find('img')
            if pictureImgTag:
                pictureValue=pictureImgTag['src']
            else:
                pictureValue=None
        else:
            pictureValue=None

        #scrape event location
        locationTag=soup.find(class_="location")
        if locationTag:
            locationValue=locationTag.get_text(" ",strip=True)
        else:
            locationValue=None


        #scrape date and time
        dateTimeTag = soup.find(class_="date")
        if dateTimeTag:
            dateValue = dateTimeTag.find("meta").get('content')
            timeValue = dateTimeTag.get_text()
            timeValue = ' '.join(timeValue.split())
        else:
            dateValue=None
            timeValue=None

        eventData = {

                "Event Name": titleText,
                "Event Picture": pictureValue,
                "Start Date": dateValue,
                "Time": timeValue,
                "Description": descriptionText,
                "Categories": None,
                "Tags": None,
                "RSVP Link": None,
                "Address": locationValue,
                "Organizer": None,
                "Organizer Email": None,
                "Organizer Website":None,
                "Organizer Phone Number":None
            }

        return eventData
    except Exception as error:
        print(error)




def iabiletScraperMain():
    eventsUrl = "https://www.iabilet.ro/bilete-in-cluj-napoca"
    driver = webdriver.Firefox()
    driver.get(eventsUrl)

    time.sleep(5)
    # Wait until the element is clickable
    allow_button = WebDriverWait(driver, 5).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "cc-btn"))
    )
    # Click on the button
    allow_button.click()
    print("Clicked on the 'Sunt de acord' button.")
    time.sleep(5)


    print('Clicked on more button to expand list length')
    for i in range(0,2):
        more_button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "a.btn.btn-more"))
        )

        # Scroll to the button to ensure it is in view
        driver.execute_script("arguments[0].scrollIntoView(true);", more_button)

        # Optionally, wait until the button is clickable
        WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "a.btn.btn-more")))

        # Click the button
        more_button.click()
        time.sleep(5)

        print("Clicked on the 'mai mult' button.")


    WebDriverWait(driver, 10).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, "a.btn.btn-primary"))
    )

    # Find all <a> tags with class "btn btn-primary"
    linksATag = driver.find_elements(By.CSS_SELECTOR, "a.btn.btn-primary")
    linksArr=[]
    jsonArr=[]

    for link in linksATag:
        href = link.get_attribute('href')
        linksArr.append(href)
    linksArr.pop(0)
    for i in linksArr:
        resultJson=scrapeEventDetails(i)
        jsonArr.append(resultJson)

    print('Saving to JSON file')
    with open('iabilet_event_details.json', 'w',encoding="utf-8") as file:
        json.dump(jsonArr, file, indent=2)



    driver.quit()












