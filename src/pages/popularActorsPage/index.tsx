import React from "react";
import { useQuery } from "react-query";
import Spinner from "../../components/spinner";
import ActorListPageTemplate from "../../components/templateActorListPage";
import { getPopularActors } from "../../api/tmdb-api";
import { Actor } from "../../types/interfaces";

const PopularActorsPage: React.FC = () => {
  const {
    data: actors,
    error,
    isLoading,
    isError,
  } = useQuery<Actor[], Error>("popularActors", getPopularActors);

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
    />
  );
};

export default PopularActorsPage;