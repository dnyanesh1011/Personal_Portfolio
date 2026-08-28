"use client";

import { useEffect } from "react";

export function HomepageScrollReset(): null {
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return null;
}