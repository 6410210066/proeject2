import { Link,useNavigate,useParams} from "react-router-dom"
import { useEffect, useState} from "react";
import { AlertkModal, ConfirmModal, Detailmanagerrequest, PlusoOrTranferStockModal, PlusstockModal } from "../../modals";
import { Button } from "react-bootstrap";
import { API_POST,API_GET } from "../../api";
import Ownernav from "./Ownernav";
import SimpleDateTime  from 'react-simple-timestamp-to-date';


export default function ManagerRequestItem(props){

    let statusreject =6;
    let statusapprove=5;
    let navigate = useNavigate();
    let params = useParams();
    let page =5;
    const [showrejectmodal,setShowrejectmodal] =useState(false);
    const [title,setTitle] =useState("");
    const [message,setMessage] =useState("");
    const [requestid,setRequestid] =useState(0);
    const [showaddortranfer,setShowaddortranfer] =useState(false);
    const [showalert,setShowAlert] =useState(false);
    const [showplus,setShowplus] =useState(false);
    const [stock_amount,setStockAmount] = useState(0);
    const [plusstockamount,setPlusStockAmount]=useState(0);
    const [stock,setStock] =useState([]);
    const [request,setRequest] =useState({});
    const [employee,setEmpolyee] =useState([]);
    const [branchname,setBranchname] =useState("");
    const [mname,setMname] = useState("");
    const [unit,setUnit] =useState("");
    const [requestname,setRequstname]=useState("");
    const [mid,setMid] =useState(0);
    useEffect(()=>{
        fetchRequest();
        setRequestid(params.request_id);
        fetchemp();
    },[]);

    useEffect(()=>{
        fetchStock();
        
    },[request]);

    useEffect(()=>{
    
        stock.filter(stock => stock.stock_id == request.stock_id).map(item=>{
            setStockAmount(item.stock_amount);
            setBranchname(item.branch_name);
            setMname(item.m_name);
            setUnit(item.m_unit);
            setMid(item.m_id);
        })
        setPlusStockAmount(request.request_amount);
    },[stock]);

    useEffect(()=>{
        employee.filter(employee => employee.emp_id == request.emp_id).map(item=>{
            setRequstname(item.firstname +" " +item.lastname);
        })
    },[employee]);

    const fetchemp = async ()=>{
        let json = await API_GET("employee");
        if(json.result){
            setEmpolyee(json.data);
        }
    }
    const fetchStock = async()=>{
        let json = await API_GET("stock");
        if(json.result){
            setStock(json.data);
        }
       
    }

    const fetchRequest = async()=>{
       
        let json = await API_POST("requestbyrequestid",{
            request_id: params.request_id
        });

        if(json.result){
            setRequest(json.data[0]);
        }
    }

    const reject = async() =>{
        setShowrejectmodal(true);
        setTitle("ยืนยันการยกเลิกคำขอ");
        setMessage("คุณต้องการยกเลิกคำขอนี้หรือไม่");
       
    }

    const approve = () =>{
        setShowaddortranfer(true);
        setTitle("ยืนยันคำขอ");
        setMessage("กรุณาเลือกเพิ่มสต๊อกสินค้าหรือย้ายสต๊อกสินค้า ");
    }

    const onAddortranfer = (num)=>{
       
        if(num==1){
            addOnStock();
        }else if(num ==2){
            checkStock();
            
        }
    }

    const addOnStock = async()=>{

        setShowplus(true);
        setTitle("เพิ่มสต๊อกสินค้า");

    }

    const onPlus =  async()=>{
        let sum = stock_amount + parseInt(plusstockamount);
        let json = await API_POST("stock/update",{
            stock_id:request.stock_id,
            stock_amount:sum
        });
        if(json.result){
            onCancel();
            let json1 = await API_POST("request/updatestatus",{
                request_id : requestid,
                status_id : statusapprove
            });
            if(json1.result){
                
                props.fetchStockrequest();
            }
        }

    }

    const checkStock = async ()=>{

        let json = await API_POST("checkstock",{
            m_id : mid,
            branch_id : request.branch_id
        });
        if(json.result){
            addstockinfo(json.data);
        }
    }

    const addstockinfo = async(stock)=>{
       let data = stock[0];
       let total = ( data.sum - parseInt((data.Minimum * data.count))) - request.request_amount ;
       console.log(total);
        if(total > 0){
            console.log("go transfer");
            navigate('/owner/transferrequest',{replace:true,state:request});
        }else{
            onAlert();
            console.log("go to add stock");
        }
        
    }

    const onConfirmreject = async()=>{
        let json = await API_POST("request/updatestatus",{
            request_id : requestid,
            status_id : statusreject
        });
        if(json.result){
            setShowrejectmodal(false);
            navigate('/request',{replace:true,state:request});
        }

    }

    const onCancel = async()=>{
        setShowrejectmodal(false);
       
        setShowaddortranfer(false);
        setShowAlert(false);
        setShowplus(false);
    }

    const onAlert = ()=>{
        setShowAlert(true);
        setTitle("ย้ายสต๊อก");
        setMessage("ไม่มีรายในที่สามารถย้ายได้ในสต๊อก !");

    }
    return(
        <>
        
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 nav " style={{padding:"0"}}>
                        <Ownernav page={page} />
                </div>
                <div className="col-lg-10 content overfloww" style={{padding:"0"}}>
                    <div className="request-item-content mt-5">
                        <div className="row mb-5">
                            <div className="row mb-3">
                                <h3 className="header col-11 ps-5">รายละเอียดคำขอ</h3>
                                <div className="col-1">
                                    <Button className="btn  mt-3" variant="" href={`/request`} >
                                        <i className="fa-sharp fa-solid fa-xmark"></i>
                                    </Button>
                                </div>
                            </div>
                          
                     
                            <span className="col-5">รหัสคำขอที่ : 
                                <span className=" detail">{request.request_id}</span> 
                            </span> 
                            
                            <span className="col-6">สถานะ : 
                                <span className="detail">{request.status_name}</span>
                            </span>
                            <span className="col-5">วันที่ : 
                                <span className="detail"> <SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":" showTime="0">{request.request_date}</SimpleDateTime></span>   
                            </span>
                            <span className="col-6 ">เวลา : 
                                <span className="detail"> <SimpleDateTime format="MHS"  timeSeparator=":" showTime="1" showDate="0">{request.request_date}</SimpleDateTime></span>
                            </span>
                            <span>สาขาที่ขอ : 
                                <span className="detail">{branchname}</span>
                            </span>
                            <span>ชื่อผู้ขอ : 
                                <span className="detail">{requestname}</span>
                            </span>
                            <span className="col-12">รายการที่ขอ : 
                                <span className="detail">{mname}</span>
                            </span> 
                            <span className="col-12">จำนวน : 
                                <span className="detail">{request.request_amount} {unit}</span>
                            </span>
                            <span className="col-12">รายละเอียด : 
                                <span className="detail">{request.request_description}</span>
                            </span>
                        </div>
                        
                        <div className="mb-4">
                            <Button className="me-4" variant="success" onClick={approve}>อนุมัติ</Button>
                            <Button className="me-4" variant="danger" onClick={reject}>ไม่อนุมัติ</Button>
                            {/* <Button className="me-4" variant="danger" href={`/request`} >ย้อนกลับ</Button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

            <ConfirmModal
            show={showrejectmodal}
            title={title}
            message={message}
            onConfirm={onConfirmreject}
            onCancel={onCancel}
            />

            <PlusoOrTranferStockModal
                show={showaddortranfer}
                title={title}
                message={message}
                onConfirm={onAddortranfer}
                onCancel={onCancel}
            />

            <AlertkModal
                show={showalert}
                title={title}
                message={message}
                onCancel={onCancel}
            />

            <PlusstockModal
                show={showplus}
                title={title}
                onConfirm={onPlus}
                onCancel={onCancel}
                stockAmount={stock_amount}
                plusstockamount={plusstockamount}
                setPlusStockAmount={setPlusStockAmount}
            />
            </>
    )
}