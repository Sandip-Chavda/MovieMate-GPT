import React from "react";
import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-48 pr-4 hover:scale-90 transition-all">
      <img
        alt="thumbnail"
        className="rounded-3xl"
        src={IMG_CDN_URL + posterPath}
      />
    </div>
  );
};

export default MovieCard;
