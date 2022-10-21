import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Employee.css";
import logo from '../../image/logo.webp'
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
                <img src={logo} alt="" className='logo ms-5 my-3' />
                <h4 className='mx-3 mt-3 ' style={{width:"90%"}}>ผู้ใช้ : {localStorage.getItem("username")}</h4>                                   
                    <Link className={props.page===1 && "active"} to="/home"><i class="fa-sharp fa-solid fa-store mx-3"></i>ทำรายการขาย</Link> 
                    <Link className={props.page===2 && "active"} to="/employee/salehistory"><i class="fa-sharp fa-solid fa-clock-rotate-left mx-3"></i>ประวัติการขาย</Link>
                <div className="logout">
                    <Link onClick={clear} to="/"><i class=" logout fa-solid fa-arrow-right-from-bracket mx-3"></i>ออกจากระบบ</Link>  
                </div>                         
                </div>        

            </div>  
        </>
    )
}