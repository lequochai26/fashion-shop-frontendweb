import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GeneralHeader from './pages/general/GeneralHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import CartPage from './pages/cartpage/CartPage';
import UserCentralPage from './pages/usercentral/UserCentralPage';
import RegisterPage from './pages/registerpage/RegisterPage';
import LoginPage from './pages/login/LoginPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="w-screen h-screen flex flex-col justify-start">
      <GeneralHeader />
      <div className="flex flex-row justify-center flex-1 overflow-scroll">
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              Component={HomePage}
            />
            <Route
              path="/cart"
              Component={CartPage}
            />
            <Route
              path="/usercentral"
              Component={UserCentralPage}
            />
            <Route
              path="/register"
              Component={RegisterPage}
            />
            <Route
              path="/login"
              Component={LoginPage}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
