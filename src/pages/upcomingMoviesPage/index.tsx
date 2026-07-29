import React, { useEffect, useState } from "react";
import MovieListPageTemplate from "../../components/templateMovieListPage";
import { getUpcomingMovies } from "../../api/tmdb-api";
import { BaseMovieProps } from "../../types/interfaces";

const UpcomingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const addToFavourites = (movieId: number) => {
    const updatedMovies = movies.map((movie) =>
      movie.id === movieId
        ? { ...movie, favourite: true }
        : movie
    );

    setMovies(updatedMovies);

    const favourites = updatedMovies.filter(
      (movie) => movie.favourite
    );

    localStorage.setItem(
      "favourites",
      JSON.stringify(favourites)
    );
  };

  useEffect(() => {
    getUpcomingMovies()
      .then((upcomingMovies) => {
        console.log("Upcoming movies:", upcomingMovies);
        setMovies(upcomingMovies);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Upcoming movies error:", err);
        setError("Unable to load upcoming movies.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading upcoming movies...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <MovieListPageTemplate
      title="Upcoming Movies"
      movies={movies}
      selectFavourite={addToFavourites}
    />
  );
};

export default UpcomingMoviesPage;