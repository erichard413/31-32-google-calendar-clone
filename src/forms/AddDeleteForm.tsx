import { useState } from "react";
import { ColorInput } from "./form-components/ColorInput.tsx";
import { addToTime } from "../helpers/addToTime.ts";

type propTypes = {
  selectedDay: string;
  setSelectedEvent: Function;
  handleDelete: Function;
  handleAdd: Function;
  handleUpdate: Function;
  onClose: Function;
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

export function AddDeleteForm({
  event,
  handleDelete,
  selectedDay,
  setSelectedEvent,
  handleUpdate,
  onClose,
  handleAdd,
}: propTypes) {
  const initialFormData: formTypes | any =
    Object.keys(event).length > 0
      ? { ...event }
      : {
          startTime: "",
          endTime: "",
          name: "",
          isAllDay: false,
          color: "blue",
        };
  const [formData, setFormData] = useState<formTypes>(initialFormData);
  function handleChange(e: { target: { name: string; value: any } }) {
    const { value, name } = e.target;
    if (
      name == "startTime" &&
      (formData.endTime == "" || formData.endTime < value)
    ) {
      setFormData(data => ({
        ...data,
        [name]: value,
        endTime: addToTime(value, 30),
      }));
    }
    if (name == "isAllDay") {
      setFormData(data => ({
        ...data,
        startTime: "",
        endTime: "",
        [name]: !data.isAllDay,
      }));
    } else {
      setFormData(data => ({ ...data, [name]: value }));
    }
  }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          defaultValue={formData.name}
        />
      </div>
      <div className="form-group checkbox">
        <input
          type="checkbox"
          name="isAllDay"
          onChange={handleChange}
          id="all-day"
          checked={formData.isAllDay || false}
        />
        <label htmlFor="all-day">All Day?</label>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="start-time">Start Time</label>
          <input
            type="time"
            name="startTime"
            id="start-time"
            value={formData.startTime}
            onChange={handleChange}
            disabled={formData.isAllDay}
          />
        </div>
        <div className="form-group">
          <label htmlFor="end-time">End Time</label>
          <input
            type="time"
            name="endTime"
            id="end-time"
            onChange={handleChange}
            value={formData.endTime}
            disabled={formData.isAllDay}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Color</label>
        <div className="row left">
          {colors.map(c => (
            <ColorInput
              key={c}
              color={c}
              formColor={formData.color}
              handleChange={handleChange}
            />
          ))}
        </div>
      </div>
      <div className="row">
        {Object.keys(event).length === 0 ? (
          <button
            className="btn btn-success"
            type="submit"
            onClick={e => {
              e.preventDefault();
              if (formData.startTime > formData.endTime)
                return alert("Start time must come before End time!");
              handleAdd(formData, selectedDay);
              onClose();
            }}
            disabled={
              formData.name == "" ||
              (!formData.isAllDay &&
              formData.startTime == "" &&
              formData.endTime == ""
                ? true
                : false)
            }
          >
            Add
          </button>
        ) : (
          <button
            className="btn btn-success"
            type="submit"
            onClick={e => {
              e.preventDefault();
              if (formData.startTime > formData.endTime)
                return alert("Start time must come before End time!");
              handleUpdate(formData, selectedDay);
              setSelectedEvent({ ...formData });
              onClose();
            }}
            disabled={
              formData.name == "" ||
              (!formData.isAllDay &&
              formData.startTime == "" &&
              formData.endTime == ""
                ? true
                : false)
            }
          >
            Edit
          </button>
        )}

        {Object.keys(event).length > 0 && (
          <button
            className="btn btn-delete"
            type="button"
            onClick={() => handleDelete(formData.id, selectedDay)}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
