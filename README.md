
#  ClujEvents

ClujEvents is a Web application desgined to aggregate and showcase multiple events across the city of Cluj-Napoca. The application uses webscrapppers to collect information from various websites.

  ![image](https://github.com/user-attachments/assets/83887014-94b5-4910-9716-055d8c7b2013)
  ![image](https://github.com/user-attachments/assets/5377176c-bc1a-48c2-b60c-42766cf61d81)
  ![image](https://github.com/user-attachments/assets/6993e503-3bcd-4858-80ae-9d99266fe3c6)




###  Features

- Event Aggregation: Gathers events from multiple sources to provide a comprehensive list of events happening in Cluj.

- Trip Planning : Allows users to plan events in a specific time-frame, while also catering to their interests.

- NO ACCOUNT OR LOGIN NECESSARY

  

###  Installation

1. Install MongoDB, and then run the following commands in monogsh:

	`use Database`
	`db.createCollection("posts")`
2. Clone repository
	`git clone https://github.com/DobocanSergiu/Cluj-Events.git`
3. Setup back-end:
		`cd 'Python Backend'`
		`Python3 merge_scraper.py`
		`Python3 mergeToDB.py`
		`Python3 api.py`
4. Setup front-end:
Get mapbox api key from https://www.mapbox.com/
Input new API KEY (PlanTrip.js line 46)
`npm install`
`npm start`
	
	


