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
import OwnerStock from './components/owner/OwnerStock';
<<<<<<< Updated upstream
import Transfer from './components/owner/Transfer';
=======
import Ownerbranch from './components/owner/Ownerbranch';
import BranchForm from './components/owner/BranchForm';

>>>>>>> Stashed changes
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
      <Route path="owner/branch" element={<Ownerbranch />} />
      <Route path="branch/:branch_id" element={<BranchForm />} />
      <Route path="product/:product_id" element={<ProductForm />} />
      <Route path="employee/:emp_id" element={<EmployeeForm />} /> 
      <Route path="owner/stock" element={<OwnerStock />} />
      <Route path="product/detail/:product_id" element={<ProductForm />} />
<<<<<<< Updated upstream
      <Route path="transfer" element={<Transfer /> } />
=======
      
>>>>>>> Stashed changes
    </Routes>
  </BrowserRouter>,
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
