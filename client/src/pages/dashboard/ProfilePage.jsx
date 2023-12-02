import React from 'react'
import Profile1 from "./Profile1"
import Profile2 from "./Profile2"

const ProfilePage = () => {
  return (
    <div className='flex flex-col'>
        <Profile1 name={"Dr rachana singh"} phno={3453458394583}  Designation={"professor"}  Institute={"IIT-D"} Specialization={"Computer Engineering" }
           />
       <Profile2 />  









    </div>
  )
}

export default ProfilePage