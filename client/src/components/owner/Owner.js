import 'bootstrap/dist/css/bootstrap.min.css';
import "../owner/owner.css"
import Ownernav from './Ownernav';
import Dashboard from './Dashboard';
export default function Owner (){
    let page =1;
    return(
        <>
            <div  className="container-fluid" >
                <div className="row">
                    <div className="col-lg-2 nav" style={{padding:"0"}}>
                         <Ownernav page={page} />
                    </div>
                    <div className="col-lg-10 content overfloww" style={{padding:"0"}}>
                        <div className='grid'>
                            <Dashboard page={page}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}