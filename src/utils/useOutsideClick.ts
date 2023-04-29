import { useState, useEffect, useRef } from "react";

export default function useOutsideClick(
    initialIsVisible: boolean,
    callback: () => void
) {
    const ref = useRef<any>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return { ref };
}
