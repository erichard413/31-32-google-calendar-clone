import { AddDeleteForm } from "../../forms/AddDeleteForm";

type propTypes = {
  event: {
    color?: string;
    startTime?: string | null;
    endTime?: string | null;
    name?: string;
    isAllDay?: boolean;
  };
  onClose: Function;
  selectedDay: string;
  handleAdd: Function;
  handleDelete: Function;
  handleUpdate: Function;
  setSelectedEvent: Function;
};

export function ModalContentAddDelete({
  onClose,
  selectedDay,
  setSelectedEvent,
  event,
  handleAdd,
  handleDelete,
  handleUpdate,
}: propTypes) {
  return (
    <>
      <div className="modal-title">
        {Object.keys(event).length > 0 ? (
          <div>Edit Event</div>
        ) : (
          <div>Add Event</div>
        )}
        <small>{selectedDay.replaceAll("-", "/")}</small>
        <button className="close-btn" onClick={() => onClose()}>
          &times;
        </button>
      </div>
      <AddDeleteForm
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        selectedDay={selectedDay}
        setSelectedEvent={setSelectedEvent}
        event={event}
        onClose={() => onClose()}
      />
    </>
  );
}
