import { useEffect } from "react";

/* CUSTOM HOOK */
export default function useKey(key, action) {
  /* USEEFFECT */
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      /* CLEANUP FUNCTION */
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
