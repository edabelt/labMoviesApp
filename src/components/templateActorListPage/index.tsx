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
}

const ActorListPageTemplate: React.FC<ActorListPageTemplateProps> = ({
  actors,
  title,
}) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>

      <Grid item container spacing={5}>
        <ActorList actors={actors} />
      </Grid>
    </Grid>
  );
};

export default ActorListPageTemplate;