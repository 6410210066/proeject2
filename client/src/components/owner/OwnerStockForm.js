import "./owner.css";
import { useEffect,useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
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
    const [munit,setMunit] =useState("");
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
            setMunit("");
        }else{
            material.filter(material => material.m_id == mid).map(item =>{
                setMunit(item.m_unit);
            });
        }
        fetchBranch();
    },[mid])

    useEffect(()=>{
        if(branch_id != 0){
            setCheckbtn(false);
        }else{
            setCheckbtn(true);
        }
    },[branch_id]);

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
            doCreaterStock();

        }
        setValidate(true);
    }

    const doCreaterStock = async ()=>{
        let json = await API_POST("stock/add",{
            m_id:mid,
            stock_amount: stock_amount,
            branch_id : branch_id
        })
        if(json.result){
            console.log("เพิ่มสำเร็จ");
            navigate('/owner/stock',{replace:true});
        }
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
                        <div className="row">
                                <div className="col-9">
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
                                            กรุณาเลือกรายการวัตถุดิบ
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-3">
                                    <Link to={`/owner/material/add`} className='btn btn-success mt-2 ms-1'>เพิ่มรายการวัตถุดิบ</Link>
                                </div>
                            </div>
                           
                            <div style={{height:"30px"}}></div>
                            <div className="row">
                                <div className="col-9">
                                    <Form.Group as={Col} controlId="validatestockamount">
                                        <Form.Label>กรอกจำนวน</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            value={stock_amount}
                                            placeholder="จำนวน"
                                            step="0.001"
                                            min ="1"
                                            onChange={(e) => setStockamount(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            กรุณากรอกจำนวน
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div className="col-3">
                                    <p className='col-lg-2 col-sm-2  px-1 pt-5 '>{munit}</p>
                                </div>
                            </div>
                                    
                            <div style={{height:"30px"}}></div>
                            <Form.Group as={Col} controlId="validatebranchid" className="col-9">
                                <Form.Label>สาขา</Form.Label>
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
                               
                                <div className="p-0">
                                     <Button className="btn btn-success mx-4 px-4" type="submit" as="input" value="บันทึก"  />
                                     <Button className="btn btn-danger px-4" onClick={close}>ยกเลิก</Button>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}