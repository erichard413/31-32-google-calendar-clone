import { createPortal } from "react-dom";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { cc } from "../../helpers/modalClassFormatter.ts";

type propTypes = {
  children: any;
  isOpen: boolean;
  onClose: Function;
};

export function Modal({ children, isOpen, onClose }: propTypes) {
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const prevIsOpen = useRef<boolean>();

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    if (!isOpen && prevIsOpen.current) {
      setIsClosing(true);
    }
    prevIsOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;
  return createPortal(
    <div
      onAnimationEnd={() => setIsClosing(false)}
      className={cc("modal", isClosing && "closing")}
    >
      <div className="overlay"></div>
      <div className="modal-body">{children}</div>
    </div>,
    document.body.querySelector("#modal-div") as HTMLElement
  );
}
