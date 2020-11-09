import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

import "./style.css";

export default function EventPage(props) {
  const { loggedIn, setLoggedIn } = props;
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("auth-token")) setLoggedIn(true);
  }, []);
  useEffect(() => {
    if (loggedIn) {
      Axios.get("http://localhost:4000/api/v1/event")
        .then((res) => {
          const events = res.data;
          let dict = {};
         for (let i = 0; i < events.length; i++) {
           const event = events[i];
           if(Object.values(dict).find(item=>item.event.summary==event.summary)){
            dict[event.summary]['count'] += dict[event.summary]['count'] ;
          }else{
            dict[event.summary]={'event':event,'count':1}
          }
        }
          setEvents(Object.entries(dict));
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);
  return (
    <div>
      {loggedIn ? (
        <div className="col" style={{ justifyContent: "center" }}>
          <h1 style={{ textAlign: "center" }}>Event Page</h1>
          <div>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Event No #</th>
                  <th scope="col">Event name</th>
                  <th scope="col">Event Redundancy</th>
                  <th scope="col">Event Date</th>
                  {/* <th scope="col">Event description</th> */}
                  {/* <th scope="col">Event location</th> */}
                  <th scope="col">Event attendees No #</th>
                  <th scope="col">Event attendees</th>
                  <th scope="col">Event link</th>
                </tr>
              </thead>
              <tbody>
                {events.length
                  ? events.map((event, i) => {
                    let name = event[0];
                    let eventContent = event[1];
                    return(
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{name!='undefined' ? name : "With no name"}</td>
                        <td>{eventContent? eventContent.count : 1}</td>
                        <td>{eventContent.event.start ? eventContent.event.start.dateTime : "no date"}</td>
                        {/* <td>{event.description?event.description.toString():"no description"}</td> */}
                        {/* <td>{event.location?event.location:"no location speciefied"}</td> */}
                        <td>{eventContent.event.attendees ? eventContent.event.attendees.length : 0}</td>
                        <td>
                          {eventContent.event.attendees.length
                            ? eventContent.event.attendees.map((att) => (
                                <ul key={att.email}>
                                  {" "}
                                  <li key={att}>{att.email} </li>
                                </ul>
                              ))
                            : "no attendees"}
                        </td>
                        <td>
                          {eventContent.event.htmlLink ? (
                            <a href={eventContent.event.htmlLink}>
                              Click here to go to the event link
                            </a>
                          ) : (
                            "No link specified"
                          )}
                        </td>
                      </tr>
                    )})
                  : "There are no events till now"}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <label> You are not loggedin. Please Login First </label>
          <Link to="/login">Go to Login</Link>
        </div>
      )}
    </div>
  );
}
