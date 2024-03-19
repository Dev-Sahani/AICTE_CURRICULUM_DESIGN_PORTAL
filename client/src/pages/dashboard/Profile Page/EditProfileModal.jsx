import { useState } from "react"
import { Modal, SecondaryButton } from "../../../components"
import { useUserContext } from "../../../context"

export default function EditProfile({ onClose }) {
  const {user, updateUserProfile} = useUserContext();
  const inputClass= "w-[80%] m-2 px-2 border-[1.4px] border-gray-500 outline-none rounded items-center";
  const inputContainerClass = "flex justify-between items-center text-lg";
  const labelClass = "h-fit"

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    name:user.name,
    profileImgUrl:user.profileImgUrl,
    gender:user.gender,
    dob:user.dob,
    // specialization:user.areaOfSpecialization,
  })

  const handleChange = async (e)=>{
    setData(prev=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  const handleCancel = async (e)=>onClose()
  const handleSubmit = async (e)=>{
    setLoading(true);
    await updateUserProfile({
      ...data,
      email:user.email,
    })
    setLoading(false)
  }

  const profileImgClass = "w-64 h-64 rounded-full overflow-hidden bg-cover bg-center my-4"

  return <Modal onClose={onClose} className="!w-[48rem] h-[32rem]">
    <header className="h-10 mt-4 flex justify-center">
      <h1 className="text-3xl font-medium">Edit User's Profile</h1>
    </header>
    <hr className="border-gray-400 border rounded-xl"/>

    <form id="editprofileform" className="px-8 py-4 text-center text-xl">
      <div className="flex justify-between items-center">
        <div>
          <img className={profileImgClass} src={data.profileImgUrl} alt="profile"/>
          Profile Image
        </div>
        <div className="w-[55%] flex flex-col gap-4">
          <div className={inputContainerClass}>
            <label className={labelClass}>Name</label>
            <input
              value={data.name}
              onChange={handleChange}
              className={inputClass}
              type="text"
              name="name"
            />
          </div>
          <div className={inputContainerClass}>
            <label className={labelClass}>gender</label>
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              className={inputClass + " px-4 h-8 focus:outline-none"}
            >
              <option value="Select..." className="text-base">Select...</option>
              <option value="male" className="text-base">male</option>
              <option value="female" className="text-base">female</option>
              <option value="other" className="text-base">other</option>
            </select>
          </div>
          <div className={inputContainerClass}>
            <label className={labelClass}>dob</label>
            <input
              value={data.dob.substr(0,10)}
              onChange={handleChange}
              className={inputClass}
              type="date"
              name="dob"
            />
          </div>
          <div className={inputContainerClass}>
            <label className={labelClass + " max-w-12"}>Image Url</label>
            <input
              value={data.profileImgUrl}
              onChange={handleChange}
              className={inputClass}
              type="text"
              name="profileImgUrl"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end gap-8 mt-6 px-2">
        <SecondaryButton
          type="submit"
          for="editprofileform"
          className={`px-3 py-1 rounded bg-secondary-500 text-white ${loading && "opacity-50"}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          Submit
        </SecondaryButton>
        <SecondaryButton
          type="cancel"
          for="editprofileform"
          className={`px-3 py-1 rounded bg-red-400 text-white ${loading && "opacity-50"}`}
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </SecondaryButton>
      </div>
    </form>
  </Modal>
}