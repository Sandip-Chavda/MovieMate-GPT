import React, { useRef } from "react";
import { FaSearchengin } from "react-icons/fa6";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";
import { useDispatch } from "react-redux";

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();

    return json.result;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a Movie Recommendation System and suggest some movies for the query :" +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example result:Hanuman, Salar, RRR, KGF2, Sita Raman";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };
  const searchText = useRef(null);

  return (
    <div className="pt-[8%] flex justify-center">
      <form
        className=" w-1/2 bg-[#353535] rounded-lg flex items-center m-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-3 m-3 text-white text-xl rounded-md bg-[#141414]  w-full"
          placeholder="Suggest me horror comedy movies."
        />
        <button
          onClick={handleGptSearchClick}
          className="p-3 mr-3 rounded-full text-black bg-yellow-400"
        >
          <FaSearchengin className="text-2xl" />
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
