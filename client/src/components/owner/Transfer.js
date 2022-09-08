import { useEffect, useState } from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {API_GET,API_POST} from '../../api';
import { useNavigate } from 'react-router-dom';
import Ownernav from "./Ownernav";

export default function Transfer(){
    let page =3;
    let searchdata = [];
    const [branch,setBranch] = useState([]);
    const [stock,setStock] =useState([]);
    const [branch_id,setBranchId] = useState(0);
    const [origin_branch,setOriginBranch] =useState(0);
    const [destination_branch,setDestinationBranch] =useState(0);
    const [stock_amount,setStockAmount] =useState(0);
    const [amount,setAmount] =useState(0);
    const [stockid,setStockId] =useState(0);
    const [validated,setValidated] =useState(false);
    
   
    useEffect(()=>{
        // fetchDataStock();
        fetchDataBranch();
        
    },[]);

    useEffect(()=>{
        checkOriginBranch();
    },[origin_branch]);

    useEffect(()=>{
        checkOriginBranch();
        checkAmount();

    },[stockid]);

    const fetchDataBranch = async ()=>{
        let json = await API_GET("branch");
        setBranch(json.data);
    };

    
    const checkAmount = async ()=>{
        setAmount(0);
        let num = stockid;
        // let stockselected =stock[num];
       stock.map(item =>{
            if(item.stock_id = num){
                setAmount(item.stock_amount);
            }
        });
        // let {stock_amount:amount} = stockselected;
        // setAmount(amount);

    }
    const checkOriginBranch = async()=>{
        let json = await API_POST("checkoriginbranch",{
            branch_id : origin_branch
        });
        if(json.result){
            setStock(json.data);
        } 
    };

    const onsave = async (event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        if(form.checkValidity()===false){
            event.stopPropagation();
        }else{
            
        }
    }
    return(
        <>
            <div  className="container-fluid " >
                <div className="row ">
                    <div className="col-lg-2 nav" style={{padding:"0"}}>
                         <Ownernav page={page} />
                    </div>
                        <div className="col-lg-10 content" style={{padding:"0"}}>
                            <h1 className="header">ย้ายสต๊อกสินค้า</h1>
                                <div className='grid'>
                                <Form noValidate validated={validated} onSubmit={onsave} >
                                    <Form.Group as={Col} >
                                            <Form.Label>สาขาต้นทาง</Form.Label>
                                            <Form.Select
                                                value={origin_branch}
                                                onChange={(e) => setOriginBranch(e.target.value)}
                                                required>
                                                <option label="กรุณาเลือกสาขาต้นทาง"></option> 
                                                {
                                                branch.map(item => (
                                                    <option key={item.branch_id} value={item.branch_id}> 
                                                    {item.branch_name} </option>
                                                ))
                                                }
                                            </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    กรุณาเลือกสาขาต้นทาง
                                                </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                            <Form.Label>รายการสต๊อก</Form.Label>
                                            <Form.Select
                                                value={stockid}
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
                                                    กรุณาเลือกรายการสต๊อก
                                                </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="validateUserName">
                                        <Form.Label>จำนวนในสต๊อก</Form.Label>
                                        <Form.Control

                                            type="number"
                                            value={amount}
                                            placeholder="จำนวน"
                                            onChange={(e) => setAmount(e.target.value)}
                                            disabled
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            กรุณากรอกจำนวน
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="validateUserName">
                                        <Form.Label>กรอกจำนวน</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            value={stock_amount}
                                            placeholder="ชื่อผู้ใช้งาน"
                                            onChange={(e) => setStockAmount(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            กรุณากรอกจำนวน
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                            <Form.Label>สาขาปลายทาง</Form.Label>
                                            <Form.Select
                                                value={destination_branch}
                                                onChange={(e) => setDestinationBranch(e.target.value)}
                                                required>
                                                <option label="กรุณาเลือกสาขาปลายทาง"></option> 
                                                {
                                                branch.map(item => (
                                                    <option key={item.branch_id} value={item.branch_id}> 
                                                    {item.branch_name} </option>
                                                ))
                                                }
                                              
                                            </Form.Select>
                                                <Form.Control.Feedback type="invalid">
                                                    กรุณาเลือกสาขาปลายทาง
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