
import Managernav from "./Managernav";
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import { useState ,useEffect} from "react";
export default function Manager(){

    let page=2;


   
    return(
        <>
            
            <div  className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                        <Managernav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content " style={{padding:"0"}}>
                        <div className='user-grid'>
                             
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}