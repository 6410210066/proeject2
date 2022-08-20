import { Link } from "react-router-dom"
export default function(props){
    const ondelete = async()=>{
        props.ondelete(props.data);
    }
    return(
        <>
                <tr>
                    <td className="align-middle">{props.data.stock_id} </td>
                    <td className="align-middle">{props.data.m_name}</td>
                    <td className="align-middle">{props.data.stock_amount}</td>
                    <td className="align-middle">{props.data.m_unit} </td>
                    <td className="align-middle">{props.data.branch_name} </td>
                    <td className="align-middle"><Link to={`/stock/${props.data.product_id}`} className="button btn-edit">แก้ไข</Link></td>
                    <td className="align-middle"><button onClick={ondelete} className="button btn-delete">ลบ</button></td>
              </tr>
        </>
    )
}