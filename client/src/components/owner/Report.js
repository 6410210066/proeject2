import { useEffect,useState } from "react";
import { Bar } from "react-chartjs-2";
import { API_GET } from "../../api";
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

export default function Report(){
    const [isLoading,setIsLoading] = useState(false);
    const [chartData,setChartData] = useState({});
}

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