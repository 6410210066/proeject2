import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import ManagerMgs from './components/admin/ManagerMgs';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
import ManagerUser from './components/admin/ManageUser';
import Product from './components/owner/Product';
import OwnerEmloyee from './components/owner/OwnerEmployee';
import ProductForm from './components/owner/ProductForm';
import EmployeeForm from './components/owner/EmployeeForm';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="users/:user_id" element={<ManagerUser/>} />
      <Route path="manager" element={<ManagerMgs/>} />
      <Route path="owner/product" element={<Product />} />
      <Route path="owner/employee" element={<OwnerEmloyee />} />
      <Route path="product/:product_id" element={<ProductForm />} />
      <Route path="employee/:emp_id" element={<EmployeeForm />} /> 
    </Routes>
  </BrowserRouter>,
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
