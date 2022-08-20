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
            setData(json.data);
        }
        fetchData();
    },[]);

    useEffect( ()=>{
        if(username!=""){
            
        }else{
            setData(users);
        }
    },[username]);


    const ondelete = async(data) =>{
        let json = await API_POST("users/delete",{
            user_id : data.user_id
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
            if(username !=""){
                let searchdata = [];
                users.filter(users =>users.username.includes(username)).map(item => {
                    searchdata.push(item);
                    console.log()
                }) 
                fetchSearch(searchdata);
            }else{
                setData(users);
            }
        }
    }

    const  fetchData = async()=>{
            let json =await API_GET("users");
            console.log("if data" +json.data);
            setUsers(json.data);
            setData(json.data);
    }

    const fetchSearch = async(searchdata)=>{
        setData(searchdata);
    }
    return(
        <>
            <h1 className="header">จัดการบัญชีผู้ใช้</h1><br/>
                    <Form noValidate validated={validated}  onClick={onSearch}>
                        <div className="row ms-5 mb-3">
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
                            <div className="col-1 me-4 ms-3"> 
                                <Button className="button btn-edit" as="input" type="submit" value="ค้นหา"/>
                            </div>
                            <div className="col-1">                             
                                <Link to={`/users/add`} className="button btn-add">เพิ่ม</Link>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </Form>

            <Table striped className="mx-5">
                <Userheader />
                <tbody>
                    {
                        data.map(item => (
                            <Useritem key={item.user_id} data={item} ondelete={ondelete} num={num}/>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}