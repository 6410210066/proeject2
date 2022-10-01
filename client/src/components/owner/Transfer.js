import { useEffect, useState } from 'react';
import {Form,Row,Col,Button, ModalDialog} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {API_GET,API_POST} from '../../api';
import { useNavigate } from 'react-router-dom';
import Ownernav from "./Ownernav";
import './owner.css';
export default function Transfer(){
    let page =3;
   
    const [branch,setBranch] = useState([]);
    const [stock,setStock] =useState([]);
    const [branch_id,setBranchId] = useState(0);
    const [origin_branch,setOriginBranch] =useState(0);
    const [destination_branch,setDestinationBranch] =useState(0);
    const [destination_branch_stock_amount,setDestinationBranchstockamount] = useState(0);
    const [stock_amount,setStockAmount] =useState(0); //จำนวนที่กรอก
    const [amount,setAmount] =useState(0);  // จำนวนในสต๊อก
    const [stockid,setStockId] =useState(0);
    const [validated,setValidated] =useState(false);
    const [unit,setUnit] =useState("");
    const [checkbtn,setCheckbtn] = useState(false);
    const [checkoriginbranch,setCheckOriginBranch] =useState(0);
    const [mname , setMname] =useState(0);
    const [allstock,setAllStock] =useState([]);


    useEffect(()=>{

        fetchAllstock();
        fetchDataBranch();
    },[]);


    useEffect(()=>{
        
        if(origin_branch==0){
            clearForm();
        }else{
            
            checkOriginBranch();
        }
        
    },[origin_branch]);

    useEffect(()=>{
        if(stockid==0){
            checkOriginBranch();
            setUnit("");
            setStockAmount(0);
        }
        checkOriginBranch();
        checkAmount();
        setDestinationBranch(0);
        setDestinationBranchstockamount(0);
    },[stockid]);

    useEffect(()=>{
        checkStockAmount();
    },[stock_amount])

    useEffect(()=>{
        checkDestinationAmount();
    },[destination_branch])


    const fetchDataBranch = async ()=>{
        let json = await API_GET("branch");
        setBranch(json.data);
       
    };
   
    const fetchAllstock = async ()=>{

            let json = await API_GET("stock");
            setAllStock(json.data);
    }
    const checkAmount = async ()=>{
        setAmount(0);
        let num = parseInt(stockid);
        stock.filter(stock => stock.stock_id === num ).map(item =>{
                setAmount(item.stock_amount);
                setUnit(item.m_unit);
                setMname(item.m_name);
        });

    }
    const checkOriginBranch = async()=>{
        let num = parseInt(origin_branch);
        let json = await API_POST("checkoriginbranch",{
            branch_id : origin_branch
        });
        if(json.result){
            setStock(json.data);
            setCheckOriginBranch(num);
        } 
    };

    const checkStockAmount = async()=>{
        setCheckbtn(false);
       if(stock_amount > amount || stock_amount <1){
            setCheckbtn(true);
       }
    }
    const onsave = async (event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        if(form.checkValidity()===false){
            event.stopPropagation();
        }else{
            transferstock();
            getStocktransfer();
            fetchAllstock();
        }
    }

    const clearForm =async ()=>{
        setStock([]);
        setDestinationBranch(0);
        setUnit("");
        setStockId(0);
        setStockAmount(0);
        setAmount(0);
        setMname("");
        setOriginBranch(0);
        setDestinationBranch(0);
        setDestinationBranchstockamount(0);

    }
    const transferstock = async ()=>{
       
        let stockamount;
        
        let num = parseInt(stockid);
        console.log("stid :" +stockid);
        stock.filter(stock => stock.stock_id === num).map(item =>{
            stockamount = parseInt(item.stock_amount) - parseInt(stock_amount);
            
        })
        const json = await API_POST("stock/update",{
            stock_id : stockid,
            stock_amount: stockamount
        });
        if(json.result){
            console.log("อัปเดทสำเร็จ");
            
            // navigate("/owner/employee",{replace:true});
        }
    }

    const getStocktransfer = async ()=>{
        let destinationstockid ;
        let stockamount;
       
        allstock.filter(allstock => allstock.m_name.includes(mname) ).map(item =>{
           
            if(item.stock_id != stockid){
                destinationstockid = item.stock_id;
                stockamount = parseInt(item.stock_amount) + parseInt(stock_amount);  
            }
         })

        const json = await API_POST("stock/update",{
            stock_id : destinationstockid,
            stock_amount: stockamount
        });
        if(json.result){
            console.log("อัปเดทสำเร็จ");
           clearForm();
        }
    }

    const checkDestinationAmount = async ()=>{
        allstock.filter(allstock => allstock.branch_id == destination_branch && allstock.m_name.includes(mname)).map(item =>{
            setDestinationBranchstockamount(item.stock_amount);
        })
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
                                <div className="formtranfer Regular shadow">
                                <Form noValidate validated={validated} onSubmit={onsave} >
                                    <Form.Group as={Col} className="form-group">
                                            <Form.Label>สาขาต้นทาง</Form.Label>
                                            <Form.Select
                                                value={origin_branch}
                                                onChange={(e) => setOriginBranch(e.target.value)}
                                                required>
                                                <option label="กรุณาเลือกสาขาต้นทาง" value={0}></option> 
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
                                    <Form.Group as={Col}  className="form-group">
                                            <Form.Label >รายการสต๊อก</Form.Label>
                                            <Form.Select
                                                value={stockid}
                                                onChange={(e) => setStockId(e.target.value)}
                                                required>
                                                <option label="กรุณาเลือกรายการสต๊อก" value={0}></option>    
                                                          
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
                                    <div className='row form-group'>
                                    <div className='col-lg-4 col-sm-10'>
                                            <Form.Group as={Col} controlId="validateUserName">
                                                <Form.Label>กรอกจำนวน</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    value={stock_amount}
                                                    placeholder="จำนวน"
                                                    onChange={(e) => setStockAmount(e.target.value)}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    กรุณากรอกจำนวน
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>



                                        <div className='col-lg-2 col-sm-2 px-2 pt-5' >
                                           {unit}
                                        </div>
                                        <div className='col-lg-4 col-sm-10'>
                                            <Form.Group as={Col} controlId="validateamount">
                                                <Form.Label>จำนวนในสต๊อก</Form.Label>
                                                <Form.Control

                                                    type="number"
                                                    value={amount}
                                                    placeholder="จำนวน"
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    disabled
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    จำนวนในสต๊อก
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>

                                        <div className='col-lg-2 col-sm-2  px-2 pt-5'>
                                           {unit}
                                        </div>
                                    </div>
                                    
                                    <div className='row'>
                                        <div className='col-lg-6 col-sm-12'>
                                            <Form.Group as={Col}  controlId="validatedestinationbranch" className="form-group">
                                                <Form.Label>สาขาปลายทาง</Form.Label>
                                                <Form.Select
                                                    value={destination_branch}
                                                    onChange={(e) => setDestinationBranch(e.target.value)}
                                                    required>
                                                    <option label="กรุณาเลือกสาขาปลายทาง"></option> 

                                                    {                                          
                                                    branch.filter(branch => branch.branch_id !== checkoriginbranch).map(item => (
                                                        <option key={item.branch_id} value={item.branch_id}> 
                                                            {item.branch_name} 
                                                        </option>
                                                    ))
                                                    }                                             
                                                </Form.Select>
                                                    <Form.Control.Feedback type="invalid">
                                                        กรุณาเลือกสาขาปลายทาง
                                                    </Form.Control.Feedback>                                               
                                            </Form.Group>
                                        </div>

                                        <div className='col-lg-4 col-sm-10'>
                                        <Form.Group as={Col}  className="form-group" >
                                            <Form.Label >จำนวนในสต๊อกปลายทาง</Form.Label>
                                            <Form.Control
                                                value={destination_branch_stock_amount}
                                                onChange={(e) => setDestinationBranchstockamount(e.target.value)}
                                                disabled
                                                >

                                            </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    จำนวนสต๊อกปลายทาง
                                                </Form.Control.Feedback>                                               
                                        </Form.Group>
                                        </div>

                                        <div className='col-lg-2 col-sm-2  px-2 pt-5 '>
                                            {unit} 
                                        </div>
                                    </div>

                                        <Row className="mb-3 " style={{width:"150px",margin:"auto",paddingTop:"20px"}}>
                                            <Button as="input" type="submit" value="โอนย้าย" disabled={checkbtn} className="btn btn-primary" />
                                        </Row>
                                </Form>
                                </div>
                        </div>

                </div>
            </div>
        </>
    )
}