import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // validate form data

    const message = checkValidData(email.current.value, password.current.value);

    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      //signup

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: username.current.value,
            photoURL:
              "https://avatars.githubusercontent.com/u/140686165?s=48&v=4",
          })
            .then(() => {})
            .catch((error) => {});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "||" + errorMessage);
        });
    } else {
      //signin
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // setErrorMessage(errorCode + "||" + errorMessage);
          setErrorMessage(`Email or password Wrong, Check again.`);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="" src="Background.jpg" alt="background" />
      </div>

      <form
        className="absolute p-10 text-white bg-[#000000ad] w-4/12 my-36 mx-auto right-0 left-0"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl py-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <p className="text-center">email:sandip123@gmail.com</p>
        <p className="text-center">pass:Sandip1234</p>
        {!isSignInForm && (
          <input
            ref={username}
            type="text"
            placeholder="User Name"
            className="p-4 my-4 w-full bg-[#333333]"
          />
        )}
        <input
          ref={email}
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-[#333333]"
        />
        <input
          ref={password}
          type="password"
          placeholder="********"
          className="p-4 my-4 w-full bg-[#333333]"
        />
        {errorMessage && (
          <p className="text-red-400 border p-1 text-center border-red-400">
            {errorMessage}
          </p>
        )}
        <button
          className="p-4 my-4 font-semibold w-full bg-[#E50914] rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Login" : "Sign Up"}
        </button>
        <p className="text-gray-400 py-4 flex gap-2">
          {isSignInForm ? "New to MovieMate" : "Already have an account"}
          <span
            onClick={toggleSignInForm}
            className="text-[#E50914] cursor-pointer"
          >
            {isSignInForm ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
