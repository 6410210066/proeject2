import { useEffect, useState } from "react";
import { Button,Form,Row,Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_GET,API_POST } from "../../api";

export default function ManagerUser(){

    let params = useParams();
    // let password;

    const [roles,setRoles] =useState([]);
    const [validated,setValidated] =useState(false);
    const [username,setUsername] =useState("");
    const [role_id,setRoleId] = useState(0);
    const [role,setRole] = useState([]);
    const [password,setPassword] =useState("");
    const [user_id,setUserId]  = useState(0);
    const [newpassword,setNewPassword] = useState("");
    let checkpassword = false;

    useEffect(()=>{
        async function fetchData(user_id){
            let json = await API_GET("users/"+user_id);
            var data = json.data[0];

            setUserId(data.user_id);
            setUsername(data.username);
            setPassword(data.password);
            setRoleId(data.role_id);
            
        }

        
        if(params.user_id != "add"){
            fetchData([params.user_id]);
        }

    },[params.user_id]);
       
    useEffect(async()=>{
        let json = await API_GET("roles");
        var data = json.data;
        setRoles(data);
    },[]);


    useEffect(()=>{
        setPassword(newpassword);
    },[newpassword]);

    const onsave = async(event) =>{
        const form = event.currentTarget;
        event.preventDefault();

        if(form.checkValidity()=== false){
            event.stopPropagation();
        }else{
            if(params.user_id=== "add"){
                setPassword(newpassword);
                doCreateUser();
            }else{
                if(newpassword===""){
                    checkpassword=false;
                    doUpdateUser();
                }else{
                    checkpassword=true;
                    setPassword(newpassword);
                    doUpdateUser();
                }
               
            }
        }

        
    }

    const doCreateUser = async(res) =>{
        const response = await fetch(
            "http://localhost:8080/api/users/add",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization : "Bearer "+localStorage.getItem("access_token")
                },
                body:JSON.stringify({
                    username:username,                                                                      
                    password:password,
                    role_id:role_id
                })
            }
        )
        let json = await response.json();

        if(json.result){
            console.log("เพิ่มสำเร็จ");
            window.location="/home";
        }
    }

    const doUpdateUser = async(res) =>{
        const response = await fetch(
            "http://localhost:8080/api/users/update",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization : "Bearer "+localStorage.getItem("access_token")
                },
                body:JSON.stringify({
                    user_id: user_id,
                    username:username,
                    password:password,
                    role_id:role_id,
                    checkpassword:checkpassword
                })
            }
        )
        let json = await response.json();

        if(json.result){
            console.log("อัปเดตสำเร็จ");
            window.location="/home";
        }
    }


  

    return(
        <>
            <div className="container">
            <Form noValidate validated={validated} onSubmit={onsave} >
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
                        value={newpassword}
                        placeholder="รหัสผ่าน"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        กรุณากรอก รหัสผ่าน
                    </Form.Control.Feedback>
                </Form.Group>
 
                  
                        <Form.Group as={Col} >
                            <Form.Label>ประเภทผู้ใช้งาน</Form.Label>
                            <Form.Select
                                value={role_id}
                                onChange={(e) => setRoleId(e.target.value)}
                                required>
                                <option label="กรุณาเลือกประเภทผู้ใช้งาน"></option> 
                                {
                                   roles.map(item => (
                                    <option key={item.role_id} value={item.role_id}> 
                                    {item.role_name} </option>
                                ))
                                }
                            </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    กรุณาเลือก ประเภทผู้ใช้งาน
                                </Form.Control.Feedback>
                        </Form.Group>

                    <Row className="mb-3">
                        <Button variant="primary" as="input" type="submit" value="SAVE"/>
                    </Row>
            </Form>
            </div>
        </>
    )
}