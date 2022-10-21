import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./manager.css";
import logo from '../../image/logo.webp'
export default function Managernav(props){
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
                    <Link className={props.page===1 && "active"} to="/home"><i class="fa-solid fa-house mx-3"></i>Dashboard</Link> 
                    <Link className={props.page===2 && "active"} to="/manager/stock"><i class="fa-solid fa-boxes-stacked mx-3"></i>จัดการสต๊อกสินค้า</Link>
                    <Link className={props.page===3 && "active"} to="/manager/employee"><i class="fa-solid fa-person mx-3"></i>จัดการพนักงาน</Link>
                    <Link className={props.page===4 && "active"} to="/manager/stockrequest"><i class="fa-sharp fa-solid fa-square-arrow-up-right mx-3"></i>ขอเพิ่มสต๊อกสินค้า</Link>
                    <Link className={props.page===5 && "active"} to="/manager/managetransfer"><i class="fa-solid fa-spinner mx-3"></i>รายการย้ายสินค้า</Link>
                <div className="logout">
                    <Link onClick={clear} to="/"><i class=" logout fa-solid fa-arrow-right-from-bracket mx-3"></i>ออกจากระบบ</Link>  
                </div>                         
                </div>        

            </div>  
        </>
    )
}