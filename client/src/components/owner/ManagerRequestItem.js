import { Link,useNavigate,useParams} from "react-router-dom"
import { useEffect, useState} from "react";
import { AlertkModal, ConfirmModal, Detailmanagerrequest, PlusoOrTranferStockModal, PlusstockModal } from "../../modals";
import { Button } from "react-bootstrap";
import { API_POST,API_GAT, API_GET } from "../../api";
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
    const [branchname,setBranchname] =useState("");

    useEffect(()=>{
        fetchRequest();
        setRequestid(params.request_id);
        
    },[]);

    useEffect(()=>{
        fetchStock();
    },[request]);

    useEffect(()=>{
        console.log(request);
        stock.filter(stock => stock.stock_id == request.stock_id).map(item=>{
            setStockAmount(item.stock_amount);
            setBranchname(item.branch_name);
            console.log(item);
        })
        setPlusStockAmount(request.request_amount);
    },[stock]);

    
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
            m_id : request.m_id,
            stock_amount : request.request_amount,
            branch_id : request.branch_id
        });
        if(json.result){
            addstockinfo(json.data);
        }
       

    }

    const addstockinfo = async(stock)=>{
        let data = [];
        data.push(props.data);
         stock.map(item=>{
             data.push(item);
        });
        if(stock.length >0){
            navigate('/transfer',{replace:true,state:data});
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
                    <div className="request-item-content">
                        <div className="row mb-5">
                            <h3 className="header">รายละเอียดคำขอ</h3>
                            <span className="col-5">รหัสคำขอที่ : {request.request_id}</span><span className="col-3">วันที่ : <SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":" showTime="0">{request.request_date}</SimpleDateTime></span>
                                                                                           <span className="col-3 ps-1">เวลา : <SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":" showDate="0">{request.request_date}</SimpleDateTime></span>
                            <span>สาขาที่ขอ : {branchname}</span>
                            <span></span>
                        </div>
                        
                        <div className="">
                            <Button className="me-4" variant="success" onClick={approve}>อนุมัติ</Button>
                            <Button className="me-4" variant="danger" onClick={reject}>ไม่อนุมัติ</Button>
                            <Button className="me-4" variant="danger" href={`/request`} >ย้อนกลับ</Button>
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