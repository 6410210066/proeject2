import { Link } from "react-router-dom";


export default function ManagerEmployeeItem(props){

    const ondelete = async () => {
        props.ondelete(props.data);
    }
    
    return(
        
        <tr>
            <td className="align-middle">{props.data.emp_id}</td>
            <td className="align-middle">{props.data.firstname}<span>&nbsp;&nbsp;&nbsp;</span>{props.data.lastname} </td>
            <td className="align-middle">{props.data.address}</td>
            <td className="align-middle">{props.data.phone_number}</td>
            <td className="align-middle">{props.data.branch_name}</td>
            <td className="align-middle"><Link to={`/employee/${props.data.emp_id}`} className="button btn-edit">แก้ไข</Link></td>
            <td className="align-middle"><button onClick={ondelete} className="button btn-delete">ลบ</button></td>
        </tr>
        
    )
}