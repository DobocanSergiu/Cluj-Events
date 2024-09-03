import json
from datetime import datetime

import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from unidecode import unidecode

# Set up the Chrome driver
driver = webdriver.Chrome()


def clickNext(driver):
    try:
        nextButton = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CLASS_NAME, 'tribe-events-c-nav__next'))
        )
        print('Clicked next page')
        nextButton.click()

        WebDriverWait(driver, 10).until(EC.staleness_of(nextButton))

        return True
    except Exception as e:
        print(f"Error clicking next button: {e}")
        return False

def scrapeEventDetails(eventUrl):
    print(f'Scraping page {eventUrl}')
    driver.get(eventUrl)
    r=requests.get(eventUrl);
    soup=BeautifulSoup(r.content,'html5lib')

    #scrape title of event
    titleTag=soup.find(class_="tribe-events-single-event-title")
    if titleTag:
        titleText = titleTag.get_text(strip=True)
    else:
        titleText=None

    #scrape description of event
    descriptionTag=soup.find(class_="tribe-events-single-event-description tribe-events-content")
    if descriptionTag:
        descriptionText=descriptionTag.get_text(strip=True)
    else:
        descriptionText=None;

    #scrape picture
    pictureDivTag=soup.find('div',class_="tribe-events-event-image")
    if pictureDivTag:
        pictureImgTag=pictureDivTag.find('img')
        if pictureImgTag:
            pictureValue=pictureImgTag['data-src']
        else:
            pictureValue=None
    else:
        pictureValue=None


    #scrape date of event
    dateTag=soup.find('abbr',class_="tribe-events-abbr tribe-events-start-date published dtstart")
    if dateTag:
        dateValue = dateTag['title']
    else:
        dateValue=None

    #scrape event time
    timeTag=soup.find('div',class_="tribe-events-abbr tribe-events-start-time published dtstart")
    if timeTag:
        timeValue=timeTag.get_text(strip=True)
    else:
        timeValue=None

    #scrape category
    categoryDdTag = soup.find('dd', class_="tribe-events-event-categories")
    if categoryDdTag:
        categoryATag = categoryDdTag.find('a')
        if categoryATag:
            categoryValue = categoryATag.get_text(strip=True)

        else:
            categoryValue = None
    else:
        categoryValue = None


    #scrape tags tag
    tagsDdTag = soup.find('dd',class_="tribe-event-tags");
    if tagsDdTag:
        tagsATag=tagsDdTag.find('a')
        if tagsATag:
            tagsValue=tagsATag.get_text(strip=True)
        else:
            tagsValue=None
    else:
        tagsValue=None

    #scrape rsvp
    rsvpDdTag=soup.find('dd',class_="tribe-events-event-url")
    if rsvpDdTag:
        rsvpATag=rsvpDdTag.find('a')
        if rsvpATag:
            rsvpValue=rsvpATag.get_text(strip=True)
        else:
            rsvpValue=None

    else:
        rsvpValue=None

    #scrape adress
    adressTag=soup.find('span',class_="tribe-address")
    if adressTag:
        adressValue=adressTag.get_text(" ",strip=True)
    else:
        adressValue=None

    #scrape organizer
    organizerDdTag=soup.find('dd',class_="tribe-organizer")
    if organizerDdTag:
        organizerATag=organizerDdTag.find('a')
        if organizerATag:
            organizerValue=organizerATag.get_text(strip=True)
        else:
            organizerValue=None
    else:
        organizerValue=None
    #scrape phone nr
    telDdTag=soup.find('dd',class_="tribe-organizer-tel")
    if telDdTag:
        telVal=telDdTag.get_text(strip=True)
    else:
        telVal=None

    #scrape organizer email
    emailDdTag=soup.find('dd',class_="tribe-organizer-email")
    if emailDdTag:
        emailVal=emailDdTag.get_text(strip=True)
    else:
        emailVal=None

    #scrape orgbanizer link
    linkDdTag=soup.find('dd',class_="tribe-organizer-url");
    if linkDdTag:
        linkATag=linkDdTag.find('a')
        if linkATag:
            linkVal=linkATag.get('href')
        else:
            linkVal=None
    else:
        linkVal=None



    eventData = {

            "Event Name": titleText,
            "Event Picture":pictureValue,
            "Start Date": dateValue,
            "Time": timeValue,
            "Description": descriptionText,
            "Categories": categoryValue,
            "Tags": tagsValue,
            "RSVP Link": rsvpValue,
            "Address": adressValue,
            "Organizer": organizerValue,
            "Organizer Email": emailVal,
            "Organizer Website":linkVal,
            "Organizer Phone Number":telVal

    }

    driver.back()
    return eventData




def clujlifeScraperMain():
    eventsUrl = "https://www.clujlife.com/evenimente/"
    driver.get(eventsUrl)

    cookieButton = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CLASS_NAME, 'fc-button-label'))
            )
    cookieButton.click()
    print("Clicked cookie button")
    WebDriverWait(driver, 10).until(EC.staleness_of(cookieButton))

    print("Scrapping event data")
    pages=2
    allEvents=[]
    for p in range(pages):
        eventLinks = driver.find_elements(By.CLASS_NAME, 'tribe-events-pro-photo__event-title-link')

        for eventLink in eventLinks:
            eventUrl = eventLink.get_attribute("href")
            eventData = scrapeEventDetails(eventUrl)
            allEvents.append(eventData)

        if not clickNext(driver):
            break


    print('Saving data to JSON')
    with open('clujlife_event_details.json', 'w', encoding='utf-8') as jsonFile:
        json.dump(allEvents,jsonFile,indent=2)

    driver.quit()
