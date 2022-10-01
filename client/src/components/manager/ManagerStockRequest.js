import Managernav from "./Managernav";
import { useEffect, useState } from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import {API_GET,API_POST} from '../../api';
import { useNavigate } from 'react-router-dom';

export default function ManagerstockRequest(){

    let page =4;
    let status_id =1;
    // let userid = localStorage.getItem("user_id");
    const [validated,setValidated] =useState(false);
    const [stock_id,setStockId] =useState(0);
    const [stock_amount,setStockAmount] =useState(0);
    const [description,setDescription] = useState("");
    const [stock,setStock] =useState([]);
    const [emp_id,setEmpId] =useState(0);
    // const [branch,setBranch] = useState([]);
    const [branch_id,setBranchid] =useState(0);
    const [stockrequest,setStockrequest] =useState([]);

    useEffect(()=>{
        fetchRequestStock();
        let user_id = localStorage.getItem("user_id");
         getBranchId(user_id);
    },[])

    const onsave = async (event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        if(form.checkValidity()===false){
            event.stopPropagation();
        }else{
            console.log("in else");
            requeststock();
        }
    }

    const requeststock = async()=>{
        
        let json = await API_POST("stock/request",{
            stock_amount: stock_amount,
            description:description,
            status:status_id,
            stock_id:stock_id,
            emp_id:emp_id,
            branch_id:branch_id
        });
        console.log(json);
        if(json.result){
            setStockId(0);
            setStockAmount(0);
            setDescription("");
            fetchRequestStock();
        }
    }

    const getBranchId = async(user_id) => {
        let json = await API_POST("getbranchId",{
            user_id : user_id
        });
        
        setBranchid(json.data[0].branch_id);
        setEmpId(json.data[0].emp_id);
        checkOriginBranch(json.data[0].branch_id);
        return json.data[0].branch_id;
    }


    const fetchRequestStock = async()=>{
        let json = await API_GET("request");
        setStockrequest(json.data);
    }
    
    const checkOriginBranch = async(id)=>{                    
        let num = parseInt(id);
        let json = await API_POST("checkoriginbranch",{
            branch_id : num
        });
        if(json.result){
            setStock(json.data);
        } 
    };

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

            <div  className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                        <Managernav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content overfloww" style={{padding:"0"}}>
                        <div className='user-grid formcontent Regular shadow'>
                           <h1 className="header">คำขอเพิ่มสต๊อกสินค้า</h1>
                           <Form noValidate validated={validated} onSubmit={onsave} >
                                <Form.Group as={Col} >
                                        <Form.Label>รายการสต๊อก</Form.Label>
                                        <Form.Select
                                            value={stock_id}
                                            onChange={(e) => setStockId(e.target.value)}
                                            required>
                                            <option label="กรุณาเลือกรายการสต๊อก"></option> 
                                            {
                                            stock.map(item => (
                                                <option key={item.stock_id} value={item.stock_id}> 
                                                {item.m_name} </option>
                                            ))
                                            }
                                        </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                กรุณาเลือกสาขาต้นทาง
                                            </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="validateUserName">
                                        <Form.Label>กรอกจำนวน</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            value={stock_amount}
                                            placeholder="กรอกจำนวนสินค้า"
                                            onChange={(e) => setStockAmount(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            กรุณากรอกจำนวน
                                        </Form.Control.Feedback>
                                </Form.Group>

                                
                                <Form.Group as={Col} controlId="validateUserName">
                                        <Form.Label>คำอธิบาย</Form.Label>
                                        <Form.Control
                                            // required
                                            as="textarea"
                                            rows={4}
                                            value={description}
                                            placeholder="คำอธิบาย"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            กรุณากรอกจำนวน
                                        </Form.Control.Feedback>
                                </Form.Group>

                                <Row className="mb-3 " style={{width:"120px",margin:"auto",paddingTop:"20px"}}>
                                    <Button variant="primary" as="input" type="submit" value="ส่งคำขอ" />
                                </Row>
                            </Form>
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
                                stockrequest != null &&
                                stockrequest.map(item =>(
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