import { Link } from "react-router-dom"
import { useState } from "react";
import { Detailmanagerrequest } from "../../modals";
import { Button } from "react-bootstrap";

export default function ManagerRequestItem(props){

    // const onShowDetail = async()=>{
    //     props.onShowDetail();
    //     props.modelRequestInfo(props.data);
        
    // }
    const [showModal,setShowModal] = useState(false);

    const onConfirm = async() =>{
        setShowModal(false);
    }

    const onShowDetail = async() => {
        setShowModal(true);
    }
    
    return(
        <>
        
            <Button className="me-4" variant="success">อนุมัติ</Button>
            <Button className="me-4" variant="danger">ไม่อนุมัติ</Button>
            <button className="button btn-detail" onClick={onShowDetail}>รายละเอียด</button>
            

        <Detailmanagerrequest
            show = {showModal}
            info = {props.data}
            onComfirm={onConfirm}
            />
        </>
    )
}