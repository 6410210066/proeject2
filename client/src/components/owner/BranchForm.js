import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { API_GET, API_POST } from '../../api';

export default function BranchForm(){
    
    let params = useParams();
    let navigate = useNavigate();

    const [branch_id,setBranch_id] = useState(0);
    const [branch_name,setBranch_name] = useState("");
    const [branch_address,setBranch_address] = useState("");
    const [emp_id,setEmp_id] = useState("");

    const [validated,setValidate] = useState(false);

    useEffect(()=>{
        async function fetchData(branch_id){
            let json = await API_GET("branch/"+branch_id);
            var data = json.data[0];
            setBranch_id(data.branch_id);
            setBranch_name(data.branch_name);
            setBranch_address(data.branch_address);
          
        } 
        if(params.branch_id !="add"){
            fetchData([params.branch_id]);
        }
    },[params.branch_id]);

    const onsave = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if(form.checkValidity()===false){
            event.stopPropagation();
        }else{
            if(params.branch_id === "add"){
               // let branch_id = await doCreateUser();
                doCreatebranch(branch_id);
            }else{
                doUpdatebranch();
            }
        }
    }

    const doCreatebranch = async(branch_id) => {
        console.log(branch_id);
        const json = await API_POST("branch/add",{
            branch_id : branch_id,
            branch_name : branch_name,
            branch_address : branch_address,
            emp_id : emp_id
        });
        if(json.result){
            console.log("เพิ่มข้อมูลสาขาสำเร็จ")
            navigate("/owner/branch",{replace:true});
        }
        
    }

    const doUpdatebranch = async() => {
        
        const json = await API_POST("branch/update",{
            emp_id : emp_id,
            branch_name : branch_name,
            branch_address : branch_address
        });
        if(json.result){
            console.log("อัปเดทสำเร็จ");
            navigate("/owner/branch",{replace:true});
        }
    }
    return(
        <>
            <Form className='container' noValidate validated={validated} onSubmit={onsave}>
                <Form.Group controlId='validateBranch_name'>
                    <Form.Label>ชื่อสาขา</Form.Label>
                    <Form.Control
                        type='text'
                        value={branch_name}
                        placeholder="สาขา"
                        required
                        onChange={(e)=>setBranch_name(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                        กรุณากรอกชื่อสาขา

                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='validateBranch_address'>
                    <Form.Label>ชื่อที่อยู่</Form.Label>
                    <Form.Control 
                        type='text'
                        value={branch_address}
                        placeholder="ที่อยู่"
                        required 
                        onChange={(e)=>setBranch_address(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" >
                        กรุณากรอกที่อยู่

                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="success" as="input" type="submit" value="บันทึก" className="mt-3"/>
            </Form>
        </>
    )
}
