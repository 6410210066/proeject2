import { Link } from "react-router-dom"
export default function Productitem(props){
    const ondelete = async()=>{
        props.ondelete(props.data);
    }

    const onShowDetail = async()=>{
        props.onShowDetail();
        props.modelProductInfo(props.data);
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
                    <td className="align-middle"><button className="button btn-detail" onClick={onShowDetail}>รายละเอียด</button></td>
                    <td className="align-middle"><Link to={`/product/${props.data.product_id}`} className="button btn-edit">แก้ไข</Link></td>
                    
                    <td className="align-middle"><button onClick={ondelete} className="button btn-delete">ลบ</button></td>
              </tr>
        </>
    )
}