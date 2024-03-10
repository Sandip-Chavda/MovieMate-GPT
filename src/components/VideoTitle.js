import React from "react";
import { IoMdPlay } from "react-icons/io";
import { BsFillInfoCircleFill } from "react-icons/bs";

// overview ne short karva mate nu function
const VideoTitle = ({ title, overview }) => {
  const truncateOverview = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    const truncated = text.split(" ").slice(0, maxLength).join(" ");
    return truncated + "...";
  };

  const truncatedOverview = truncateOverview(overview, 18);

  return (
    <div className="w-screen  aspect-video pt-[15%] px-24 absolute  text-white bg-gradient-to-r from-black ">
      <h1 className="font-bold text-6xl">{title}</h1>
      <p className="py-6 text-lg text-gray-300 font-medium w-1/4">
        {truncatedOverview}
      </p>
      <div className="flex gap-3">
        <button className="bg-[#ff000d] px-7 flex items-center gap-1 font-bold py-2 text-white rounded hover:scale-110 transition-all">
          <IoMdPlay className="text-xl" />
          Play
        </button>
        <button className="bg-white  px-7 flex items-center gap-1 font-bold py-2 text-gray-900 rounded hover:scale-110 transition-all">
          <BsFillInfoCircleFill className="" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
