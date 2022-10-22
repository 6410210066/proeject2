import Employeenav from "./Employeenav";
import { useEffect, useState } from "react";
import { API_GET, API_POST} from "../../api";
import { Link, Navigate } from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ConfirmModal, Selectbasket, SelectempProduct } from "../../modals";
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
        
        const [list,setList] = useState([]);
        const [amountproduct,setAmountproduct] = useState(0);
        const [net,setNet] = useState(0);

        const [emp_id,setEmpid] = useState(0);
        const [branch_id,setBranchid] = useState(0);
        const [piece,setPiece] = useState(0);
        const [total,setTotal] = useState(0);
        const [getmoney,setGetmoney] = useState(0);
        const [change,setChange] = useState(0);
        const [title,setTitle] = useState("");
        const [message,setMessage] = useState("");
        const [sid,setSid] =useState(0);
        const [Showpayment,setShowpayment] = useState(false); //show modal คิดเงินทอน
        const [showconfirm,setShowconfirm] = useState(false); // show modal confirm
        const [validated,setValidated] =useState(false);
        const [imageUrl, setImageUrl] = useState("");
        const [stock,setStock] = useState([]);

    useEffect(()=>{
        fetchData();
        let user_id = localStorage.getItem("user_id");
        getBranchId(user_id);
        fetchStock();
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

    const fetchStock = async()=>{
        let json = await API_GET("stock");
        if(json.result){
            setStock(json.data);
        }
    }

    const ONClick = (item)=>{
        setSelectdata(item);
        setShowSelectempProduct(true);
       
    }

    const ONHide = ()=>{
        setShowSelectempProduct(false);
        setShowpayment(false);
        setShowconfirm(false);
    }

    const onComfirm = async()=>{
        setShowpayment(true);
    }    

    const onSelectConfirm  =(getmoney,change)=>{
        setGetmoney(getmoney);
        setChange(change);
        setShowconfirm(true);
        setTitle("ยืนยันการชำระเงิน");
        setMessage("คุณต้องการยืนยันการชำระเงินใช่หรือไม่");
    }

    const ondelete = async(num,net,amountproduct)=>{
        let data = [];

       if(list.length>0){
            list.map((item,index) =>{
                if(index != num){
                    data.push(item);
                }else{
                    setNet(net - parseInt(item.total));
                    setAmountproduct(amountproduct - item.amount);

                }
        });
        setList(data);
        if(data.length == 0){
            setSelectdata(true);
        }
       }
    }

    const clearList = () => {
        setNet(0);
        setAmountproduct(0);
        setList([]);
    }

    const payment = async() => {
        

        const json = await API_POST("sellrecord/add",{
            emp_id: emp_id,
            branch_id: branch_id,
            piece: amountproduct,
            total: net,
            getmoney: getmoney,
            paychange: change
        });

        if(json.result){

            setSid(json.data.insertId);
            list.map(item=>{
                // updateStock(item);
                addselllist(item,json.data.insertId);
            })
           
        }
        setList([]);
        setAmountproduct(0);
        setGetmoney(0);
        setChange(0);
        setNet(0);
        setShowpayment(false);
        setShowconfirm(false);
    }
    
    const addselllist = async(item,sid)=>{

  
        let json = await API_POST('selllist/add',{
            product_id: item.product_id,
            piece: item.amount,
            branch_id: branch_id,
            total: item.total,
            s_id:sid
        });

        if(json.result){
            
        }

    }

   const updateStock = async(list)=>{
        let num=0;
        let stockID;
        let stockamount=0;
        let sumlist=0;
        
        stock.filter(stock => stock.m_id == list.m_id && stock.branch_id == branch_id).map(item=>{
            console.log(item.stock_amount * 1000);
            stockamount = parseInt(item.stock_amount) * 1000
            sumlist= parseInt(list.product_weight)  * parseInt(list.amount);
            num = (stockamount - sumlist)/1000;
            stockID = item.stock_id;

        });

        const json = await API_POST("stock/update",{
            stock_id : stockID,
            stock_amount: num
        });

        if(json.result){
            console.log("update stock success");
        }

   }


    const getBranchId = async(user_id) => {
        let json = await API_POST("getbranchId",{
            user_id : user_id
        });
        
        setBranchid(json.data[0].branch_id);
        setEmpid(json.data[0].emp_id);
        return json.data[0].branch_id;
    }
    return(
        <>
             <div  className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                        <Employeenav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content px-5 overfloww " style={{padding:"0"}}>
                       <h1 className="header pt-2">สินค้า</h1>
                        <div>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-0 tab-select mt-2"
                                >
                            <Tab eventKey="product1" title="เฟรนฟราย" className="m-0 Regular shadow">
                                
                                <div class="row bg-ground ">
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
                        <h2 className="header">รายการสินค้า</h2>
                        <div class="mx-4 pt-4 bg-ground1 Regular shadow">
                            
                                <Table striped className=" grid">
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
                                                list.map((item,index)=>(
                                                    
                                                    <>
                                                        <tr>
                                                            <td>{item.product_name}</td>
                                                            <td>{item.product_size}</td>
                                                            <td>{item.product_price}</td>
                                                            <td>{item.amount}</td>
                                                            <td>{item.total}</td>
                                                            <td className="align-middle"><button className="btn btn-danger btn-sm" onClick={event=>ondelete(index,net,amountproduct)} >ลบ</button></td>
                                                        </tr>
                                                    </>
                                                ))
                                             }
                                        
                                        </tbody>
                                    
                                </Table>   
                                    <div className="row box-down1 px-4 mt-2 ">
                    
                                        <h5 className="col-6 my-2">จำนวนสินค้า<input className="d-inline-block mx-1 textbox-plus form-control form-control-sm" value={amountproduct}></input>ชิ้น </h5> 
                                        <h5 className="col-6 my-2">ราคารวม <input className="d-inline-block mx-1 textbox-plus form-control form-control-sm" value={net}></input>บาท</h5>
                                    </div>  


                                    <div className="row my-4">
                                        <div className="col-2"></div>
                                            <div className="col-8">
                                                <Button className="col-5 btn my-3 mx-4" variant="danger" onClick={clearList}>ลบทั้งหมด</Button>
                                                <Button className="col-5 btn my-3" variant="success" onClick={onComfirm}>สรุปรายการสินค้า</Button>
                                            </div>
                                        <div className="col-2"></div>
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
                
            <Selectbasket 
                show={Showpayment} 
                data={list} 
                onConfirm={onSelectConfirm}
                Amountproduct={amountproduct}
                Net={net}
                onHide={ONHide}/>
            
            <ConfirmModal
                show={showconfirm}
                onCancel={ONHide}
                onConfirm={payment}
                title={title}
                message={message}
            />
        </>
    )
}