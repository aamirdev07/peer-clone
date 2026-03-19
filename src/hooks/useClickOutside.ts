import { useEffect, useRef } from "react";

/**
 * Hook that calls `onClose` when a click occurs outside the referenced element.
 * Attach the returned ref to the dropdown wrapper.
 */
export function useClickOutside<T extends HTMLElement = HTMLDivElement>(
  onClose: () => void,
  active = true
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, active]);

  return ref;
}
