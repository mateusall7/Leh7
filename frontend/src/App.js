import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import ChessGame from "./components/ChessGame";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChessGame />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
