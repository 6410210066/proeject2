import Ownernav from "./Ownernav";
import { Table } from "react-bootstrap";
import '../owner/owner.css'
import { useState,useEffect  } from "react";
import { API_GET,API_POST } from "../../api";
import Stockitem from "./Stockitem";
import {Form,Row,Col,Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { DeleteModal, EditStockModal } from "../../modals";
import Fuse from 'fuse.js'

export default function OwnerStock(){

    let page=2;
    
    const [data,setData] =useState([]);
    const [stock,setStock] =useState([]);
    const [stockname,setStockname] =useState("");
    const [validated,setValidated] = useState(false);
    const [material,setMaterial] =useState([]);
    const [branch,setBranch] =useState([]);
    const [branch_id,setBranchid] =useState(0);
    const [materialid,setMaterialid] =useState(0);
    const [show,setShow]=useState(false);
    const [showedit,setShowedit] =useState(false);
    const [title,setTitle]=useState("");
    const [message,setMessage]= useState("");
    const [stockid,setStockid]=useState(0);
    const [stock_amount,setStockamount] =useState(0);
    const [modalEditinfo,setModalEditinfo]= useState([]);


    useEffect(()=>{
        fetchBranch();
        fetchStock();
        fetchMaterial();
    },[])

    useEffect(()=>{
        
        checkbranch();
    },[branch_id])

    useEffect(()=>{
        if(stockname== ""){
            setData(stock);
        }
    },[stockname]);

    useEffect(()=>{
        checkmaterail();
    },[materialid])

    const ondelete = async (data)=>{
        setShow(true);
        setTitle("ยืนยันการลบข้อมูล");
        setMessage("คุณต้องการลบข้อมูลสต๊อกสินค้าหรือไม่");
        setStockid(data.stock_id);
    }

    const onConfirm = async()=>{
        let json = await API_POST("stock/delete",{
            stock_id : stockid
        });
        if(json.result){
            setShow(false);
            fetchStock();
        }
    }
    const onConfirmedit = async()=>{
        let json = await API_POST("stock/update",{
            stock_amount : stock_amount,
            stock_id: stockid
        });
        if(json.result){
            setShow(false);
            fetchStock();
        }
        setShowedit(false);
    }
    const onCancel= async()=>{
        setShow(false);
        setShowedit(false);
       
    }

    const onEdit = async(data)=>{
        setShowedit(true);
        setTitle("แก้ไขจำนวนสต๊อกสินค้า");
        setStockid(data.stock_id);
        setStockamount(data.stock_amount);
    }
    const onSearch = async(event)=>{
        console.log(event.currentTarget);
        const form = event.currentTarget;
        event.preventDefault(); //ไม่ให้รีเฟรชหน้า

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const fuse = new Fuse(stock, {
                keys: ['stock_id', 'm_name']
            });
            let searchdata =  fuse.search(stockname);
            let data1 =[]
            searchdata.map(item =>{
                data1.push(item.item);
            });
            setData(data1);
        }
        

    }

    const fetchBranch= async()=>{
        let json = await API_GET("branch");
        setBranch(json.data);
    }

    const fetchMaterial = async()=>{
        let json = await API_GET("material");
        setMaterial(json.data);
    }
    const fetchStock = async()=>{
        let json = await API_GET("stock");
        setData(json.data);
        setStock(json.data);
    }

    const checkbranch = async()=>{
        let newstock=[];
        if(branch_id == 0){
            newstock.push(...stock);
        }else(          
            stock.filter(stock => stock.branch_id == branch_id).map(item =>{
                newstock.push(item)
            })
        )
      
        setData(newstock);
        
    }

    const checkmaterail = async()=>{
        let newstock= [];
        console.log(materialid);
        console.log(stock);
        if(materialid == 0){
            newstock.push(...stock);
        }else(          
            stock.filter(stock => stock.m_id == materialid).map(item =>{
                newstock.push(item);
            })
        )
        setData(newstock);
    }


    
    return(
        <>
            <div  className="container-fluid " >
                <div className="row ">
                    <div className="col-lg-2 navadmin" style={{padding:"0"}}>
                         <Ownernav page={page} />
                    </div>
                        <div className="col-lg-10 content overfloww" style={{padding:"0"}}>
                            <h1 className="header">จัดการสต๊อกสินค้า</h1>
                            <div className="tablecontent">    
                                {/* ส่วนค้นหาและเพิ่ม */}
                                <Form noValidate validated={validated}  onClick={onSearch}>
                                    <div className="row ms-5 mb-3">
                                        <div className="col-lg-7 col-md-7 col-sm-6 mt-1 ">
                                            <Form.Group as={Col} controlId="validatesearch" >
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    value={stockname}
                                                    placeholder="ค้นหารายการสต๊อก"
                                                    onChange={(e) => setStockname(e.target.value)}  
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    กรุณากรอกรายการสต๊อก
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className="col-2 me-4 ms-3"> 
                                            <button className="button btn-search" as="input" type="submit" ><i class="fa-solid fa-magnifying-glass me-2"></i>ค้นหา</button>
                                        </div>
                                        <div className="col-2 ">                             
                                            <Link to={`/owner/stock/add`} className="button btn-add setbtn">เพิ่ม</Link>
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
                                                <Form.Select 
                                                size="sm"
                                                value={branch_id}
                                                onChange={(e) => setBranchid(e.target.value)}
                                                >
                                                <option value={0}>เลือกสาขา</option>
                                                {
                                                branch != null &&
                                                branch.map(item => (
                                                    <option key={item.branch_id} value={item.branch_id}> 
                                                    {item.branch_name}</option>
                                                ))
                                                }
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
                                                <Form.Select 
                                                size="sm"
                                                value={materialid}
                                                onChange={(e) => setMaterialid(e.target.value)}>
                                                    <option value={0} >เลือกประเภท</option>
                                                {
                                                    material.map(item =>(
                                                        <option key={item.m_id} value={item.m_id}>{item.m_name}</option>
                                                    ))
                                                }
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </Form>

                                {/* ส่วนตาราง */}
                                <Table striped className="mx-5 grid mb-4">
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
                                        data != null &&
                                        data.map( item => (
                                                <Stockitem key={item.stock_id} data={item} onEdit={onEdit} ondelete={ondelete}/>
                                        ))
                                        }
                                    </tbody>
                                </Table>
                            </div> 
                            <DeleteModal
                            show={show}
                            title={title}
                            message={message}
                            onConfirm={onConfirm}
                            onCancel={onCancel}
                            />

                            <EditStockModal 
                            show ={showedit}
                            title={title}
                            onConfirm={onConfirmedit}
                            onCancel={onCancel}
                            stockamount={stock_amount}
                            setStockamount={setStockamount}
                            />

                        </div>

                </div>
            </div>
        </>
    )
}