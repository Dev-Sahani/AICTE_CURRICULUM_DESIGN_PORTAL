import { useUserContext } from "../../context"

const ProfilePage = () => {
  const {user} = useUserContext();

  return <>
    <div className="flex gap-6 p-8">
      <div className="w-96 h-96 rounded-full overflow-hidden bg-cover bg-center"
        style={{backgroundImage:`url(${user.profileImgUrl})`}}>
      </div>
      <div>
        <h1 className="text-2xl">{user.name}</h1>
        <h3 className="">{user.userId}</h3>
        <h2 className="text-xl">{user.email}</h2>
        <p>{user.gender}</p>
        <p>{user.areaOfSpecialization}</p>
      </div>
    </div>
  </>
}

export default ProfilePage