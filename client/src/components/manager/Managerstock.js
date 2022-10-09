import { useEffect } from "react";
import Managernav from "./Managernav";
import SimpleDateTime  from 'react-simple-timestamp-to-date';
export default function Managerstock(){

    let page =2;
    const dateString = '2020-05-14 19:21:26'
    useEffect(()=>{

    },[])

    return(
        <>
            <div  className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                        <Managernav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content " style={{padding:"0"}}>
                        <div className='user-grid'>
                           <h1>จัดการสต๊อกสินค้า</h1>
                                <SimpleDateTime dateFormat="DMY" dateSeparator="/"  timeSeparator=":" showDate="0">{dateString}</SimpleDateTime>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}