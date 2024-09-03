import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Events from "./Events/Events";
import DetailedEvent from "./DetailedEvent/DetailedEvent";
import PlanTrip from "./PlanTrip/PlanTrip";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="events" element={<Events />} />
          <Route
            path="/event/:name/:picture/:startdate/:time/:description/:categories/:tags/:rsvp/:address/:organizer/:email/:website/:phone"
            element={<DetailedEvent />}
          />
          <Route path="planevent" element={<PlanTrip />} />
        </Routes>
      </Router>
    </MantineProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
