import { useState, useEffect, useMemo } from "react"
import { Loading, SecondaryButton } from "../../../components";
import AddResourceForm from "./AddResourceForm";
import SearchImg from "./../../../assets/Search.png"
import Resources from "./Resources";

export default function ResourceList({ searchReqFunc }) {
    const [Array, setArray] = useState([]);
    const [state, setState] = useState({
      search: "",
      format: ""
    })
  
    const [addResource, setAddResource] = useState(false);
    const [loading, setLoading] = useState(false)
  
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
      const res = await searchReqFunc({search, format})
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
  
  const handleAddButtonClose = async () => {
    setAddResource(false);
    setLoading(true);
    await searchFunc({ search: "", format: "" })
    setLoading(false)
  }
  
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
  
        <SecondaryButton
          onClick={() => setAddResource(prev => !prev)}
          className=""
        >
          Add New Resource+
        </SecondaryButton>
      </div>
  
      {/* ADD Resource Section */}
      {addResource && <AddResourceForm onClose={handleAddButtonClose} />}
  
      {/* Resources List Section */}
      {
        Array.map((x, indx) => <Resources key={indx} resource={x} />)
      }
    </>
  )
  }