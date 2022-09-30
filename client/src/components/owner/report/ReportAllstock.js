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
export default function ReportAllstock(props){
    const [isLoading,setIsLoading] =useState(false);
    const [chartData,setChartData] =useState({});
    const [chartStock,setChartStock] =useState([]);
    const [stock,setStock] = useState([]);
    const chartRef = useRef();

    useEffect(()=>{
        async function fetchData(){
            let json = await API_GET("reportallstock");
            setChartStock(json.data);
            var labels =[];
            var data = [];

            for(var i =0; i < json.data.length; i ++){
                var item = json.data[i];
                labels.push(item.m_name);
                data.push(item.stock_count);
            }
            var dataset = {
                labels:labels,
                datasets: [
                    {
                        label:"จำนวนสต๊อกสินค้ารวม",
                        data: data,
                        backgroundColor: "rgba(255, 0, 30, 0.8)"
                    }
                ]
            }
            setChartData(dataset);
            setIsLoading(true);
        }

        fetchData();
    },[]);

    useEffect(()=>{
        if(stock.length){
            props.checkChart(1);
            props.data(stock);
        }
    },[stock]);

    const getChart = () =>{
        
        if(isLoading){
            return <Bar options={options} data={chartData} ref={chartRef} onClick={onClick}  />;
        }

        return <></>;
    }

    const onClick = async(event) =>{
        var element = getElementAtEvent(chartRef.current,event);
        var index = element[0].index;
        await getStock(chartStock[index].m_id);    
    }

    const getStock = async(m_id) =>{
        
        let json = await API_GET("material/"+m_id);
        
        setStock(json.data);
    }

return(
    <>
        <div className="container-fluid mt-3" style={{height:"auto"}}>
            {
                getChart()
            }
        </div>

    </>
)
}