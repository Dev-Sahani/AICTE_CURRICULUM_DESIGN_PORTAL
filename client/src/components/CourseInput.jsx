import { useCourseContext } from "../context";
import classnames from 'classnames'

export default function CourseInput({ 
    name,
    placeholder,
    subjectId,
    className,
}){
  const courseContext = useCourseContext();
  const { handleChange } = useCourseContext();
  const value = courseContext[name]?.cur;
  
  className = classnames(
    "w-full p-1 max-h-64",
    "border-2 border-gray-400 rounded focus:outline-none resize-none",
    className)

  return (
    <textarea 
        type="text"
        name={name}
        value={value}
        onChange={(e)=>handleChange(name, e.target.value)}
        placeholder={placeholder?placeholder:`Enter ${name}`}
        className={className}
    />
  )
}
