import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { SecondaryButton } from "../../../../components"
import classNames from "classnames";
import axios from "axios";
import AddMaterial from "./AddMaterial";

export default function SubjectResource() {
  const { subject_common_id } = useParams();
  const [data, setData] = useState();
  const [addMaterial, setAddMaterial] = useState(false)

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/subjects/',
    withCredentials: true
  })
  const fetch = async () => {
    try {
      const res = await axiosInstance.get(`${subject_common_id}/referenceMaterial`)
      if (res.status >= 400) throw new Error(res.data.message)
      return res?.data?.data;
    } catch (err) {
      window.alert(err.message)
    }
  }

  useEffect(() => {
    fetch().then((res) => {
      setData(res);
    })
  //eslint-disable-next-line
  }, [])


  const handleDelete = async (e,ind)=>{
    try {
      const res = await axiosInstance.patch(`/update-by-user/${subject_common_id}`,{
        prop:`referenceMaterial.${ind}`,
        del:true
      })
      if (res.status >= 400) throw new Error(res.data.message)
      const res2 = await fetch()
      setData(res2)
    } catch (err) {
      window.alert(err.message)
    }
  }
  const handleAdd = async (e,id)=>{
    try {
      const res = await axiosInstance.patch(`/update-by-user/${subject_common_id}`,{
        prop:"referenceMaterial",
        isnew:true,
        data:id
      })
      if (res.status >= 400) throw new Error(res.data.message)
      const res2 = await fetch()
      setData(res2)
      setAddMaterial(false)
    } catch (err) {
      window.alert(err.message)
    }
  }
  const handleAccept = async (e, del, isAdd, ind)=>{
    if(del){
      ind = data?.delIndex?.indexOf(ind);
      // console.log(ind)
    }
    try {
      const res = await axiosInstance.patch(`/accept-updates/${subject_common_id}`,{
        prop:`referenceMaterial`,
        [del?"del":"isnew"]:true,
        index:ind,
      })
      if (res.status >= 400) throw new Error(res.data.message)
      const res2 = await fetch()
      setData(res2)
    } catch (err) {
      window.alert(err.message)
    }
  }

  return (
  <div className="flex flex-col p-2 gap-2">
    {
      data?.referenceMaterial?.map((resource, indx) => (
        <Resource 
          resource={resource} 
          key={indx} 
          handleDelete={async (e)=>handleDelete(e, indx)}
          handleAccept={async (e)=>handleAccept(e, true,false, indx)}
          del = {data?.delIndex?.includes(indx)}
        />
      ))
    }

    <hr className="border-2 border-b my-4" />
    
    <div className="flex justify-between">
      <h1>Currently Added Material</h1>
      <SecondaryButton onClick={()=>setAddMaterial(prev=>!prev)}>Add new Material</SecondaryButton>
    </div>
    {
      data?.addReferenceMaterial?.map((resource, indx) => (
        <Resource 
          resource={resource}
          isAdd 
          key={indx}
          handleAccept={async (e)=>handleAccept(e, false, true, indx)}
        />
      ))
    }
    
    {addMaterial && <AddMaterial onClose={()=>setAddMaterial(false)} handleAdd={handleAdd}/>}
  
  </div>
  )
}

function Resource({ resource, isAdd, handleDelete, handleAccept, del}) {
  const classOne = classNames("flex flex-row gap-5 rounded-2xl p-2 h-full shadow-sm",{
    "bg-green-100":isAdd,
    "bg-white":!isAdd,
    "!bg-red-100":del
  })

  return <div className='mx-1 my-2 flex flex-col w-full min-w-fit'>
    <div className={classOne}>
      <Link
        to={resource?.url}
      >
        <img
          src={resource?.coverImageUrl}
          alt="book"
          className="flex shrink-0 h-full w-[60px] object-contain"
        />
      </Link>

      <div className='flex flex-col space-y-4 justify-between w-full'>
        <div className='flex flex-col space-y-1'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-row space-x-2 '>
              <div className='rounded-2xl bg-[#FEDEEA] px-2 py-1 font-medium text-[#F8186E] items-center justify-center'>
                {resource?.title}
              </div>
              <div className='rounded-2xl bg-[#F3FFC7] px-2 py-1 text-sm text-[#5B8506] items-center justify-center content-center'>
                {resource?.type}
              </div>
            </div>
          </div>
          <div className='text-medium'>by  {resource?.author}</div>
        </div>
      </div>
      {
        (isAdd || del)?
        <button onClick={handleAccept} className="px-2 py-1 rounded bg-secondary-500 text-white">
            Save
        </button>
        :
        <button onClick={handleDelete}>
          <img className="w-8 hover:mix-blend-luminosity" src="/deleteButton.png" alt="delete" />
        </button>
      }
    </div>
  </div>
}