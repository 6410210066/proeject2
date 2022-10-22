import "./owner.css";
import { useEffect,useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { API_GET, API_POST } from '../../api';
import { ConfirmModal } from "../../modals";

export default function MaterailForm(){
    let params = useParams();
    const navigate =useNavigate();
    const [mname,setMname] =useState("");
    const [munit,setMunit] =useState("");
    const [mtype,setMtype] =useState("");
    const [minimum,setMinimum] =useState(0);
    const [mid,setMid] =useState(0);
    const [title,setTitle] =useState("");
    const [validated,setValidated] =useState(false);
    const [show,setShow] =useState(false);
    const [message,setMessage] =useState("");
    const [titlemodal,setTitlemodal] =useState("");

    useEffect(()=>{
        async function fetchMaterial(m_id){
            let json = await API_GET("meterial/"+m_id);
            var data = json.data[0];
            console.log(data);
        } 
        if(params.material_id !="add"){
            fetchMaterial([params.material_id]);
            
            setTitle("แก้ไขรายการวัตถุดิบ");
        }else{
            setTitle("เพิ่มรายการวัตถุดิบ");
        }
    },[])


    const onsave = async(event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        
        if(form.checkValidity()===false){
            event.stopPropagation();
        }else{
            confirmModal();
        }
        setValidated(true);
    }

    const confirmModal = ()=>{
        setShow(true);
        setTitlemodal("ยืนยันการเพิ่มข้อมูล");
        setMessage("คุณต้องการเพิ่มข้อมูลหรือไม่");

    }

    const onConfirm =  ()=>{
        doCreateMeaterial();
        setShow(false);
    }

    const onCancel = ()=>{
        setShow(false);
    }

    const doCreateMeaterial = async ()=>{
        let json = await API_POST("material/add",{
            m_name : mname,
            m_unit : munit,
            m_type : mtype,
            Minimum: minimum
        });

        if(json.result){
            console.log("เพิ่มสำเร็จ");
            navigate('/owner/material',{replace:true});
        }
    }

    const close = ()=>{
        setMname("");
        setMunit("");
        setMtype("");
        setMinimum(0);
        navigate("/owner/material", {replace:true});
    }
    return(
        <>
   
                <div className="Formstyle">
                    <div className=""></div>
                    <div className="FormGroup mt-5">
                        <p className="formtitle">{title}</p>
                        <div className="informcontent">
                            <Form  noValidate validated={validated}  onSubmit={onsave}>
                            <div className="row">
                                    <div className="col-9">
                                        <Form.Group as={Col} controlId="validatemid">
                                            <Form.Label>ชื่อวัตถุดิบ</Form.Label>
                                            <Form.Control
                                                value={mname}
                                                onChange={(e) => setMname(e.target.value)}
                                                placeholder="ชื่อวัตถุดิบ"
                                                required>
                                            </Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                กรุณากรอกชื่อวัตถุดิบ
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>
                            
                                <div style={{height:"30px"}}></div>
                                <div className="row">
                                    <div className="col-9">
                                        <Form.Group as={Col} controlId="validatestockamount">
                                            <Form.Label>หน่วย</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={munit}
                                                placeholder="หน่วย"
                                                onChange={(e) => setMunit(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                กรุณากรอกหน่วย
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>
                                        
                                <div style={{height:"30px"}}></div>
                                <Form.Group as={Col} controlId="validatebranchid" className="col-9">
                                    <Form.Label>ประเภท</Form.Label>
                                    <Form.Select
                                        value={mtype}
                                        onChange={(e) => setMtype(e.target.value)}
                                        required>
                                        <option label="กรุณาเลือกประเภท" ></option> 
                                        <option value={"เฟรนฟราย"} lable="เฟรนฟราย">ฟรนฟราย</option>
                                        <option value={"นักเก็ต"} lable="นักเก็ต">นักเก็ต</option>
                                        <option value={"เครื่องดื่ม"} lable="เครื่องดื่ม">เครื่องดื่ม</option>
                                        <option value={"เครื่องปรุง"} lable="เครื่องปรุง">เครื่องปรุง</option>
                                        <option value={"บรรจุภัณฑ์"} lable="บรรจุภัณฑ์">บรรจุภัณฑ์</option>
                                        <option value={"อื่น ๆ"} lable="อื่น ๆ">อื่นๆ </option>
                                        
                                    </Form.Select>
                                    <div style={{height:"30px"}}></div>
                                    <Form.Control.Feedback type="invalid">
                                        กรุณาเลือกประเภท
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div style={{height:"30px"}}></div>
                                <div className="row">
                                    <div className="col-9 mb-4">
                                        <Form.Group as={Col} controlId="validatestockamount">
                                            <Form.Label>จำนวนขั้นต่ำในสต๊อก</Form.Label>
                                            <Form.Control
                                                required
                                                type="number"
                                                value={minimum}
                                                placeholder="จำนวน"
                                                onChange={(e) => setMinimum(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                กรุณากรอกหน่วย
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>
                                <Row>
                                
                                    <div className="p-0">
                                        <Button className="btn btn-success mx-4 px-4" type="submit" as="input" value="บันทึก"  />
                                        <Button className="btn btn-danger px-4" onClick={close}>ยกเลิก</Button>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            <ConfirmModal 
                show={show}
                title={titlemodal}
                message={message}
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </>
    )
}