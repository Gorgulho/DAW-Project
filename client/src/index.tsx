import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App.test'
import Page from './Page'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Router>
          <Routes>
              <Route path="/" element={<Page />} />
              <Route path="/coco" element={<App2 />}/>
          </Routes>
      </Router>
  </React.StrictMode>
);
