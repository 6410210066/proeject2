import "./owner.css";
import { useEffect,useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { API_GET, API_POST } from '../../api';

export default function OwnerStockForm(){
    let navigate =useNavigate();
    let params = useParams();
    const [material,setMaterail] = useState([]);
    const [branch,setBranch] =useState([]);
    const [branch_id,setBranchid] =useState(0);
    const [stock_id,setStockid] =useState(0);
    const [stock_amount,setStockamount] =useState(0);
    const [mid,setMid]=useState(0);
    const [validated,setValidate] = useState(false);
    const [title,setTitle] =useState("");
    const [checkbtn,setCheckbtn] =useState(true);
    useEffect(()=>{
        fetchMaterial();
        
        setTitle("เพิ่มสต๊อกสินค้า");
        if(params.stock_id !="add"){
            setTitle("แก้ไขสต๊อกสินค้า");
            fetchDataStock([params.stock_id]);
        }
    },[]);

    useEffect(()=>{
        if(mid==0){
            setBranchid(0);
        }
        fetchBranch();
    },[mid])

    useEffect(()=>{
        if(branch_id != 0){
            setCheckbtn(false);
        }else{
            setCheckbtn(true);
        }
    },[branch_id])
    const fetchDataStock = async(stock_id)=>{
        let json = await API_GET("stock/"+stock_id);
        var data = json.data[0];
        setStockid(data.branch_id);
        setStockamount(data.stock_amount);
        setMid(data.m_id);
        setBranchid(data.branch_id);
        
    } 

    const fetchMaterial = async()=>{
        let json = await API_GET("material");
        setMaterail(json.data);
    }

    const fetchBranch = async()=>{
        console.log(mid);
        let json =await API_POST("checkmaterialbybranch",{
            m_id: mid
        });
        setBranch(json.data);
        console.log(json.data);
    }
    const onsave = async(event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        if(form.checkValidity()===false){
            event.stopPropagation();
        }else{
            if(params.emp_id === "add"){
                console.log("add");
            }else{
                console.log("add");
            }

        }
        setValidate(true);
    }

    const doCreaterStock = async ()=>{
        let json = await API_POST("")
    }
    const close = async()=>{
        setMid(0);
        setStockamount(0);
        setBranchid(0);
        navigate("/owner/stock", {replace:true});
    }
    return(
        <>
            {console.log("mid : "+mid)}
            <div className="Formstyle">
                <div className=""></div>
                <div className="FormGroup mt-5">
                    <p className="formtitle">{title}</p>
                    <div className="informcontent">
                        <Form  noValidate validated={validated}  onSubmit={onsave}>
                            <Form.Group as={Col} controlId="validatemid">
                                <Form.Label>รายการวัตถุดิบ</Form.Label>
                                <Form.Select
                                    value={mid}
                                    onChange={(e) => setMid(e.target.value)}
                                    required>
                                    <option label="กรุณาเลือกรายการวัตถุดิบ"></option> 
                                    {
                                    material != null &&
                                    material.map(item => (
                                        <option key={item.m_id} value={item.m_id}> 
                                        {item.m_name} </option>
                                    ))
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    กรุณารายการวัตถุดิบ
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div style={{height:"30px"}}></div>
                            <Form.Group as={Col} controlId="validatestockamount">
                                <Form.Label>กรอกจำนวน</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    value={stock_amount}
                                    placeholder="จำนวน"
                                    min ="1"
                                    onChange={(e) => setStockamount(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกจำนวน
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div style={{height:"30px"}}></div>
                            <Form.Group as={Col} controlId="validatebranchid">
                                <Form.Label>รายการวัตถุดิบ</Form.Label>
                                <Form.Select
                                    value={branch_id}
                                    onChange={(e) => setBranchid(e.target.value)}
                                    required>
                                    <option label="กรุณาเลือกสาขา" ></option> 
                                    {
                                    branch != null &&
                                    branch.map(item => (
                                        <option key={item.branch_id} value={item.branch_id}> 
                                        {item.branch_name} </option>
                                    ))
                                    }
                                </Form.Select>
                                <div style={{height:"30px"}}></div>
                                <Form.Control.Feedback type="invalid">
                                    กรุณาเลือกสาขา
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Row>
                                <div className="col-lg-3 col-sm-12">
                                </div>
                                <div className="col-lg-8 col-sm-12">
                                     <Button className="btn btn-success mx-4 px-4" type="submit" as="input" value="บันทึก"  />
                                     <Button className="btn btn-danger px-4" onClick={close}>ปิด</Button>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}