import React from "react";
import "./App.css";
import { Novel2DViewer } from "./Novel2DViewer";
import { sample } from "./novels/novel2d";

const App = () => {
  return (
    <div className="app">
      <Novel2DViewer pages={sample} />
    </div>
  );
};

export default App;
