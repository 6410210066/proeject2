
import Managernav from "./Managernav";
import {Form,Row,Col,Button, Pagination,Table} from 'react-bootstrap';
import { useState,useEffect  } from "react";
import { API_GET,API_POST } from "../../api";
import { Link } from "react-router-dom";
import Stockitem from "../owner/Stockitem";
import { ConfirmModal, DeleteModal, EditStockModal, PlusoreditstockModal, PlusstockModal } from "../../modals";
import Fuse from 'fuse.js';

export default function Managerstock(){

    let page =2;
    var pageCount =0;
    const [currentPage,setCurrentPage] =useState(0);
    const [numPerPage,setNumPerPage]=useState(5);
    const [data,setData] =useState([]);
    const [stock,setStock] =useState([]);
    const [stockname,setStockname] =useState("");
    const [validated,setValidated] = useState(false);
    const [show,setShow]=useState(false);
    const [showedit,setShowedit] =useState(false);
    const [showconfirmedit,setShowconfirmedit] =useState(false);
    const [showplusoredit,setShowplusoredit] =useState(false);
    const [showplus,setShowplus] =useState(false);
    const [title,setTitle]=useState("");
    const [message,setMessage]= useState("");
    const [stockid,setStockid]=useState(0);
    const [stock_amount,setStockamount] =useState(0);
    const [plusstockamount,setPlusStockAmount] =useState(0);
    const [branchid,setBranchid] =useState(0);
    const [stockdata,setStockdata] =useState([]);
    
    useEffect(()=>{
        
        setCurrentPage(0);
        let user_id = localStorage.getItem("user_id");
        getBranchId(user_id);
        fetchStock();
    },[]);


    useEffect(()=>{
        if(stockname== ""){
            setData(stockdata);
        }
    },[stockname]);

    useEffect(()=>{
        let result=[];
        stock.filter(stock => stock.branch_id == branchid).map(item=>{
            result.push(item);
        });
        setData(result);
        setStockdata(result);
    },[stock])
    //modal 


    const onConfirm = async()=>{
        let json = await API_POST("stock/delete",{
            stock_id : stockid
        });
        if(json.result){
            setShow(false);
            fetchStock();
        }
    }

    const onConfirmedit = async()=>{
        setShowedit(false);
        setShowconfirmedit(true);
        setTitle("ยืนยันการแก้ไข");
        setMessage("คุณต้องการยืนยันการแก้ไขหรือไม่");
    }

    const onCancel= async()=>{
        setShow(false);
        setShowedit(false);
        setShowplus(false);
        setShowplusoredit(false);
        setShowconfirmedit(false);
    }
    
    const editstock = async()=>{
        let json = await API_POST("stock/update",{
            stock_amount : stock_amount,
            stock_id: stockid
        });
        if(json.result){
            setShow(false);
            fetchStock();
        }
        setShowedit(false);
        setShowconfirmedit(false);
    }


    const onEdit = async(data)=>{
        setShowplusoredit(true);
        setTitle("เพิ่มหรือแก้ไขสต๊อกสินค้า");
        setMessage("คุณต้องการเพิ่มหรือแก้ไขสต๊อกสินค้า");
        setStockid(data.stock_id);
        setStockamount(data.stock_amount);
    }

    const onPlus =async()=>{
        var result = stock_amount + parseInt(plusstockamount);
        setStockamount(result);

        setShowplus(false);
        setShowconfirmedit(true);
        setTitle("ยืนยันการเพิ่มสต๊อก");
        setMessage("คุณต้องการยืนยันการเพิ่มสต๊อกหรือไม่");
    }

    const onPlusoredit = (id)=>{
        if(id==1){
            setShowplusoredit(false);
            plusStock();
            
        }else if(id==2){
            setShowplusoredit(false);
            editStcok();
        }
    }

    const editStcok = ()=>{
        setShowedit(true);
        setTitle("แก้ไขจำนวนสต๊อกสินค้า");

    }

    const plusStock = () =>{
        setShowplus(true);
        setTitle("เพิ่มจำนวนสต๊อก");
    }
    const onSearch = async(event)=>{
        const form = event.currentTarget;
        event.preventDefault(); //ไม่ให้รีเฟรชหน้า

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const fuse = new Fuse(stockdata, {
                keys: [ 'stock_id','m_name']
            });
            let searchdata =  fuse.search(stockname);
       
            let data1 =[];
            searchdata.map(item =>{
                data1.push(item.item);
                console.log(item.item)
            });
            setData(data1);
           
        }
        

    }

    const fetchStock = async()=>{
        let json = await API_GET("stock");
        setStock(json.data);
        setCurrentPage(0);
    }

    const getBranchId = async(user_id) => {
        let json = await API_POST("getbranchId",{
            user_id : user_id
        });
        
        setBranchid(json.data[0].branch_id);
        return json.data[0].branch_id;
    }

    const getPagination = ()=>{
        let items = [];
        if(data != null){
            pageCount = Math.ceil(data.length/5);

            for (let i =0;i<pageCount;i++){
                items.push(
                    <Pagination.Item key={i}
                        active={currentPage ==i}
                        onClick={onPageSelect}>{i+1}</Pagination.Item>
                );
            }
            return items;
        }

    }

    const onPageSelect = (d) =>{
        var selectedPageNo = parseInt(d.target.innerHTML) -1;
        setCurrentPage(selectedPageNo);
    }

    const nextPage = ()=>{
        setCurrentPage(currentPage +1);
    }

    const prevPage = ()=>{
        setCurrentPage(currentPage -1);
    }

    const firstPage = ()=>{
        setCurrentPage(0);
    }

    const lastPage = () =>{
        setCurrentPage(pageCount - 1);
    }





    return(
        <>
            <div  className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{padding:"0"}}>
                        <Managernav page={page}/>
                    </div>
                    <div className="col-lg-10 col-sm-12 content " style={{padding:"0"}}>
                        <div className='user-grid'>
                           <h1 className="header">จัดการสต๊อกสินค้า</h1>
                           <div className="tablecontent"> 
                            <Form noValidate validated={validated}  onClick={onSearch}>
                                    <div className="row ms-5 mb-3">
                                        <div className="col-lg-7 col-md-7 col-sm-6 mt-1 ms-1">
                                            <Form.Group as={Col} controlId="validatesearch" >
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    value={stockname}
                                                    placeholder="ค้นหารายการสต๊อก"
                                                    onChange={(e) => setStockname(e.target.value)}  
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    กรุณากรอกรายการสต๊อก
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className="col-3 me-4 ms-3"> 
                                            <button className="button btn-search ms-5" as="input" type="submit" ><i class="fa-solid fa-magnifying-glass me-2"></i>ค้นหา</button>
                                        </div>

                                        <div className="col-1">

                                        </div>
                                    </div>
                                </Form>  

                                <Table striped className="mx-5 grid mb-4">
                                        <thead>
                                            <tr>
                                                <th>รหัสสต๊อก     </th>
                                                <th>รายการ        </th>
                                                <th>จำนวน     </th>
                                                <th>หน่วย   </th>
                                                <th>สาขา     </th>
                                                <th>แก้ไข       </th>
                              
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {
                                            data != null &&
                                            data.slice(currentPage * numPerPage ,( currentPage * numPerPage) + numPerPage).map( item => (
                                                    <Stockitem key={item.stock_id} data={item} onEdit={onEdit} check={true} />
                                            ))
                                            }
                                        </tbody>
                                    </Table>
                                        <div className="contanier mt-5 border-bottom ms-5">
                                            <Pagination onSelect ={onPageSelect}>
                                                <Pagination.First onClick={firstPage} />
                                                <Pagination.Prev disabled={currentPage == 0} onClick={prevPage} />
                                                {getPagination()}
                                                <Pagination.Next disabled={currentPage == pageCount -1} onClick={nextPage} />
                                                <Pagination.Last onClick={lastPage} />
                                            </Pagination>
                                        </div>         
                                    </div> 
                                    <DeleteModal
                                    show={show}
                                    title={title}
                                    message={message}
                                    onConfirm={onConfirm}
                                    onCancel={onCancel}
                                    />

                                    <EditStockModal 
                                    show ={showedit}
                                    title={title}
                                    onConfirm={onConfirmedit}
                                    onCancel={onCancel}
                                    stockamount={stock_amount}
                                    setStockamount={setStockamount}
                                    />

                                    <ConfirmModal
                                        show={showconfirmedit}
                                        title={title}
                                        message={message}
                                        onConfirm={editstock}
                                        onCancel={onCancel}
                                    />

                                    <PlusoreditstockModal
                                        show={showplusoredit}
                                        title={title}
                                        message={message}
                                        onConfirm={onPlusoredit}
                                        onCancel={onCancel}
                                    />

                                    <PlusstockModal
                                        show={showplus}
                                        title={title}
                                        onConfirm={onPlus}
                                        onCancel={onCancel}
                                        stockAmount={stock_amount}
                                        setPlusStockAmount={setPlusStockAmount}
                                    />  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}