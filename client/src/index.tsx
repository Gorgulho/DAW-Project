import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App.test'
import Home from './Home'
import Create from './CreateRecipe'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createRecipe" element={<Create />} />
              <Route path="/coco" element={<App2 />}/>
          </Routes>
      </Router>
  </React.StrictMode>
);
