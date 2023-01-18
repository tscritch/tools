import { useEffect } from "react";

export const useFresh = (fetchFresh: any) =>
  useEffect(() => {
    fetchFresh();

    // refresh when tab is visible
    const visibilitychange = () => {
      if (!document.hidden) {
        fetchFresh();
      }
    };

    document.addEventListener("visibilitychange", visibilitychange);

    return () => {
      document.removeEventListener("visibilitychange", visibilitychange);
    };
  }, []);
