import 'bootstrap/dist/css/bootstrap.min.css';
import "../admin/admin.css"
import { Link } from 'react-router-dom';
export default function Adminnav(props){
    const clear = ()=>{
        localStorage.clear();
    }
    return(
        <>
            <div className="container-fluid  content  sidebar navadmin" style={{padding:"0"}}>
                <div className="row a-style" style={{margin:"0"}}>                              
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