import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import GeneralHeader from './pages/general/GeneralHeader';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/registerpage/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import UserCentralPage2 from './pages/usercentral/UserCentralPage2';


import UpdatePersonnalInfoPage from './pages/updatepersonalInfo/UpdatePersonalInfoPage';
import OrderedOrdersPage from './pages/orderedorders/OrderedOrdersPage';
import ThirdPartyAccountRegistrationFinishPage from './pages/thirdpartyaccountregistrationfinishpage/ThirdPartyAccountRegistrationFinishPage';
import ItemTypeManagementPage from './pages/itemtypemanagement/ItemTypeManagementPage';
import ItemManagementPage from './pages/itemmanagementpage/ItemManagementPage';
import UserManagement from './pages/usermanagement/UserManagementPage';
import ItemDetailPage from './pages/itemdetailpage/ItemDetailPage';
import UpgradedCartPage from './pages/cartpage/UpgradedCartPage';
import OrderDetailPage from './pages/orderdetailpage/OrderDetailPage';
import UpgradedHomePage from './pages/homepage/UpgradedHomePage';
import UpdatedCartPage from './pages/cartpage/UpdatedCartPage';
import UpgradedItemDetailPage from './pages/itemdetailpage/UpgradedItemDetailPage';

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
              Component={UpgradedHomePage}
            />
            <Route
              path="/cart"
              Component={UpdatedCartPage}
            />
            <Route
              path="/usercentral"
              Component={UserCentralPage2}
            />
            <Route
              path="/register"
              Component={RegisterPage}
            />
            <Route
              path="/login"
              Component={LoginPage}
            />
            <Route
              path="/orderedorders"
              Component={OrderedOrdersPage}
            />
            <Route
              path="/itemdetail"
              Component={UpgradedItemDetailPage}
            />
            <Route
              path="/orderdetail"
              Component={OrderDetailPage}
            />
            <Route
              path="/updatepersonalinfo"
              Component={UpdatePersonnalInfoPage}
            />
            <Route
              path="/thirdpartyaccountregistrationfinish"
              Component={ThirdPartyAccountRegistrationFinishPage}
            />
            <Route
              path="/management/itemtype"
              Component={ItemTypeManagementPage}
            />
            <Route
              path="/management/item"
              Component={ItemManagementPage}
            />
            <Route
              path="/management/user"
              Component={UserManagement}
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
