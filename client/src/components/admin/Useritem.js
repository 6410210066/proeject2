import { Link } from "react-router-dom";
export default function Useritem(props){
    let num;
    const ondelete = async ()=>{
        props.ondelete(props.data);
    }

    return(
        <>    
             <tr>
                    <td className="align-middle">{props.data.user_id} </td>
                    <td className="align-middle">{props.data.username}</td>
                    <td className="align-middle sub-text">{props.data.password}</td>
                    <td className="align-middle">{props.data.role_name} </td>
                    <td className="align-middle"><Link to={`/users/${props.data.user_id}`} className="button btn-edit">แก้ไข</Link></td>
                    <td className="align-middle"><button onClick={ondelete} className="button btn-delete">ลบ</button></td>
              </tr>
                    
        </>
    )
}