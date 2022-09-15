import { useEffect, useState } from "react";
import Ownernav from "./Ownernav";
import "./owner.css";
import { Table,Form, Col, Button } from "react-bootstrap";
import { API_GET , API_POST } from "../../api";
import EmployeeItem from "./EmployeeItem";
import { Link } from "react-router-dom";

export default function OwnerEmloyee(){
    let page=4;
        const [data,setData] = useState([]);
        const [employee,setemployee] = useState([]);
        const [firstname,setFirstname] = useState("");
        const [validated,setValidated] = useState(false);

    useEffect(()=>{
        fetchEmployee();
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

    const  fetchData = async()=>{
        let json =await API_GET("employee");
        console.log("if data" +json.data);
        setData(json.data);
        setemployee(json.data);
    }   

    const fetchSearch = async(searchdata)=>{
        setData(searchdata);
    }
    
    return(
        
        <>
            <div  className="container-fluid" >
                <div className="row">
                    <div className="col-lg-2 nav" style={{padding:"0"}}>
                         <Ownernav page={page} />
                    </div>
                    <div className="col-lg-10 content" style={{padding:"0"}}>
                        <h1 className="header">จัดการข้อมูลพนักงาน</h1>
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
                                <Link to={`/employee/add`} className="button btn-add">เพิ่ม</Link>
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
                                    <th>เงินเดือน</th>
                                    <th>เบอร์โทรศัพท์</th>
                                    <th>สาขา</th>
                                    <th>ลบ</th>
                                    <th>แก้ไข</th>
                                </tr>
                            </thead>
                        <tbody>
                        {
                        data.map(item => (
                            <EmployeeItem key={item.emp_id} data={item} ondelete={ondelete} />
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