import { useState, useEffect, useCallback } from "react";

type URLStateKey = "city" | "mode" | "pollutant";

/**
 * U8 — URL State Persistence
 * Reads & writes a URL search param, keeping browser history in sync.
 * No router needed — uses native URLSearchParams + History API.
 */
export function useURLState(key: URLStateKey, defaultValue: string) {
  const getFromURL = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key) ?? defaultValue;
  }, [key, defaultValue]);

  const [value, setValue] = useState<string>(getFromURL);

  const setValueAndURL = useCallback(
    (newValue: string) => {
      setValue(newValue);
      const params = new URLSearchParams(window.location.search);
      if (newValue === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, newValue);
      }
      const qs = params.toString();
      const newURL = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
      window.history.pushState({}, "", newURL);
    },
    [key, defaultValue],
  );

  // Sync on back/forward browser navigation
  useEffect(() => {
    const handler = () => setValue(getFromURL());
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [getFromURL]);

  return [value, setValueAndURL] as const;
}
