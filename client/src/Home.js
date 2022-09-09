import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import ProductItem from "./Productltem";

import Admin from "./components/admin/Admin";
import Owner from "./components/owner/Owner";
import Employee from "./components/employee/Employee";
import Manager from "./components/manager/Manager";

export default function Home() {

    const [roleid,setRole] = useState(0);
    const [token,setToken] = useState(0);
    const username = localStorage.getItem("username");

    const checkRole = async () => {
        const response = await fetch(
            "http://localhost:8080/home",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username
                })
            }
        );
        const data = await response.json();
        if(data.result === false){
            setRole(5);
        }else{
            setRole(data.data)
        }
    }
                          
    useEffect(()=> {
        checkRole();
    },[])


    return (
        <>
                {roleid === 5 && <Navigate to="/" replace />}
                {roleid === 1 && <Admin/>}
                {roleid === 2 && <Employee />}
                {roleid === 3 && <Manager />}
                {roleid === 4 && <Owner />} 
        </>
       
       // <Navigate to="/" replace />
    );    
}