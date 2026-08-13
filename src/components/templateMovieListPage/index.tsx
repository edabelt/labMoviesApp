import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import { MovieListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
};

const MovieListPageTemplate: React.FC<
  MovieListPageTemplateProps
> = ({ movies, title, action }) => {
  return (
    <>
      <Header title={title} />

      <Grid container sx={styles.root}>
        <Grid item container spacing={5}>
          <MovieList
            movies={movies}
            action={action}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MovieListPageTemplate;