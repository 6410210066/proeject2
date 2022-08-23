import Ownernav from "./Ownernav";
import { Table } from "react-bootstrap";
import '../owner/owner.css'
import { useState,useEffect  } from "react";
import { API_GET,API_POST } from "../../api";
import Stockitem from "./Stockitem";

export default function OwnerStock(){

    let page=2;
    const [data,setData] =useState([]);
    const [stock,setStock] =useState([]);

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
    return(
        <>
            <div  className="container-fluid " >
                <div className="row ">
                    <div className="col-lg-2 nav" style={{padding:"0"}}>
                         <Ownernav page={page} />
                    </div>
                        <div className="col-lg-10 content" style={{padding:"0"}}>
                            <h1 className="header">จัดการสต๊อกสินค้า</h1>
                        {/*                         
                            <Form noValidate validated={validated}  onClick={onSearch}>
                            <div className="row ms-5 mb-3">
                                <div className="col-9 mt-2 ">
                                    <Form.Group as={Col} controlId="validateUserName" >
                                        <Form.Control
                                            required
                                            type="text"
                                            value={product_name}
                                            placeholder="ค้นหาชื่อผู้ใช้"
                                            onChange={(e) => setProductname(e.target.value)}  
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
                                    <Link to={`/product/add`} className="button btn-edit">เพิ่ม</Link>
                                </div>
                                <div className="col-1"></div>
                            </div>
                        </Form> */}
                            
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
        </>
    )
}