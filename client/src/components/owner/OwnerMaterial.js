
import Ownernav from "./Ownernav";
import { Pagination, Table } from "react-bootstrap";
import '../owner/owner.css'
import { useState,useEffect  } from "react";
import { API_GET,API_POST } from "../../api";
import Stockitem from "./Stockitem";
import {Form,Row,Col,Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import Materialitem from "./Materialitem";
import Fuse from 'fuse.js'

export default function OwnerMaterial(){

    let page=2;
    const [validated,setValidated] = useState(false);
    const [material,setMaterial] =useState([]);
    const [data,setData]= useState([]);
    const [materialname,setMaterialname] =useState("");
    const [mid,setMid] =useState(0);

    useEffect(()=>{
        fetchMaterial();
    },[]);


    const fetchMaterial = async()=>{
        let json = await API_GET("material");
            if(json.result){
                setMaterial(json.data);
                setData(json.data);
            }

    }


    const onSearch = async(event)=>{
        const form = event.currentTarget;
        event.preventDefault(); //ไม่ให้รีเฟรชหน้า
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const fuse = new Fuse(material, {
                keys: ['m_id', 'm_name']
            });
            let searchdata =  fuse.search(materialname);
            console.log(searchdata);
            let data1 =[]
            searchdata.map(item =>{
                data1.push(item.item);
            });
            setData(data1);
        }
        

    }

    const ondelete = async(data)=>{
        console.log(data);
        let json = await API_POST("material/delete",{
            m_id : data.m_id
        });
        if(json.result){
            fetchMaterial();
        }
    }

    const onEdit =()=>{

    }





    return(
        <>
                        <div  className="container-fluid " >
                <div className="row ">
                    <div className="col-lg-2 navadmin" style={{padding:"0"}}>
                         <Ownernav page={page} />
                    </div>
                        <div className="col-lg-10 content overfloww" style={{padding:"0"}}>
                            <h1 className="header">จัดการวัตถุดิบ</h1>
                            <div className="tablecontent">    
                                {/* ส่วนค้นหาและเพิ่ม */}
                                <Form noValidate validated={validated}  onClick={onSearch}>
                                    <div className="row ms-5 mb-3">
                                        <div className="col-lg-7 col-md-7 col-sm-6 mt-4 ">
                                            <Form.Group as={Col} controlId="validatesearch" >
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    value={materialname}
                                                    placeholder="ค้นหารายการสต๊อก"
                                                    onChange={(e) => setMaterialname(e.target.value)}  
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    กรุณากรอกรายการสต๊อก
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className="col-2 me-4 ms-3 mt-4"> 
                                            <button className="button btn-search" as="input" type="submit" ><i class="fa-solid fa-magnifying-glass me-2"></i>ค้นหา</button>
                                        </div>
                                        <div className="col-2 ">                             
                                               <Link to={`/owner/material/add`} className='button btn-add mt-2 ms-1'>เพิ่มรายการวัตถุดิบ</Link>
                                        </div>
                                        <div className="col-1"></div>
                                    </div>
                                </Form>

                                {/* ส่วนตาราง */}
                                <Table striped className="mx-5 grid mb-4 mt-5">
                                    <thead>
                                        <tr>
                                            <th>รหัส     </th>
                                            <th>ชื่อวัตถุดิบ        </th>
                                            <th>หน่วย     </th>
                                            <th>ประเภท  </th>
                                            <th>คงเหลือขั้นต่ำ     </th>
                                            <th>แก้ไข       </th>
                                            <th>ลบ         </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {console.log(data)}
                                        {
                                        data != null &&
                                        data.map( item => (
                                            <Materialitem key={item.m_id} data={item} onEdit={onEdit} ondelete={ondelete} />
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