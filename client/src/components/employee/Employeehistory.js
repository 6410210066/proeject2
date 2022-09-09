import Employeenav from "./Employeenav";

export default function Employeehistory(){

    let page = 2;
    return(
        <>
            <div  className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                        <Employeenav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content  " style={{padding:"0"}}>
                        <div className='user-grid'>
                            {/* <Users page={page}/> */} 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}