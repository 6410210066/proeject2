import 'bootstrap/dist/css/bootstrap.min.css';
import "../admin/admin.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function Adminnav(props){
    const clear = ()=>{
        localStorage.clear();
    }
    let navigate = useNavigate();
    useEffect( ()=>{
        if(localStorage.getItem("access_token")==null){
            navigate("/", {replace:true});
        }
    },[]);
    return(
        <>
            <div className="container-fluid navadmin  " style={{padding:"0"}}>
                <div className="row a-style" style={{margin:"0"}}> 
                            <h2>{localStorage.getItem("username")}</h2>                                  
                            <Link className={props.page===1 && "active"} to="/home">จัดการบัญชีผู้ใช้</Link> 
                            <Link className={props.page===2 && "active"} to="/manager">จัดการบัญชีผู้จัดการ</Link>
                        <div className="logout">
                            <Link onClick={clear} to="/">ออกจากระบบ</Link>  
                        </div>                         
                </div>        

            </div>  
        </>
    )
}