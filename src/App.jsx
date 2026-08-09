import { Routes, Route } from "react-router-dom";
import NavbarProvider from "@/context/navbarContext.jsx";

import HomePage from "@/pages/home-page.jsx";

function App() {
  return (
    <NavbarProvider>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </NavbarProvider>
  );
}

export default App;
