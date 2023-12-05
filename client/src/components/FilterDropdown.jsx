import { useState } from "react";
import { useFilterContext } from "../context/FilterContext";

const FilterDropdown = ({name, defaultValue, list})=>
{
  const [value, setValue] = useState(defaultValue?defaultValue : "Select");

  if(!name || !list || list.length === 0) {
    throw new Error("Please pass all arguments in FilterDropdown component");
  }

  const { handleChange } = useFilterContext();

  const onChange = (e)=>{
    setValue(e.target.value);
    handleChange({name: e.target.value, value: e.target.value})
  }
  if(!list.includes(defaultValue)) list.unshift(defaultValue);

  return(
    <select 
      name={name}
      value={value}
      onChange={onChange}
      className="border-[1.4px] border-gray-500 rounded m-2 px-4 py-1 w-max-[10vw] focus:outline-none"
    >
      {
        list.map( (itemValue, index)=>{
          return (
            <option key={index} value={itemValue} className="text-sm">
              {itemValue}
            </option>
          );
        })
      }
    </select>
  )
}

export default FilterDropdown;