import Managernav from "./Managernav";
import { useEffect, useState } from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import {API_GET,API_POST} from '../../api';
import { useNavigate } from 'react-router-dom';

export default function ManagerstockRequest(){

    let page =4;
    let request_status =1;
    let userid = localStorage.getItem("user_id");
    const [validated,setValidated] =useState(false);
    const [stock_name,setStockName] =useState(0);
    const [stock_amount,setStockAmount] =useState(0);
    const [description,setDescription] = useState("");
    const [stock,setStock] =useState([]);
    const [branch,setBranch] = useState([]);
    const [branch_id,setBranchid] =useState(0);

    useEffect(()=>{
        checkOriginBranch();
        getBranchId();
    },[])

    const onsave = async (event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        if(form.checkValidity()===false){
            event.stopPropagation();
        }else{
            
        }
    }

    const getBranchId = async ()=>{
        let json = await API_POST("getbranchId",{
            user_id : userid
        });
        if(json.result){
            setBranchid(json.data.branch_id);
        }
    }
    const checkOriginBranch = async()=>{
        let num = parseInt(branch_id);
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
                        <div className='user-grid'>
                           <h1 className="header">คำขอเพิ่มสต๊อกสินค้า</h1>
                           <Form noValidate validated={validated} onSubmit={onsave} >
                                <Form.Group as={Col} >
                                        <Form.Label>รายการสต๊อก</Form.Label>
                                        <Form.Select
                                            value={stock_name}
                                            onChange={(e) => setStockName(e.target.value)}
                                            required>
                                            <option label="กรุณาเลือกรายการสต๊อก"></option> 
                                            {
                                            stock.map(item => (
                                                <option key={item.branch_id} value={item.branch_id}> 
                                                {item.branch_name} </option>
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

                                <Row className="mb-3 " style={{width:"10%",margin:"auto",paddingTop:"20px"}}>
                                    <Button variant="primary" as="input" type="submit" value="ตกลง"/>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}