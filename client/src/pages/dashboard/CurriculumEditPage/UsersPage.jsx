import { useEffect,  useState} from "react";
import { useParams } from "react-router-dom";
import {Loading, PrimaryButton} from "../../../components";
import axios from "axios";


export default function UsersPage(){
    const {common_id} = useParams();
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)

    const axiosInstance = axios.create({
        baseURL:"http://localhost:8080/api/v1/courses/"+common_id+"/users",
        withCredentials:true
    })
    const fetchData = async ()=>{
        return await axiosInstance.get()
    }

    useEffect(()=>{
        setLoading(true)
        fetchData()
            .then((res)=>setData(res.data.data))
            .catch((err)=>window.alert(err.message))
            .finally(()=>setLoading(false))
    // eslint-disable-next-line
    },[])

    const handleChange = async (e)=>{
        setLoading(true)
        try{
            await axiosInstance.patch("",{
                userId:e.target.name,
                access:e.target.value
            })
            const res = (await fetchData()).data.data
            setData(res)
        }catch(err){
            window.alert(err.message)
        }
        setLoading(false)
    }

    const handleDelete = async (e, userId)=>{
        setLoading(true)
        try{
            await axiosInstance.delete("", {
                data:{userId}
            })
            const res = (await fetchData()).data.data
            setData(res)
        }catch(err){
            window.alert(err.message)
        }
        setLoading(false)
    }
    
    const list = data?.map(user=>(
        <div key={user._id} className="w-[80%] rounded-2xl flex justify-between p-4 border-2 border-gray-500">
            <div className="flex gap-2">
                <img className="w-12 h-12 object-cover rounded-full" alt="profile" src={user.profileImgUrl} />
                <div>
                    <p>@{user.email}</p>
                    <h3>{user.name}</h3>
                </div>
            </div>
            <div className="flex gap-2">
                <div className="px-2">
                    <p>Access type:</p>
                    <select
                        name={user.userId}
                        value={user.courses.find(el=>el.id === common_id).access}
                        onChange={handleChange}
                        className="border-2 border-gray-400 rounded px-4 py-1 focus:outline-none"
                    >
                        <option value="head" className="text-sm">head</option>
                        <option value="edit" className="text-sm">edit</option>
                        <option value="view" className="text-sm">view</option>
                    </select>
                </div>
                <button onClick={(e)=>handleDelete(e, user.userId)} >
                    <img className="w-8 hover:mix-blend-luminosity" src="/deleteButton.png" alt="delete button" />
                </button>
            </div>
        </div> 
    ))

    return <div className="">
        <h1 className="w-[80%] text-2xl text-center">Previous versions</h1>
        <div className="flex flex-col m-4 gap-2">
            <form className="w-[80%] rounded-2xl flex justify-between p-4 border-2 border-gray-500">
                <div>
                    <label>email</label>
                    <input type="email" value="" onChange={()=>{}} ></input>
                    <br></br>
                    <label>Access type</label>
                    <select onChange={()=>{}} className="border-2 border-gray-400 rounded px-4 py-1 focus:outline-none">
                        <option className="text-sm">head</option>
                        <option className="text-sm">edit</option>
                        <option className="text-sm">view</option>
                    </select>
                </div>
                <PrimaryButton className="text-center !rounded-2xl" onClick={()=>{}}>Add To this course</PrimaryButton>
            </form>
            {
                loading?
                <Loading count={5} cardClassName="!w-[80%]"/>
                :
                list
            }
        </div>
    </div>
}