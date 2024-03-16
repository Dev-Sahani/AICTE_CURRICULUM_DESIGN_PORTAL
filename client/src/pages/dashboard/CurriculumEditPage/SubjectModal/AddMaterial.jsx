import { Modal } from "../../../../components"

import { useState, useEffect, useMemo } from "react"
import { Loading } from "../../../../components";
import SearchImg from "./../../../../assets/Search.png"
import ExpandDown from "./../../../../assets/expand-down.png"
import { Link } from "react-router-dom";
import axios from "axios";

export default function AddMaterial({ onClose, handleAdd }) {
  return <Modal onClose={onClose}>
    <ResourceList handleAdd={handleAdd} />
  </Modal>
}


function ResourceList({ handleAdd }) {
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

  const searchReqFunc = async ({ search, format }) => {
    try {
      const res = await axiosInstance.get("", {
        params: {
          search,
          type: format
        }
      })
      if (res.status >= 400) throw new Error(res.data.message)
      return res?.data?.data;
    } catch (err) {
      window.alert(err.message)
    }
  }

  const debounce = () => {
    let timeOutId;
    return (e) => {
      let stateTemp;
      setState(prev => {
        stateTemp = {
          ...prev,
          [e.target.name]: e.target.value
        }
        return stateTemp
      });
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {

        searchFunc(stateTemp);
      }, 900);
    }
  }

  const searchFunc = async ({ search, format }) => {
    if (!search) search = "";
    if (!format || format === "Select format") format = undefined;
    const res = await searchReqFunc({ search, format })
    setArray(res);
  }

  useEffect(() => {
    setLoading(true);
    searchFunc({ search: "", format: "" })
      .finally(() => setLoading(false))
    //eslint-disable-next-line
  }, [])

  const handleChange = useMemo(() => debounce(),
    // eslint-disable-next-line
    []);

  if (loading) return <Loading count={5} cardClassName="!h-28" />

  return (
    <>
      {/* Search Bar Section */}
      <div className="w-full flex justify-evenly items-center my-2 rounded-xl">
        <div className="border-2 border-gray-400 bg-white h-fit flex rounded m-2 items-center">
          <img src={SearchImg} alt="search" className="w-8 h-8" />
          <input
            type="text"
            name="search"
            value={state.search}
            onChange={handleChange}
            placeholder=" Enter title or author..."
            className="rounded focus:outline-none w-[28vw] h-8"
          />
        </div>
        <div className="border-2 border-gray-400 bg-white h-fit flex rounded m-2 items-center">
          <img src={SearchImg} alt="search" className="w-8 h-8" />
          <select
            name="format"
            value={state.format}
            onChange={handleChange}
            className="rounded px-4 h-8 focus:outline-none"
          >
            <option value="Select format" className="text-base">Select format</option>
            <option value="book" className="text-base">book</option>
            <option value="video" className="text-base">video</option>
            <option value="e-book" className="text-base">e-book</option>
          </select>
        </div>
      </div>
      {/* Resources List Section */}
      {
        Array.map((x, indx) => <div onClick={e=>handleAdd(e,x._id)}>
          <Resources key={indx} resource={x} />
        </div>
        )
      }
    </>
  )
}

function Resources({ resource }) {
  const [expand, setExpand] = useState(false)

  const truncatedDescription = (resource.description.length > 25 && !expand)
    ? (`${resource.description.substr(0, 25)}...`)
    : (resource.description);
  return (
    <div className='mx-1 my-2 flex flex-col w-full min-w-fit '>
      <div className='rounded-2xl flex flex-row p-5 pb-3 space-x-3 gap-5 h-full bg-white shadow-sm'>
        <Link
          to={resource.url}
        >
          <img
            src={resource.coverImageUrl}
            alt="book"
            className="flex shrink-0 h-full w-[90px] object-contain"
          />
        </Link>

        <div className='flex flex-col space-y-4 justify-between w-full'>
          <div className='flex flex-col space-y-1'>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row space-x-2 '>
                <div className='rounded-2xl bg-[#F3FFC7] px-4 py-1.5 font-medium text-[#5B8506] items-center justify-center content-center'>{resource.type}</div>
                <div className='rounded-2xl bg-[#FEDEEA] px-4 py-1 font-medium text-[#F8186E] items-center justify-center'>{resource.title}</div>
              </div>
            </div>
            <div className=' text-medium'>{resource.author}</div>
          </div>
          <div className='text-sm'>
            {truncatedDescription}
          </div>
        </div>
        <button onClick={() => setExpand(prev => !prev)}>
          <img className={`hover:scale-110 transition-transform duration-500 ease-out ${expand && "rotate-180"}`} src={ExpandDown} alt="down" />
        </button>
      </div>
    </div>
  )
}