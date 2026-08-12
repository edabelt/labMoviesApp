import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import ActorList from "../actorList";
import { Actor } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

interface ActorListPageTemplateProps {
  actors: Actor[];
  title: string;
  action: (actor: Actor) => React.ReactNode;
}

const ActorListPageTemplate: React.FC<ActorListPageTemplateProps> = ({
  actors,
  title,
  action,
}) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>

      <Grid item container spacing={5}>
        <ActorList actors={actors} action={action} />
      </Grid>
    </Grid>
  );
};

export default ActorListPageTemplate;