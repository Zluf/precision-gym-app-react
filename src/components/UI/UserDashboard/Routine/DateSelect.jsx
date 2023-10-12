import React from "react";
import "./DateSelect.css";

export default function DateSelect(props) {
  return (
    <div className="date-select">
      <label htmlFor="routine-dates">Select a date</label>
      <select
        name="routine-dates"
        value={props.displayedDate}
        readOnly={props.displayedDate}
        onChange={props.onChange}
      >
        {props.routineDates
          .map((date, i) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))
          .sort((a, b) => a - b)}
      </select>
    </div>
  );
}
