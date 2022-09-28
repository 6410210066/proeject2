import Managernav from "./Managernav";
import { useEffect, useState } from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import {API_GET,API_POST} from '../../api';
import { useNavigate } from 'react-router-dom';

export default function ManagerstockRequest(){

    let page =4;
    let request_status =1;
    // let userid = localStorage.getItem("user_id");
    const [validated,setValidated] =useState(false);
    const [stock_id,setStockId] =useState(0);
    const [stock_amount,setStockAmount] =useState(0);
    const [description,setDescription] = useState("");
    const [stock,setStock] =useState([]);
    const [emp_id,setEmpId] =useState(0);
    // const [branch,setBranch] = useState([]);
    const [branch_id,setBranchid] =useState(0);

    useEffect(()=>{

        let user_id = localStorage.getItem("user_id");
         getBranchId(user_id);
    },[])

    const onsave = async (event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        if(form.checkValidity()===false){
            event.stopPropagation();
        }else{
            console.log(stock_amount);
            console.log(description);
            console.log(request_status);
            console.log(stock_id);
            console.log(emp_id);
            console.log(branch_id);
            stcokrequest();
        }
    }

    const stcokrequest = async()=>{
        let json = await API_POST("stock/request",{
            stock_amount: stock_amount,
            description:description,
            status:request_status,
            stock_id:stock_id,
            emp_id:emp_id,
            branch_id:branch_id
        });
        if(json.result){
            setStockId(0);
            setStockAmount(0);
            setDescription("");
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
    
    const checkOriginBranch = async(id)=>{                    
        let num = parseInt(id);
        let json = await API_POST("checkoriginbranch",{
            branch_id : num
        });
        if(json.result){
            setStock(json.data);
        } 
    };
    return(
        <>

            <div  className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                        <Managernav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content " style={{padding:"0"}}>
                        <div className='user-grid formcontent'>
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
                    </div>
                </div>
            </div>
        </>
    )
}