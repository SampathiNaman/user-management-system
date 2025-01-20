import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import UserDetail from "./components/UserDetail";
import NotFound from "./components/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyles from "./GlobalStyles";

import ThemeContext from "./context/ThemeContext";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <>
      <GlobalStyles />
      <ThemeContext.Provider value={{ theme, handleThemeChange }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Home />} />
            <Route path="/user/:id" element={<UserDetail />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
