import Ownernav from "./Ownernav";
import { useEffect, useState } from "react";
import "./owner.css";
import { Table, Form, Col, Button} from "react-bootstrap";
import { API_GET , API_POST } from "../../api";
import BranchItem from "./BranchItem";
import { Link } from "react-router-dom";


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
                console.log(data.lastname)
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
            event.preventDefault();
    
            if (form.checkValidity() === false) {
                event.stopPropagation();
            } else {
                if(branch_name !=""){
                    let searchdata = [];
                    branch.filter(branch =>branch.branch_name.includes(branch_name)).map(item => {
                        searchdata.push(item);
                        console.log()
                    }) 
                    fetchSearch(searchdata);
                }else{
                    setData(branch);
                }
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
                            <div className="col-9 mt-2 ">
                                <Form.Group as={Col} controlId="validatebranch_name" >
                                    <Form.Control
                                        required
                                        type="text"
                                        value={branch_name}
                                        placeholder="ค้นหาชื่อพนักงาน"
                                        onChange={(e) => setBranch_name(e.target.value)}  
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        กรุณากรอก ชื่อสาขา
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-1 me-4 ms-3"> 
                                <Button className="button btn-edit" as="input" type="submit" value="ค้นหา"/>
                            </div>
                            <div className="col-1">                             
                                <Link to={`/branch/add`} className="button btn-add">เพิ่ม</Link>
                            </div>
                            <div className="col-1"></div>
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