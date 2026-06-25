import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Events() {
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("Birthday");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get(
      "https://sia-backend-production-4dcd.up.railway.app/events"
    );

    setEvents(Array.isArray(res.data) ? res.data : []);
  };

  const createEvent = async () => {
    await axios.post(
      "https://sia-backend-production-4dcd.up.railway.app/events",
      {
        title,
        event_date: eventDate,
        event_type: eventType,
        description,
        created_by: localStorage.getItem("username")
      }
    );

    alert("Event Created");

    setTitle("");
    setEventDate("");
    setEventType("Birthday");
    setDescription("");

    fetchEvents();
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm("Delete event?")) return;

    await axios.delete(
      "https://sia-backend-production-4dcd.up.railway.app/events/" +
        eventId
    );

    alert("Event deleted");

    fetchEvents();
  };

  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "240px", padding: "40px" }}>
        <h1>Events Management</h1>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />

          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option>Birthday</option>
            <option>Meeting</option>
            <option>Holiday</option>
            <option>Training</option>
            <option>Announcement</option>
            <option>Festival</option>
            <option>Office Announcement</option>
            <option>Urgent Notice</option>
            <option>Work Anniversary</option>
          </select>

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={createEvent}>
            Add Event
          </button>
        </div>

        <div
          style={{
            marginTop: "30px",
            maxHeight: "450px",
            overflowX: "auto",
            overflowY: "auto",
            border: "1px solid #333",
            borderRadius: "10px"
          }}
        >
          <table
            style={{
              width: "1000px",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr>
                <th style={th}>Title</th>
                <th style={th}>Date</th>
                <th style={th}>Type</th>
                <th style={th}>Description</th>
                <th style={th}>Created By</th>
                <th style={th}>Delete</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td style={td}>{event.title}</td>
                  <td style={td}>{event.event_date}</td>
                  <td style={td}>{event.event_type}</td>
                  <td style={td}>{event.description}</td>
                  <td style={td}>{event.created_by}</td>
                  <td style={td}>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "20px"
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const th = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
  textAlign: "left"
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee"
};