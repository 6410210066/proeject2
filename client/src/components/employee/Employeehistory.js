import Employeenav from "./Employeenav";
import { useEffect, useState } from "react";
import { API_GET, API_POST} from "../../api";
import { Button,Table,Form } from "react-bootstrap";
import { Detailsellrecordmodal } from "../../modals";

export default function Employeehistory() {
    let page = 2;

        const [data,setData] = useState([]);
        const [selectdata,setSelectdata] = useState({});
        const [emp_id,setEmpid] = useState(0);
        const [branch_id,setBranchid] = useState(0);
        const [showsellrecordModal,setShowSellrecordModal] =useState(false);
        const [list,setList] = useState([]);

    useEffect(()=>{
        let user_id = localStorage.getItem("user_id");
        getBranchId(user_id);
        selllist();
    },[])

    useEffect(()=>{
        console.log("in useEffec emp_id");
        console.log(emp_id)
        fetchData();
    },[emp_id])
       
    const getBranchId = async(user_id) => {
        let json = await API_POST("getbranchId",{
            user_id : user_id
        });
        setBranchid(json.data[0].branch_id);
        setEmpid(json.data[0].emp_id);
       
    }
    const fetchData = async()=>{
        let json = await API_POST("sellrecordbyemp",{
            emp_id:emp_id
        });
        console.log(json.data);
        setData(json.data);
    }

    const selllist = async()=>{
        let json = await API_GET("getselllist");
        console.log(json.data);
        if(json.result){
            setList(json.data);
        }
    }

    const onShowDetail = async(item)=>{
        setShowSellrecordModal(true);
        setSelectdata(item);
    }

    const onCancel = ()=>{
        setShowSellrecordModal(false);
    }

    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{ padding: "0" }}>
                        <Employeenav page={page} />
                    </div>
                    <div className="col-lg-10 col-sm-12 content overfloww " style={{ padding: "0" }}>
                        <div className='user-grid'>
                            <h1 className="header">ประวัติการขาย</h1>

                            <div class="mx-4 pt-4 bg-ground1 Regular shadow">
                
                                <Table striped className="grid ">
                                    <thead style={{backgroundColor:"#FFC700"}}>
                                        <tr>
                                            <th>เลขบิล</th>
                                            <th>ชื่อ-สกุล</th>
                                            <th>สาขา</th>
                                            <th>จำนวน</th>
                                            <th>ราคารวม</th>
                                            <th>รายละเอียด</th>
                                        </tr>
                                        </thead>
                                     
                                        <tbody> 
                                             {
                                                data != null && 
                                                data.map((item,index)=>(
                                                    
                                                    <>
                                                        <tr>
                                                            <td>{item.s_id}</td>
                                                            <td>{item.firstname} {item.lastname}</td>
                                                            <td>{item.branch_name}</td>
                                                            <td>{item.piece}</td>
                                                            <td>{item.total}</td>
                                                            {
                                                                list != null &&
                                                                <td className="align-middle"><button className="button btn-detail btn-sm" onClick={event =>onShowDetail(item)} >รายละเอียด</button></td>
                                                            }
                                                            
                                                        </tr>
                                                     
                                                    </>
                                                ))
                                             }
                                        
                                        </tbody>
                                    
                                </Table> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Detailsellrecordmodal 
                show={showsellrecordModal}
                onShowDetail={onShowDetail}
                data={selectdata}
                onCancel={onCancel} 
                list={list}
            />
        </>
    )
}