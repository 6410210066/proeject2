import { Link } from "react-router-dom";

export default function BranchItem(props){

    const ondelete = async () => {
        props.ondelete(props.data);
    }

    return(
        <>
        <tr>

            <td className="align-middle">{props.data.branch_id}</td>
            <td className="align-middle">{props.data.branch_name}</td>
            <td className="align-middle">{props.data.branch_address}</td>
            <td className="align-middle">{props.data.firstname +"  "}{props.data.lastname}</td>
            <td className="align-middle"><Link to={`/branch/${props.data.branch_id}`} className="button btn-edit">แก้ไข</Link></td>
            <td className="align-middle"><button onClick={ondelete} className="button btn-delete">ลบ</button></td>
        </tr>
        </>
    )
}