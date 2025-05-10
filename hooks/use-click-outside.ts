"use client";

import { type RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: (event: MouseEvent | TouchEvent) => void,
): void {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			const el = ref?.current;

			// Do nothing if clicking ref's element or descendent elements
			if (!el || el.contains(event.target as Node)) {
				return;
			}

			// This handles the outside click - it will call our handler function
			// which will close the popover
			handler(event);
		};

		// Add event listeners to detect clicks anywhere in the document
		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		// Clean up
		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, handler]);
}
