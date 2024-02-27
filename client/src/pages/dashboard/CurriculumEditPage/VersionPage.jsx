import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function VersionPage(){
    const {common_id} = useParams();
    const [data, setData] = useState()
    useEffect(()=>{
        axios.get("http://localhost:8080/api/v1/commit/get-all-commits/"+common_id,{
            withCredentials:true
        }).then((res)=>{
            setData(res.data.data.commits)
            console.log(res)
        }).catch((err)=>window.alert(err.message))
    },[])
    return <div className="">
        <h1 className="w-[80%] text-2xl text-center">Previous versions</h1>
        <div className="flex flex-col m-4 gap-2">
            {
                data?.map((version,ind)=>(
                    <div className="w-[80%] rounded-2xl flex justify-evenly p-4 border-2 border-gray-500">
                        <h2>{version.dateOfCommit.substring(11,19) +"   "+  version.dateOfCommit.substring(0,10)}</h2>
                        <h2>{version.title?.cur}</h2>
                    </div> 
                ))
            }
        </div>
    </div>
}