import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios";

export default function SubjectResource() {
  const { subject_common_id } = useParams();
  const [data, setData] = useState();

  const axiosInstance = axios.create({
    baseURL: `http://localhost:8080/api/v1/subjects/${subject_common_id}/referenceMaterial`,
    withCredentials: true
  })
  const fetch = async () => {
    try {
      const res = await axiosInstance.get("")
      if (res.status >= 400) throw new Error(res.data.message)
      // console.log(res?.data?.data?.referenceMaterial)
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

  return (<div className="flex flex-col p-2 gap-2">
    {
      data?.referenceMaterial?.map((resource, indx) => (
        <Resource resource={resource} key={indx}/>
        ))
      }
    <hr className="border-2 border-b my-4" />
    Currently Added Material
    {
      data?.addReferenceMaterial?.map((resource, indx) => (
        <Resource resource={resource} isAdd key={indx}/>
      ))
    }
  </div>
  )
}

function Resource({ resource, isAdd }) {
  const classOne = `flex flex-row gap-5 rounded-2xl p-2 h-full ${isAdd?"bg-green-100":"bg-white"} shadow-sm`
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
      <button onClick={() => { }}>
        <img className="w-8 hover:mix-blend-luminosity" src="/deleteButton.png" alt="delete" />
      </button>
    </div>
  </div>
}