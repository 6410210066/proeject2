import 'bootstrap/dist/css/bootstrap.min.css';
import "../admin/admin.css"
import Adminnav from './Adminnav';
import Users from './Users';

export default function Admin (){

    let page =1;
    return(
        <>
            <div  className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                        <Adminnav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content overfloww" style={{padding:"0"}}>
                        <div className='user-grid'>
                            <Users page={page}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}