import React, {
  useEffect,
  useState,
  type ChangeEvent,
} from "react";

import type { SelectChangeEvent } from "@mui/material";
import type { FilterOption } from "../../types/interfaces";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";

const styles = {
  root: {
    maxWidth: 345,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface Genre {
  id: number;
  name: string;
}

interface FilterMoviesCardProps {
  titleFilter: string;
  genreFilter: string;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({
  titleFilter,
  genreFilter,
}) => {
  const [genres, setGenres] = useState<Genre[]>([
    { id: 0, name: "All" },
  ]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }`
    )
      .then((res) => res.json())
      .then((json) => {
        setGenres([{ id: 0, name: "All" }, ...json.genres]);
      });
  }, []);

  const handleChange = (type: FilterOption, value: string) => {
    // To be completed later
    console.log(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange("title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent<string>) => {
    handleChange("genre", e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the movies
          </Typography>

          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />

          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>

            <Select
              labelId="genre-label"
              id="genre-select"
              label="Genre"
              value={genreFilter}
              onChange={handleGenreChange}
            >
              {genres.map((genre) => (
                <MenuItem
                  key={genre.id}
                  value={String(genre.id)}
                >
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;