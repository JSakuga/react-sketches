import { useState, useEffect } from "react";

const KEY = "efe2a7cf";

/* CUSTOM HOOK */
export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /* ERROR HANDLING  */
  const [error, setError] = useState("");

  /* USEEFFECT & DATA FETCHING */
  useEffect(
    function () {
      const controller = new AbortController(); // for the clean up

      async function fetchMovies() {
        /* ERROR HANDLING */
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      // CLENUP FUNCTION
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
