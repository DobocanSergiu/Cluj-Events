import React from "react";
import './EventsStyles.css'
import Listitem2 from "../components/Listitem2";
import {
  Grid,
  MultiSelect,
  TextInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DateInput } from "@mantine/dates";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

function Events() {
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modfiableEvents, setModifiableEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/getAll")
      .then((response) => response.json())
      .then((result) => {
        setEvents(result);
        setModifiableEvents(result);
      }).catch((err)=>{console.log("API CAN'T FETCH EVENTS")});
  }, []);

  useEffect(() => {
    let categoriesList = [];
    events.forEach((x) => {
      if (x["Categories"] !== null) {
        categoriesList.push(x["Categories"]);
      }
    });
    let uniqueCategoriesList = [...new Set(categoriesList)];
    setCategories(uniqueCategoriesList);
  }, [events]);

  useEffect(() => {
    setModifiableEvents([events]);
    let modifiedEvents = events.filter((x) =>
      x["Event Name"].toLowerCase().includes(searchValue.toLowerCase()),
    );
    if (startDate != null) {
      modifiedEvents = modifiedEvents.filter((x) => {
        const eventDate = new Date(x["Start Date"]);
        return eventDate >= startDate;
      });
    }
    if (endDate != null) {
      modifiedEvents = modifiedEvents.filter((x) => {
        const eventDate = new Date(x["Start Date"]);
        return eventDate <= endDate;
      });
    }

    if (selectedCategories.length !== 0) {
      modifiedEvents = events.filter((x) =>
        selectedCategories.includes(x["Categories"]),
      );
    }
    setModifiableEvents([...modifiedEvents]);
  }, [searchValue, startDate, endDate, selectedCategories]);
  function HandleListItemClick(event) {
    navigate(
      `/event/${encodeURIComponent(event["Event Name"])}/${encodeURIComponent(event["Event Picture"])}/${encodeURIComponent(event["Start Date"])}/${encodeURIComponent(event["Time"])}/${encodeURIComponent(event["Description"])}/${encodeURIComponent(event["Categories"])}/${encodeURIComponent(event["Tags"])}/${encodeURIComponent(event["RSVP Link"])}/${encodeURIComponent(event["Address"])}/${encodeURIComponent(event["Organizer"])}/${encodeURIComponent(event["Organizer Email"])}/${encodeURIComponent(event["Organizer Website"])}/${encodeURIComponent(event["Organizer Phone Number"])}`,
    );
  }

  return (
    <div className="background">
      <div className="searchAndFilter">
        <div>
          Search
          <TextInput
            value={searchValue}
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            size="sm"
          ></TextInput>
        </div>

        <div>
          Start Date
          <DateInput
            value={startDate}
            size="sm"
            onChange={setStartDate}
            clearable
          />
        </div>

        <div>
          End Date
          <DateInput
            value={endDate}
            size="sm"
            onChange={setEndDate}
            clearable
          />
        </div>

        <div>
          Categories
          <MultiSelect
            data={categories}
            value={selectedCategories}
            onChange={setSelectedCategories}
            size="sm"
          />
        </div>
      </div>
      <div style={{ margin: "auto" }}>
        <Grid>
          {modfiableEvents.filter(event => event["Start Date"] !== null).map((event) => (
            <Grid.Col span={4} onClick={() => HandleListItemClick(event)}>

              <div className="eventCard">
                <Listitem2
                  title={event["Event Name"]}
                  picture={event["Event Picture"]}
                  date={event["Start Date"]}
                />
              </div>

            </Grid.Col>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Events;
