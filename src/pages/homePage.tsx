import React, { useContext } from "react";
import { useQuery } from "react-query";

import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { AuthContext } from "../contexts/authContext";
import {
  DiscoverMovies,
  BaseMovieProps,
} from "../types/interfaces";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const HomePage: React.FC = () => {
  const { user } = useContext(AuthContext);

  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery<DiscoverMovies, Error>(
    "discover",
    getMovies
  );

  const {
    filterValues,
    setFilterValues,
    filterFunction,
  } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (
    type: string,
    value: string
  ) => {
    const changedFilter = {
      name: type,
      value,
    };

    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];

    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return user ? (
            <AddToFavouritesIcon {...movie} />
          ) : null;
        }}
      />

      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default HomePage;