import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading, SecondaryButton } from "../../../../components";
import AddUserModal from "./AddUserModal";
import InviteUserModal from "./InviteUserModal";
import axios from "axios";

export default function UsersPage() {
  const { common_id } = useParams();
  const [data, setData] = useState();
  const [addButton, setAddButton] = useState(false);
  const [inviteButton, setInviteButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const base_url = process.env.REACT_APP_URL;

  const axiosInstance = axios.create({
    baseURL: base_url + "/api/v1/courses/" + common_id + "/users",
    withCredentials: true,
  });
  const fetchData = async () => {
    return await axiosInstance.get();
  };

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then((res) => setData(res.data.data))
      .catch((err) => window.alert(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
    //eslint-disable-next-line
  }, []);

  const handleChange = async (e) => {
    setLoading(true);
    try {
      await axiosInstance.patch("", {
        _id: e.target.name,
        access: e.target.value,
      });
      const res = (await fetchData()).data.data;
      setData(res);
    } catch (err) {
      window.alert(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  const handleDelete = async (e, _id) => {
    setLoading(true);
    try {
      await axiosInstance.delete("", {
        data: { _id },
      });
      const res = (await fetchData()).data.data;
      setData(res);
    } catch (err) {
      window.alert(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  const handleInvite = async () => {
    setInviteButton(true);
  };
  const handleAdd = async () => {
    setAddButton((prev) => !prev);
  };

  const onCloseModal = () => {
    setAddButton(false);
    setLoading(true);
    fetchData()
      .then((res) => setData(res.data.data))
      .catch((err) => window.alert(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  };

  const list = data?.map((user, index) => (
    <div
      key={index}
      className="w-full rounded flex justify-between py-4 px-6 border-2 border-gray-500"
    >
      <div className="flex gap-4">
        <img
          className={`w-12 h-12 object-cover rounded-full ${
            !user.profileImgUrl && "border-2 border-primary-950"
          }`}
          alt="profile"
          src={user?.profileImgUrl || "/profile.svg"}
        />
        <div>
          <h3 className="ml-[2px]">{user.name}</h3>
          <p className="text-gray-500 text-sm-custom">@{user.email}</p>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <div className="px-2 flex gap-1 items-center">
          <p className="text-gray-600 text-sm-custom">access: </p>
          <select
            name={user._id}
            value={user.courses.find((el) => el.id === common_id).access}
            onChange={handleChange}
            className="min-w-36 border-2 border-gray-400 rounded px-4 py-1 focus:outline-none cursor-pointer"
          >
            <option value="head">head</option>
            <option value="edit">edit</option>
            <option value="view">view</option>
          </select>
        </div>
        <button onClick={(e) => handleDelete(e, user._id)}>
          <img
            className="w-5 hover:mix-blend-luminosity"
            src="/deleteButton2.svg"
            alt="delete button"
          />
        </button>
      </div>
    </div>
  ));

  return (
    <div className="h-full px-6">
      <div className="w-full pl-1 flex justify-between">
        <h1 className="text-2xl-custom text-primary-500 font-bold">
          All Curriculum Designers
        </h1>
        <div className="flex gap-2">
          <SecondaryButton onClick={handleInvite}>Invite User</SecondaryButton>
          <SecondaryButton onClick={handleAdd}>Add User</SecondaryButton>
        </div>
      </div>
      <div className="flex flex-col my-6 gap-4">
        {loading ? (
          <Loading count={5} cardClassName="!w-full h-24 rounded" />
        ) : (
          list
        )}
      </div>

      {addButton && <AddUserModal onClose={onCloseModal} data={data} />}
      {inviteButton && (
        <InviteUserModal onClose={() => setInviteButton(false)} data={data} />
      )}
    </div>
  );
}
