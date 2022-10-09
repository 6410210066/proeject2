import Managernav from "./Managernav";
import "./manager.css";
import { useEffect, useState } from "react";
import { API_POST,API_GET } from "../../api";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function ManagerTransfer(){
    let page=5;

        const [branch_id,setBranchid] = useState(0);
        const [validated,setValidated] = useState(false);
        const [transfer,setTransfer] =useState([]);
        const [key, setKey] = useState('home');
        const [branch,setBranch] =useState([]);
        const [stock,setStock] =useState([]);
        

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
       
    };

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
                    <div className="col-2 pb-0">
                        รหัส
                    </div>  
                    <div className="col-3 ">
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

                </div>
      
            </>
        )
    }

    const updatestock = async(m_id,stock_amount)=>{
        
        let stockID;
        let stockAmount;

        if(stock != null){
            stock.filter(stock => stock.m_id == m_id && stock.branch_id == branch_id).map(item =>{
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
            // fetchstock();
        }
    }

    const updateTransferstatus = async(t_id)=>{
        let json = await API_POST("transfer/stautsupdate",{
            t_id: t_id,
            status_id: 5
        })

        if(json.result){
            fetchTransfer(branch_id);
            setKey('home');
        }
    }

    const approveTransfer = async(m_id,t_id,stock_amount)=>{
        updatestock(m_id,stock_amount)
        updateTransferstatus(t_id);
    }

    const rejectTransfer = async(t_id)=>{

    }
    return(
        <>
                <div  className="container-fluid ">
                    <div className="row">
                        <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                            <Managernav page={page}/>
                        </div>
                        <div className="col-lg-10 col-sm-12 content overfloww" style={{padding:"0"}}>
                            <h3 className="header">รายการขอย้ายสต๊อก</h3>
                            <div>
                            <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-0 transfer-select mt-3"
                            >
                                
                                <Tab  eventKey="home" title="ส่งสต๊อก" className="transfer-tab pt-3 pb-3 Regular shadow">
                                    {transferItem()}
                                    {transfer != null && 
                                        transfer.filter(transfer => transfer.origin_branch == branch_id && transfer.status_id==3).map(item=>(
                                            <div className="transfer-item my-3 row Regular shadow">
                                                <div className="col-2 transfer-item-text">
                                                    {item.t_id}
                                                </div>  
                                                <div className="col-3 transfer-item-text">
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
                                                <div className="col-lg-2 col-sm-12 " >
                                                    <button className="btn btn-success mb-1 px-4 mx-2">อนุมัติ</button>
                                                    <button className="btn btn-danger mb-1 px-4 mx-2">ปฏิเสธ</button>
                                                </div>
                                            </div>
                                        ))
                                    
                                    }
                                </Tab>
                                <Tab eventKey="get" title="รับสต๊อก" className="transfer-tab pt-3 pb-3 Regular shadow">
                                    {transferItem()}
                                    
                                    {transfer != null &&
                                        transfer.filter(transfer => transfer.destination_branch == branch_id && transfer.status_id==3).map(item=>(
                                            <div className="transfer-item my-3 row Regular shadow">
                                                <div className="col-2 transfer-item-text">
                                                    {item.t_id}
                                                </div>  
                                                <div className="col-3 transfer-item-text">
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
                                                <div className="col-lg-2 col-sm-12 " >
                                                    <button className="btn btn-success mb-1 px-4 mx-2" onClick={event=> approveTransfer(item.m_id,item.t_id,item.stock_amount)} >อนุมัติ</button>
                                                    <button className="btn btn-danger mb-1 px-4 mx-2" onClick={event=>rejectTransfer(item.t_id)} >ปฏิเสธ</button>
                                                </div>
                                            </div>
                                        ))                   
                                    }

                                </Tab>
                            </Tabs>                

                            </div>
                            
                    </div>
                </div>
            </div>
        </>
    )
}