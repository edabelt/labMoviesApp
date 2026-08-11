import React from "react";
import ActorCard from "../actorCard";
import Grid from "@mui/material/Grid";
import { Actor } from "../../types/interfaces";

interface ActorListProps {
  actors: Actor[];
}

const ActorList: React.FC<ActorListProps> = ({ actors }) => {
  const actorCards = actors.map((actor) => (
    <Grid key={actor.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <ActorCard actor={actor} />
    </Grid>
  ));

  return actorCards;
};

export default ActorList;