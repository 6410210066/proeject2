import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Employee.css";

export default function Employeenav(props){

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
         <div className="navadmin" style={{padding:"0"}}>
                <div className=" a-style" style={{margin:"0"}}> 
                            <h2>{localStorage.getItem("username")}</h2>                                  
                            <Link className={props.page===1 && "active"} to="/home">ทำรายการขาย</Link> 
                            <Link className={props.page===2 && "active"} to="/employee/salehistory">ประวัติการขาย</Link>
                        <div className="logout">
                            <Link onClick={clear} to="/">ออกจากระบบ</Link>  
                        </div>                         
                </div>        

            </div>  
        </>
    )
}