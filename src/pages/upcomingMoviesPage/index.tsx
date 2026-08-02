import React from "react";
import { useQuery } from "react-query";
import MovieListPageTemplate from "../../components/templateMovieListPage";
import AddToMustWatchIcon from "../../components/cardIcons/addToMustWatch";
import Spinner from "../../components/spinner";
import { getUpcomingMovies } from "../../api/tmdb-api";
import { BaseMovieProps } from "../../types/interfaces";

const UpcomingMoviesPage: React.FC = () => {
  const {
    data: movies,
    error,
    isLoading,
    isError,
  } = useQuery<BaseMovieProps[], Error>(
    "upcomingMovies",
    getUpcomingMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <MovieListPageTemplate
      title="Upcoming Movies"
      movies={movies ?? []}
      action={(movie: BaseMovieProps) => (
        <AddToMustWatchIcon {...movie} />
      )}
    />
  );
};

export default UpcomingMoviesPage;