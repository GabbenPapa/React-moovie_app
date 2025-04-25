import { useState, useEffect } from "react";

const API_KEY = "47c60472";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.();
      const abortController = new AbortController();

      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: abortController.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong");
          }

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name === "AbortError") {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        abortController.abort();
      };
    },
    [query]
  );

  return { movies, loading, error };
}
