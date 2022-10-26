import React, { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const litener = e => {
      console.log(e.target);
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }

      handler();
    };
    document.addEventListener("mousedown", litener);
    document.addEventListener("touchstart", litener);
    return () => {
      document.removeEventListener("mousedown", litener);
      document.removeEventListener("touchstart", litener);
    };
  }, []);
}
