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
            text: 'รายงานข้อมูลแสดงการขาย'
        },
    }
}
export default function Reportsellrecord(props){
    const [isLoading,setIsLoading] =useState(false);
    const [chartData,setChartData] =useState({});
    const [chartStock,setChartStock] =useState([]);
    const [stock,setStock] = useState([]);
    const chartRef = useRef();
    const [num,setNum] =useState(0);

    useEffect(()=>{
       
        // fetchData();
    },[]);

    useEffect(()=>{
        if(num == 1){
            fetchDataday();
        }else if(num == 2){
            fetchDatamonth();
        }
       
    },[num]);

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

    const selecttype = async(num1) =>{
        if(num1 == 1){
            setNum(1);
        }else if(num1 == 2){
            setNum(2);
        }
    }


    const fetchDataday = async() =>{

        let json = await API_GET("reportsellrecord");
        setChartStock(json.data)
        
        var labels =[];
        var data = [];

        for(var i =0; i < json.data.length; i ++){
            var item = json.data[i];
            labels.push(item.branch_name);
            data.push(item.sell);
        }
        var dataset = {
            labels:labels,
            datasets: [
                {
                    label:"จำนวนข้อมูลแสดงการขาย",
                    data: data,
                    backgroundColor: "rgba(0, 189, 137 ,255)"
                }
            ]
        }
        setChartData(dataset);
        setIsLoading(true);
    }
    const fetchDatamonth = async() =>{

        let json = await API_GET("reportsellrecordmonth");
        setChartStock(json.data);
        
        var labels =[];
        var data = [];

        for(var i =0; i < json.data.length; i ++){
            var item = json.data[i];
            labels.push(item.branch_name);
            data.push(item.sell);
        }
        var dataset = {
            labels:labels,
            datasets: [
                {
                    label:"จำนวนข้อมูลแสดงการขาย",
                    data: data,
                    backgroundColor: "rgba(0, 189, 137 ,255)"
                }
            ]
        }
        setChartData(dataset);
        setIsLoading(true);
    }

return(
    <>
    <div>
        <button type="button" class="btn btn-dark mt-3 mx-2" onClick={event => selecttype(1)}>วัน</button>
        <button type="button" class="btn btn-dark mt-3 mx-3" onClick={event => selecttype(2)}>เดือน</button>
    </div>
        <div className="container-fluid mt-3" style={{height:"auto"}}>
            {
                getChart()
            }
        </div>

    </>
)
}