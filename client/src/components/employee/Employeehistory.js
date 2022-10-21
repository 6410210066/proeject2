import Employeenav from "./Employeenav";
import { useEffect, useState } from "react";
import { API_GET, API_POST} from "../../api";
import { Button,Table,Form } from "react-bootstrap";

export default function Employeehistory() {
    let page = 2;

        const [data,setData] = useState([]);
        const [emp_id,setEmpid] = useState(0);
        const [branch_id,setBranchid] = useState(0);

    useEffect(()=>{
        let user_id = localStorage.getItem("user_id");
        getBranchId(user_id);
        fetchData();
    },[])
       
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
        setData(json.data);
    }

    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{ padding: "0" }}>
                        <Employeenav page={page} />
                    </div>
                    <div className="col-lg-10 col-sm-12 content  " style={{ padding: "0" }}>
                        <div className='user-grid'>
                            <h1 className="header">ประวัติการขาย</h1>

                            <div class="mx-4 pt-4 bg-ground1 Regular shadow">
                            <Form>
                                {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="รายวัน"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                    />
                                    <Form.Check
                                        inline
                                        label="รายเดือน"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                    <Form.Check
                                        inline
                                        label="รายปี"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-3`}
                                    />
                                    
                                </div>
                                ))}
                            </Form>
                       
                 
                            
                                <Table striped className=" grid">
                                    <thead style={{backgroundColor:"#FFC700"}}>
                                        <tr>
                                            <th>เลขบิล</th>
                                            <th>ชื่อพนักงาน</th>
                                            <th>สาขา</th>
                                            <th>จำนวน</th>
                                            <th>ราคารวม</th>
                                            <th>รายละเอียด</th>
                                        </tr>
                                        </thead>
                                        {console.log(data)}
                                        <tbody> 
                                             {
                                                data != null && 
                                                data.map((item,index)=>(
                                                    
                                                    <>
                                                        <tr>
                                                            <td>{item.s_id}</td>
                                                            <td>{item.emp_id}</td>
                                                            <td>{item.branch_id}</td>
                                                            <td>{item.piece}</td>
                                                            <td>{item.total}</td>
                                                            {/* <td className="align-middle"><button className="btn btn-danger btn-sm" onClick={event=>ondelete()} >ลบ</button></td> */}
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
        </>
    )
}