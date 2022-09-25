import Ownernav from "./Ownernav";
import { Table } from "react-bootstrap";
import '../owner/owner.css'
import { useState,useEffect  } from "react";
import { API_GET,API_POST } from "../../api";
import Stockitem from "./Stockitem";
import {Form,Row,Col,Button} from 'react-bootstrap';
import { Link } from "react-router-dom";


export default function OwnerStock(){

    let page=2;
    const [data,setData] =useState([]);
    const [stock,setStock] =useState([]);
    const [stockname,setStockname] =useState("");
    const [validated,setValidated] = useState(false);

    useEffect(()=>{
        async function fetchData(){
            let json = await API_GET("stock");
            setData(json.data);
            setStock(json.data);
        }
        fetchData();
    },[])

    const ondelete = async (data)=>{

    }

    const onSearch = async()=>{

    }
    return(
        <>
            <div  className="container-fluid " >
                <div className="row ">
                    <div className="col-lg-2 nav" style={{padding:"0"}}>
                         <Ownernav page={page} />
                    </div>
                        <div className="col-lg-10 content " style={{padding:"0"}}>
                            <h1 className="header">จัดการสต๊อกสินค้า</h1>
                            <div className="tablecontent">    
                                {/* ส่วนค้นหาและเพิ่ม */}
                                <Form noValidate validated={validated}  onClick={onSearch}>
                                    <div className="row ms-5 mb-3">
                                        <div className="col-lg-8 col-md-7 col-sm-6 mt-1 ">
                                            <Form.Group as={Col} controlId="validatesearch" >
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    value={stockname}
                                                    placeholder="ค้นหาชื่อผู้ใช้"
                                                    onChange={(e) => setStockname(e.target.value)}  
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    กรุณากรอกชื่อสินค้า
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className="col-1 me-4 ms-3"> 
                                            <Button className="button btn-edit" as="input" type="submit" value="ค้นหา"/>
                                        </div>
                                        <div className="col-1">                             
                                            <Link to={`/product/add`} className="button btn-add">เพิ่ม</Link>
                                        </div>
                                        <div className="col-1"></div>
                                    </div>
                                </Form>
                                
                                {/* ส่วน filter ข้อมูล */}
                                <Form>
                                    <div className='row ms-5 mb-3'>
                                        <div className="col-lg-1 col-sm-2 pt-1">
                                            <Form.Label>
                                                สาขา
                                            </Form.Label>
                                        </div>
                                        <div className="col-lg-3 col-sm-10 ">
                                            <Form.Group controlId="validataSelectBranch" >
                                                <Form.Select size="sm">
                                                    <option value={0} >------ เลือกสาขา -------</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                        <div className="col-lg-1 col-sm-2 pt-1">
                                            <Form.Label>
                                                ประเภท
                                            </Form.Label>
                                        </div>
                                        <div className="col-lg-3 col-sm-10 ">
                                        <Form.Group controlId="validataSelectBranch" >
                                                <Form.Select size="sm">
                                                    <option value={0} >------ เลือกประเภท ------</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </Form>

                                {/* ส่วนตาราง */}
                                <Table striped className="mx-5 grid">
                                    <thead>
                                        <tr>
                                            <th>รหัสสต๊อก     </th>
                                            <th>รายการ        </th>
                                            <th>จำนวน     </th>
                                            <th>หน่วย   </th>
                                            <th>สาขา     </th>
                                            <th>แก้ไข       </th>
                                            <th>ลบ         </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        data.map( item => (
                                                <Stockitem key={item.stock_id} data={item} ondelete={ondelete} />
                                        ))
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            
                        </div>

                </div>
            </div>
        </>
    )
}