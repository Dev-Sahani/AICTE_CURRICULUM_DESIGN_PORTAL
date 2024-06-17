import { useState } from "react";
import { useUserContext } from "../../../context";
import { getAllLevels, getAllProgrammes } from "../../../utils/getAllProgramAndLevels";

export default function TemplatePageFilter({ templates, setTemplates }) {
  const { accessedCourses } = useUserContext();
  const [value, setValue] = useState({
    title: "",
    level: "",
    program: ""
  })

  const handleSubmit = (e) => {
    const newValue = {...value, [e.target.name]: e.target.value};
    setValue(newValue);

    setTemplates(
      accessedCourses.filter(course => {
        for(const name in newValue) {
          if(!course[name]?.cur?.toLowerCase().includes(newValue[name].toLowerCase()))
            return false;
        }
  
        return true;
      })
    );
  }

  return (
    <nav className="w-full flex justify-between items-center my-2">
      <div className="bg-white h-fit flex border-[1.4px] border-gray-500 rounded m-2 items-center">
        <img src="/Search.png" alt="search" className="w-10 h-10" />
        <input 
          type="text"
          name="title"
          value={value.title}
          onChange={handleSubmit}
          placeholder="Select title"
          className="focus:outline-none w-[24vw]"
        />
      </div>
     
      <select className="bg-white h-fit  p-1.5 min-w-44 border-[1.4px] border-gray-500 rounded cursor-pointer" onChange={handleSubmit} value={value.level} name="level">
        <option value="" defaultChecked>
          Select level
        </option>
        {
          getAllLevels.map((option, index) => 
            <option key={index} value={option} className="cursor-pointer outline-none">
              {option}
            </option>
          )
        }
      </select>
     
      <select className="bg-white h-fit  p-1.5 min-w-44 border-[1.4px] border-gray-500 rounded cursor-pointer" onChange={handleSubmit} value={value.program} name="program">
        <option value="" defaultChecked>
          Select program
        </option>
        {
          getAllProgrammes.map((option, index) => 
            <option key={index} value={option} className="cursor-pointer outline-none">
              {option}
            </option>
          )
        }
      </select>
    </nav>
  )
}
