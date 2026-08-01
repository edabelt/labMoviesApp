import React, { useEffect, useState } from "react";
import MovieListPageTemplate from "../../components/templateMovieListPage";
import AddToFavouritesIcon from "../../components/cardIcons/addToFavourites";
import { getUpcomingMovies } from "../../api/tmdb-api";
import { BaseMovieProps } from "../../types/interfaces";

const UpcomingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      action={(movie: BaseMovieProps) => (
        <AddToFavouritesIcon {...movie} />
      )}
    />
  );
};

export default UpcomingMoviesPage;