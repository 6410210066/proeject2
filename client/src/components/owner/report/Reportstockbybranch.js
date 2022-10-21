import { useEffect, useState, useRef } from "react";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { API_GET, API_POST } from "../../../api";
import { Form, } from "react-bootstrap";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    Response: true,
    plugins: {
        Legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'รายงานจำนวนสต๊อกสินค้า'
        },
    }
}

export default function Reportstockbybranch() {
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState({});
    const [store, setStore] = useState([]);
    const [productStore, setProductStore] = useState([]);
    const [stock, setStock] = useState([]);
    const [branch, setBranch] = useState([]);
    const [branch_id, setBranchid] = useState(0);
    const chartRef = useRef();

    
    useEffect(() => {
        fetchBranch();
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [branch_id]);

    const fetchData = async () => {
        let json = await API_POST("report/Reportstockbybranch", {
            branch_id: branch_id
        });
        console.log(json.data);

        setStore(json.data);
 

        var labels = [];
        var data = [];

        for (var i = 0; i < json.data.length; i++) {
            var item = json.data[i];
            labels.push(item.m_name);
            data.push(item.stock_amount);
        }

        var dataset = {
            labels: labels,
            datasets: [
                {
                    label: "จำนวนสต๊อกสินค้าแยกตามประเภทสินค้า",
                    data: data,
                    backgroundColor: "rgba(6,75,132,255)"
                }
            ]
        }
       

        setChartData(dataset);
        setIsLoading(true);
    }
    
 
    const getChart = () => {
        
        if (isLoading) {

            return <Bar options={options} data={chartData}
            // ref={chartRef}
            // onClick={onClick} 
            />;

        }

        return <></>;
    }

    const fetchBranch = async () => {
        let json = await API_GET("branch");
        setBranch(json.data);
    }


    return (
        <>

                    <Form>
                        <div className='row ms-5 mb-3'>
                            <div className="col-lg-1 col-sm-2 pt-1 mt-3">
                                <Form.Label>
                                    สาขา
                                </Form.Label>
                            </div>
                            <div className="col-lg-3 col-sm-10 mt-3">
                                <Form.Group controlId="validataSelectBranch" >
                                    <Form.Select
                                        size="sm"
                                        value={branch_id}
                                        onChange={(e) => setBranchid(e.target.value)}
                                    >
                                        <option value={0}>เลือกสาขา</option>
                                        {
                                            branch != null &&
                                            branch.map(item => (
                                                <option key={item.branch_id} value={item.branch_id}>
                                                    {item.branch_name}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                    </Form>

            <div className="container-fluid mt-3">
                {
                    getChart()
                }
            </div>
        </>
    );
}


