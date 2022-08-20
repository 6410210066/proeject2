import 'bootstrap/dist/css/bootstrap.min.css';
import "../owner/owner.css";
import { Link } from 'react-router-dom';

export default function Ownernav(props){
    const clear = ()=>{
        localStorage.clear();
    }
    return(
        <>
            <div className="container-fluid  content  sidebar navadmin" style={{padding:"0"}}>
                <div className="row a-style" style={{margin:"0"}}>                              
                            <Link className={props.page===1 && "active"} to="/home">Dashboard</Link> 
                            <Link className={props.page===2 && "active"} to="/owner/stock">จัดการสต๊อกสินค้า</Link>
                            <Link className={props.page===3 && "active"} to="/transfer">ย้ายสต๊อกสินค้า</Link>
                            <Link className={props.page===4 && "active"} to="/owner/employee">พนักงาน</Link>
                            <Link className={props.page===5 && "active"} to="/request">จัดการคำขอ</Link>
                            <Link className={props.page===6 && "active"} to="/owner/product">จัดการสินค้า</Link>
                            <Link className={props.page===7 && "active"} to="/owner/branch">จัดการสาขา</Link>
                        <div className="logout">
                            <Link onClick={clear} to="/">ออกจากระบบ</Link>  
                        </div>                         
                </div>        

            </div>  
        </>
    )
}