import { useState, useEffect, useMemo } from "react";
import Resource from "./Resources";
import { Loading } from "../../../components";
import axios from 'axios';

function ResourcesPage() {
    const [Array, setArray] = useState([]);
    const [state, setState] = useState({
        search: "",
        format: ""
    })
    const [loading, setLoading] = useState(false)

    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080/api/v1/resources",
        withCredentials: true
    })

    const searchFunc = async ({search,format})=>{
        if(!search)search="";
        if(!format || format === "Select format")format=undefined;
        try{
            const res = await axiosInstance.get("",{
                params:{
                    search,
                    type:format
                }
            })
            if(res.status >= 400)throw new Error(res.data.message)
            setArray(res.data.data)
        }catch(err){
            window.alert(err.message)
        }
    }

    useEffect(() => {
        setLoading(true);
        searchFunc({search:"",format:""})
        .finally(()=>setLoading(false))
        //eslint-disable-next-line
    }, [])

    const debounce = () => {
        let timeOutId;
        return (e) => {
            let stateTemp;
            setState(prev=>{
                stateTemp = {
                    ...prev,
                    [e.target.name]:e.target.value
                }
                return stateTemp
            });
            clearTimeout(timeOutId);
            timeOutId = setTimeout(() => {
                console.log(stateTemp)
                searchFunc(stateTemp);
            }, 900);
        }
    }
    const handleChange = useMemo(() => debounce(),
    // eslint-disable-next-line
    []);

    if (loading) return <Loading count={5} cardClassName="!h-28" />

    return (
        <>
            <nav className="w-full flex justify-evenly items-center my-2 bg-secondary-100 rounded-xl">
                <img src="/search-black.png" alt="search" className="w-8 h-8" />
                <div className="w-[80%] flex justify-between">
                <div className="bg-white h-fit flex rounded m-2 items-center">
                    <input
                        type="text"
                        name="search"
                        value={state.search}
                        onChange={handleChange}
                        placeholder=" Enter title or author..."
                        className="border-2 border-solid border-gray-400 rounded focus:outline-none w-[28vw] h-8"
                    />
                </div>
                <select
                    name="format"
                    value={state.format}
                    onChange={handleChange}
                    className="border-2 border-gray-400 rounded px-4 my-2 focus:outline-none"
                >
                    <option value="Select format" className="text-base">Select format</option>
                    <option value="book" className="text-base">book</option>
                    <option value="video" className="text-base">video</option>
                    <option value="e-book" className="text-base">e-book</option>
                </select>
                </div>
            </nav>
            <div className="h-20 w-full border-2 border-gray-400 rounded-2xl text-2xl flex justify-center items-center">Add +</div>
            {
                Array.map((x, indx) => <Resource key={indx} resource={x} />)
            }
        </>
    )
}
export default ResourcesPage