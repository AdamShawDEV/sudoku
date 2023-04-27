import { useEffect } from "react";

function useHandleOutsideClick(ref, handler) {
  useEffect(() => {
    const clickHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        if (handler) handler();
      }
    };

    document.addEventListener("mousedown", clickHandler);

    return () => document.removeEventListener("mousedown", clickHandler);
  }, [ref, handler]);
}

export default useHandleOutsideClick;
