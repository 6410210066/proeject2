import Ownernav from "./Ownernav";
import { useEffect, useState } from "react";
import "./owner.css";
import { Table, Form, Col, Button} from "react-bootstrap";
import { API_GET , API_POST } from "../../api";
import BranchItem from "./BranchItem";
import { Link } from "react-router-dom";
import Fuse from 'fuse.js'

export default function Ownerbranch(){
    let page=7;
        const [data,setData] = useState([]);
        const [branch,setBranch] = useState([]);
        const [branch_name,setBranch_name] = useState("");
        const [validated,setValidate] = useState(false);

        useEffect(()=>{
            async function fetchData(){
                let json = await API_GET("branch");
                setData(json.data);
                setBranch(json.data);
                
            }
            fetchData();
        },[])
    
        useEffect( ()=>{
            if(branch_name!=""){
                
            }else{
                setData(branch);
            }
        },[branch_name]);
    
    
        const ondelete = async(data) =>{
            let json = await API_POST("branch/delete",{
                branch_id : data.branch_id
            });
            if(json.result){
                fetchData();
            }
        }
        
        const onSearch = async(event)=>{

            const form = event.currentTarget;
            event.preventDefault(); //ไม่ให้รีเฟรชหน้า
    
            if (form.checkValidity() === false) {
                event.stopPropagation();
            } else {
                const fuse = new Fuse(branch, {
                    keys: ['branch_id', 'branch_name']
                });
                let searchdata =  fuse.search(branch_name);
                let data1 =[]
                searchdata.map(item =>{
                    data1.push(item.item);
                });
                setData(data1);
            }
            
        }
    
        const  fetchData = async()=>{
            let json =await API_GET("branch");
            console.log("if data" +json.data);
            setData(json.data);
            setBranch(json.data);
        }   
    
        const fetchSearch = async(searchdata)=>{
            setData(searchdata);
        }
        
    return (
        <>
             <div  className="container-fluid" >
                <div className="row">
                    <div className="col-lg-2 nav" style={{padding:"0"}}>
                         <Ownernav page={page} />
                    </div>
                    <div className="col-lg-10 content" style={{padding:"0"}}>
                        <h1 className="header">จัดการข้อมูลสาขา</h1>
                        <Form noValidate validated={validated}  onClick={onSearch}>
                        <div className="row ms-5 mb-3 grid">
                            <div className="col-lg-8 mt-2 ">
                                <Form.Group as={Col} controlId="validatebranch_name" >
                                    <Form.Control
                                        required
                                        type="text"
                                        value={branch_name}
                                        placeholder="ค้นหาชื่อสาขา"
                                        onChange={(e) => setBranch_name(e.target.value)}  
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        กรุณากรอก ชื่อสาขา
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-lg-2 me-4 ms-3"> 
                                <button className="button btn-search" as="input" type="submit" ><i class="fa-solid fa-magnifying-glass me-2"></i>ค้นหา</button>
                            </div>
                            <div className="col-lg-1">                             
                                <Link to={`/branch/add`} className="button btn-add setbtn">เพิ่ม</Link>
                            </div>
                            {/* <div className="col-1"></div> */}
                        </div>
                    </Form>
                        <Table striped className="mx-5 grid">
                            <thead>
                                <tr>
                                    <th>รหัสสาขา</th>
                                    <th>ชื่อสาขา</th>
                                    <th>ที่อยู่</th>
                                    <th>ผู้จัดการ</th>
                                    <th>แก้ไข</th>
                                    <th>ลบ</th>
                                </tr>
                            </thead>
                        <tbody>
                        {
                             data.map(item => (
                            <BranchItem key={item.branch_id} data={item} ondelete={ondelete} />
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