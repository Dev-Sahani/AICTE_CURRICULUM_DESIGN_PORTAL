import { useState, useMemo } from "react"
import SearchImg from "./../../../assets/Search.png"
import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL;


const SearchBar = ({ setCourse }) => {
  const [Array, setArray] = useState([]);
  const [state, setState] = useState({
    search: "",
    level: ""
  })

  const [focus, setFocus] = useState(false)

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

  const searchFunc = async ({ search, level }) => {
    if (!search) search = "";
    if (!level || level === "Select level") level = "";

    let query = "?";
    query += `search=${search}`;
    query += `&level=${level}`;

    let response = undefined;
    const url = `${BASE_URL}/api/v1/courses${query}`;
    
    try {

      response = await axios.get(url, { withCredentials: true });
      if (response.request.status >= 400) {
        throw new Error("Cannot get course!");
      }
      setArray(response.data?.data)
    } catch (err) {
      // error handling
    }
    return response;
  }

  const handleSearch = useMemo(() => debounce(),
    // eslint-disable-next-line
  []);

  return (
    <div>
      {/* Search Bar Section */}
      <div className="w-full flex justify-start items-center my-2 rounded-xl relative">
        <div className="border-2 border-gray-400 bg-white h-fit flex rounded m-2 items-center">
          <img src={SearchImg} alt="search" className="w-8 h-8" />
          <input
            type="text"
            name="search"
            value={state.search}
            onChange={handleSearch}
            onFocus={()=>setFocus(true)}
            onBlur={()=>setTimeout(()=>setFocus(false),500)}
            placeholder=" Enter course name or id..."
            className="rounded focus:outline-none w-[36vw] h-8"
          />
        </div>
        { focus && Array.length>0 && 
          <div className="absolute w-[40vw] min-h-12 max-h-80 overflow-y-auto top-[100%] p-2 rounded-xl border-2 border-gray-400 bg-white">
            {
              Array.map((el, indx)=>{
                return <div 
                  key = {indx}
                  className="px-4 py-2 border-t-2 border-gray-400 first:border-t-0 flex justify-between"
                  onClick = {()=>{setCourse(el)}}
                >
                  <p>{el.title.cur}</p>
                  <p>{el.level.cur}</p>
                </div>
              })
            }
          </div>
        }

        <div className="border-2 border-gray-400 bg-white h-fit flex rounded m-2 items-center">
          <img src={SearchImg} alt="search" className="w-8 h-8" />
          <select
            name="level"
            value={state.level}
            onChange={handleSearch}
            onFocus={()=>setFocus(true)}
            onBlur={()=>setTimeout(()=>setFocus(false),500)}
            className="rounded px-4 h-8 focus:outline-none"
          >
            <option value="Select level" className="text-base">Select level</option>
            <option value="undergraduate" className="text-base">undergraduate</option>
            <option value="postgraduate" className="text-base">postgraduate</option>
            <option value="diploma" className="text-base">diploma</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchBar