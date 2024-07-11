import React from "react";
import MenuBar from "./components/MenuBar";
import CustomRoutes from "./routes/CustomRoutes";
import { Router, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <CustomRoutes/>
    </React.Fragment>
  );
}

export default App
