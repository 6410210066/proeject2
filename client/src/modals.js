import {Modal,Button,} from "react-bootstrap";
import { Form,Col } from "react-bootstrap";
import { SERVER_URL } from "./app.config";
import "./././components/employee/Employee.css";
import { useState } from 'react';

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
                                <div>
                                    <button onClick={MinusCount} type="button" className="d-inline-block btn-sm btn btn-info">-</button>
                                   
                                    <input className="d-inline-block mx-2 textbox-plus form-control form-control-sm " value={number} type="number"></input>
                        
                                    <button onClick={PlusCount} type="button"  className="d-inline-block btn-sm btn btn-info">+</button>
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

// export function Selectbasket(props){

//     return(
//         <>
//             <Modal show={props.show} onHide={props.onHide} centered >
//                 <Modal.Header>
//                     <Modal.Title>
//                         <h4>ตะกร้าสินค้า</h4>
//                     </Modal.Title>
    
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>{props.data.product_name} {props.data.product_price} {props.data.product_size}</p>
                    
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <div className="center-button">
//                         <Button className="me-2" variant="success" onClick={props.onHide}>ชำระเงิน</Button>
//                     </div>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     )
// }