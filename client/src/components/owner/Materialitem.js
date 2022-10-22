import { useEffect, useState } from "react";


export default function Materialitem(props){

    const [checkbtn,setCheckbth] = useState(false);


    const onEdit = async()=>{
        props.onEdit(props.data);
    }
    return(
        <>
                <tr>
                    <td className="align-middle">{props.data.m_id} </td>
                    <td className="align-middle">{props.data.m_name}</td>
                    <td className="align-middle">{props.data.m_unit}</td>
                    <td className="align-middle">{props.data.m_type} </td>
                    <td className="align-middle">{props.data.Minimum} </td>
                    <td className="align-middle"><button onClick={onEdit} className="button btn-edit">แก้ไข</button></td>
                    <td className="align-middle" ><button onClick={event =>props.ondelete(props.data)} className="button btn-delete">ลบ</button></td>
              </tr>
        </>
    )
}