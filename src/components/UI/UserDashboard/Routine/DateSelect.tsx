import "./DateSelect.css";

interface DateSelectProps {
  displayedDate: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  routineDates: string[];
}

export default function DateSelect(props: DateSelectProps) {
  return (
    <div className="date-select">
      <label htmlFor="routine-dates">Select a date</label>
      <select
        name="routine-dates"
        value={props.displayedDate}
        onChange={props.onChange}
      >
        {props.routineDates.sort().map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
}
