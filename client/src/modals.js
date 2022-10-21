import {Modal,Button} from "react-bootstrap";
import { Form,Col,Table } from "react-bootstrap";
import { SERVER_URL } from "./app.config";
import "./././components/employee/Employee.css";
import { useEffect, useState } from 'react';
import SimpleDateTime from "react-simple-timestamp-to-date";


import "./index.css"
export  function Detailproductmodal(props) {

    return(
        <>
           <Modal show={props.show} onHide={props.onHide} centered >
                <Modal.Header>
                    <Modal.Title>
                            <h3 style={{textAlign:"center"}}>รายละเอียดสินค้า</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div className="row">
                            <div className="col-12">
                                {console.log(`${SERVER_URL}images/${props.info.product_img}`)}
                                <img src={`${SERVER_URL}images/${props.info.product_img}`} width={150} alt="Upload status" />
                            </div>
                            <div className="col-12">
                                <h5>รหัสสินค้า :  {props.info.product_id}</h5>
                            </div>
                            <div className="col-12">
                                <h5>ชื่อสินค้า:  {props.info.product_name}</h5>
                            </div>
                            <div className="col-12">
                                <h5>ราคา :  {props.info.product_price}</h5>
                            </div>
                            <div className="col-12">
                                <h5>ขนาด :  {props.info.product_size}</h5>
                            </div>
                            <div className="col-12">
                                <h5>น้ำหนัก :  {props.info.product_weight}</h5>
                            </div>
                            <div className="col-12">
                                <h5>ประเภท :  {props.info.product_type_name}</h5>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={props.onComfirm}>ปิด</Button>
                    </Modal.Footer>
             </Modal>
        </>
    );
}

export function DeleteModal(props){
    return(
    <>
        <Modal show={props.show} centered >
            <Modal.Header>
                <Modal.Title>
                    <h3 style={{textAlign:"center"}}>{props.title}</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <p>{props.message}</p>                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onConfirm}>ลบ</Button>
                <Button variant="primary" onClick={props.onCancel}>ยกเลิก</Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}


export function EditStockModal(props){

    return(
        <>
            <Modal show={props.show}  centered >
                <Modal.Header>
                    <Modal.Title>
                        <h3 style={{textAlign:"center"}}>{props.title}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <Form>
                        <Form.Group as={Col} controlId="validatestockamount">
                                <Form.Label>กรอกจำนวน</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    value={props.stockamount}
                                    placeholder="จำนวน"
                                    step="0.001"
                                    min ="1"
                                    onChange={(e) => props.setStockamount(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกจำนวน
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>             
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={props.onConfirm}>บันทึก</Button>
                    <Button variant="primary" onClick={props.onCancel}>ยกเลิก</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export function Detailmanagerrequest(props){
    return (
        <Modal show={props.show} onHide={props.onHide} centered >
            <Modal.Header>
                <Modal.Title>
                    <h3 style={{textAlign:"center"}}>รายละเอียดสต๊อกสินค้า</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><b>สาขาที่ :</b> {props.info.branch_id}</p>
                <p><b>ชื่อสาขา :</b> {props.info.branch_name}</p>
                <p><b>ชื่อ-สกุล :</b> {props.info.firstname} {props.info.lastname}</p>
                <p><b>ชื่อสินค้า :</b> {props.info.m_name}</p>
                <p><b>จำนวน :</b> {props.info.request_amount}</p>
                <p><b>รายละเอียด :</b> {props.info.request_description}</p>
                <p><b>สถานะ :</b> {props.info.status_name}</p>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onComfirm}>ปิด</Button>
            </Modal.Footer>
        </Modal>
    )
}

export function ConfirmModal(props){

    return(
        <>
            <Modal show={props.show} onHide={props.onCancel} centered >
                <Modal.Header>
                    <Modal.Title>
                        <h3 style={{textAlign:"center"}}>{props.title}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <p>{props.message}</p>                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.onConfirm}>ยืนยัน</Button>
                    <Button variant="danger" onClick={props.onCancel}>ยกเลิก</Button>
                </Modal.Footer>
            </Modal>
        </>
        );
}

export function PlusoreditstockModal(props){
    const onAdd = async()=>{
       props.onConfirm(1);
    }

    const onEdit = async()=>{
        props.onConfirm(2);
    }
    return(
        <>
            <Modal show={props.show} centered >
                <Modal.Header>
                    <Modal.Title>
                        <p  style={{textAlign:"center"}}>{props.title} </p> 
                    </Modal.Title>
                    <button className="btn" onClick={props.onCancel} ><i className="fa-sharp fa-solid fa-xmark"></i></button>
                </Modal.Header>
                <Modal.Body>
                        <p>{props.message}</p>                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onAdd}>เพิ่ม</Button>
                    <Button variant="danger" onClick={onEdit}>แก้ไข</Button>
                </Modal.Footer>
            </Modal>            
        </>
    )
}

export function PlusstockModal(props){
    // let plusstockamount;
    return(
        <>
            <Modal show={props.show}  centered >
                <Modal.Header>
                    <Modal.Title>
                        <h3 style={{textAlign:"center"}}>{props.title}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Col} controlId="validatestockamount">
                            <Form.Label>จำนวนในสต๊อก</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={props.stockAmount}
                                disabled
                                onChange={(e) => props.setStockamount(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                จำนวนในสต๊อก
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="validatestockamount">
                            <Form.Label>จำนวนที่ต้องการเพิ่ม</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={props.plusstockamount}
                                placeholder="จำนวน"
                                step="0.001"
                                min ="1"
                                onChange={(e) => props.setPlusStockAmount(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                กรุณากรอกจำนวน
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>                                                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.onConfirm}>เพิ่ม</Button>
                    <Button variant="danger" onClick={props.onCancel}>ยกเลิก</Button>
                </Modal.Footer>
            </Modal>            
        </>
    )
}

export function PlusoOrTranferStockModal(props){
    const onAddstock = ()=>{
        props.onConfirm(1);
    }

    const onTranfer =()=>{
        props.onConfirm(2);
    }

    return(
        <>
            <Modal show={props.show} onHide={props.onHide} centered>
                <Modal.Header>
                    <Modal.Title>
                        <p>{props.title}</p>
                    </Modal.Title>
                    <button className="btn" onClick={props.onCancel} ><i className="fa-sharp fa-solid fa-xmark"></i></button>
                </Modal.Header>
                <Modal.Body>
                    <p>{props.message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onAddstock}>เพิ่มสต๊อก</Button>
                    <Button variant="success" onClick={onTranfer}>ย้ายสต๊อกสินค้า</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export function AlertkModal(props){

    return(
        <>
            <Modal show={props.show} onHide={props.onCancel} centered>
                <Modal.Header>
                    <Modal.Title>
                        <p>{props.title}</p>
                    </Modal.Title>
                    <button className="btn" onClick={props.onCancel} ><i className="fa-sharp fa-solid fa-xmark"></i></button>
                </Modal.Header>
                <Modal.Body>
                    <p>{props.message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.onCancel} centered>ตกลง</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export function SelectempProduct(props){

    const [number, setNumber] = useState(0);
    const [calAmount, setCalAmount] = useState(0);
    const [calNet , setCalNet] = useState(0);
    let amount = 0;
    let net = 0;

    const PlusCount = () => {
        setNumber(number + 1);
    }

    const MinusCount = () => {
        if(number > 0){
            setNumber(number - 1);
        }
    }

    const onclickbasket = () =>{
        let sum = parseInt(props.data.product_price) * number;
        let data = [];
        let list = props.list;
        if(list.length >0){
            console.log(list);
            data.push(...list);

        }else{

        }
       
        let json ={
            product_id: props.data.product_id,
            product_img: props.data.product_img,
            product_name: props.data.product_name,
            product_price : props.data.product_price,
            product_size: props.data.product_size,
            product_weight: props.data.product_weight,
            amount : number,
            total :sum


        }
        data.push(json);

        amount = calAmount + number;
        setCalAmount(amount);

        net = calNet + sum;
        setCalNet(net);

        props.setAmountproduct(amount);
        props.setNet(net);
    
        props.setlist(data);
        setNumber(0);
        props.onHide();
    }

    const setNum = (num)=>{
        let num1  = parseInt(num);
        setNumber(num1)
    }

    return (
        <Modal show={props.show} onHide={props.onHide} centered >
            <Modal.Body>
                <h3 style={{textAlign:"center"}}>สินค้า</h3>
                <div className="picsize">
                    <img className="pic-size-m" src={`${SERVER_URL}images/${props.data.product_img}`} alt="Upload status" />
                </div>
                <div className="p-3 ">
                    <p><b>ชื่อสินค้า :</b> {props.data.product_name}</p>
                    <p><b>ราคา :</b> {props.data.product_price} <b>บาท</b></p>
                    <p><b>ขนาดสินค้า :</b> {props.data.product_size}</p>

                    <div className="row">
                            <div className="col-2 text-start">
                                <p><b>จำนวน :</b></p>
                            </div>
                            <div className="col-10 p-0">
                                <div className="row">
                                    <div className="col-1 mx-2 px-1">
                                    <button onClick={MinusCount} type="button" className="d-inline-block btn-sm btn-info">-</button>
                                    </div>
                                    <Form className="col-2 p-0" >
                                        <Form.Group as={Col} controlId="validateStockAmount">
                                            <Form.Control
                                                required
                                                type="number"
                                                value={number}
                                                placeholder=""
                                                min={0}
                                                step={1}
                                                onChange={(e) => setNum(e.target.value)}
                                                className="border-secondary"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                              
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Form>
                                    <div className="col-2"> 
                                        <button onClick={PlusCount} type="button"  className="d-inline-block btn-sm btn-info">+</button>
                                    </div>
                                   
                                </div>
                            </div>
                    
                    </div>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <div className="center-button">
                <Button className="me-2 " variant="primary" onClick={onclickbasket}>เพิ่มสินค้าลงในตะกร้า</Button>
                <Button variant="danger" onClick={props.onHide}>ยกเลิก</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export function Selectbasket(props){

    let data = props.data;
    const [getmoney,setGetmoney] = useState(0);
    const [change,setChange] =useState(0);

    useEffect(()=>{
        if(getmoney == 0){
            setChange(0);
        }
    },[getmoney])
    const calChange = ()=>{
        let net = props.Net;
        if(getmoney > net || getmoney == net){
            let change = getmoney - net;
            setChange(change);
        }else{
            alert('จำนวนเงินไม่พอ');
        }

    }
    const onCancel = ()=>{
        props.onCancel();
    }

    const confirm = ()=>{
        if(getmoney>0 && change >0){
            props.onConfirm(getmoney,change);
            setGetmoney(0);
            setChange(0);
        }else{
            alert('ยังไม่ได้คำนวณเงินทอน');
        }
    }

    return(
        <>
            <Modal  show={props.show}  centered >
            <Modal.Body>
                    <div className="row">
                        <div className="col-10"></div>
                        <div className="col-2 px-4">
                            <Button className="btn btn-danger btn-sm mx-1"  onClick={props.onHide} variant="" >
                                <i className="fa-sharp fa-solid fa-xmark" ></i>
                            </Button>
                        </div>
                    </div>

                    <h3 style={{textAlign:"center"}}>ชำระเงิน</h3>
                    
                <div>          
                    <div className="">
                        <h5>สรุปรายการขาย</h5>
                    </div>

                    <div >
                        <Table striped className=" m-0">
                                    <thead style={{backgroundColor:"#FFC700"}}>
                                            <tr>
                                                <th className="px-3">ชื่อสินค้า</th>
                                                <th className="px-3">ขนาดสินค้า</th>
                                                <th className="px-3">ราคา</th>
                                                <th className="px-3">จำนวน</th>
                                                <th className="px-3">ราคารวม</th>
                                            </tr>
                                        </thead>
                                    <tbody> 

                                        {
                                            data != null && 
                                            data.map(item=>(
                                                        
                                            <>
                                                <tr>
                                                                <td>{item.product_name}</td>
                                                                <td>{item.product_size}</td>
                                                                <td>{item.product_price}</td>
                                                                <td>{item.amount}</td>
                                                                <td>{item.total}</td>
                                                            </tr>
                                            </>
                                            ))
                                        }
                                        
                                    </tbody> 
                            </Table>   
                    </div>
                                        
                    <div className="row">
                        <div className="col-6"></div>
                        <p className="col-6 pt-4 my-1">ยอดรวมสุทธิ<input className="d-inline-block mx-1 textbox-plus1 form-control" value={props.Net}></input>บาท</p>
                    </div>
                    
                </div>    

                <div className="box-select4 my-3">
                    <div className="row ps-3 my-3">
                        <h6 className="pt-2 col-2">รับเงิน</h6>
                        <Form className="col-4 p-0 " >
                            <Form.Group as={Col} controlId="validateStockAmount">
                                <Form.Control
                                    required
                                    type="number"
                                    value={getmoney}
                                    placeholder="กรอกจำนวนเงิน"
                                    min={0}
                                    step={0.01}
                                    onChange={(e) => setGetmoney(e.target.value)}
                                    className="border border-secondary"
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกจำนวนเงิน
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                        {/* <input className="col-4  mx-1 px-5 "></input> */}
                        <h6 className=" pt-2 col-2">บาท</h6>
                        <Button className="col-3 px-1 btn-sm" variant="secondary" onClick={calChange}>คำนวณเงินทอน</Button> 
                       
                    </div> 
                    <div className="row ps-3 mb-3">
                        <h6 className="col-2 pt-2">ทอนเงิน</h6>
                        <input className="col-4  px-3 border border-secondary rounded" value={change}></input>
                        <h6 className=" pt-2 col-2">บาท</h6>
                    </div>
                     
                </div>
            </Modal.Body>
                <Modal.Footer>
                    <div className="center-button">
                        <Button className="me-2 px-5" variant="success" onClick={confirm}>ชำระเงิน</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export function ApproveModal(props){

    const [checkorther,setCheckorther] =useState(true);
    const [checkbtn,setCheckbtn] =useState(true);
    const onSave = ()=>{
        let item = props.data;
        props.onConfirm(item);
    }

    const approvedatail = async(value)=>{
       await props.approvedetail(value);
    }

    const onCancel = ()=>{
        props.onCancel();
        
    }
    return(
        <Modal show={props.show} onHide={props.onCancel} centered>
        <Modal.Header>
            <Modal.Title>
                <p>{props.title}</p>
            </Modal.Title>
            <button className="btn" onClick={props.onCancel} ><i className="fa-sharp fa-solid fa-xmark"></i></button>
        </Modal.Header>
        <Modal.Body>

            <Form >
                    <Form.Check
                        className="my-3"
                        label="ได้รับสินค้าครบตามรายการ"
                        name="group1"
                        type={"radio"}
                        value={"ได้รับสินค้าครบตามรายการ"}
                        onChange={(e)=> { approvedatail(e.target.value); setCheckorther(true);setCheckbtn(false)}}
                        id="1"
                        
                    />
                    <Form.Check
                        className="my-3"
                        label="ได้รับไม่ครบตามรายการ"
                        name="group1"
                        type={"radio"}
                        value={"ได้รับไม่ครบตามรายการ"}
                        onChange={(e)=> { approvedatail(e.target.value); setCheckorther(true);setCheckbtn(false)}}
                       
                    />
                    <Form.Check
                        className="my-3"
                        label="ได้รับไม่ถูกต้องตามรายการ"
                        name="group1"
                        type={"radio"}
                        value={"ได้รับไม่ถูกต้องตามรายการ"}
                        onChange={(e)=> { approvedatail(e.target.value); setCheckorther(true);setCheckbtn(false)}}
                      
                    />
                    <Form.Check
                        className="my-3"
                        label="อื่น ๆ"
                        name="group1"
                        type={"radio"}
                        value={false}
                        onChange={(e)=> {setCheckorther(false);setCheckbtn(false)}}
                        
                    />
                    <Form.Group as={Col} controlId="validateStockAmount">
                        <Form.Label hidden={checkorther}>กรอกรายละเอียด</Form.Label>
                        <Form.Control
                            
                            type="text"
                            placeholder="โปรดระบุ"
                            hidden={checkorther}
                            onChange={(e)=> approvedatail(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            กรุณากรอกจำนวน
                        </Form.Control.Feedback>
                    </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={onSave} disabled={checkbtn} centered>ตกลง</Button>
            <Button variant="danger" onClick={onCancel}>ยกเลิก</Button>
        </Modal.Footer>
    </Modal>
    )
}

export function RejectRecipitentModal(props){

    const [checkorther,setCheckorther] =useState(true);
    const [checkbtn,setCheckbtn] =useState(true);

    const onSave = ()=>{
        let item = props.data;
        props.onConfirm(item);
    }

    const rejectdetail = async(value)=>{

       await props.rejectdetail(value);
       
    }

    const onCancel = ()=>{
        props.onCancel();
    }
    return(
        <Modal show={props.show} onHide={props.onCancel} centered>
        <Modal.Header>
            <Modal.Title>
                <p>{props.title}</p>
            </Modal.Title>
            <button className="btn" onClick={props.onCancel} ><i className="fa-sharp fa-solid fa-xmark"></i></button>
        </Modal.Header>
        <Modal.Body>

            <Form >
                    <Form.Check
                        className="my-3"
                        label="สินค้ามีจำนวนไม่ครบ"
                        name="group1"
                        type={"radio"}
                        value={"สินค้ามีจำนวนไม่ครบ"}
                        onChange={(e)=> {rejectdetail(e.target.value); setCheckorther(true);setCheckbtn(false)}}
                        id="1"
                        
                    />
                    <Form.Check
                        className="my-3"
                        label="สินค้าไม่ตรงตามรายการ"
                        name="group1"
                        type={"radio"}
                        value={"สินค้าไม่ตรงตามรายการ"}
                        onChange={(e)=> { rejectdetail(e.target.value); setCheckorther(true);setCheckbtn(false)}}
                       
                    />
                    <Form.Check
                        className="my-3"
                        label="สินค้าได้รับความชำรุดเสียหาย"
                        name="group1"
                        type={"radio"}
                        value={"สินค้าได้รับความชำรุดเสียหาย"}
                        onChange={(e)=> { rejectdetail(e.target.value); setCheckorther(true);setCheckbtn(false)}}
                      
                    />
                    <Form.Check
                        className="my-3"
                        label="อื่น ๆ"
                        name="group1"
                        type={"radio"}
                        value={false}
                        onChange={(e)=> {setCheckorther(false);setCheckbtn(false)}}
                        
                    />
                    <Form.Group as={Col} controlId="validateStockAmount">
                        <Form.Label hidden={checkorther}>กรอกรายละเอียด</Form.Label>
                        <Form.Control
                            
                            type="text"
                            placeholder="โปรดระบุ"
                            hidden={checkorther}
                            onChange={(e)=> rejectdetail(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            กรุณากรอกจำนวน
                        </Form.Control.Feedback>
                    </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={onSave} disabled={checkbtn} centered>ตกลง</Button>
            <Button variant="danger" onClick={onCancel}>ยกเลิก</Button>
        </Modal.Footer>
    </Modal>
    )
}

export function RejectSanderModal(props){

    const [checkorther,setCheckorther] =useState(true);
    const [checkbtn,setCheckbtn] =useState(true);

    const onSave = ()=>{
        let item = props.data;
        props.onConfirm(item);
    }

    const rejectdetail = async(value)=>{

       await props.rejectdetail(value);
       
    }

    const onCancel = ()=>{
        props.onCancel();
    }
    return(
        <Modal show={props.show} onHide={props.onCancel} centered>
        <Modal.Header>
            <Modal.Title>
                <p>{props.title}</p>
            </Modal.Title>
            <button className="btn" onClick={props.onCancel} ><i className="fa-sharp fa-solid fa-xmark"></i></button>
        </Modal.Header>
        <Modal.Body>

            <Form >
                    <Form.Check
                        className="my-3"
                        label="มีจำนวนสินค้าไม่เพียงพอ"
                        name="group1"
                        type={"radio"}
                        value={"มีจำนวนสินค้าไม่เพียงพอ"}
                        onChange={(e)=> {rejectdetail(e.target.value); setCheckorther(true);setCheckbtn(false)}}
                        
                        
                    />
                    <Form.Check
                        className="my-3"
                        label="รายการสินค้าไม่ถูกต้อง"
                        name="group1"
                        type={"radio"}
                        value={"รายการสินค้าไม่ถูกต้อง"}
                        onChange={(e)=> { rejectdetail(e.target.value); setCheckorther(true);setCheckbtn(false)}}
                       
                    />

                    <Form.Check
                        className="my-3"
                        label="อื่น ๆ"
                        name="group1"
                        type={"radio"}
                        value={false}
                        onChange={(e)=> {setCheckorther(false);setCheckbtn(false)}}
                        
                    />
                    <Form.Group as={Col} controlId="validateStockAmount">
                        <Form.Label hidden={checkorther}>กรอกรายละเอียด</Form.Label>
                        <Form.Control
                            
                            type="text"
                            placeholder="โปรดระบุ"
                            hidden={checkorther}
                            onChange={(e)=> rejectdetail(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            กรุณากรอกจำนวน
                        </Form.Control.Feedback>
                    </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={onSave} disabled={checkbtn} centered>ตกลง</Button>
            <Button variant="danger" onClick={onCancel}>ยกเลิก</Button>
        </Modal.Footer>
    </Modal>
    )
}

export function TransferHistoryModal(props){
    let data = props.data;
    return(
        <>
            <Modal show={props.show} onHide={props.onCancel} centered>
                <Modal.Body>
                    {console.log(data)}
                    <h4 className="header mb-4">{props.title}</h4>
                    <div className="row ms-2">
                            <span className="col-6 detail-header">รหัสการย้าย : 
                                <span className=" detail">{data.t_id}</span> 
                            </span> 
                            <span className="col-6 detail-header">สถานะ : 
                                <span className="detail">{data.status_name}</span>
                            </span>
                            <span className="col-6 detail-header">วันที่อนุมัติ : 
                                <span className="detail"> <SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":" showTime="0">{data.t_date}</SimpleDateTime></span>   
                            </span>
                            <span className="col-6 detail-header">เวลา : 
                                <span className="detail"> <SimpleDateTime format="MHS"  timeSeparator=":" showTime="1" showDate="0">{data.t_date}</SimpleDateTime></span>
                            </span>
                            {
                                data.request_id != 0 &&
                                <span className="col-12 detail-header">รหัสคำขอที่ : 
                                    <span className="detail">{data.request_id}</span>
                                </span>
                            }
                            <span className="col-12 detail-header">สาขาต้นทาง : 
                                <span className="detail">{props.checkbranchname(data.origin_branch)}</span>
                            </span>
                            <span className="col-12 detail-header">สาขาปลายทาง : 
                                <span className="detail">{props.checkbranchname(data.destination_branch)}</span>
                            </span>
                            <span className="col-12 detail-header">รายการ: 
                                <span className="detail">{data.m_name} {data.stock_amount} {data.m_unit} </span>
                            </span>
                            <div class="container mt-5 mb-5">
                            <div class="row">
                                <div class="col-md-9   offset-md-1">
                                  
                                    <ul class="timeline">
                                        <li className="mb-5">
                                            <p className="mb-0">
                                                {props.convertDate(data.t_date)}
                                            </p>
                                            <span>เจ้าของร้าน : สร้างรายการย้าย</span>
                                            
                                        </li>
                                        {
                                            props.checkOriginstatus(data)
                                        }
                                        {
                                            props.checkDestinationstatus(data)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.onCancel} centered>ปิด</Button>
                </Modal.Footer>
            </Modal>
        </>        
    )
}