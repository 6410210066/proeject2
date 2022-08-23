import { Link } from "react-router-dom"
export default function(props){
    const ondelete = async()=>{
        props.ondelete(props.data);
    }
    return(
        <>
                     <tr>
                    <td className="align-middle">{props.data.product_id} </td>
                    {/* <td className="align-middle">{props.data.img}</td> */}
                    <td className="align-middle">{props.data.product_name}</td>
                    <td className="align-middle">{props.data.product_price} </td>
                    {/* <td className="align-middle">{props.data.product_size} </td>
                    <td className="align-middle">{props.data.product_weight} </td> */}
                    <td className="align-middle">{props.data.product_type_name} </td>
                    <td className="align-middle"><Link to={`/product/detail/${props.data.product_id}`} className="button btn-detail">รายละเอียด</Link></td>
                    <td className="align-middle"><Link to={`/product/${props.data.product_id}`} className="button btn-edit">แก้ไข</Link></td>
                    <td className="align-middle"><button onClick={ondelete} className="button btn-delete">ลบ</button></td>
              </tr>
        </>
    )
}