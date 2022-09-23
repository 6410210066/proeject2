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
        console.log(json.data);
    }

    
    return(
        <>
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-lg-2 nav" style={{padding:"0"}}>
                         <Ownernav page={page} />

                    </div>
                    <div className="col-lg-10 content" style={{padding:"0"}}>
                        <h1 className="header">จัดการคำขอสต๊อกสินค้า</h1>
                            <div className="p-4 m-4">
                                {data.filter(data => data.request_status == 1).map(item => (
                                
                                    <div key={item.request_id}>
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
                                            

                                            <ManagerRequestItem key={item.request_id} data={item} onShowDetail={onShowDetail} ModelRequestInfo={setModelRequestInfo}/>
                                            
                                           </td>
                                            </tr>
                                        </tfoot>
                                        </Table>
                                    </div>
                                    )
                                )}
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}