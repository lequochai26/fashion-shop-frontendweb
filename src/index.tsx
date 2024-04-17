import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GeneralHeader from './pages/general/GeneralHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GeneralHeader />
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          Component={HomePage}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
