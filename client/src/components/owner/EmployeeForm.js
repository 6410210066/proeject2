import { useEffect, useState } from 'react';
import { Form, Row, Col, Button} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { API_GET, API_POST } from '../../api';


export default function EmployeeForm(){

    let params = useParams();
    let navigate = useNavigate();

    const [user_id,setUser_id] = useState(0);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [emp_id,setEmp_id] = useState(0);
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [address,setAddress] = useState("");
    const [salary,setSalary] = useState(0.0);
    const [phone_number,setPhone_number] = useState("");
    const [branch_id,setBranch_id] = useState(0);
    const [branch,setBranch] = useState([]);
   
    const [validated,setValidate] = useState(false);

    useEffect(()=>{
        async function fetchData(emp_id){
            let json = await API_GET("employee/"+emp_id);
            var data = json.data[0];
            setEmp_id(data.emp_id);
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setAddress(data.address);
            setSalary(data.salary);
            setPhone_number(data.phone_number);
            setBranch_id(data.branch_id);
        } 
        if(params.emp_id !="add"){
            fetchData([params.emp_id]);
        }
    },[params.emp_id]);

    useEffect(async()=>{
        let json = await API_GET("branch");
        var data = json.data;
        setBranch(data);
    },[]);

    const onsave = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if(form.checkValidity()===false){
            event.stopPropagation();
        }else{
            if(params.emp_id === "add"){
                let user_id = await doCreateUser();
                doCreateEmployee(user_id);
            }else{
                doUpdateEmployee();
            }
        }
    }

    const doCreateEmployee = async(user_id) => {
        console.log(user_id);
        const json = await API_POST("employee/add",{
            firstname : firstname,
            lastname : lastname,
            address : address,
            salary : salary,
            phone_number : phone_number,
            branch_id : branch_id,
            user_id : user_id
        });
        if(json.result){
            console.log("เพิ่มข้อมูล employee สำเร็จ")
            navigate("/owner/employee",{replace:true});
        }
        
    }

    const doCreateUser = async() => {

        let role_id = 2;
        const json = await API_POST("users/add",{
            username : username,
            password : password,
            role_id : role_id
        });
        if(json.result){
            console.log("เพิ่มข้อมูล user สำเร็จ")
            setUser_id(json.data.insertId)
            console.log(json.data.insertId)
        }
        return json.data.insertId;
    }

    const doUpdateEmployee = async() => {
        
        const json = await API_POST("employee/update",{
            emp_id : emp_id,
            firstname : firstname,
            lastname : lastname,
            address : address,
            salary : salary,
            phone_number : phone_number,
            branch_id : branch_id
        });
        if(json.result){
            console.log("อัปเดทสำเร็จ");
            navigate("/owner/employee",{replace:true});
        }
    }
    return(
        <>
            <Form className='container' noValidate validated={validated} onSubmit={onsave}>
                <Form.Group controlId='validateFirstname'>
                    <Form.Label>ชื่อพนักงาน</Form.Label>
                    <Form.Control
                        type='text'
                        value={firstname}
                        placeholder="ชื่อพนักงาน"
                        required
                        onChange={(e)=>setFirstname(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                        กรุณากรอกชื่อพนักงาน

                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='validateLastname'>
                    <Form.Label>นามสกุล</Form.Label>
                    <Form.Control
                        type='text'
                        value={lastname}
                        placeholder="นามสกุล"
                        required 
                        onChange={(e)=>setLastname(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                        กรุณากรอกนามสกุล

                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='validateaddress'>
                    <Form.Label>ที่อยู่</Form.Label>
                    <Form.Control
                        type='text'
                        value={address}
                        placeholder="ที่อยู่"
                        required 
                        onChange={(e)=>setAddress(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                        กรุณากรอกที่อยู่

                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='validateaddress'>
                    <Form.Label>เงินเดือน</Form.Label>
                    <Form.Control
                        type='text'
                        value={salary}
                        placeholder="เงินเดือน"
                        required 
                        onChange={(e)=>setSalary(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                        กรุณากรอกเงินเดือน

                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='validateaddress'>
                    <Form.Label>เบอร์โทรศัพท์</Form.Label>
                    <Form.Control
                        type='text'
                        value={phone_number}
                        placeholder="เบอร์โทรศัพท์"
                        required 
                        onChange={(e)=>setPhone_number(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                        กรุณากรอกเบอร์โทรศัพท์

                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>สาขา</Form.Label>
                    <Form.Select
                        value={branch_id}
                        onChange={(e) => setBranch_id(e.target.value)}
                        required>
                        <option label="กรุณาเลือกสาขา"></option>
                        {
                            branch.map(item => (
                                <option key={item.branch_id} value={item.branch_id}>
                                {item.branch_name} </option>
                            ))
                        }
                    
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" >
                        กรุณาเลือก สาขา
                    </Form.Control.Feedback>
                </Form.Group>

                {params.emp_id == "add" &&
                    <>
                    <Form.Group as={Col} controlId="validateUserName">
                    <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={username}
                        placeholder="ชื่อผู้ใช้งาน"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        กรุณากรอก ชื่อผู้ใช้งาน
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="validatePassword">
                    <Form.Label>รหัสผ่าน</Form.Label>
                    <Form.Control
                        // required
                        type="text"
                        value={password}
                        placeholder="รหัสผ่าน"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        กรุณากรอกรหัสผ่าน
                    </Form.Control.Feedback>
                </Form.Group>
                    </>
                }
                <Button variant="success" as="input" type="submit" value="บันทึก" className='mt-3'/>
            </Form>
        </>
    )
}