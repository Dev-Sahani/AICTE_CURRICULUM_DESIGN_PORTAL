import {useUserContext} from './../../../context/UserContext'

export default function Committee(){
    const {user} = useUserContext();

    if(user.role === "Administrator"){
        //get all committee 

        //add committee button
    }else{
        //get selected committee
    }
    return <>
        <div className='grid grid-cols-2 p-8 gap-6 w-full'>
            {
                committeeList.map((el)=>
                    <div className=' bg-white border border-purple-100 rounded-lg transform transition-transform duration-300 hover:scale-[1.03]'>
                        <h1>{el.title}</h1>
                        <h2>{el.dateOfCreation}</h2>
                        <h2>{el.createdBy}</h2>
                    </div>
                )
            }
        </div>
    </>
}

const committeeList = [
    {
        title:"machatronics",
        dateOfCreation:"2023",
        createdBy:"user@admin"
    },
    {
        title:"computer science 101",
        dateOfCreation:"2022",
        createdBy:"user@admin"
    }
]