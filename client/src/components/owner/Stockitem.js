
export default function Stockitem(props){
    const ondelete = async()=>{
        props.ondelete(props.data);
    }
    const onEdit = async()=>{
        props.onEdit(props.data);
     
    }
    return(
        <>
                <tr>
                    <td className="align-middle">{props.data.stock_id} </td>
                    <td className="align-middle">{props.data.m_name}</td>
                    <td className="align-middle">{props.data.stock_amount}</td>
                    <td className="align-middle">{props.data.m_unit} </td>
                    <td className="align-middle">{props.data.branch_name} </td>
                    <td className="align-middle"><button onClick={onEdit} className="button btn-edit">แก้ไข</button></td>
                    <td className="align-middle"><button onClick={ondelete} className="button btn-delete">ลบ</button></td>
              </tr>
        </>
    )
}