import { useState } from "react";
import { ColorInput } from "./form-components/ColorInput.tsx";

type propTypes = {
  selectedDay: string;
  handleDelete: Function;
  event?:
    | {
        id: string;
        name: string;
        color: string;
        startTime: string;
        endTime: string;
        isAllDay: boolean;
      }
    | any;
};

type formTypes = {
  name: string;
  color: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  id: string;
};

const colors: Array<string> = ["blue", "red", "green"];

export function AddDeleteForm({ event, handleDelete, selectedDay }: propTypes) {
  const initialFormData: formTypes | any = { ...event };
  const [formData, setFormData] = useState<formTypes>(initialFormData);
  function handleChange(e: { target: { value: any } }) {
    console.log(e.target.value);
  }
  // just doing this to get rid of unused declaration: delete later
  console.log(setFormData);

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" defaultValue={formData.name} />
      </div>
      <div className="form-group checkbox">
        <input
          type="checkbox"
          name="all-day"
          id="all-day"
          checked={formData.isAllDay}
        />
        <label htmlFor="all-day">All Day?</label>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="start-time">Start Time</label>
          <input
            type="time"
            name="start-time"
            id="start-time"
            defaultValue={formData.startTime}
            onChange={handleChange}
            disabled={formData.isAllDay}
          />
        </div>
        <div className="form-group">
          <label htmlFor="end-time">End Time</label>
          <input
            type="time"
            name="end-time"
            id="end-time"
            defaultValue={formData.endTime}
            disabled={formData.isAllDay}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Color</label>
        <div className="row left">
          {colors.map(c => (
            <ColorInput key={c} color={c} formColor={formData.color} />
          ))}
        </div>
      </div>
      <div className="row">
        {Object.keys(event).length === 0 ? (
          <button className="btn btn-success" type="submit">
            Add
          </button>
        ) : (
          <button className="btn btn-success" type="submit">
            Edit
          </button>
        )}

        <button
          className="btn btn-delete"
          type="button"
          onClick={() => handleDelete(formData.id, selectedDay)}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
