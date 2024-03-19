import { useState } from 'react';
import { Modal, SecondaryButton } from "../../../components"
import showPassword from "./../../../assets/show-password.png"
import hidePassword from "./../../../assets/hide-password.png"
import { useUserContext } from '../../../context';

export default function ChangePasswordModal({ onClose }) {
  const inputClass= "w-full h-full outline-none";
  const inputContainerClass = "flex justify-between items-center text-lg w-full h-12 m-2 px-2 border-[1.4px] border-gray-500 outline-none rounded bg-white";

  const { updatePassword } = useUserContext();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPass, setShowPass] = useState([false, false, false])
  

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(formData.confirmPassword !== formData.newPassword){
      window.alert("confirm password does not match")
      return;
    }
    setIsSubmitting(true);

    const { currentPassword, newPassword } = formData;

    await updatePassword(currentPassword, newPassword);

    setIsSubmitting(false);
  };

  return (
    <Modal onClose={onClose} className="!w-[30rem] !h-[28rem]">
      <header className="h-12 mt-3 flex justify-center">
      <h1 className="text-3xl font-medium">Change User Password</h1>
    </header>
    <hr className="border-gray-400 border rounded-xl"/>

      <form
        className="h-[85%] flex flex-col justify-center items-stretch gap-3 px-8 py-4 "
        onSubmit={handleSubmit}
      >
        <div className={inputContainerClass}>
          <input
            type={showPass[0]? "text":"password"}
            id="currentPassword"
            className={inputClass}
            name="currentPassword"
            placeholder="current Password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <button 
            type="button"
            onClick={()=>setShowPass([!showPass[0], showPass[1], showPass[2]])}
          >
            <img className="w-6 h-6" src={showPass[0]? showPassword: hidePassword} alt="password"/>
          </button>
        </div>
        <div className={inputContainerClass}>
          <input
            type={showPass[1]? "text":"password"}
            id="newPassword"
            className={inputClass}
            name="newPassword"
            placeholder="new Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            minLength={8} // Enforce a minimum password length
          />
          <button 
            type="button"
            onClick={()=>setShowPass([showPass[0], !showPass[1], showPass[2]])}
          >
            <img className="w-6 h-6" src={showPass[1]? showPassword: hidePassword} alt="password"/>
          </button>
        </div>
        <div className={inputContainerClass}>
          <input
            type={showPass[2]? "text":"password"}
            id="confirmPassword"
            className={inputClass}
            name="confirmPassword"
            placeholder="confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button 
            type="button"
            onClick={()=>setShowPass([showPass[0], showPass[1], !showPass[2]])}
          >
            <img className="w-6 h-6" src={showPass[2]? showPassword: hidePassword} alt="password"/>
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <SecondaryButton 
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? 'Changing Password...' : 'Change Password'}
          </SecondaryButton>
        </div>
      </form>
    </Modal>
  );
};
