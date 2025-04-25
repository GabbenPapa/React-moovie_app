import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function onCloseEscape(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", onCloseEscape);

      return function () {
        document.removeEventListener("keydown", onCloseEscape);
      };
    },
    [action, key]
  );
}
