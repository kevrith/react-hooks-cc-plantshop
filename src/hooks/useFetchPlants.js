import { useState, useEffect } from "react";

/**
 * Custom hook to fetch plants data from the API
 * @param {string} url - The API endpoint URL
 * @returns {Object} - Contains plants data, loading state, and error state
 */
function useFetchPlants(url) {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPlants = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          signal: abortController.signal,
        });

        // Check for ok property if it exists (real fetch), otherwise proceed
        if (response.ok === false) {
          throw new Error(`Failed to fetch plants: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPlants(data);
      } catch (err) {
        // Don't set error if the request was aborted
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();

    // Cleanup function to abort fetch on unmount
    return () => {
      abortController.abort();
    };
  }, [url]);

  return { plants, loading, error, setPlants };
}

export default useFetchPlants;
