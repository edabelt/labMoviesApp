import React, { useContext } from "react";
import { useQuery } from "react-query";

import Spinner from "../../components/spinner";
import ActorListPageTemplate from "../../components/templateActorListPage";
import AddActorToFavouritesIcon from "../../components/cardIcons/addActorToFavourites";
import { getPopularActors } from "../../api/tmdb-api";
import { AuthContext } from "../../contexts/authContext";
import { Actor } from "../../types/interfaces";

const PopularActorsPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  const {
    data: actors,
    error,
    isLoading,
    isError,
  } = useQuery<Actor[], Error>(
    "popularActors",
    getPopularActors
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <ActorListPageTemplate
      title="Popular Actors"
      actors={actors ?? []}
      action={(actor: Actor) => {
        return user ? (
          <AddActorToFavouritesIcon {...actor} />
        ) : null;
      }}
    />
  );
};

export default PopularActorsPage;