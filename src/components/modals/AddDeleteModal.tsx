import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AddDeleteForm } from "../../forms/AddDeleteForm.tsx";

type propTypes = {
  event: Object;
  setSelectedEvent: Function;
  setAddDeleteModalIsOpen: Function;
  addDeleteModalIsOpen: boolean;
  selectedDay: string;
  handleDelete: Function;
  handleAdd: Function;
  handleUpdate: Function;
};

export function AddDeleteModal({
  setAddDeleteModalIsOpen,
  addDeleteModalIsOpen,
  setSelectedEvent,
  selectedDay,
  handleDelete,
  handleAdd,
  handleUpdate,
  event,
}: propTypes) {
  // add event listener to calendar div, so if user clicks OFF modal the modal will close.
  const modalRef = useRef<any>();
  const handleClose = () => {
    setSelectedEvent({});
    setAddDeleteModalIsOpen(false);
  };
  function keyPress(e: KeyboardEvent) {
    if (addDeleteModalIsOpen && e.key === "Escape")
      setAddDeleteModalIsOpen(false);
  }
  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    overlay?.addEventListener("click", handleClose);
    document.addEventListener("keydown", e => {
      keyPress(e);
    });
    return () => {
      overlay?.removeEventListener("click", handleClose);
      document.removeEventListener("keydown", e => keyPress(e));
    };
  }, []);

  return createPortal(
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-body" ref={modalRef}>
        <div className="modal-title">
          {Object.keys(event).length === 0 ? (
            <div>Add Event</div>
          ) : (
            <div>Edit Event</div>
          )}
          <small>{selectedDay.replaceAll("-", "/")}</small>
          <div className="close-btn" onClick={handleClose}>
            &times;
          </div>
        </div>
        <AddDeleteForm
          selectedDay={selectedDay}
          handleAdd={handleAdd}
          event={event}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>,
    document.body.querySelector<Element>("#modal-div")!
  );
}
