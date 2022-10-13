import Employeenav from "./Employeenav";
import { useEffect, useState } from "react";
import { API_GET} from "../../api";
import { Link } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { SelectempProduct } from "../../modals";
import { SERVER_URL } from "../../app.config";

export default function Employee(){

    let page=1;
        const [data,setData] = useState([]);
        const [product,setProduct] = useState([]);
        const [product_name,setProductname] = useState("");
        const [product_type_id,setProductTypeId] = useState([]);
        const [key, setKey] = useState('product1');
        const [ShowSelectempProduct,setShowSelectempProduct] = useState(false);
        const [selectproduct,setSelectproduct] = useState([]);
        const [selectdata,setSelectdata] = useState({});
        const [validated,setValidated] =useState(false);
        const [imageUrl, setImageUrl] = useState("");

    useEffect(()=>{
        fetchData();


    },[])
    
    useEffect(()=>{
        if(product_name===""){
            setData(product);
        }
    },[product_name]); 
      
    const fetchData = async()=>{
        let json = await API_GET("Employeeproduct");
        setData(json.data);
        setProduct(json.data);
        
    }

    const ONClick = (item)=>{
        setSelectdata(item);
        setShowSelectempProduct(true);
    }

    const ONHide = ()=>{
        setShowSelectempProduct(false);
    }

    return(
        <>
             <div  className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                        <Employeenav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content px-5 overfloww" style={{padding:"0"}}>
                       <h1 className="header pt-4">สินค้า</h1>
                        <div>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-0 tab-select mt-2"
                                >
                            <Tab eventKey="product1" title="เฟรนฟราย" className="m-0">
                                
                                <div class="row bg-ground">
                                    {
                                        data.filter(data => data.product_type_id == 1).map(item => (
                                            
                                            <div class="box1 m-auto my-4 col-6 col-md-4 p-4 " onClick={event =>ONClick(item)} key={item.product_id}>
                                                <div className="PhotoProduct m-auto">
                                                    {/* <img src={`${SERVER_URL}images/${imageUrl}`} width={150} alt="Upload status" />
                                                    {item.product_img} */}
                                                </div>
                                                    <div className="pt-3">
                                                        <p>{item.product_name} {item.product_price} บาท</p>
                                                        <p>ขนาดไซต์ {item.product_size}</p>

                                                    </div> 
                                                    
                                            </div>
                                            
                                        ))
                                    }
                                </div>
                            </Tab>

                            <Tab eventKey="product2" title="นักเก็ต">
                                <div class="row bg-ground">
                                    {
                                        data.filter(data => data.product_type_id ==2).map(item => (

                                            <div class="box1 m-auto my-4 col-6 col-md-4 p-4 ">
                                                <div className="PhotoProduct m-auto">
                                                </div> 
                                                    <div className="pt-3">
                                                        <p>{item.product_name} {item.product_price} บาท</p>
                                                        <p>ขนาดไซต์ {item.product_size}</p>
                                                
                                                    </div> 
                                            </div>
                                        ))
                                    }
                                </div>
                            </Tab>

                            <Tab eventKey="product3" title="เครื่องดื่ม">
                                <div class="row bg-ground">
                                        {
                                            data.filter(data => data.product_type_id ==3).map(item => (
                                                <div class="box1 m-auto my-4 col-6 col-md-4 p-4 ">
                                                    <div className="PhotoProduct m-auto">
                                                    </div> 
                                                        <div className="pt-3">
                                                            <p>{item.product_name} {item.product_price} บาท</p>
                                                            <p>ขนาดไซต์ {item.product_size}</p>
                                                    
                                                        </div> 
                                                </div>
                                            ))
                                        }
                                        
                                </div>
                            </Tab>

                            </Tabs>
                        </div>
                            <h2 className="header pt-4">รายการการสั่ง</h2>
                                <div className="box-down px-4 mt-2">
                                    {/* <Users page={page}/> */} 
                                    
                                    <h5>จำนวนสินค้า บาท</h5>
                                    <h5>ราคารวม บาท</h5>
                                    
                                </div>
                    </div>
                </div>
            </div>
            <SelectempProduct show={ShowSelectempProduct} data={selectdata} onHide={ONHide}/>   
        </>
    )
}