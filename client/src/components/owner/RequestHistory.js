import Ownernav from "./Ownernav";
import { Button,Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { API_GET, API_POST } from "../../api";
import "../owner/owner.css";
import { Link } from "react-router-dom";

export default function RequestHistory(){

    let page=5;
        const [data,setData] = useState([]);

    useEffect(()=>{
        
        fetchStockrequest();
    },[])

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
        }else if(status==7){
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
                            <div className="request-hetory Regular shadow mt-5 pb-4">
                            <div className=" row mt-3" >
                                <div className="col-2">
                                    <Link to="/request" className="">
                                        <button className="btn btn-lg header ms-4"><i class="fa-solid fa-angle-left"></i></button>
                                    </Link>
                                </div>
                                
                                <h3 className="header pb-4 col-8">ประวัติคำขอ</h3>
                            </div>                           
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