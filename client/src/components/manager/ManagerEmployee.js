import Managernav from "./Managernav";
export default function ManagerEmployeee(){
    let page=3;
    return(
        <>
                    <div  className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                        <Managernav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content " style={{padding:"0"}}>
                        <div className='user-grid'>
                           <h1>จัดการพนักงาน</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}