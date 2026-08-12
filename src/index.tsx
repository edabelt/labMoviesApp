import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import PopularActorsPage from "./pages/popularActorsPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import FavouriteActorsPage from "./pages/favouriteActorsPage";

import SiteHeader from "./components/siteHeader";
import MoviesContextProvider from "./contexts/moviesContext";
import ActorsContextProvider from "./contexts/actorsContext";
import AddActorReviewPage from "./pages/addActorReviewPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ActorsContextProvider>
          <MoviesContextProvider>
            <SiteHeader />

            <Routes>
              <Route
                path="/reviews/form"
                element={<AddMovieReviewPage />}
              />

              <Route
                path="/reviews/:id"
                element={<MovieReviewPage />}
              />

              <Route
                path="/movies/favourites"
                element={<FavouriteMoviesPage />}
              />

              <Route
                path="/movies/upcoming"
                element={<UpcomingMoviesPage />}
              />

              <Route
                path="/actors/reviews/form"
                element={<AddActorReviewPage />}
              />

              <Route
                path="/actors/favourites"
                element={<FavouriteActorsPage />}
              />

              <Route
                path="/actors"
                element={<PopularActorsPage />}
              />

              <Route
                path="/actors/:id"
                element={<ActorDetailsPage />}
              />

              <Route
                path="/movies/:id"
                element={<MoviePage />}
              />

              <Route path="/" element={<HomePage />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MoviesContextProvider>
        </ActorsContextProvider>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);