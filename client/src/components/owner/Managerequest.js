import Ownernav from "./Ownernav";
import { Button,Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { API_GET, API_POST } from "../../api";
import { Detailmanagerrequest } from "../../modals";
import ManagerRequestItem from "./ManagerRequestItem";
import "../owner/owner.css";
import { Link } from "react-router-dom";

export default function Managerquest(){

    let page=5;
        const [data,setData] = useState([]);
        // const [showModal,setShowModal] = useState(false);
        // const [modelrequestInfo,setModelRequestInfo] = useState([]);
        // const [validated,setValidated] = useState(false);

    useEffect(()=>{
        
        fetchStockrequest();
    },[])

    // const onConfirm = () => {
    //     setShowModal(false);
    // }

    // const onShowDetail = async() => {
    //     setShowModal(true);
    // }

    const fetchStockrequest = async()=> {
        let json = await API_GET("request");
        setData(json.data);
    }


    const checkstatus = (status)=>{
        if(status==1){
            return "pandding row request-item  my-2"
        }else if(status==5){
            return "approve row request-item  my-2"
        }else if(status==6){
            return "reject row request-item  my-2"
        }
    }
    return(
        <>
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-lg-2 nav " style={{padding:"0"}}>
                         <Ownernav page={page} />

                    </div>
                    <div className="col-lg-10 content overfloww" style={{padding:"0"}}>
                        <h1 className="header">จัดการคำขอสต๊อกสินค้า</h1>
                            <div className="p-4 requestcontent ">
                                <div >
                                    <Table borderless>
                                        <thead style={{backgroundColor:"#FFC700"}}>
                                        <tr>
                                            <th>รหัส</th>
                                            <th>ชื่อสาขา</th>
                                            <th>ชื่อผู้ขอ</th>
                                            <th>ชื่อสินค้า</th>
                                            <th>จำนวน</th>
                                            <th>สถานะ</th>
                                            <th>ทำรายการ</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{backgroundColor:"#FEFFD6"}}> 
                                {
                                    data != null &&
                                    data.filter(data => data.status_id == 1).map((item,key) => (
                                
                                  
                                            <tr>
                                                <td>{item.request_id}</td>
                                                <td>{item.branch_name}</td>
                                                <td>{item.firstname}   {item.lastname}</td>
                                                <td>{item.m_name}</td>
                                                <td>{item.request_amount}</td>
                                                <td>{item.status_name}</td>
                                                <td><Link to={`/owner/maangerequest/${item.request_id}`} className="btn btn-primary">ทำรายการ</Link></td>
                                            </tr>

                                    )
                                )}

                                        </tbody>
                                    </Table>
                                </div>
                            </div>


                            <div className="request-hetory Regular shadow ">
                                <h3 className="header pb-4">ประวัติคำขอ</h3>
                                <div className="row request-item my-2">
                                    <div className="col-2 pb-0">
                                        รหัส
                                    </div>  
                                    <div className="col-3 ">
                                    รายการ
                                    </div> 
                                    <div className="col-2 ">
                                        จำนวน
                                    </div> 
                                    <div className="col-3 ">
                                        สาขา
                                    </div> 
                                    <div className="col-2 ">
                                        สถานะ
                                    </div> 
                                </div>
                           
                                {
                                    data != null &&
                                    data.map(item =>(
                                        <>  
                                            
                                            <div className={checkstatus(item.status_id)}>
                                                <div className="col-2">
                                                    {item.request_id}
                                                </div>  
                                                <div className="col-3">
                                                    {item.m_name}
                                                </div> 
                                                <div className="col-2">
                                                    {item.request_amount}
                                                </div> 
                                                <div className="col-3">
                                                    {item.branch_name}
                                                </div> 
                                                <div className="col-2">
                                                    {item.status_name}
                                                </div> 
                                            </div>
                                        </>
                                    ))
                                }           

                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}