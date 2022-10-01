import 'bootstrap/dist/css/bootstrap.min.css';
import "../owner/owner.css";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../../image/logo.webp'
export default function Ownernav(props){
    let navigate = useNavigate();
    useEffect( ()=>{
        if(localStorage.getItem("access_token")==null){
            console.log(localStorage.getItem("access_token"));
            navigate("/", {replace:true});
        }
    },[]);
    const clear = ()=>{
        localStorage.clear();
    }

    return(
        <>
            <div className="container-fluid  content  sidebar navadmin" style={{padding:"0"}}>
                <div className="row a-style" style={{margin:"0"}}>
                            <img src={logo} alt=""  className="logo" />
                            <h4 className='mx-3 mt-5 ' style={{width:"90%"}}>ผู้ใช้ : {localStorage.getItem("username")}</h4>                              
                            <Link className={props.page===1 && "active"} to="/home"><i class="fa-solid fa-house mx-3"></i>Dashboard</Link> 
                            <Link className={props.page===2 && "active"} to="/owner/stock"><i class="fa-solid fa-boxes-stacked mx-3"></i>จัดการสต๊อกสินค้า</Link>
                            <Link className={props.page===3 && "active"} to="/transfer"><i class="fa-solid fa-right-left mx-3"></i>ย้ายสต๊อกสินค้า</Link>
                            <Link className={props.page===4 && "active"} to="/owner/employee"><i class="fa-solid fa-person mx-3"></i>พนักงาน</Link>
                            <Link className={props.page===5 && "active"} to="/request"><i class="fa-solid fa-clipboard mx-3"></i>จัดการคำขอ</Link>
                            <Link className={props.page===6 && "active"} to="/owner/product"><i class="fa-solid fa-box-archive mx-3"></i>จัดการสินค้า</Link>
                            <Link className={props.page===7 && "active"} to="/owner/branch"><i class="fa-solid fa-code-branch mx-3"></i>จัดการสาขา</Link>
                        <div className="logout">
                            <Link onClick={clear} to="/"><i class="fa-solid fa-arrow-right-from-bracket me-3"></i>ออกจากระบบ</Link>  
                        </div>                         
                </div>        

            </div>  
        </>
    )
}