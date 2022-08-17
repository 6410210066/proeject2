import { useEffect, useState, } from "react"
import { API_GET, API_POST } from "../../api";
import Useritem from "./Useritem";
import Userheader from "./Userheader";
import {  Table,Form,Col,Row,Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function Users(){
    const [data,setData] =useState([]);
    const [users,setUsers] = useState([]);
    const [username,setUsername] =useState("");
    const [validated,setValidated] =useState(false);
    let num=1;

    useEffect( ()=>{
        async  function fetchData(){
            const response=await fetch(
                "http://localhost:8080/api/users",
                {
                    method: "GET",
                    headers:{
                        Accept:"application/json",
                        'Content-Type': 'application/json',
                    }
                }
            );

            let json = await response.json();
            setUsers(json.data);
            
        }
        fetchData();
    },[]);

    useEffect( ()=>{
       onSearch();
       fetchData();
    },[username,setData]);


    const ondelete = async(data) =>{
        let json = await API_POST("users/delete",{
            user_id : data.user_id
        });
        if(json.result){
            fetchData();
        }
    }

    // const onFind =async(event)=>{

    //     const form = event.currentTarget;
    //     event.preventDefault();

    //     if(form.checkValidity()=== false){
    //         event.stopPropagation();
    //     }else{
    //         onSearch();
    //         fetchData();
    //         setUsername("");
    //     }

    // }

    const onSearch = async()=>{
        console.log("onsearch user:"+username);
        const response = await fetch(
            "http://localhost:8080/api/users/search",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization : "Bearer "+localStorage.getItem("access_token")
                },
                body:JSON.stringify({
                    username:username
                })
            }
        )
        let json = await response.json();

        if(json.result){
            console.log("พบข้อมูล");
            console.log(json.data)
            setData(json.data);
        //  window.location="/home";
        }
    }

    const  fetchData = async()=>{
        
        if(username===""){
            let json =await API_GET("users");
            console.log("if data" +json.data);
            setUsers(json.data);
        }else{
            let json = await data; 
            console.log("else data" +json);
            setUsers(json);

        }

    }
    return(
        <>
            <h1 className="header">จัดการบัญชีผู้ใช้</h1><br/>
                    <Form noValidate validated={validated}  >
                        <div className="row ms-5">
                            <div className="col-9 mt-2 ">
                                <Form.Group as={Col} controlId="validateUserName" >
                                    <Form.Control
                                        required
                                        type="text"
                                        value={username}
                                        placeholder="ค้นหาชื่อผู้ใช้"
                                        onChange={(e) => setUsername(e.target.value)}  
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        กรุณากรอก ชื่อผู้ใช้งาน
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className="col-1 me-5 ms-4"> 
                                <Button className="button btn-edit" as="input" type="submit" value="ค้นหา"/>
                            </div>
                            <div className="col-1">                             
                                <Link to={`/users/add`} className="button btn-edit">เพิ่ม</Link>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </Form>

            <Table striped className="mx-5">
                <Userheader />
                <tbody>
                    {
                        users.map(item => (
                            <Useritem key={item.user_id} data={item} ondelete={ondelete} num={num}/>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}