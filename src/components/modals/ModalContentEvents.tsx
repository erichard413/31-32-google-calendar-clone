import { sortEvents } from "../../helpers/sortEvents";
import { Event } from "../Event";

type propTypes = {
  event: {
    color?: string;
    startTime?: string | null;
    endTime?: string | null;
    name?: string;
    isAllDay?: boolean;
  };
  setSelectedEvent: Function;
  setSelectedDay?: Function;
  date?: Date;
  onClose: Function;
  setSelectedModal: Function;
  setModalIsOpen: Function;
  modalIsOpen: boolean;
  events: Array<object>;
  selectedDay: string;
};

export function ModalContentEvents({
  onClose,
  events,
  date,
  setSelectedEvent,
  setSelectedDay,
  setSelectedModal,
  setModalIsOpen,
  modalIsOpen,
  selectedDay,
}: propTypes) {
  return (
    <>
      <div className="modal-title">
        {selectedDay?.replaceAll("-", "/")}
        <div className="close-btn" onClick={() => onClose()}>
          &times;
        </div>
      </div>
      <div className="events">
        {sortEvents(events)?.map(d => (
          <Event
            key={crypto.randomUUID()}
            modalIsOpen={modalIsOpen}
            event={d}
            date={date}
            setSelectedEvent={setSelectedEvent}
            setSelectedDay={setSelectedDay}
            setSelectedModal={setSelectedModal}
            setModalIsOpen={setModalIsOpen}
          />
        ))}
      </div>
    </>
  );
}
