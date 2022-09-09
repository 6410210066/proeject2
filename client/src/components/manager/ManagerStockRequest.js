import Managernav from "./Managernav";
export default function ManagerstockRequest(){

    let page =2;
    return(
        <>
            <div  className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                        <Managernav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content " style={{padding:"0"}}>
                        <div className='user-grid'>
                           <h1>คำขอเพิ่มสต๊อกสินค้า</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}