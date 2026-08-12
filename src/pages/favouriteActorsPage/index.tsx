import React, { useContext } from "react";
import { useQueries } from "react-query";

import ActorListPageTemplate from "../../components/templateActorListPage";
import RemoveActorFromFavouritesIcon from "../../components/cardIcons/removeActorFromFavourites";
import WriteActorReview from "../../components/cardIcons/writeActorReview";
import Spinner from "../../components/spinner";
import { ActorsContext } from "../../contexts/actorsContext";
import { getActor } from "../../api/tmdb-api";
import { Actor } from "../../types/interfaces";

const FavouriteActorsPage: React.FC = () => {
  const { favourites: actorIds } = useContext(ActorsContext);

  const favouriteActorQueries = useQueries(
    actorIds.map((actorId) => ({
      queryKey: ["actor", actorId],
      queryFn: () => getActor(actorId.toString()),
    }))
  );

  const isLoading = favouriteActorQueries.some(
    (query) => query.isLoading
  );

  if (isLoading) {
    return <Spinner />;
  }

  const favouriteActors = favouriteActorQueries
    .map((query) => query.data)
    .filter((actor): actor is Actor => actor !== undefined);

  return (
    <ActorListPageTemplate
      title="Favourite Actors"
      actors={favouriteActors}
      action={(actor: Actor) => {
        return (
          <>
            <RemoveActorFromFavouritesIcon {...actor} />
            <WriteActorReview {...actor} />
          </>
        );
      }}
    />
  );
};

export default FavouriteActorsPage;