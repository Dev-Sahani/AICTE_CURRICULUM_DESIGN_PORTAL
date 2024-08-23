import { useUserContext } from "../../../context";
import setting from "./../../../assets/setting.png";
import email from "./../../../assets/email.png";
import role from "./../../../assets/role.png";
import specialization from "./../../../assets/certified.png";
import access from "./../../../assets/access.png";
import authentication from "./../../../assets/authentication.png";
import gender from "./../../../assets/gender.png";
import dob from "./../../../assets/dob.png";
import { useState } from "react";
import EditProfile from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";

const ProfilePage = () => {
  const { user, accessedCourses } = useUserContext();
  const [edit, setEdit] = useState(false);
  const [pass, setPass] = useState(false);

  const iconClass = "inline w-4 mr-2";
  const profileImgClass =
    "w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden bg-cover bg-center";
  const propsClass = "bg-secondary-200 px-4 py-1 rounded-xl flex items-center";
  const cardContainerClass = "flex items-stretch gap-2 my-8 flex-wrap w-full";
  const sectionHeadingClass = "mt-8 text-2xl-custom font-semibold";
  const h3Class = "text-base w-fit";

  return (
    <div className="py-4 sm:px-8">
      <div className="flex flex-col-reverse sm:flex-row justify-start gap-4 sm:gap-6 md:gap-[18vw]">
        <div className="px-2 text-xl-custom flex flex-col justify-center">
          <h1 className="text-4xl-custom font-semibold my-4">{user.name}</h1>
          {user.email && (
            <h3 className={h3Class}>
              <img className={iconClass} src={email} alt="email" />
              {user.email}
            </h3>
          )}
          {user.role && (
            <h3 className={h3Class}>
              <img className={iconClass} src={role} alt="role" />
              {user.role}
            </h3>
          )}
          {user.dob && (
            <h3 className={h3Class}>
              <img className={iconClass} src={dob} alt="dob" />
              {user.dob?.substr(0, 10)}
            </h3>
          )}
          {user.gender && (
            <h3 className={h3Class}>
              <img className={iconClass} src={gender} alt="gender" />
              {user.gender}
            </h3>
          )}
          <h3
            onClick={() => setPass((prev) => !prev)}
            className={h3Class + " text-primary-800 underline cursor-pointer"}
          >
            <img
              className={iconClass}
              src={authentication}
              alt="authentication"
            />
            change password
          </h3>
          <h3
            onClick={() => setEdit((prev) => !prev)}
            className={
              h3Class + " text-primary-800 underline cursor-pointer mt-2"
            }
          >
            <img className={iconClass} src={setting} alt="setting" />
            Edit profile
          </h3>
        </div>
        {/* Profile Image */}
        <div
          className={profileImgClass}
          style={{
            backgroundColor: "gray",
            backgroundImage: `url(${user.profileImgUrl})`,
          }}
        ></div>
      </div>

      {/* Areas of Specialization */}
      <h1 className={sectionHeadingClass}>Areas of Specialization</h1>
      <hr className="border-gray-400 border rounded-xl" />
      <div className={cardContainerClass}>
        {user.areaOfSpecialization?.map((el, ind) => (
          <div key={ind} className={propsClass}>
            <img
              className={iconClass + " !h-[1.2rem] !w-[1.2rem]"}
              src={specialization}
              alt="certified"
            />
            {el}
          </div>
        ))}
      </div>
      
      {/* Accessed Curriculums */}
      <h1 className={sectionHeadingClass}>Accessed Curriculums</h1>
      <hr className="border-gray-400 border rounded-xl" />
      <div className={cardContainerClass}>
      {
        accessedCourses?.map((el, ind) => (
          <div key={ind} className="shadow-lg p-2 rounded-xl overflow-hidden">
            <div className="flex justify-between mb-4 items-center">
              <h2 className="text-2xl-custom">{el.title?.cur}</h2>
              <p>
                <img
                  className={iconClass + " !mr-0"}
                  src={access}
                  alt="access"
                />
                {" " + el.access}
              </p>
            </div>
            <div className="flex gap-4">
              <p className={propsClass + " !bg-primary-200"}>
                {el.level?.cur}
              </p>
              <p className={propsClass + " !bg-primary-200"}>
                {el.program?.cur}
              </p>
            </div>
          </div>
        ))
      }
      </div>
      {edit && <EditProfile onClose={() => setEdit(false)} />}
      {pass && <ChangePasswordModal onClose={() => setPass(false)} />}
    </div>
  );
};

export default ProfilePage;
