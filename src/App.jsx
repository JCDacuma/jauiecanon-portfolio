import { Routes, Route } from "react-router-dom";
import NavbarProvider from "@/context/navbarContext.jsx";

import HomePage from "@/pages/home-page.jsx";
import InventoryPosProjectPage from "@/pages/inventorypos-project.jsx";

function App() {
  return (
    <NavbarProvider>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/inventorypos-project"
          element={<InventoryPosProjectPage />}
        ></Route>
      </Routes>
    </NavbarProvider>
  );
}

export default App;
