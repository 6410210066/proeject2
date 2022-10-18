import Employeenav from "./Employeenav";
import { useEffect, useState } from "react";
import { API_GET} from "../../api";
import { Link } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Selectbasket, SelectempProduct } from "../../modals";
import { SERVER_URL } from "../../app.config";
import { Button,Table } from "react-bootstrap";

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
        const [ShowSelectbasket,setShowSelectbasket] = useState(false);
        const [list,setList] = useState([]);
        const [amountproduct,setAmountproduct] = useState(0);
        const [net,setNet] = useState(0);

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
        setShowSelectbasket(true);
    }

    const ONHide = ()=>{
        setShowSelectempProduct(false);
        setShowSelectbasket(false);
    }

    const ondelete = async()=>{
       
    }

    return(
        <>
             <div  className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                        <Employeenav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content px-5 overfloww" style={{padding:"0"}}>
                       <h1 className="header pt-2">สินค้า</h1>
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
                                                    <img className="pic-size" src={`${SERVER_URL}images/${item.product_img}`} alt="Upload status" />
                                                </div>
                                                    <div className="pt-3">
                                                        <p>ชื่อสินค้า : {item.product_name} </p>
                                                        <p>ขนาดไซต์ : {item.product_size}</p>
                                                        <p>ราคา : {item.product_price} บาท</p>
                                                        
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

                                            <div class="box1 m-auto my-4 col-6 col-md-4 p-4 " onClick={event =>ONClick(item)} key={item.product_id}>
                                                <div className="PhotoProduct m-auto">
                                                    <img className="pic-size" src={`${SERVER_URL}images/${item.product_img}`} alt="Upload status" />
                                                </div> 
                                                    <div className="pt-3">
                                                        <p>ชื่อสินค้า : {item.product_name} </p>
                                                        <p>ขนาดไซต์ : {item.product_size}</p>
                                                        <p>ราคา : {item.product_price} บาท</p>
                                                
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
                                                <div class="box1 m-auto my-4 col-6 col-md-4 p-4 " onClick={event =>ONClick(item)} key={item.product_id}>
                                                    <div className="PhotoProduct m-auto">
                                                        <img className="pic-size" src={`${SERVER_URL}images/${item.product_img}`} alt="Upload status" />
                                                    </div> 
                                                        <div className="pt-3">
                                                            <p>ชื่อสินค้า : {item.product_name} </p>
                                                            <p>ขนาดไซต์ : {item.product_size}</p>
                                                            <p>ราคา : {item.product_price} บาท</p>
                                                        
                                                        </div> 
                                                </div>
                                            ))
                                        }
                                        
                                </div>
                            </Tab>

                            <Tab eventKey="product4" title="ท็อปปิ้ง">
                                <div class="row bg-ground">
                                        {
                                            data.filter(data => data.product_type_id ==4).map(item => (
                                                <div class="box1 m-auto my-4 col-6 col-md-4 p-4 " onClick={event =>ONClick(item)} key={item.product_id}>
                                                    <div className="PhotoProduct m-auto">
                                                        <img className="pic-size" src={`${SERVER_URL}images/${item.product_img}`} alt="Upload status" />
                                                    </div> 
                                                        <div className="pt-3">
                                                            <p>ชื่อสินค้า : {item.product_name} </p>
                                                            <p>ขนาดไซต์ : {item.product_size}</p>
                                                            <p>ราคา : {item.product_price} บาท</p>
                                                        </div> 
                                                </div>
                                            ))
                                        }
                                        
                                </div>
                            </Tab>

                            </Tabs>
                        </div>

                        <div class="mx-5 bg-ground1">
                            <h2 className="header pt-4">รายการสินค้า</h2>
                        
                                <Table striped className="mx-5 grid">
                                    <thead style={{backgroundColor:"#FFC700"}}>
                                        <tr>
                                            <th>ชื่อสินค้า</th>
                                            <th>ขนาดสินค้า</th>
                                            <th>ราคา</th>
                                            <th>จำนวน</th>
                                            <th>ราคารวม</th>
                                            <th>ลบ</th>
                                        </tr>
                                        </thead>

                                        <tbody> 
                                             {
                                                list != null && 
                                                list.map(item=>(
                                                    
                                                    <>
                                                        <tr>
                                                            <td>{item.product_name}</td>
                                                            <td>{item.product_size}</td>
                                                            <td>{item.product_price}</td>
                                                            <td>{item.amount}</td>
                                                            <td>{item.total}</td>
                                                            <td className="align-middle"><button onClick={ondelete} className="btn btn-danger btn-sm">ลบ</button></td>
                                                        </tr>
                                                    </>
                                                ))
                                             }
                                        
                                        </tbody>
                                    
                                        
                                </Table>   
                                    <div className="row box-down1 px-2 mt-2">
                                        <h5 className="col-6">จำนวนสินค้า<input className="d-inline-block mx-1 textbox-plus form-control form-control-sm" value={amountproduct}></input>ชิ้น </h5> 
                                        <h5 className="col-6">ราคารวม <input className="d-inline-block mx-1 textbox-plus form-control form-control-sm" value={net}></input>บาท</h5>
                                    </div>  

                                    <div class="d-grid px-5 gap-3 px-4 mt-4">
                                        <Button className="btn" variant="success" onClick={ONHide}>ชำระเงิน</Button>
                                    </div> 
                        </div>

                    </div>
                </div>
            </div>
            <SelectempProduct 
                show={ShowSelectempProduct} 
                data={selectdata} 
                onHide={ONHide} 
                setlist={setList} 
                setAmountproduct={setAmountproduct} 
                setNet={setNet} 
                list={list}/>   
                
            {/* <Selectbasket show={ShowSelectbasket} data={selectdata} onHide={ONHide}/> */}
        </>
    )
}