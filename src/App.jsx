import { Routes, Route } from "react-router-dom";
import NavbarProvider from "@/context/navbarContext.jsx";

import HomePage from "@/pages/home-page.jsx";
import InventoryPosProjectPage from "@/pages/inventorypos-project.jsx";
import OrderFulfillmentProjectPage from "@/pages/logistic-project-page.jsx";
import ChatbotProvider from "@/context/chatbotContext.jsx";

function App() {
  return (
    <ChatbotProvider>
      <NavbarProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/inventorypos-project"
            element={<InventoryPosProjectPage />}
          ></Route>
          <Route
            path="/orderfulfillment-project"
            element={<OrderFulfillmentProjectPage />}
          ></Route>
        </Routes>
      </NavbarProvider>
    </ChatbotProvider>
  );
}

export default App;
