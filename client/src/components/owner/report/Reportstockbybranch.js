import { useEffect,useState,useRef } from "react";
import { Bar,getElementAtEvent } from "react-chartjs-2";
import { API_GET } from "../../../api";
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
    plugins:{
        Legend:{
            position: 'top',
        },
        title: {
            display : true,
            text: 'รายงานจำนวนสต๊อกสินค้า'
        },
    }
}

export default function Reportstockbybranch(){
    const [isLoading,setIsLoading] = useState(false);
    const [chartData,setChartData] = useState({});
    const [store, setStore] = useState([]);
    const [productStore, setProductStore] = useState([]);
    const [stock,setStock] = useState([]);
    const chartRef = useRef();

    useEffect(() => {
        console.log(productStore)
        async function fetchData() {
            let json = await API_GET("report/Reportstockbybranch");

            setStore(json.data);
            console.log(json.data);

            var labels = [];
            var data = [];

            for (var i=0; i<json.data.length; i++) {
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
                        backgroundColor: "rgba(255, 174, 0 , 0.65)"
                    }
                ]
            }
            console.log(dataset);

            setChartData(dataset);
            setIsLoading(true);
        }

        fetchData();
    }, []);

    const getChart = () => {
        if (isLoading) {
            
            return <Bar options={options} data={chartData}
            // ref={chartRef}
            // onClick={onClick} 
            />;

        }

        return <></>;
    }

    // const onClick = async (event) => {
    //     var element = getElementAtEvent(chartRef.current, event);
    //     var index = element[0].index;

    //     await getSumStock(store[index].stock_id);
    // }

    // const getSumStock = async (stock_id) => {
    //     let json = await API_GET("stock"+ stock_id);
    //     setProductStore(json.data);
    // }
        
    return (
        <>
        
            <div className="container-fluid mt-3">
                {
                    getChart()
                }
            </div>

            {/* <div className="container-fluid mt-3">
                {
                    productStore.map(item => (
                        <Stockitem
                            key={item.stock_id}
                            data={item} />
                    ))
                }
            </div> */}
        </>
    );
}


