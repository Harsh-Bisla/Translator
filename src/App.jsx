import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer, Zoom } from "react-toastify";
import Loader from "./components/Loader";
import { store } from "./context/LanguageContext";
import Footer from "./components/Footer";

const App = () => {
  const { loading, mode, setMode } = useContext(store);

  document.body.style.backgroundColor = mode ? "white" : "#000000f4";
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
      <Navbar />
      <Outlet />
      <Footer/>
      {loading && <Loader />}
    </>
  );
};

export default App;
