import React from "react";
function Profile1(props){
    return (
<div className="flex flex-row space-x-6 px-6 py-10 border-indigo-700    ">
      
          <div >
             <img src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?w=826&t=st=1699892145~exp=1699892745~hmac=b4d3676cf0fd0db18167f6372c559f7c8854b768eb400a1e97b62d6bf1c2ceab"  alt="d" className=" h-[200px] w-[200px] rounded-[100%]"/>
          </div>
        
          <div className="flex justify-start flex-col al">

             <div className="flex flex-col flex-wrap">
                   <div className="font-semibold font-['Inter'] text-[32px] text-[#04314D] non-italic">{props.name}</div>
                   <div className="text-[17px]">{props.phno}</div>
              </div>


                    <div className="flex flex-row space-x-20">
                          <div className="flex flex-col font-normal text-[24px]  space-y-3  ">
                             <h1>Designation</h1>
                             <h1>Institute</h1>
                             <h1>Specialization</h1>
                          </div>

                          <div className="space-y-3 text-[#064D74] text-[24px] font-medium">
                              <div>{props.Designation}</div>
                              <div>{props.Institute}</div>
                              <div>{props.Specialization}</div>
                          </div>
                   </div>

        </div>

</div> 
    );
}

export default Profile1;