import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import ProductItem from "./Productltem";
import {Link} from "react-router-dom";
import { API_POST,API_GET } from "./api";
export default function Home() {

    const [productTypes, setProductTypes] = useState([]);
    const [productTypeId, setProductTypeId] = useState(0);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () =>{
        let json = await API_GET("products/type/"+ productTypeId);
        console.log(json.result);
        setProducts(json.data);
    }

    const onDelete = async(data) =>{
        let json = await API_POST("product/delete",{
            product_id: data.product_id
        });
        console.log(json.result);
        if(json.result){
            fetchProducts();
        }
    }

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(
    //             "http://localhost:8080/api/product_types",
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     Accept: "application/json",
    //                     'Content-Type': 'application/json',
    //                     Authorization: "Bearer " + localStorage.getItem("access_token")
    //                 }
    //             }
    //         );

    //         let json = await response.json();
    //         setProductTypes(json.data);
    //     }

    //     fetchData();
    // }, []);
    
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await fetch(
    //             "http://localhost:8080/api/products/type/" + productTypeId,
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     Accept: "application/json",
    //                     'Content-Type': 'application/json',
    //                     Authorization: "Bearer " + localStorage.getItem("access_token")
    //                 }
    //             }
    //         );

    //         let json = await response.json();
    //         setProducts(json.data);
    //     }

    //     fetchData();
    // }, [productTypeId]);

    // if (localStorage.getItem("access_token")) {
    //     console.log(localStorage.getItem("access_token"));

    //     return (
    //         <div className="container">
    //             <select value={productTypeId} onChange={(e) => setProductTypeId(e.target.value)}>
    //                 <option value={0}>ทุกประเภทสินค้า</option>
    //                 {
    //                     productTypes.map(item => (
    //                         <option key={item.product_type_id} value={item.product_type_id}> 
    //                         {item.product_type_name} </option>
    //                     ))
    //                 }
    //             </select>
    //             <Link to= {"/product/add"} className="btn btn-outline-primary me-3">เพิ่ม</Link>
    //             <Link to={"/report"} className="btn btn-outline-primary me-3">รายงาน</Link>
    //             <div className="container mt-3">
    //                 {
    //                     products.map(item => (
    //                         <ProductItem 
    //                         key={item.product_id} 
    //                         data={item}
    //                         onDelete={onDelete}/>
    //                     ))
    //                 }
    //             </div>
    //         </div>
    //     );
    // }                                           

    return (
        <Navigate to="/" replace />
    );    
}