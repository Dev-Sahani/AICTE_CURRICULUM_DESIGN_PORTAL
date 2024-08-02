import { useState } from "react";
import { SecondaryButton, Modal } from "../../../../components";
import axios from "axios";

export default function AddUserModal({ onClose }) {
  const [state, setState] = useState({
    name: "",
    role: "",
    mail: "",
    text: "",
  });
  const [loading, setLoading] = useState(false);

  const base_url = process.env.REACT_APP_URL;

  const handleChange = (e) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleInvite = async (e) => {
    setLoading(true);
    try {
      if (
        !["faculty", "expert"].includes(state.role) ||
        !state.mail ||
        !state.name
      ) {
        throw new Error("Please enter role or mail or name correctly");
      }
      await axios.post(
        base_url + "/api/v1/auth/pre-register-user",
        {
          name: state.name,
          email: state.mail,
          role: state.role,
          mailText: state.text,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      window.alert(err.response?.data?.message || err.message);
    }
    setLoading(false);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <form className="mt-4 w-full p-4 pt-8 flex flex-col gap-2">
        <div className="flex justify-start items-center px-2">
          <label className="min-w-56 ml-[1px]" htmlFor="name@invite">
            Name
          </label>
          <input
            value={state.name}
            className="w-full p-1 border-2 border-gray-400 rounded focus:outline-none resize-none"
            name="name"
            id="name@invite"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center px-2">
          <label className="min-w-56 ml-[1px]" htmlFor="email@invite">
            Email
          </label>
          <input
            value={state.mail}
            className="w-full p-1 border-2 border-gray-400 rounded focus:outline-none resize-none"
            name="mail"
            id="email@invite"
            onChange={handleChange}
          />
        </div>

        <div className="w-full flex justify-start items-center px-2">
          <label className="min-w-56 ml-[1px]" htmlFor="role@invite">
            Role
          </label>
          <select
            className="min-w-56 mr-[100%] w-full border-2 border-gray-400 rounded px-2 py-1 focus:outline-none cursor-pointer"
            name="role"
            id="role@invite"
            onChange={handleChange}
            value={state.role}
          >
            <option value="select.." className="text-sm-custom">
              select..
            </option>
            <option value="expert" className="text-sm-custom">
              expert
            </option>
            <option value="faculty" className="text-sm-custom">
              faculty
            </option>
          </select>
        </div>

        <div className="items-center px-2">
          <label className="block ml-[1px] my-2" htmlFor="text@invite">
            Message
          </label>
          <textarea
            type="text"
            name="text"
            id="text@invite"
            value={state.text}
            onChange={handleChange}
            placeholder="Enter the message to send"
            className="w-full h-56 overflow-auto  p-1 border-2 border-gray-400 rounded focus:outline-none resize-none"
          />
        </div>

        <SecondaryButton
          className={`${loading && "opacity-50"} !mx-2`}
          onClick={handleInvite}
          disabled={loading}
        >
          Invite+
        </SecondaryButton>
      </form>
    </Modal>
  );
}
