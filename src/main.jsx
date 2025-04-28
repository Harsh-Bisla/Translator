import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./pages/About.jsx";
import Faq from "./pages/Faq.jsx";
import Home from "./pages/Home.jsx";
import LanguageContext from "./context/LanguageContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/faq", element: <Faq /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageContext>
      <RouterProvider router={router} />
    </LanguageContext>
  </StrictMode>
);
