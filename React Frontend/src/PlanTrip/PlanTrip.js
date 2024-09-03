import { DateInput } from "@mantine/dates";
import React, { useEffect, useState } from "react";
import { Flex, MultiSelect } from "@mantine/core";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import ListItem from "../components/ListItem";
import { useNavigate } from "react-router-dom";
import './PlanTripStyles.css'

function PlanTrip() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [availableEvents, setAvailableEvents] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [findEventButtonClicked, setFindEventButtonClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/getAll")
      .then((response) => response.json())
      .then((result) => {
        setAvailableEvents(result);
        setAllEvents(result);
      }).catch((err)=>{console.log("API CAN'T FETCH EVENTS")});
  }, []);

  const pinIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
    iconSize: [38, 38],
  });
  function HandleListItemClick(event) {
    navigate(
      `/event/${encodeURIComponent(event["Event Name"])}/${encodeURIComponent(event["Event Picture"])}/${encodeURIComponent(event["Start Date"])}/${encodeURIComponent(event["Time"])}/${encodeURIComponent(event["Description"])}/${encodeURIComponent(event["Categories"])}/${encodeURIComponent(event["Tags"])}/${encodeURIComponent(event["RSVP Link"])}/${encodeURIComponent(event["Address"])}/${encodeURIComponent(event["Organizer"])}/${encodeURIComponent(event["Organizer Email"])}/${encodeURIComponent(event["Organizer Website"])}/${encodeURIComponent(event["Organizer Phone Number"])}`,
    );
  }

  async function fetchCoordinates(address) {
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;
    ///Add apiKey
    const apiKey =
      "API KEY CODE";
    try {
      const response = await fetch(`${endpoint}?access_token=${apiKey}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.features[0].center;
    } catch (error) {
      setError(error.message);
      return null;
    }
  }

  function compareDate(a, b) {
    let dateA = new Date(a);
    let dateB = new Date(b);
    return dateA - dateB;
  }

  async function handleFindEventButton() {
    if (availableEvents && allEvents) {
      ///allow elements that have at least 1 category
      setFindEventButtonClicked(true);
      let categoryEvents;
      let tempAvailableEvent = allEvents;
      if (category.length > 0) {
        categoryEvents = [];
        for (let i = 0; i < tempAvailableEvent.length; i++) {
          if (tempAvailableEvent[i].Categories != null) {
            if (
              category.includes(tempAvailableEvent[i].Categories.toLowerCase())
            ) {
              categoryEvents.push(tempAvailableEvent[i]);
            }
          }
        }
      } else {
        categoryEvents = tempAvailableEvent;
      }

      ///allow events between 2 selected dates
      let dateEvents;
      if (startDate && endDate) {
        dateEvents = [];
        for (let i = 0; i < categoryEvents.length; i++) {
          if (categoryEvents[i]["Start Date"] !== null) {
            const currentDate = new Date(categoryEvents[i]["Start Date"]);
            if (startDate <= currentDate && currentDate <= endDate) {
              dateEvents.push(categoryEvents[i]);
            }
          }
        }
      } else {
        dateEvents = categoryEvents;
      }

      ///remove empty date elements
      dateEvents = dateEvents.filter((item) => item["Start Date"] !== null);

      ///grab coordinates of given adress
      let allCoordinates = [];
      for (let i = 0; i < dateEvents.length; i++) {
        let eventName = dateEvents[i]["Event Name"];
        let eventCoords = await fetchCoordinates(dateEvents[i]["Address"]);
        allCoordinates.push([eventCoords[0], eventCoords[1], eventName]);
      }
      setCoordinates(allCoordinates);

      ///create unique dates array (between 2 selected dates)
      let tempUniqueDates = [];
      for (let i = 0; i < dateEvents.length; i++) {
        if (!tempUniqueDates.includes(dateEvents[i]["Start Date"])) {
          tempUniqueDates.push(dateEvents[i]["Start Date"]);
        }
      }
      tempUniqueDates.sort(compareDate);
      setUniqueDates(tempUniqueDates);
      setAvailableEvents(dateEvents);
    }
  }

  const categoryChoices = [
    "cinema",
    "cultural",
    "localuri",
    "educatie",
    "party",
    "concerte",
    "sport",
    "teatru",
    "expozitii",
    "bar",
    "targuri",
  ];

  return (
    <div className="background">
      <div className="filters">
        Start Date
        <DateInput
          value={startDate}
          size="sm"
          onChange={setStartDate}
          placeholder=""
          clearable
        />
        End Date
        <DateInput
          value={endDate}
          size="sm"
          onChange={setEndDate}
          placeholder=""
          clearable
        />
        Category
        <MultiSelect
          value={category}
          size="sm"
          onChange={setCategory}
          placeholder=""
          data={categoryChoices}
        />
      </div>

      <button className="findEventButton" onClick={handleFindEventButton}>Find Events</button>
      {findEventButtonClicked && availableEvents.length === 0 && (
        <div>No Events Found</div>
      )}

      {findEventButtonClicked && availableEvents.length > 0 && (
        <div>Planned trip based on available time and preferences</div>
      )}
      {findEventButtonClicked && availableEvents.length > 0 && (
        <Flex>
          <div className="listView">
            <ul className="listType">
              {findEventButtonClicked &&
                uniqueDates.map((dateElement) => (
                  <li>
                    <div
                        className="dateTag"
                    >
                      {dateElement}
                    </div>
                    <ul>
                      {availableEvents.map((eventElement) => {
                        if (
                          dateElement.toString() ===
                          eventElement["Start Date"].toString()
                        ) {
                          return (
                            <div
                              onClick={() => HandleListItemClick(eventElement)}
                            >
                              <ListItem
                                date={eventElement["Start Date"]}
                                picture={eventElement["Event Picture"]}
                                title={eventElement["Event Name"]}
                              ></ListItem>
                            </div>
                          );
                        }
                      })}
                    </ul>
                  </li>
                ))}
            </ul>
          </div>
          {availableEvents.length > 0 && (
            <MapContainer
              center={[46.7712, 23.6236]}
              zoom={13}
              className="mapDimension"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {coordinates.map((position, index) => (
                <Marker
                  key={index}
                  position={[position[1], position[0]]}
                  icon={pinIcon}
                >
                  <Popup>{position[2]}</Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </Flex>
      )}
    </div>
  );
}

export default PlanTrip;
