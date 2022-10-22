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
import ManagerEmployeeForm from './components/manager/ManagerEmployeeForm';
import OwnerStock from './components/owner/OwnerStock';
import Transfer from './components/owner/Transfer';
import Ownerbranch from './components/owner/Ownerbranch';
import BranchForm from './components/owner/BranchForm';
import Managerquest from './components/owner/Managerequest';
import ProductDetail from './components/owner/ProductDetail';
import Employeehistory from './components/employee/Employeehistory';
import Managerstock from './components/manager/Managerstock';
import ManagerEmployee from './components/manager/ManagerEmployee';
import ManagerstockRequest from './components/manager/ManagerStockRequest';
import OwnerStockForm from './components/owner/OwnerStockForm';
import MaterailForm from './components/owner/MaterialForm';
import Reportstockbybranch from './components/owner/report/Reportstockbybranch';
import ReportAllstock from './components/owner/report/ReportAllstock';
import ManagerTransfer from './components/manager/ManagerTransfer';
import ManagerRequestItem from './components/owner/ManagerRequestItem';
import TransferReqeust from './components/owner/TransferRequest';
import RequestHistory from './components/owner/RequestHistory';
import TransferHistory from './components/owner/TransferHistory';
import Reportsellrecord from './components/owner/report/Reportsellrecord';
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
      <Route path="product/detail/:product_id" element={<ProductDetail />} />
      <Route path="transfer" element={<Transfer /> } />
      <Route path="request" element={<Managerquest />} />
      <Route path="employee/salehistory" element={<Employeehistory />} />
      <Route path="manager/stock" element={<Managerstock />} />
      <Route path="manager/employee" element={<ManagerEmployee/> } />
      <Route path="manager/stockrequest" element={<ManagerstockRequest />} />
      <Route path="manager/employee/:emp_id" element={<ManagerEmployeeForm />} />
      <Route path="owner/stock/:stock_id" element={<OwnerStockForm/>} />
      <Route path="owner/material/:material_id" element={<MaterailForm />} />
      <Route path="owner/Reportstockbybranch" element={<Reportstockbybranch />} />
      <Route path="owner/reportallstock" element={<ReportAllstock />} />
      <Route path="manager/managetransfer" element={<ManagerTransfer/>} />
      <Route path="owner/maangerequest/:request_id" element={<ManagerRequestItem/>}/>
      <Route path="owner/transferrequest" element={<TransferReqeust/>} />
      <Route path="owner/requesthistory" element={<RequestHistory />} />
      <Route path="owner/transferhistory" element={<TransferHistory />} />
      <Route path="owner/Reportsellrecord" element={<Reportsellrecord/>} />
    </Routes>
  </BrowserRouter>,
  // document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
