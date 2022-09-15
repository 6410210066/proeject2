import { Link } from "react-router-dom";

export default function ManagerquestItem(props){

    const ondelete = async () => {
        props.ondelete(props.data);
    }

    return(
        <>
        <tr>

            <td className="align-middle">{props.data.request_id}</td>
            <td className="align-middle">{props.data.request_amount}</td>
            <td className="align-middle">{props.data.request_description}</td>
            <td className="align-middle">{props.data.request_status}</td>
            <td className="align-middle">{props.data.stock_id}</td>
            <td className="align-middle">{props.data.stock_name}</td>
            <td className="align-middle">{props.data.user_id}</td>
            <td className="align-middle">{props.data.branch_id}</td>
            <td className="align-middle">{props.data.request_date}</td>
            <td className="align-middle">{props.data.firstname +"  "}{props.data.lastname}</td>
            <td className="align-middle"><button onClick={ondelete} className="button btn-delete">ลบ</button></td>
        </tr>
        </>
    )
}