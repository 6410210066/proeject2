import Ownernav from "./Ownernav";
import { Button,Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { API_GET, API_POST } from "../../api";
import { Detailmanagerrequest } from "../../modals";
import ManagerRequestItem from "./ManagerRequestItem";

export default function Managerquest(){

    let page=5;
        const [data,setData] = useState([]);
        const [showModal,setShowModal] = useState(false);
        const [modelrequestInfo,setModelRequestInfo] = useState([]);
        const [validated,setValidated] = useState(false);

    useEffect(()=>{
        
        fetchStockrequest();
    },[])

    const onConfirm = () => {
        setShowModal(false);
    }

    const onShowDetail = async() => {
        setShowModal(true);
    }

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
                                {
                                    data != null &&
                                    data.filter(data => data.status_id == 1).map((item,key) => (
                                
                                    <div key={key}>
                                        <Table borderless>
                                            <thead style={{backgroundColor:"#FFC700"}}>
                                            <tr>
                                            <th>ชื่อสาขา</th>
                                            <th>ชื่อ-นามสกุล</th>
                                            <th>ชื่อสินค้า</th>
                                            <th>จำนวน</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{backgroundColor:"#FEFFD6"}}> 
                                            <tr>
                                            <td>{item.branch_name}</td>
                                            <td>{item.firstname}   {item.lastname}</td>
                                            <td>{item.m_name}</td>
                                            <td>{item.request_amount}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="border-top border-dark" style={{backgroundColor:"#FEFFD6"}}>
                                            <tr>
                                            <td colSpan={4}>

                                            <ManagerRequestItem key={item.request_id} data={item} onShowDetail={onShowDetail} ModelRequestInfo={setModelRequestInfo} fetchStockrequest={fetchStockrequest}/>
                                            
                                           </td>
                                            </tr>
                                        </tfoot>
                                        </Table>
                                    </div>
                                    )
                                )}
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
                                            
                                            {/* {item.status_id ==1 && <div className= "pandding row request-item  my-2" >}
                                            {item.status_id == 5 && <div className= "approve row request-item  my-2" >}
                                            {item.status_id == 6 && <div className= "reject row request-item  my-2" >} */}
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