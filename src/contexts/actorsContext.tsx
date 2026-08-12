import React, { useCallback, useState } from "react";
import { Actor, ActorReview } from "../types/interfaces";

interface ActorsContextInterface {
  favourites: number[];
  addToFavourites: (actor: Actor) => void;
  removeFromFavourites: (actor: Actor) => void;
  addReview: (actor: Actor, review: ActorReview) => void;
}

const initialContextState: ActorsContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: () => {},
};

export const ActorsContext =
  React.createContext<ActorsContextInterface>(initialContextState);

const ActorsContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<number[]>([]);

  const [myReviews, setMyReviews] = useState<
    Record<number, ActorReview>
  >({});

  const addToFavourites = useCallback((actor: Actor) => {
    setFavourites((previousFavourites) => {
      if (!previousFavourites.includes(actor.id)) {
        return [...previousFavourites, actor.id];
      }

      return previousFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((actor: Actor) => {
    setFavourites((previousFavourites) =>
      previousFavourites.filter((actorId) => actorId !== actor.id)
    );
  }, []);

  const addReview = (actor: Actor, review: ActorReview) => {
    setMyReviews((previousReviews) => ({
      ...previousReviews,
      [actor.id]: review,
    }));
  };

  return (
    <ActorsContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
      }}
    >
      {children}
    </ActorsContext.Provider>
  );
};

export default ActorsContextProvider;