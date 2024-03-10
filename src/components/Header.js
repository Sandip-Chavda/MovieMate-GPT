import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { FaSearchengin } from "react-icons/fa6";
import { toggleGptSearchView } from "../utils/gptSlice";
import { FaHome } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user.uid;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  return (
    <div className="absolute header flex items-center justify-between w-screen bg-gradient-to-b from-black px-8 py-2 z-10">
      {/* width="167px" height="45px" */}
      <img className="w-44" src="logo.png" alt="logo" />
      {user && (
        <div className="flex gap-2 p-2">
          <button
            className="border flex items-center gap-2 border-[#E50914] bg-yellow-400 px-4 rounded-2xl text-xl font-semibold text-black hover:bg-yellow-300 mx-4"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? (
              <>
                <FaHome className="text-3xl" />
                Home
              </>
            ) : (
              <>
                <FaSearchengin className="text-3xl" />
                GPT Search
              </>
            )}
          </button>
          <img
            className="w-14 h-14 rounded-2xl"
            src={"usericon.jpg" || user.photoURL}
            alt="usericon"
          />
          <button
            onClick={handleSignout}
            className="border border-[#E50914] px-4 rounded-2xl text-xl font-semibold text-white hover:bg-[#E50914]"
          >{`Logout`}</button>
        </div>
      )}
    </div>
  );
};

export default Header;
