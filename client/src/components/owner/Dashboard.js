import { useEffect, useState } from "react";
import ReportAllstock from "./report/ReportAllstock";
import Reportallstockitem from "./report/Reportallstockitem";
import Reportstockbybranch from "./report/Reportstockbybranch";
import { Form, } from "react-bootstrap";
import { API_GET, API_POST } from "../../api";

export default function Dashboard(props){
    const [data,setData] = useState([]);
    const [checkChart,setCheckChart] =useState(0);
    const [mname,setMname] =useState("");
    const [mid,setMid] =useState(0);
    const [total,setTotal] = useState(0);
    const [munit,setMunit ] =useState("");
    const [checkMid,setCheckMid] =useState(false);

    useEffect(()=>{
        let total =0 ;
        data.map(item =>{
           setMname(item.m_name);
           setMid(item.m_id);
           setMunit(item.m_unit);
           setTotal(item.stock_count);
           total = total + item.stock_amount
        })
        
        setTotal(total);

    },[data]);

    useEffect(() => {
        if (mid == 0) {
            setCheckMid(true);

        } else {
            setCheckMid(false);
        }
    }, [mid])

    return (
        <>
            <div className="container-fluid">
                <h1 className="header">DashBoard</h1>
                <div className="row dashboard-content Regular shadow" >
                   <div className="col-lg-8">
                        <ReportAllstock data={setData} checkChart={setCheckChart} />
                   </div>
                   <div className="col-lg-4 ">
                        <div className="Regular shadow summarize" hidden={checkMid}>
                            <div className="sumarize-title pt-3 ps-5">
                            <span> รหัส : </span><span >{mid}</span>
                                <p className="pt-2"> รายการ : {mname} </p>
                            </div>
                            <div className="Regular shadow summarize-total mt-2 my-2 pt-2">
                                <span > {total}</span><p style={{fontSize:"15px"}}>{munit}</p>
                            </div>
                            <div className="mt-3"><p></p></div>
                        </div>
                    </div>


                    <div className="col-lg-12 py-4">
                        {
                            checkChart == 1 &&
                            <Reportallstockitem data={data} />
                        }
                    </div>
                </div>
            </div>

                <h3 className="header my-4">กราฟแสดงข้อมูลสต๊อกแต่ละสาขา</h3>
                    <div className="row dashboard-content Regular shadow mb-5" >
                        <div className="col-lg-12 col-sm-12">
                            <Reportstockbybranch data={setData} checkChart={setCheckChart} />
                        </div>
                    </div>
        </>
    );
}