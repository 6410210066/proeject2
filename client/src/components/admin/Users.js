import { useEffect, useState } from "react"

export default function Users(){

    const [users,setUsers] = useState([]);


    useEffect( ()=>{
        async  function fetchData(){
            const response=await fetch(
                "http://localhost:8080/api/users",
                {
                    method: "GET",
                    headers:{
                        Accept:"application/json",
                        'Content-Type': 'application/json',
                    }
                }
            );

            let json = await response.json();
            setUsers(json.data);
            
        }
        fetchData();
    },[]);


    return(
        <>
            <div>
                {
                    users.map(item =>(
                        <div> 
                            <h4>{item.user_id}</h4> 
                            <h4>{item.username}</h4>
                            <h4>{item.password}</h4>
                            <h4>{item.role_id}</h4>
                        </div>

                    ))
                }
            </div>
        </>
    )
}