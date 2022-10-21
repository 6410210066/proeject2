import { useEffect, useState,useRef} from 'react';
import {Form,Row,Col,Button, ModalDialog} from 'react-bootstrap';
import { useParams ,Link} from 'react-router-dom';
import {API_GET,API_POST} from '../../api';
import { useNavigate,useLocation } from 'react-router-dom';
import Ownernav from "./Ownernav";
import './owner.css';
import { AlertkModal, ConfirmModal } from '../../modals';


export default function TransferReqeust(){

    const {state} = useLocation();
    const ref1 =useRef(null);
    let navigate =useNavigate();
    let page =3;
    let statusapprove = 5;
    const [validated,setValidated] =useState(false);
    const [request,setRequest] =useState([]);
    const [allstock,setAllStock] = useState([]);
    const [branch,setBranch] = useState([]);
    const [stock,setStock] = useState([]);
    const [transferlist,setTransferlist] =useState([]);
    const [requestid,setRequestid] =useState(0);
    const [origin_branch,setOriginBranch] =useState(0);
    const [destination_branch,setDestinationBranch] =useState(0);
    const [mname , setMname] =useState(0);
    const [stock_amount,setStockAmount] =useState(0); //จำนวนที่กรอก
    const [amount,setAmount] =useState(0);  // จำนวนในสต๊อก
    const [stockid,setStockId] =useState(0);
    const [formdisabled,setFormdisabled] =useState(false);
    const [checkbtn,setCheckbtn] = useState(false);
    const [minimum,setMinimum] =useState(0);
    const [unit,setUnit] =useState("");
    const [transferamount,setTransferamount] =useState(0);
    const [mid,setMid] =useState(0);
    const [checktransferlist,setChecktransferlist] =useState(true);
    const [showconfirm,setShowconfirm] = useState(false);
    const [showalert,setShowalert] =useState(false);
    const [title,setTitle] =useState("");
    const [message,setMessage] =useState("");
    const [checkmodaltype,setCheckmodaltype] = useState(0);
    

    useEffect(()=>{
        fetchRequest(state);
        fetchDataBranch();
        fetchAllstock();
        setTransferamount(0);
        setRequest(state);
    },[]);

    useEffect(()=>{
        if(transferamount > request.request_amount){
            onAlert();
        }
    },[transferamount])

    useEffect(()=>{
        allstock.filter(allstock => allstock.stock_id == request.stock_id ).map(item=>{
            setMname(item.m_name);
            setUnit(item.m_unit);
            setMid(item.m_id);
            setMinimum(item.minimum);
        });
    },[allstock]);

    useEffect(()=>{
        checkStockAmount();
    },[stock_amount]);

    useEffect(()=>{

        console.log(transferlist);
        if(transferlist.length >0){
            setChecktransferlist(false);
        }
    },[transferlist]);

    
    const fetchRequest = async(data)=>{
        
        setMname(data.m_name);
        setDestinationBranch(data.branch_id);
        setRequestid(data.request_id);
    }

    const fetchDataBranch = async ()=>{
        let json = await API_GET("branch");
        setBranch(json.data);
       
    }
   
    const fetchAllstock = async ()=>{
            let json = await API_GET("stock");
            let data =json.data;
            setAllStock(data);
            setStock(data);
    }

    const checkbranchname = (branchID)=>{
        let branchname = "";
        branch.filter(branch => branch.branch_id == branchID ).map(item =>{
            branchname = item.branch_name;
        });

        return branchname
    }

    const checkStockAmount = async()=>{
        setCheckbtn(false);
        
        let  num=0;
        allstock.filter(allstock =>allstock.branch_id == origin_branch && allstock.m_id == mid ).map(item1 =>{
            num = item1.stock_amount - ( parseInt(stock_amount) + minimum);
           
        });

        if( stock_amount < 1 || num < 0){
            setCheckbtn(true);
       }

    }

    const onsave = async (event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        if(form.checkValidity()===false){
            event.stopPropagation();
        }else{
            addList(event);
            updateallstock();
        }
        // setValidated(true);
    }

    const addList = async (event)=>{
        let num=0;
        let num1=0;
        let data = [];
        let checkduplicate=0;
        if(transferlist.length > 0){
           
            transferlist.map(item=>{

                if(item.origin_branch == origin_branch){
                    
                     num = parseInt(item.stock_amount) + parseInt(stock_amount);
                     num1 = transferamount + parseInt(stock_amount);
                    setTransferamount(num1);
                    let json ={ origin_branch: origin_branch,
                        destination_branch:destination_branch,
                        request_id: requestid,
                        m_id: mid,
                        stock_amount: num};
                    data.push(json);
                    checkduplicate=1;
                }else{
                    data.push(item);
                }
   
            });
        }

        if(checkduplicate==0){
             num1 = transferamount + parseInt( stock_amount);
            setTransferamount(num1);
            let json ={ origin_branch: origin_branch,
                destination_branch:destination_branch,
                request_id: requestid,
                m_id: mid,
                stock_amount: stock_amount};

            data.push(json);
        }
        setTransferlist(data);

    
        ref1.current.target=0;
        setStockAmount(0);
        setOriginBranch(0);
        num=0;
        num1=0;

        
    }

    const deleteList =(num)=>{

        let data = [];
        if(transferlist.length>0){
            transferlist.map((item,index) =>{
                if(index != num){
                    data.push(item);
                   
                }else{
                    restoreAllstock(item.stock_amount,item.origin_branch);
                    setTransferamount(transferamount - parseInt(item.stock_amount));
                }
            });
            setTransferlist(data);
            if(data.length==0){
                setChecktransferlist(true);
            }
        }

    }

    const clearList = ()=>{
        setTransferlist([]);
        setTransferamount(0);
        setChecktransferlist(true);
        fetchAllstock();
    }

    const updateallstock = ()=>{
        let data =[];
        let newvalue;
        allstock.map(item =>{
            if(item.branch_id == origin_branch && item.m_id == mid){
                newvalue = item.stock_amount - stock_amount;
                item["stock_amount"] = newvalue;
                data.push(item);
            }else{
                data.push(item);
            }
        });

        setAllStock(data);

    }

    const restoreAllstock = async (num,originbranch)=>{
        let data =[];
        let newvalue;
        allstock.map(item =>{
            if(item.branch_id == originbranch && item.m_id == mid){
                newvalue = item.stock_amount + parseInt(num);
                item["stock_amount"] = newvalue;
                data.push(item);        
            }else{
                data.push(item);
            }
        });

         setAllStock(data);
    }
 
    const colorcheck = ()=>{
        if(transferamount < request.request_amount ){
            return {color:"red"};
        }else{
            return {color:"green"};
        }
    }

    const transferstock = async ()=>{

        transferlist.map(item=>{
            allstock.filter(allstock => allstock.m_id == mid && allstock.branch_id== item.origin_branch ).map(item1 =>{
                    updatestock(item1.stock_id,item1.stock_amount);
                    addtransferhitory(item.origin_branch,item.destination_branch,item.request_id,item.m_id,item.stock_amount);
            })
        });
            requeststatusupdate();
    }
    
    const requeststatusupdate = async()=>{
      
        if(requestid>0){
            let json2 = await API_POST("request/updatestatus",{
                request_id : request.request_id,
                status_id : statusapprove
            });

            if(json2.result){
               navigate('/request', {replace:true});
            }
        }
    }

    const updatestock = async(stockid,stockamount)=>{
 
        const json = await API_POST("stock/update",{
            stock_id : stockid,
            stock_amount: stockamount
        });

    }

    const addtransferhitory =async (origin_branch,destination_branch,requestid,mid,stock_amount)=>{
        const json = await API_POST("transferhistory/add",{
            status_id : 4,
            origin_branch: origin_branch,
            destination_branch:destination_branch,
            request_id: requestid,
            m_id: mid,
            stock_amount: stock_amount
        });


    }

    const onTransfer = (type)=>{
        setShowconfirm(true);
        setTitle("ย้ายสต๊อกสินค้าทั้งหมด");
        setMessage("คุณต้องการยืนยันการย้ายสต๊อกสินค้าทั้งหมดหรือไม่");
        setCheckmodaltype(type);
    }

    const onClearlist= (type)=>{
        setShowconfirm(true);
        setTitle("ยกเลิกรายการทั้งหมด");
        setMessage("คุณต้องการยกเลิกรายการทั้งหมดหรือไม่");
        setCheckmodaltype(type);
    }

    const checkModal = ()=>{
        if(checkmodaltype ==1){
            clearList();
            setShowconfirm(false);
        }else if(checkmodaltype ==2){
            transferstock();
            setShowconfirm(false);
        }
    }

    const onCancel =()=>{
        setShowconfirm(false);
        setShowalert(false);
    }

    const onAlert = ()=>{
        setShowalert(true);
        setTitle("แจ้งเตือน !");
        setMessage("จำนวนที่ย้ายมากกว่าจำนวนที่ขอ");
    }
    return(
        <>
            <div  className="container-fluid " >
                <div className="row ">
                    <div className="col-lg-2 nav" style={{padding:"0"}}>
                         <Ownernav page={page} />
                    </div>
                        <div className="col-lg-10 content overfloww" style={{padding:"0"}}>
                           
                                <div className="formtranfer Regular shadow">
                                <Link to="/transfer"> <button className="btn " style={{float:"right"}}><i className="fa-sharp fa-solid fa-xmark"></i></button></Link> 
                                <h2 className="header ">ย้ายสต๊อกสินค้า</h2> 
                                    
                                    <div className='row mt-3 '>
                                        <div className='col-12 my-2'>
                                            <p><b>รหัสคำขอ :</b> {request.request_id}</p>
                                        </div>
                                        <div className='col-5'>
                                            <p><b>สาขาที่ขอ :</b> {checkbranchname(request.branch_id)}</p>
                    
                                        </div>
                                        <div className='col-7 mb-3'>
                                            <p><b>รายการที่ขอ :</b>  {mname} {request.request_amount} {unit}</p>
                                        </div>
                                        <div className='col-5'>
                                           
                                            <p><b>จำนวนที่ย้าย :</b> <span style={colorcheck()}>  {transferamount} / {request.request_amount} {unit} </span></p>
                                        </div>
                                    </div>
                                    <Form noValidate validated={validated} onSubmit={onsave} >

                                        <Form.Group as={Col} className="form-group col-7" controlId='validateOriginBranch'>
                                            <Form.Label>เลือกสาขาที่ย้าย</Form.Label>
                                            <Form.Select
                                                value={origin_branch}
                                                ref={ref1}
                                                onChange={(e) => setOriginBranch(e.target.value)}
                                                required>
                                                <option label="กรุณาเลือกสาขาต้นทาง"></option> 

                                                { 

                                                allstock != null &&
                                                    branch.filter(branch => branch.branch_id != request.branch_id ).map(item => (
                                                        allstock.filter(allstock =>allstock.branch_id == item.branch_id && allstock.m_id == mid ).map(item1 =>(
                                                            <option key={item.branch_id} value={item.branch_id}> 
                                                                {item.branch_name} {item1.stock_amount} {item1.m_unit}
                                                            </option>
                                                        ))
                                                    ))
                                                }
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                กรุณาเลือกสาขาต้นทาง
                                            </Form.Control.Feedback>
                                        </Form.Group>      

                                        <div className='row form-group'>
                                            <div className='col-lg-7 col-sm-10'>
                                                    <Form.Group as={Col} controlId="validateStockAmount">
                                                        <Form.Label>กรอกจำนวน</Form.Label>
                                                        <Form.Control
                                                            required
                                                            ref={ref1}
                                                            type="number"
                                                            value={stock_amount}
                                                            placeholder="จำนวน"
                                                            min={0}
                                                            step={0.01}
                                                            disabled={formdisabled}
                                                            onChange={(e) => setStockAmount(e.target.value)}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            กรุณากรอกจำนวน
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                <div className='mt-2'>
                                                    <p className='text1 '>* ต้องมีจำนวนคงเหลือในสต๊อกอย่างน้อยจำนวน {minimum}  {unit}</p>   
                                                </div>
                                            </div>

                                            <div className='col-lg-2 col-sm-2 px-2 pt-5 ' >
                                                {unit}
                                            </div>
                                        </div>
                                        <div >
                                            
                                        </div>
                                            <Row className="mb-3 " style={{width:"150px",margin:"auto",paddingTop:"20px"}}>
                                                <Button as="input" type="submit" value="เพิ่มรายการย้าย" disabled={checkbtn} className="btn btn-primary" />
                                            </Row>
                                    </Form>
                                </div>
                                {/* รายการ */}

                                <div hidden={checktransferlist} className='formtranfer Regular shadow '>
                                    <h3 className='header mb-3'>รายการย้าย</h3>
                                    <div className='heading row transfer-item'>
                                        <div className='col-1'>ลำดับ</div>
                                        <div className='col-3'>สาขาต้นทาง</div>
                                        <div className='col-3'>สาขาปลายทาง</div>
                                        <div className='col-2'>รายการ</div>
                                        <div className='col-1'>จำนวน</div>
                                        <div className='col-2'>ยกเลิก</div>
                                    </div>
                                
                                    {
                                        transferlist.map((item,index)=>(
                                            <>
                                                <div className=' row transfer-item my-2'>
                                                    <div className='col-1'>{index+1}</div>
                                                    <div className='col-3'>{checkbranchname(item.origin_branch)}</div>
                                                    <div className='col-3'>{checkbranchname(item.destination_branch)}</div>
                                                    <div className='col-2'>{mname}</div>
                                                    <div className='col-1'>{item.stock_amount}</div>
                                                    <div className='col-2 btn btn-delete' onClick={event=>deleteList(index)}>ยกเลิก</div>
                                                </div>
                                            </>
                                        ))  
                                    }
                                    <div className='my-3 text-center'>
                                        <button className='btn btn-danger me-4' onClick={event => onClearlist(1)}>ยกเลิกทั้งหมด</button>
                                        <button className='btn btn-success' onClick={event => onTransfer(2)}>ย้ายสต๊อกทั้งหมด</button>
                                    </div>
                                </div>
                        </div>
                </div>
            </div>
            <ConfirmModal
                show={showconfirm}
                title={title}
                message={message}
                onConfirm={checkModal}
                onCancel={onCancel}
            />

            <AlertkModal
                show={showalert}
                title={title}
                message={message}
                onCancel={onCancel}
            />
        </>
    )
}