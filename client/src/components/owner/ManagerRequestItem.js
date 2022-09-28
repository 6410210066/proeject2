import { Link } from "react-router-dom"
import { useState } from "react";
import { ConfirmModal, Detailmanagerrequest } from "../../modals";
import { Button } from "react-bootstrap";
import { API_POST,API_GAT } from "../../api";
export default function ManagerRequestItem(props){

    let statusreject =6;
    const [showModal,setShowModal] = useState(false);
    const [showrejectmodal,setShowrejectmodal] =useState(false);
    const [title,setTitle] =useState("");
    const [message,setMessage] =useState("");
    const [requestid,setRequestid] =useState(0);
    

    const onShowDetail = async() => {
        setShowModal(true);
        
    }
    
    const reject = async() =>{
        setShowrejectmodal(true);
        setTitle("ยืนยันการยกเลิกคำขอ");
        setMessage("คุณต้องการยกเลิกคำขอนี้หรือไม่");
        setRequestid(props.data.request_id);
    }

    const onConfirmreject = async()=>{
        let json = await API_POST("rejectrequest",{
            request_id : requestid,
            status_id : statusreject
        });
        setShowrejectmodal(false);
        props.fetchStockrequest();
    }

    const onCancel = async()=>{
        setShowrejectmodal(false);
        setShowModal(false);
    }
    return(
        <>
        
            <Button className="me-4" variant="success">อนุมัติ</Button>
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
        </>
    )
}