import Managernav from "./Managernav";
import "./manager.css";
import { useEffect, useState } from "react";
import { API_POST,API_GET } from "../../api";

import { ApproveModal, ConfirmModal, RejectRecipitentModal,RejectSanderModal } from "../../modals";
import SimpleDateTime  from 'react-simple-timestamp-to-date';
export default function ManagerTransfer(){
    let page=5;
    let count =0;
        const [branch_id,setBranchid] = useState(0);
        const [validated,setValidated] = useState(false);
        const [transfer,setTransfer] =useState([]);
        const [key, setKey] = useState('home');
        const [branch,setBranch] =useState([]);
        const [stock,setStock] =useState([]);
        const [title,setTitle] =useState("");
        const [message,setMessage] =useState("");
        const [showapprove,setShowapprove] =useState(false);
        const [showrejectrecipient,setShowrejectrecipinet] = useState(false);
        const [showrejectsender,setShowrejectsender] = useState(false);
        const [showapprovesender,setShowapprovesender] = useState(false);
        const [data,setData] =useState({});
        const [approvedetail,setApprovedetail] =useState("");
        const [rejectdetail,setRejectdetail] = useState("");

    useEffect(()=>{
        let user_id = localStorage.getItem("user_id");
        getBranchId(user_id);
        fetchDataBranch();
        fetchstock();
        fetchTransfer();
        
    },[]);

    const fetchTransfer = async (id)=>{
        let json = await API_POST("manager/transferhitory",{
            branch_id: id
        });
        if(json.result){
            setTransfer(json.data);
        }
    }

    const fetchDataBranch = async ()=>{
        let json = await API_GET("branch");
        setBranch(json.data);
       
    }

    const fetchstock = async()=>{
        let json = await API_GET("stock");
        setStock(json.data);
    }

    const getBranchId = async(user_id) => {
        let json = await API_POST("getbranchId",{
            user_id : user_id
        });
        setBranchid(json.data[0].branch_id);
        fetchTransfer(json.data[0].branch_id);
        return json.data[0].branch_id;
    }

    const checkbranchname = (branchID)=>{
        let branchname = "";
        branch.filter(branch => branch.branch_id == branchID ).map(item =>{
            branchname = item.branch_name;
        });
        return branchname
    }

    const transferItem = ()=>{
        return(
            <>
                <div className="row request-item my-2">
                    <div className="col-1 pb-0">
                        รหัส
                    </div>  
                    <div className="col-2 ">
                    รายการ
                    </div> 
                    <div className="col-1 ">
                        จำนวน
                    </div> 
                    <div className="col-2 ">
                        ต้นทาง
                    </div> 
                    <div className="col-2 ">
                        ปลายทาง
                    </div> 
                    <div className="col-1 ">
                        สถานะ
                    </div> 
                    <div className="col-1 ">
                        วันที่
                    </div>
                </div>
      
            </>
        )
    }

    const updatestock = async(m_id,branchID,stock_amount)=>{
        
        let stockID;
        let stockAmount;

        if(stock != null){
            stock.filter(stock => stock.m_id == m_id && stock.branch_id == branchID).map(item =>{
                stockID = item.stock_id;
                stockAmount = stock_amount + item.stock_amount;
            });
            
        }
 
        let json = await API_POST("stock/update",{
            stock_id: stockID,
            stock_amount: stockAmount
        })

        if(json.result){
            console.log("success");
          
        }
    }

    const updateTransferstatus = async(t_id,status)=>{
        let json = await API_POST("transfer/stautsupdate",{
            t_id: t_id,
            status_id: status
        })

        if(json.result){
            fetchTransfer(branch_id);
        }
    }

    const approvesendertransfer = ()=>{
        updateTransferstatus(data.t_id,3);
        updateSenderdetail(data.t_id,"ยืนยันแล้ว");
        setShowapprovesender(false);
    }

    const approveTransfer = async(item)=>{
        updatestock(item.m_id,item.destination_branch,item.stock_amount)
        updateTransferstatus(item.t_id,5);
        updateRecipientdetail(item.t_id,approvedetail);
        setShowapprove(false);
    }

    const updateRecipientdetail = async(t_id,detail)=>{
        const date = Date.now();
        const dataformat = new  Date(date);
        const date1 = dataformat.toISOString();
        let json = await API_POST('transfer/updatedescription/recipient',{
            t_description_recipient : detail,
            time_recipient: date1,
            t_id : t_id,
        });
        
        if(json.result){
            console.log("updatedescription Success");
        }

        
    }

    const updateSenderdetail = async(t_id,detail)=>{
        const date = Date.now();
        const dataformat = new  Date(date);
        const date1 = dataformat.toISOString();
        let json = await API_POST('transfer/updatedescription/sender',{
            t_description_sender : detail,
            time_sender: date1,
            t_id : t_id,
        });
        
        if(json.result){
            console.log("111111 Success");
        }

        
    }

    const rejectTransfer = async(item)=>{
        updatestock(item.m_id,item.origin_branch,item.stock_amount);
        updateTransferstatus(item.t_id,6);
        updateRecipientdetail(item.t_id,rejectdetail);
        setShowrejectrecipinet(false);
    }

    const rejectSenderTransfer = (item)=>{
        updatestock(item.m_id,item.origin_branch,item.stock_amount);
        setShowrejectsender(false);
        updateTransferstatus(item.t_id,6);
        updateSenderdetail(item.t_id,rejectdetail);
    }

    const onConfirmreject = (item) =>{
        setShowrejectrecipinet(true);
        setTitle("ปฏิเสธการรับสินค้า");
        setData(item);
    }

    const onConfirmrejectsender = (item) =>{
        setShowrejectsender(true);
        setTitle("ปฏิเสธการส่งสินค้า");
        setData(item);
    }
    
    const onConfirmapprove = (item)=>{
        setShowapprove(true);
        setTitle("ยืยยันการรับสินค้า");
        setData(item);
    }
    
    const onConfirmapprovesender =(item)=>{
        setShowapprovesender(true);
        setTitle("ยืนยันการส่งสินค้า");
        setMessage("คุณต้องการยืยยันการส่งสินค้าหรือไม่");
        setData(item);
    }

    const checkstatus= (status_id)=>{
        if(status_id ==4){
            return "รอจัดส่ง"
        }else if(status_id ==3){
            return "รอรับสินค้า"
        }
    }

    const onCancel = ()=>{
        setShowapprove(false);
        setShowrejectrecipinet(false);
        setShowrejectsender(false);
        setShowapprovesender(false);
    }
    return(
        <>
                <div  className="container-fluid ">
                    <div className="row">
                        <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                            <Managernav page={page}/>
                        </div>
                        <div className="col-lg-10 col-sm-12 content overfloww" style={{padding:"0"}}>
                            <h3 className="header mb-4">รายการขอย้ายสต๊อก</h3>
                        <div>
                            <div   className="transfer-tab pt-3 pb-3 Regular shadow">
                                    {transferItem()}
                                    {transfer != null && 
                                        transfer.filter(transfer => transfer.origin_branch == branch_id && transfer.status_id==4).map(item=>(
                                            
                                            <div key={item.t_id} className="transfer-item my-3 row Regular shadow">
                                                <div className="col-1 transfer-item-text">
                                                    {item.t_id}
                                                </div>  
                                                <div className="col-2 transfer-item-text">
                                                    {item.m_name}
                                                </div> 
                                                <div className="col-1 transfer-item-text">
                                                    {item.stock_amount}
                                                </div> 
                                                <div className="col-2 transfer-item-text">
                                                    {checkbranchname(item.origin_branch)}
                                                </div> 
                                                <div className="col-2 transfer-item-text" >
                                                    {checkbranchname(item.destination_branch)}
                                                </div> 
                                                <div className="col-1 transfer-item-text" >
                                                    {checkstatus(item.status_id)}
                                                </div> 
                                                <div className="col-1 transfer-item-text" >
                                                <SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":" showTime="0">{item.t_date}</SimpleDateTime>
                                                </div>
                                                <div className="col-lg-2 col-sm-12 " >
                                                    <button className="btn btn-success mb-1 px-4 mx-2" onClick={event=> onConfirmapprovesender(item)}>ยืนยัน</button>
                                                    <button className="btn btn-danger mb-1 px-4 mx-2" onClick={event=>onConfirmrejectsender(item)}>ปฏิเสธ</button>
                                                  
                                                </div>
                                            </div>
                                        ))
                                    
                                    }

                                    {transfer != null &&
                                        transfer.filter(transfer => transfer.destination_branch == branch_id && transfer.status_id==3).map(item=>(
                                            <div key={item.t_id}  className="transfer-item my-3 row Regular shadow">
                                                {}
                                                <div className="col-1 transfer-item-text">
                                                    {item.t_id}
                                                </div>  
                                                <div className="col-2 transfer-item-text">
                                                    {item.m_name}
                                                </div> 
                                                <div className="col-1 transfer-item-text">
                                                    {item.stock_amount}
                                                </div> 
                                                <div className="col-2 transfer-item-text">
                                                    {checkbranchname(item.origin_branch)}
                                                </div> 
                                                <div className="col-2 transfer-item-text" >
                                                    {checkbranchname(item.destination_branch)}
                                                </div> 
                                                <div className="col-1 transfer-item-text" >
                                                    {checkstatus(item.status_id)}
                                                </div> 
                                                <div className="col-1 transfer-item-text" >
                                                    <SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":" showTime="0">{item.t_date}</SimpleDateTime>
                                                </div> 
                                                   
                                                <div className="col-lg-2 col-sm-12 " >
                                                    <button className="btn btn-success mb-1 px-4 mx-2" onClick={event=>onConfirmapprove(item)} >ยืนยัน</button>
                                                    <button className="btn btn-danger mb-1 px-4 mx-2" onClick={event=>onConfirmreject(item)} >ปฏิเสธ</button>
                                                </div>
                                            </div>
                                        ))                  
                                    }
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            <ApproveModal
                show={showapprove}
                title={title}
                onConfirm={approveTransfer}
                onCancel={onCancel}
                data={data}
                approvedetail={setApprovedetail}
            />

            <RejectRecipitentModal
                show={showrejectrecipient}
                title={title}
                onConfirm={rejectTransfer}
                onCancel={onCancel}
                data={data}
                rejectdetail={setRejectdetail}
            />  
            
            <RejectSanderModal
                show={showrejectsender}
                title={title}
                onConfirm={rejectSenderTransfer}
                onCancel={onCancel}
                data={data}
                rejectdetail={setRejectdetail}
            />  

            <ConfirmModal
                show={showapprovesender}
                title={title}
                message={message}
                onConfirm={approvesendertransfer}
                onCancel={onCancel}
            />
        </>
    )
}