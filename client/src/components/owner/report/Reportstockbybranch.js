import { useEffect, useRef, useState } from "react";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { API_GET } from "../../../api";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
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
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'รายงานจำนวนสินค้า',
        },
    },
};

export default function Reportstockbybranch(){
    const [isLoading,setIsLoading] = useState(false);
    const [chartData,setChartData] = useState({});
    const [store, setStore] = useState([]);
    const [productStore, setProductStore] = useState([]);
    const chartRef = useRef();

    useEffect(() => {
        async function fetchData() {
            let json = await API_GET("reportstockbybranch");

            var labels = [];
            var data = [];

            for (var i=0; i<json.data.length; i++) {
                var item = json.data[i];
                labels.push(item.m_name);
                data.push(item.stock_amonut);
            }

            var dataset = {
                labels: labels,
                dataset: [
                    {
                        label: "จำนวนสต๊อกสินค้าแยกตามประเภทสินค้า",
                        data: data,
                        backgroundColor: "rgba(255, 99, 132, 0.5)"
                    }
                ]
            }

            setChartData(dataset);
            setIsLoading(true);
        }

        fetchData();
    }, []);

    const getChart = () => {
        if (isLoading) {
            return <Bar options={options} data={chartData} />;
        }

        return (
            <>
                <div className="container-fluid mt-3">
                    {
                        getChart()
                    }
                </div>
            </>
        );
    }
}

