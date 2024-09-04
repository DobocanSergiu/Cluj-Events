
#  ClujEvents

ClujEvents is a Web application desgined to aggregate and showcase multiple events across the city of Cluj-Napoca. The application uses webscrapppers to collect information from various websites.

  

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
	
	


