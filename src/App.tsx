import React from 'react';

import './App.css';
import {Route, Routes} from "react-router-dom";
import {Judge} from "./Judge";
import {Display} from "./Display";
function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/" element={<Judge />} />
              <Route path="/display" element={<Display />} />
          </Routes>
      </div>
  );
}

export default App;
