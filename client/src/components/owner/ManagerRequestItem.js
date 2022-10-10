import { Link,useNavigate} from "react-router-dom"
import { useEffect, useState} from "react";
import { AlertkModal, ConfirmModal, Detailmanagerrequest, PlusoOrTranferStockModal, PlusstockModal } from "../../modals";
import { Button } from "react-bootstrap";
import { API_POST,API_GAT, API_GET } from "../../api";
export default function ManagerRequestItem(props){

    let statusreject =6;
    let statusapprove=5;
    let navigate = useNavigate();
    const [showModal,setShowModal] = useState(false);
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

    useEffect(()=>{
        fetchStock();
    },[]);

    useEffect(()=>{
        stock.filter(stock => stock.stock_id == props.data.stock_id).map(item=>{
            setStockAmount(item.stock_amount);
        })
        setPlusStockAmount(props.data.request_amount);
    },[stock])
    const onShowDetail = async() => {
        setShowModal(true);
    }
    
    const fetchStock = async()=>{
        let json = await API_GET("stock");
        if(json.result){
            setStock(json.data);
        }
    }
    const reject = async() =>{
        setShowrejectmodal(true);
        setTitle("ยืนยันการยกเลิกคำขอ");
        setMessage("คุณต้องการยกเลิกคำขอนี้หรือไม่");
        setRequestid(props.data.request_id);
    }

    const approve = () =>{
        setShowaddortranfer(true);
        setTitle("ยืนยันคำขอ");
        setMessage("กรุณาเลือกเพิ่มสต๊อกสินค้าหรือย้ายสต๊อกสินค้า ");
        setRequestid(props.data.request_id);
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
        let sum = stock_amount + plusstockamount;
        console.log(sum);
        
    }

    const checkStock = async ()=>{

        let json = await API_POST("checkstock",{
            m_id : props.data.m_id,
            stock_amount : props.data.request_amount,
            branch_id : props.data.branch_id
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
            props.fetchStockrequest();
        }

    }

    const onCancel = async()=>{
        setShowrejectmodal(false);
        setShowModal(false);
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
        
            <Button className="me-4" variant="success" onClick={approve}>อนุมัติ</Button>
            <Button className="me-4" variant="danger" onClick={reject}>ไม่อนุมัติ</Button>
            <button className="button btn-detail" onClick={onShowDetail}>รายละเอียด</button>
            

        <Detailmanagerrequest
            show = {showModal}
            info = {props.data}
            onComfirm={onCancel}
            />


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