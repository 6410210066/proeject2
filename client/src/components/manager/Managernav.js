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
                            
                            <h2>{localStorage.getItem("username")}</h2>                                  
                            <Link className={props.page===1 && "active"} to="/home">Dashboard</Link> 
                            <Link className={props.page===2 && "active"} to="/manager/stock">จัดการสต๊อกสินค้า</Link>
                            <Link className={props.page===3 && "active"} to="/manager/employee">จัดการพนักงาน</Link>
                            <Link className={props.page===4 && "active"} to="/manager/stockrequest">ขอเพิ่มสต๊อกสินค้า</Link>
                            <Link className={props.page===5 && "active"} to="/manager/managetransfer">รายการย้ายสินค้า</Link>
                        <div className="logout">
                            <Link onClick={clear} to="/">ออกจากระบบ</Link>  
                        </div>                         
                </div>        

            </div>  
        </>
    )
}