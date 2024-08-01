import { useMemo, useState } from "react"
import Search from "../assets/Search.png";
import { useFilterContext } from "../context/FilterContext";

export default function FilterSearch({ 
    name, 
    defaultValue,
    placeholder,
    className,
}){

  const [localSearch, setLocalSearch] = useState(defaultValue?defaultValue:"");
  const { handleChange } = useFilterContext();

  const debounce = ()=>{
    let timeOutId;
    return (e)=>{
      setLocalSearch(e.target.value);
      clearTimeout(timeOutId);
      timeOutId = setTimeout(()=>{
        handleChange({name: e.target.name, value: e.target.value});
      }, 900);
    }
  }
  const optimizedDebounce = useMemo(()=>debounce(), 
  // eslint-disable-next-line
  []);

  let classes = " bg-white h-fit flex border-[1.4px] border-gray-500 rounded m-2 items-center";
  if(className) classes = className + classes;

  return (
    <div className={classes}>
      <img src={Search} alt="search" className="icon-size"/>
      <input 
          type="text"
          name={name}
          value={localSearch}
          onChange={optimizedDebounce}
          placeholder={placeholder?placeholder:"Enter..."}
          
          className="focus:outline-none w-[24vw]"
      />
    </div>
  )
}
