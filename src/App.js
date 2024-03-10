import { Provider } from "react-redux";
import Body from "./components/Body";
import "react-toastify/dist/ReactToastify.css";
import appStore from "./utils/appStore";

// import dotenv from "dotenv";
// dotenv.config();

// require("dotenv").config();

function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;
