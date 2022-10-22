import { useEffect, useState } from "react";
import ReportAllstock from "./report/ReportAllstock";
import Reportallstockitem from "./report/Reportallstockitem";
import Reportstockbybranch from "./report/Reportstockbybranch";
import { Form, } from "react-bootstrap";
import { API_GET, API_POST } from "../../api";
import { parsePath } from "react-router-dom";
import Reportsellrecord from "./report/Reportsellrecord";

export default function Dashboard(props){

    let totalpiece=0;
    const datenow = Date.now();

    const [data,setData] = useState([]);
    const [checkChart,setCheckChart] =useState(0);
    const [mname,setMname] =useState("");
    const [mid,setMid] =useState(0);
    const [total,setTotal] = useState(0);
    const [munit,setMunit ] =useState("");
    const [checkMid,setCheckMid] =useState(false);
    const [sellrecord,setSellrecord] =useState([]);
    const [sumnet,setSumnet] = useState(0);
    const [sumpiece,setSumpiece] =useState(0);
    const [sumcustomer,setSumcustomer] =useState(0);
    const [orderselllist,setOrderselllist] =useState([]);
    const [orderreqeust,setOrderrequest] =useState([]);
    const [sum1,setSum1] =useState(0);
    const [sum2,setSum2] =useState(0);
    useEffect(()=>{
        fetchsellrecord();
        fetchOrderselllist();
        fetchOrderreqeust();
    },[])

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
    }, [mid]);

    useEffect(()=>{
        orderselllist.map(item =>{
            totalpiece = parseInt(totalpiece) + parseInt(item.sumpiece)
         })
         setSum1(totalpiece)
    },[orderselllist]);

    const fetchsellrecord = async()=>{
        let json = await API_GET("sellrecorddashboard");
        if(json.result){
            console.log(json.data);
            setSumcustomer(json.data[0].sumcustomer);
            setSumnet(json.data[0].sumtotal);
            setSumpiece(json.data[0].sumpiece);
        }
    };

    const fetchOrderselllist = async()=>{
        let json = await API_GET("getOrderSelllist");
        if(json.data){
            setOrderselllist(json.data);

         }
}
    const fetchOrderreqeust = async ()=>{
        let json = await API_GET("getorderreqeust");
        console.log(json.data);
        if(json.data){
            setOrderrequest(json.data);
        }
    }

    return (
        <>
            <div className="container-fluid">
                <h1 className="header">DashBoard</h1>

                {/* ยอดขายรายวัน */}
                <div className="row">
                    <div className="col-lg-1 ms-4 col-sm-0 "></div>
                    <div className="col-lg-3 col-sm-12 card my-3 mx-2  border border-primary">
                        <div className="card-body  ">
                            <h5 className="header">ยอดขายวันนี้</h5>
                            <h4 className="header mt-3">{sumnet} ฿</h4>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-12 card my-3  mx-2 border border-success">
                        <div className="card-body  ">
                            <h5 className="header">จำนวนที่ขายได้วันนี้</h5>
                            <h4 className="header mt-3">{sumpiece} รายการ</h4>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-12 card my-3 mx-2 border border-danger">
                        <div className="card-body  ">
                            <h5 className="header">จำนวนลูกค้าวันนี้</h5>
                            <h4 className="header mt-3">{sumcustomer} คน</h4>
                        </div>
                    </div>
                </div>

                {/* แสดงรายการขายดี */}
                <div className="row ">
                    <div className="col-lg-1 col-sm-0"></div>
                    <div className="col-lg-5 col-sm-12 card mx-2 my-4 p-0 border border-primary">
                        <div className="card-header text-center">
                            รายการสินค้าขายดี
                        </div>
                        <div className="card-body">
                                <ol>
                                    {
                                        orderselllist != null  &&
                                        orderselllist.map((item,index)=>(  
                                        <> 

                                            {
                                                sum1 !=0 &&
                                                <li className="my-2" hidden={index >=3 && true}>{item.product_name} {parseFloat(item.sumpiece * 100/ parseInt(sum1)).toFixed(2)}  %</li>
                                            }
                                           
                                        </>                                      
                                            
                                        ))
                                    }
                                </ol>
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-12 card mx-2 my-4 p-0 border border-primary">
                        <div className="card-header text-center ">
                            รายการวัตถุดิบที่ใช้เยอะ
                        </div>
                    
                        <div className="card-body">
                            <ol>
                            {
                                        orderreqeust != null &&
                                        orderreqeust.map((item,index)=>(                                        
                                            <li className="my-2" hidden={index >=3 && true}>{item.m_name} {item.sumamount} {item.m_unit}</li>
                                        ))
                                    }
                            </ol>
                        </div>
                    </div>
                </div>

                {/* กราฟสต๊อกสินค้ารวม */}
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

                {/* กราฟแสดงข้อมูลสต๊อกแต่ละสาขา */}
                <h3 className="header my-4">กราฟแสดงข้อมูลสต๊อกแต่ละสาขา</h3>
                <div className="row dashboard-content Regular shadow" >
                        <div className="col-lg-12 col-sm-12">
                            <Reportstockbybranch data={setData} checkChart={setCheckChart} />
                        </div>
                </div>

                 {/* กราฟแสดงข้อมูลแสดงการขาย */}
                 <h3 className="header my-4">กราฟแสดงยอดขายรวมของแต่ละสาขา</h3>
                <div className="row dashboard-content Regular shadow" >
                        <div className="col-lg-12 col-sm-12">
                            <Reportsellrecord data={setData}  checkChart={setCheckChart} />
                        </div>
                </div>

            </div>


        </>
    );
}