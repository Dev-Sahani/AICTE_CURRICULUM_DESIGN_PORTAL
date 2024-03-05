import { useEffect, useState } from "react";
import AddImage from "../../../assets/Add.png"
import { Link } from 'react-router-dom';
import { useFilterContext } from "../../../context/FilterContext";
export default function AllTemplates() {
    const {
        getAllCourses, 
        courseSearch, 
        courseLevel, 
        courseProgram
    } = useFilterContext();

    const [templates, setTemplates] = useState([]);
    useEffect(()=>{
        getAllCourses().then(res=>{
            if(res) setTemplates(res.data);
        })
    // eslint-disable-next-line
    }, [courseSearch, courseLevel, courseProgram]);
    
    
    const CardsClasses = " bg-white border border-purple-100 rounded-lg transform transition-transform duration-300 hover:scale-[1.03] "

    return (
        <div className='w-full grid grid-cols-2 my-4 gap-6 min-w-fit'>
            <Link 
                className={CardsClasses + " flex flex-col items-center justify-center"} 
                to="/new-template"
            >
                <img src={AddImage} alt="add_image" className="h-16 w-16"/>
                <h1>Start with new Template</h1>
            </Link>
        {
            templates.map((template) => {
                return (
                    <Link 
                        key={template?.common_id}
                        className={CardsClasses}
                        to={`/curriculum/${template?.common_id}`} 
                    >
                        <h1 className='text-xl m-2 mb-0'>{template?.title?.cur}</h1>
                        <p className='text-xs mx-2 mb-2 text-gray-300'>{template?.common_id}</p>
                        <div className='flex text-xs'>
                            <div className="bg-secondary-100 text-secondary-900 px-2 py-1 m-2 rounded-full">
                                {template?.level?.cur}
                            </div>
                            <div className="bg-purple-200 text-purple-800 px-2 py-1 m-2 rounded-full">
                                {template?.program?.cur}
                            </div>
                        </div>
                        <div className="mr-2 absolute top-1 right-1 text-gray-300">{template?.version}</div>
                    </Link>
                )
            })
        }
    </div>
  )
}


// const getMessage = ()=>{
//     return [
//         {message: "The quality of technical education depends on many factors but largely on outcome based socially and industrially relevant curriculum, good quality motivated faculty, teaching learning process, effective industry internship and evaluation of students based on desired outcomes."},
//         {message: "Mechatronics engineering enables vehicles to be safer, more efficient, and connected, revolutionizing the way we commute and interact with transportation systems"},
//         {message: "Mechatronics engineering enables vehicles to be safer, more efficient, and connected, revolutionizing the way we commute and interact with transportation systems"},
        
//     ]
// }