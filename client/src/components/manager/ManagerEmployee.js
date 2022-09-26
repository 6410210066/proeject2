import Managernav from "./Managernav";
import "./manager.css";
import { useEffect, useState } from "react";
import { Table,Form, Col, Button } from "react-bootstrap";
import { API_POST,API_GET } from "../../api";
import ManagerEmployeeItem from "./ManagerEmployeeItem";
import { Link } from "react-router-dom";

export default function ManagerEmployee(){
    let page=3;
        const [data,setData] = useState([]);
        const [employee,setemployee] = useState([]);
        const [branch_id,setBranchid] = useState(0);
        const [firstname,setFirstname] = useState("");
        const [validated,setValidated] = useState(false);
        
    useEffect(()=>{
        let user_id = localStorage.getItem("user_id");
        fetchEmployee();
        getBranchId(user_id);
    },[])

    useEffect( ()=>{
        if(firstname!=""){
            
        }else{
            setData(employee);
        }
    },[firstname]);

    const fetchEmployee = async()=>{
        let json = await API_GET("employee");
        setData(json.data);
        setemployee(json.data);
    }

    
    const fetchData = async(id)=>{
       console.log(id);
        let json = await API_POST("manager/employee",{
            branch_id : id
        });
        console.log(json.data);
        setData(json.data);
        setemployee(json.data);
    }   

    const getBranchId = async(user_id) => {
        let json = await API_POST("getbranchId",{
            user_id : user_id
        });
        setBranchid(json.data[0].branch_id);
        fetchData(json.data[0].branch_id);
        console.log(json.data[0].branch_id);
        return json.data[0].branch_id;
    }

    const ondelete = async(data) =>{
        let json = await API_POST("employee/delete",{
            emp_id : data.emp_id
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
            if(firstname !=""){
                let searchdata = [];
                employee.filter(employee =>employee.firstname.includes(firstname)).map(item => {
                    searchdata.push(item);
                    console.log()
                }) 
                fetchSearch(searchdata);
            }else{
                setData(employee);
            }
        }
    }

    const fetchSearch = async(searchdata)=>{
        setData(searchdata);
    }

    return(
        <>
                <div  className="container-fluid ">
                    <div className="row">
                        <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                            <Managernav page={page}/>
                        </div>
                        <div className="col-lg-10 col-sm-12 content " style={{padding:"0"}}>
                            <div className='user-grid'>
                            <h1 className="header">จัดการพนักงาน</h1>
                                <Form noValidate validated={validated}  onClick={onSearch}>
                                <div className="row ms-5 mb-3 grid">
                                    <div className="col-lg-8 col-md-7 col-sm-6 mt-1">
                                        <Form.Group as={Col} controlId="validateUserName" >
                                            <Form.Control
                                                required
                                                type="text"
                                                value={firstname}
                                                placeholder="ค้นหาชื่อพนักงาน"
                                                onChange={(e) => setFirstname(e.target.value)}  
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                กรุณากรอก ชื่อพนักงาน
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-lg-1 col-sm-2 me-4 ms-3 "> 
                                        <Button className="button btn-edit" as="input" type="submit" value="ค้นหา"/>
                                    </div>
                                    <div className="col-lg-2 col-sm-2 me-3">                             
                                        <Link to={`/manager/employee/add`} className="button btn-add">เพิ่ม</Link>
                                    </div>
                                    <div className="col-lg-0 col-md-1"></div>
                                </div>
                            </Form>
                            <Table striped className="mx-5 grid">
                                <thead>
                                    <tr>
                                        <th>รหัสพนักงาน</th>
                                        <th>ชื่อ-สกุล</th>
                                        <th>ที่อยู่</th>
                                        <th>เบอร์โทรศัพท์</th>
                                        <th>สาขา</th>
                                        <th>ลบ</th>
                                        <th>แก้ไข</th>
                                    </tr>
                                </thead>
                            <tbody>
                            {
                            data.filter(data=>data.branch_id == branch_id).map(item => (
                                <ManagerEmployeeItem key={item.emp_id} data={item} ondelete={ondelete} />
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