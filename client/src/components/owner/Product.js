import { useEffect, useState } from "react";
import "./owner.css";
import Ownernav from "./Ownernav";
import { Table,Form,Col,Row,Button  } from "react-bootstrap";
import { API_GET,API_POST } from "../../api";
import Productitem from "./Productitem";
import { Link } from "react-router-dom";

export default function Product(){
    let page=6;
        const [data,setData] =useState([]);
        const [product,setProduct] =useState([]);
        const [product_name,setProductname] =useState("");
        const [validated,setValidated] =useState(false);

    useEffect(()=>{
        async function fetchData(){
            let json = await API_GET("product");
            setData(json.data);
            setProduct(json.data);
        }
        fetchData();
    },[])

    useEffect(()=>{
        if(product_name===""){
            setData(product);
        }
    },[product_name]);

    const ondelete = async(data) =>{
        let json = await API_POST("product/delete",{
            product_id : data.product_id
        });
        if(json.result){
            fetchData();
        }
    }

    const onSearch = async(event)=>{

        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            if(product_name !=""){
                let searchdata = [];
                product.filter(product =>product.product_name.includes(product_name)).map(item => {
                    searchdata.push(item);
                }) 
                fetchSearch(searchdata);
            }else{
                setData(product);
            }
        }
    }

    const fetchData = async()=>{
            let json = await API_GET("product");
            setData(json.data);
            setProduct(json.data);
    }

    const fetchSearch = async(searchdata)=>{
        setData(searchdata);
    }
    return (

        <>
            <div  className="container-fluid" >
                <div className="row">
                    <div className="col-lg-2 nav" style={{padding:"0"}}>
                         <Ownernav page={page} />
                    </div>
                    <div className="col-lg-10 content " style={{padding:"0"}}>
                        <h1 className="header">จัดการรายการสินค้า</h1>
                        
                        <Form noValidate validated={validated}  onClick={onSearch}>
                        <div className="row ms-5 mb-3 grid">
                            <div className="col-lg-8 col-md-7 col-sm-6 mt-1">
                                <Form.Group as={Col} controlId="validateUserName" >
                                    <Form.Control
                                        required
                                        type="text"
                                        value={product_name}
                                        placeholder="ค้นหาชื่อผู้ใช้"
                                        onChange={(e) => setProductname(e.target.value)}  
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        กรุณากรอกชื่อสินค้า
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-lg-1 col-sm-2 me-4 ms-3"> 
                                <Button className="button btn-edit" as="input" type="submit" value="ค้นหา"/>
                            </div>
                            <div className="col-lg-2 col-sm-2">                             
                                <Link to={`/product/add`} className="button btn-add">เพิ่ม</Link>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </Form>
                        
                        <Table striped className="mx-5 grid">
                            <thead>
                                <tr>
                                    <th>รหัสสินค้า     </th>
                                    {/* <th>ภาพ        </th> */}
                                    <th>ชื่อสินค้า     </th>
                                    <th>ราคาสินค้า   </th>
                                    {/* <th>ขนาด       </th>
                                    <th>น้ำหนัก      </th> */}
                                    <th>ประเภทสินค้า </th>
                                    <th>รายละเอียด</th>
                                    <th>แก้ไข       </th>
                                    <th>ลบ         </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   data.map(item => (
                                        <Productitem key={item.product_id} data={item} ondelete={ondelete} />
                                   ))

                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}