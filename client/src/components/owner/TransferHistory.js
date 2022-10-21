import { useEffect, useState} from 'react';
import {Form,Row,Col,Button, ModalDialog} from 'react-bootstrap';
import { useParams,Link } from 'react-router-dom';
import {API_GET,API_POST} from '../../api';
import { useNavigate,useLocation } from 'react-router-dom';
import Ownernav from "./Ownernav";
import './owner.css';
import { TransferHistoryModal } from '../../modals';

export default function TransferHistory(){

    let page =3;
    const [transfer,setTransfer] =useState([]);
    const [branch,setBranch] =useState([]);
    const [showTransferdetail,setShowtransferdetail] =useState(false);
    const [title,setTitle] =useState("");
    const [data,setData] =useState({});

    useEffect(()=>{

        fetchTransferHistory();
        fetchDataBranch();

    },[]);

    const fetchDataBranch = async ()=>{
        let json = await API_GET("branch");
        setBranch(json.data);
       
    };

    const fetchTransferHistory = async ()=>{
        let json = await API_GET("transferhitory");

        if(json.result){
            setTransfer(json.data);
        }
    }

    const checkbranchname = (branchID)=>{
        let branchname = "";
        branch.filter(branch => branch.branch_id == branchID ).map(item =>{
            branchname = item.branch_name;
        });
        return branchname
    }
    const checkbranchManager = (branchID)=>{
        let managername = "";
        branch.filter(branch => branch.branch_id == branchID ).map(item =>{
            managername = item.firstname+" "+item.lastname;
        });
        return  managername
    }

    const checkstatus = (status)=>{
        if(status==3){
            return "pandding row transfer-item my-2"
        }else if(status==5){
            return "approve row transfer-item my-2"
        }else if(status==6){
            return "reject row transfer-item my-2"
        }else if(status==4){
            return "sending row transfer-item my-2"
        }
    }

    const onShowDetail = (item)=>{
        setShowtransferdetail(true);
        setTitle("รายละเอียดการย้ายสต๊อกสินค้า");
        setData(item);
    }

    const convertDate = (date)=>{
       
        const formatedDate = new Date(date ).toLocaleString(
        "en-US",
            {
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
            }
        );

        return formatedDate;
    }

    const checkOriginstatus = (data)=>{
        if(data.status_id == 4 ){
            return(
                <li>
                    <p className='mb-0'>ผู้จัดการ : {checkbranchManager(data.origin_branch)}</p>
                    <p className='mb-0'>สาขา : {checkbranchname(data.origin_branch)}</p>
                    <p>สถานะ : {data.status_name}</p>
                </li>
            )
        }else if(data.status_id==3 ){
            return(
                <>
                <li>
                    <p className="mb-0">
                       {convertDate(data.time_sender)}
                    </p>
                    <p className='mb-0'>ผู้จัดการ : {checkbranchManager(data.origin_branch)}</p>
                    <p className='mb-0'>สาขา : {checkbranchname(data.origin_branch)}</p>
                    <p>สถานะ : ยืนยันแล้ว </p>
                </li>
                <li className='pt-3 dot'>
                    <p>กำลังจัดส่งไปยังสาขา{checkbranchname(data.destination_branch)} </p>
                 </li>

                </>
            )
        }else if(data.status_id==6 && data.time_recipient == ''){
            return(
                <li className='mb-5'>
                    <p className="mb-0">
                        {convertDate(data.time_sender)}
                    </p>
                    <p className='mb-0'>ผู้จัดการ : {checkbranchManager(data.origin_branch)}</p>
                    <p className='mb-0'>สาขา : {checkbranchname(data.origin_branch)}</p>
                    <p className='m-0'>สถานะ : ปฏิเสธ </p>
                    <p>หมายเหตุ : {data.t_description_sender}</p>
                </li>
            )
        }else if(data.status_id==5){
            return(
                <>
                    <li>
                        <p className="mb-0">
                        {convertDate(data.time_sender)}
                        </p>
                        <p className='mb-0'>ผู้จัดการ : {checkbranchManager(data.origin_branch)}</p>
                        <p className='mb-0'>สาขา : {checkbranchname(data.origin_branch)}</p>
                        <p>สถานะ : ยืนยันแล้ว </p>
                    </li>
                    <li className='pt-3'>
                        <p>จัดส่งไปยังสาขา{checkbranchname(data.destination_branch)}สำเร็จ</p>
                    </li>
                </>
            )
        }else{
            return(
                <>
                </>
            )
        }
    }

    const checkDestinationstatus =(data)=>{
        if(data.status_id==5){
            return(
                <li className='pt-3'>
                    <p className="mb-0">
                    {convertDate(data.time_recipient)}
                    </p>
                    <p className='mb-0'>ผู้จัดการ : {checkbranchManager(data.destination_branch)}</p>
                    <p className='m-0'>สถานะ : สำเร็จ </p>
                    <p>หมายเหตุ : {data.t_description_recipient}</p>
                </li>
            )
        }else if(data.status_id==6 && data.time_recipient != ""){
            return(
                <>
                <li>
                    <p className="mb-0">
                       {convertDate(data.time_sender)}
                    </p>
                    <p className='mb-0'>ผู้จัดการ : {checkbranchManager(data.origin_branch)}</p>
                    <p className='mb-0'>สาขา : {checkbranchname(data.origin_branch)}</p>
                    <p>สถานะ : ยืนยันแล้ว </p>
                </li>
                <li className='pt-3'>
                    <p>จัดส่งไปยังสาขา{checkbranchname(data.destination_branch)}สำเร็จ</p>
                 </li>
                 <li className='pt-3'>
                    <p className="mb-0">
                    {convertDate(data.time_recipient)}
                    </p>
                    <p className='mb-0'>ผู้จัดการ : {checkbranchManager(data.destination_branch)}</p>
                    <p className='m-0'>สถานะ : {data.status_name} </p>
                    <p>หมายเหตุ : {data.t_description_recipient}</p>
                </li>

                </>
            )
        }
    }
    const onCancel =()=>{
        setShowtransferdetail(false);
    }

    return (
        <>
            <div  className="container-fluid " >
                <div className="row ">
                    <div className="col-lg-2 nav" style={{padding:"0"}}>
                        <Ownernav page={page} />
                    </div>
                    <div className="col-lg-10 content overfloww" style={{padding:"0"}}>
                            {/* transfer history */}
                           
                            <div className='formtranfer Regular shadow mb-3'>
                                <div className=" row mt-3" >
                                    <div className="col-2">
                                        <Link to="/transfer" className="">
                                            <button className="btn btn-sm-lg header ms-4"><i class="fa-solid fa-angle-left"></i></button>
                                        </Link>
                                    </div>
                                    
                                    <h3 className="header pb-4 col-8">ประวัติการย้ายสต๊อก</h3>
                                </div>  

                                <div className="row transfer-item my-2">
                                    <div className="col-1 pb-0">
                                        รหัส
                                    </div>  
                                    <div className="col-2 ">
                                        รายการ
                                    </div> 
                                    <div className="col-2 ">
                                        จำนวน
                                    </div> 
                                    <div className="col-2 ">
                                        ต้นทาง
                                    </div> 
                                    <div className="col-2 ">
                                        ปลายทาง
                                    </div> 
                                    <div className="col-2">
                                        สถานะ
                                    </div> 
                                </div> 
                                
                                {
                                    transfer != null &&
                                    transfer.map(item =>(
                                        <>
                                            <div className={checkstatus(item.status_id)}>
                                                <div className="col-1 pb-0">
                                                    {item.t_id}
                                                </div>  
                                                <div className="col-2 ">
                                                    {item.m_name}
                                                </div> 
                                                <div className="col-2 ">
                                                    {item.stock_amount} {item.m_unit}
                                                </div> 
                                                <div className="col-2 ">
                                                    {checkbranchname(item.origin_branch)}
                                                </div> 
                                                <div className="col-2 ">
                                                    {checkbranchname(item.destination_branch)}
                                                </div> 
                                                <div className="col-2 ">
                                                    {item.status_name}
                                                </div> 
                                            <div className="col-1 ">
                                                   <button className='btn' onClick={event =>onShowDetail(item)}> <i class="fa-solid fa-magnifying-glass"></i></button>
                                                </div> 
                                            </div> 
                                        </>
                                    ))
                                }                    
                            </div>
                    </div>

                </div>
            </div>

            <TransferHistoryModal
                show={showTransferdetail}
                title={title}
                data={data}
                onCancel={onCancel}
                checkbranchname={checkbranchname}
                convertDate={convertDate}
                checkOriginstatus={checkOriginstatus}
                checkDestinationstatus={checkDestinationstatus}
            />
        </>
    )
}