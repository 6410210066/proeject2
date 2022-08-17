import 'bootstrap/dist/css/bootstrap.min.css';
import "../admin/admin.css"
import Adminnav from './Adminnav';
import Users from './Users';

export default function ManagerMgs (){

    let page =2;
    return(
        <>
            <div  className="container-fluid">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 content" style={{padding:"0"}}>
                        <Adminnav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content" style={{padding:"0"}}>
                        <div className='user-grid'>
                            <h1 className="header">จัดการบัญชีผู้จัดการ</h1><br/>
                            {/* <Users page={page}/> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}