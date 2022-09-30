import { useEffect, useState } from "react"
import { Table } from "react-bootstrap";

export default function Reportallstockitem(props){
 
    const [datastock,setDatastock] =useState([]);
    
    useEffect(()=>{
        setDatastock(props.data);
    },[props.data])
    return(
        <>     
            <div className="container-fluid ">
                <Table striped className="mx-5 grid Regular shadow ">
                    <thead className="thead-dark bg-warning ">
                        <tr>
                            <th>รหัสสต๊อก   </th>
                            <th>รายการ     </th>
                            <th>จำนวน     </th>
                            <th>หน่วย      </th>
                            <th>สาขา      </th>
                        </tr>
                    </thead>
                    <tbody className="overflow-scroll">
                        {
                        datastock != null &&
                        datastock.map( item => (
                            <>
                                <tr>
                                    <td className="align-middle">{item.stock_id} </td>
                                    <td className="align-middle">{item.m_name}</td>
                                    <td className="align-middle">{item.stock_amount}</td>
                                    <td className="align-middle">{item.m_unit} </td>
                                    <td className="align-middle">{item.branch_name} </td>
                                </tr>
                            </>
                        ))
                        }
                    </tbody>
                </Table>
               

            </div>
        </>
    )
}