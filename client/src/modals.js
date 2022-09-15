import {Modal,Button} from "react-bootstrap";

export  function Detailproductmodal(props) {

    return(
        <>
           <Modal show={props.show} onHide={props.onHide} centered >
                <Modal.Header>
                    <Modal.Title>
                            <h1 style={{textAlign:"center"}}>รายละเอียดสินค้า</h1>
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