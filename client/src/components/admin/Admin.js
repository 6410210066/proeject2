import 'bootstrap/dist/css/bootstrap.min.css';
import "../admin/admin.css"
import Adminnav from './Adminnav';
import Users from './Users';

export default function Admin (){
    return(
        <>
            <div  className="container-fluid" >
                <div className="row">
                    <div className="col-lg-2 content" style={{padding:"0"}}>
                        <Adminnav/>
                    </div>
                    <div className="col-lg-10 content" >
                        <h1>hi</h1>
                        <Users />
                    </div>
                </div>
            </div>
        </>
    )
}