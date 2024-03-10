import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="-mt-56 pl-3 pr-1 relative z-50">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Comedy Movies"} movies={movies.nowPlayingMovies} />
        {/* <MovieList title={"Horror Movies"} movies={movies.nowPlayingMovies} /> */}
      </div>
    )
  );
};

export default SecondaryContainer;
