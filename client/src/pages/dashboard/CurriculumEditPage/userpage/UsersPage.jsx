import { useEffect,  useState} from "react";
import { useParams } from "react-router-dom";
import {Loading, SecondaryButton} from "../../../../components";
import AddUserModal from "./AddUserModal"
import InviteUserModal from "./InviteUserModal"
import axios from "axios";


export default function UsersPage(){
    const {common_id} = useParams();
    const [data, setData] = useState()
    const [addButton, setAddButton] = useState(false)
    const [inviteButton, setInviteButton] = useState(false)
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
    //eslint-disable-next-line
    },[])

    const handleChange = async (e)=>{
        setLoading(true)
        try{
            await axiosInstance.patch("",{
                _id:e.target.name,
                access:e.target.value
            })
            const res = (await fetchData()).data.data
            setData(res)
        }catch(err){
            window.alert(err.message)
        }
        setLoading(false)
    }

    const handleDelete = async (e, _id)=>{
        setLoading(true)
        try{
            await axiosInstance.delete("", {
                data:{_id}
            })
            const res = (await fetchData()).data.data
            setData(res)
        }catch(err){
            window.alert(err.message)
        }
        setLoading(false)
    }

    const handleInvite = async ()=>{
        setInviteButton(true)
    }
    const handleAdd = async ()=>{
        setAddButton(prev=>!prev)
    }

    const onCloseModal = ()=>{
        setAddButton(false)
        setLoading(true)
        fetchData()
            .then((res)=>setData(res.data.data))
            .catch((err)=>window.alert(err.message))
            .finally(()=>setLoading(false))
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
                        name={user._id}
                        value={user.courses.find(el=>el.id === common_id).access}
                        onChange={handleChange}
                        className="border-2 border-gray-400 rounded px-4 py-1 focus:outline-none"
                    >
                        <option value="head" className="text-sm">head</option>
                        <option value="edit" className="text-sm">edit</option>
                        <option value="view" className="text-sm">view</option>
                    </select>
                </div>
                <button onClick={(e)=>handleDelete(e, user._id)} >
                    <img className="w-8 hover:mix-blend-luminosity" src="/deleteButton.png" alt="delete button" />
                </button>
            </div>
        </div> 
    ))

    return <div className="h-full">
        <div className="w-full px-2 flex justify-between">
            <h1 className="text-2xl">Previous versions</h1>
            <div className="flex gap-2">
                <SecondaryButton onClick={handleInvite}>Invite User</SecondaryButton>
                <SecondaryButton onClick={handleAdd}>Add User</SecondaryButton>
            </div>
        </div>
        <div className="flex flex-col m-4 gap-2">
            {
                loading?
                <Loading count={5} cardClassName="!w-[80%]"/>
                :
                list
            }
        </div>

        {addButton && <AddUserModal onClose={onCloseModal} data={data}/>}
        {inviteButton && <InviteUserModal onClose={()=>setInviteButton(false)} data={data}/>}
    </div>
}