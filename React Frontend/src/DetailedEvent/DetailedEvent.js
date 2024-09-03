import calendarIcon from "../storage/calendar.png";
import clockIcon from "../storage/clock.png";
import mapsIcon from "../storage/google-maps.png";
import organizationIcon from "../storage/people.png";
import './DetailedEventStyles.css'
import { useLocation, useParams } from "react-router";

function DetailedEvent() {
  let {
    name,
    picture,
    startdate,
    time,
    description,
    categories,
    tags,
    rsvp,
    address,
    organizer,
    email,
    website,
    phone,
  } = useParams();

  return (
    <div style={{ backgroundImage: `url(${picture})` }}>
      {/*event image block*/}
      <div className="pageView"></div>
      {/*Headline title block*/}
      <div
          className="eventTitle"
      >
        {name}
      </div>
      {/*event information block*/}
      <div
          className="eventInformationBlock"
      >
        {/*left side information block (column placement; large description and tags)*/}
        <div
          className="leftDataBlock"
        >
          <div className="blockSize">
            <div
                className="eventDescription"
            >
              {description}
            </div>
            <div
                className="eventTags"
            >
              Tags: {tags}
            </div>
          </div>

          {/*right side information block*/}
          <div
              className="rightSideBlock"
          >
            {/*date text and date icon block*/}
            <div
                className="dateBlock"
            >
              <img
                src={calendarIcon}
                className="calendarIcon"
              ></img>
              <div>{startdate}</div>
            </div>

            {/*time block*/}
            <div
              className="timeBlock"
            >
              <img
                src={clockIcon}
                className="clockIcon"
              ></img>
              <div>{time}</div>
            </div>

            {/*Adress block*/}
            <div
                className="adressBlock"
            >
              <img
                src={mapsIcon}
                className="mapIcon"
              ></img>
              <div>{address}</div>
            </div>
            {/*Organizer block*/}
            <div
              className="organizerBlock"
            >
              <img
                src={organizationIcon}
                className="organizerIcon"
              ></img>
              <div>{organizer}</div>
            </div>
            <div
              className="email"
            >
              {email}
            </div>
            <div
                className="website"
            >
              {website}
            </div>
            <div
                className="phoneNr"
            >
              {phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedEvent;
