import { useState } from "react";
// import axios from "axios";
import { SecondaryButton } from "../../../components";

export default function AddResourceForm({onClose, resource}) {
    const [state, setState] = useState({
        title:resource?.title || "",
        author:resource?.author || "",
        publisher:resource?.publisher || "",
        url:resource?.url || "",
        coverImageUrl:resource?.coverImageUrl || "",
        type:resource?.type || "",
        description:resource?.description || "",
    })
    const [loading, setLoading] = useState(false)
    
    const handleChange = (e)=>{
        setState(prev=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    const handleEdit = async (e)=>{
        // ----------------- HANDLE NOTIFICATION -----------------------

        setLoading(true)
        // try{
        //     if(!state.type || state.type==="select format" || !state.author || !state.title || !state.url || !state.coverImageUrl || !state.description){
        //         throw new Error("Please enter details correctly")
        //     }
        //     await axios.post("http://localhost:8080/api/v1/resources/",{
        //         title:state.title,
        //         author:state.author,
        //         type:state.type,
        //         url:state.url,
        //         publisher:state.publisher,
        //         coverImageUrl:state.coverImageUrl,
        //         description:state.description
        //     },{
        //         withCredentials:true
        //     })
        
        // }catch(err){
        //     window.alert(err.message)
        // }
        setLoading(false)
        // onClose();
    }

    return (
    <Modal onClose={onClose}>
        <form  className="mt-4 w-full p-4 pt-8 flex flex-col gap-2 overflow-auto">
            <div className="flex justify-between items-center px-2">
                <label className="" for="title@add">Title</label>
                <input 
                    value={state.title} 
                    className="w-[80%] p-1 border-2 border-gray-400 rounded focus:outline-none resize-none" 
                    name="title" 
                    id="title@add"
                    placeholder="Enter title..."
                    onChange={handleChange}
                    />
            </div>

            <div className="flex justify-between items-center px-2">
                <label className="" for="author@add">Author</label>
                <input 
                    value={state.author}
                    className="w-[80%] p-1 border-2 border-gray-400 rounded focus:outline-none resize-none" 
                    name="author" 
                    id="author@add" 
                    placeholder="Enter Author..."
                    onChange={handleChange}
                    />
            </div>
            <div className="flex justify-between items-center px-2">
                <label className="" for="publisher@add">Publisher</label>
                <input 
                    value={state.publisher}
                    className="w-[80%] p-1 border-2 border-gray-400 rounded focus:outline-none resize-none" 
                    name="publisher" 
                    id="publisher@add" 
                    placeholder="Enter Publisher..."
                    onChange={handleChange}
                    />
            </div>

            <div className="flex justify-between items-center px-2">
                <label className="" for="url@add">Url</label>
                <input 
                    value={state.url} 
                    className="w-[80%] p-1 border-2 border-gray-400 rounded focus:outline-none resize-none" 
                    name="url" 
                    id="url@add" 
                    placeholder="Enter Url... if any"
                    onChange={handleChange}
                    />
            </div>

            <div className="flex justify-between items-center px-2">
                <label className="" for="imgurl@add">Image Url</label>
                <input 
                    value={state.coverImageUrl} 
                    className="w-[80%] p-1 border-2 border-gray-400 rounded focus:outline-none resize-none" 
                    name="coverImageUrl" 
                    id="imgurl@add" 
                    placeholder="Enter Image Url... if any"
                    onChange={handleChange}
                    />
            </div>

            <div className="flex justify-start gap-12 items-center px-2">
                <label className="" for="type@invite">Format</label>
                <select 
                    className="border-2 border-gray-400 rounded px-2 py-1 focus:outline-none"
                    name="type"
                    id="type@invite"
                    onChange={handleChange} 
                    value={state.type}
                >
                    <option value="select format" className="text-sm">select format</option>
                    <option value="book" className="text-sm">book</option>
                    <option value="e-book" className="text-sm">e-book</option>
                    <option value="videos" className="text-sm">videos</option>
                </select>
            </div>

            <div className="items-center px-2">
                <label className="block" for="text@invite">Description</label>
                <textarea
                    type="text"
                    value={state.description}
                    name="description"
                    id="text@invite"
                    placeholder="Enter description..."
                    onChange={handleChange}
                    className="w-full h-44 overflow-auto p-1 border-2 border-gray-400 rounded focus:outline-none resize-none"
                />
            </div>
            <SecondaryButton 
                className={`${loading&& "opacity-50"} !mx-2`}
                disabled={loading}
                onClick={handleEdit}
            >
                save
            </SecondaryButton>
        </form>
    </Modal>
    )
}

function Modal({onClose, children}){
    return (
    <div className="overflow-y-auto bg-[#3c3c5066] overflow-x-hidden fixed top-0 left-0 z-50 w-full md:inset-0 h-full max-h-full">
        <div className="relative flex items-center justify-center h-full w-full">
            {/* Modal content */} 
            <div className="h-[36rem] w-[34rem] relative rounded-lg shadow bg-primary-50">
                <button onClick={()=>onClose()} className="bg-secondary-400 rounded-full w-8 h-8 text-2xl font-semibold absolute top-[4px] right-[4px]">
                    x
                </button>

                {children}
            
            </div>
        </div>
    </div>
    )
}