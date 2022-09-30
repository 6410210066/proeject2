import { useEffect ,useState} from "react";
import ReportAllstock from "./report/ReportAllstock";
import Reportallstockitem from "./report/Reportallstockitem";
import Reportstockbybranch from "./report/Reportstockbybranch";

export default function Dashboard(props){
    const [data,setData] = useState([]);
    const [checkChart,setCheckChart] =useState(0);
    const [checkComponanat,setCheckcomponant] =useState(false);
    const [mname,setMname] =useState("");
    const [mid,setMid] =useState(0);
    const [checkMid,setCheckMid] =useState(false);

    useEffect(()=>{
        data.map(item =>{
           setMname(data[0].m_name);
           setMid(data[0].m_id);
        })
        
    
    },[data]);

    useEffect(()=>{
        if(mid ==0 ){
            setCheckMid(true);
           
        }else{
            setCheckMid(false);
        }
    },[mid])

    return(
        <>
            <div className="container-fluid">
                <h1 className="header">DashBoard</h1>
                <div className="row dashboard-content Regular shadow" >
                   <div className="col-lg-8 col-sm-12">
                        <ReportAllstock data={setData} checkChart={setCheckChart} />
                   </div>
                   <div className="col-lg-4 ">
                        <div className="Regular shadow summarize">
                            <div className="summarize sumarize-title">
                            <span> รหัส : </span><span hidden={checkMid}>{mid}</span>
                                <p> รายการ : {mname} </p>
                            </div>
                            <div className="summarize sumarize-total">

                            </div>
                        </div>
                   </div>
                   <div className="col-lg-12 py-4">
                        {
                            checkChart ==1 && 
                            <Reportallstockitem  data={data} />
                        }
                   </div>
                </div>
            </div>
        </>
    );
}