import {Modal,Button,} from "react-bootstrap";
import { Form,Col } from "react-bootstrap";

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
    let plusstockamount;
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
                                value={plusstockamount}
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