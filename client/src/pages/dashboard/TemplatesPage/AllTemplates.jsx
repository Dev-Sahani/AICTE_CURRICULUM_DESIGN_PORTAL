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
        const getCourses = async ()=>{
            try{
                const data = await getAllCourses();
                setTemplates(data.data);
            } catch(err) {
                setTemplates([]);
            }
        }
        getCourses();
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
                        key={template.common_id}
                        className={CardsClasses}
                        to={`/curriculum/${template.common_id}`} 
                    >
                        <h1 className='text-xl m-2'>{template.title}</h1>
                        <p className='text-xs mx-2 mb-2'>{template.description}</p>
                        <div className='flex text-xs'>
                            <div className="bg-secondary-100 text-secondary-900 px-2 py-1 m-2 rounded-full">
                                {template.level}
                            </div>
                            <div className="bg-purple-200 text-purple-800 px-2 py-1 m-2 rounded-full">
                                {template.program}
                            </div>
                        </div>
                    </Link>
                )
            })
        }
    </div>
  )
}


const getAllTemplates = ()=>{
    return [
        {
            common_id: "12434",
            courseName: "Computer Science",
            about: "Computer Science Engineering is a course that deals with the design, implementation, and management of information systems of both software and hardware processes.",
            program: "Engineering and Technology",
            level: "Undergraduate",
            url:function () {
                return `/curriculum/${this.common_id}`;
            },
        }, {
            common_id: "22432",
            courseName: "Electrical Engineering",
            about: "This involves the generation and distribution of electricity and the design of related devices. These engineers are involved in traditional nuclear & renewable energy solutions.",
            program: "Engineering and Technology",
            level: "Undergraduate",  
            url:function () {
                return `/curriculum/${this.common_id}`;
            },
        }, {
            common_id: "24542",
            courseName: "Bachelor of Architecture",
            about: "The 5-year Bachelor of Architecture program is aimed at enabling the students to become responsive and sensitive architects. ",
            program: "Architecture",
            level: "Undergraduate",  
            url:function () {
                return `/curriculum/${this.common_id}`;
            },
        }, {
            common_id: "24552",
            courseName: "Bachelor of Architecture II",
            about: "The 5-year Bachelor of Architecture program is aimed at enabling the students to become responsive and sensitive architects.",
            program: "Architecture",
            level: "Undergraduate",  
            url:function () {
                return `/curriculum/${this.common_id}`;
            },
        }, {
            common_id: "57552",
            courseName: "Bachelor of Planning",
            about: "Bachelor of planning trains students in various fields related to urban human settlements such as designing, engineering, managing and overcoming challenges. ",
            program: "Town Planning",
            level: "Undergraduate",  
            url:function () {
                return `/curriculum/${this.common_id}`;
            },
        }, {
            common_id: "24662",
            courseName: "Biotechnology",
            about: "Biotechnology is technology that utilizes biological systems, living organisms or parts of this to develop or create different products.",
            program: "Pharmacy",
            level: "Undergraduate",  
            url:function () {
                return `/curriculum/${this.common_id}`;
            },
        }, {
            common_id: "33821",
            courseName: "Mechanical Engineering",
            about: "The core subjects in Mechanical Engineering include Solid Mechanics, Fluid Mechanics, Kinematics and Dynamics of Machines, Manufacturing Processes, Engineering Thermodynamics, Mechanical Engineering Drawing, Heat and Mass Transfer, and CAD and Finite Element Analysis.",
            program: "Engineering and Technology",
            level: "Undergraduate",  
            url:function () {
                return `/curriculum/${this.common_id}`;
            },
        }
    ]
}