import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Loading, SecondaryButton, Modal } from "../../../../components";
import axios from "axios";

export default function AddUserModal({ onClose }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");

  const { common_id } = useParams();

  const base_url = process.env.REACT_APP_URL;

  const axiosInstance = axios.create({
    baseURL: base_url + "/api/v1/users",
    withCredentials: true,
  });
  const fetchData = async (search) => {
    try {
      const res = await axiosInstance.get("", {
        params: {
          search,
          fields: "name, email, role, profileImgUrl, courses, _id",
        },
      });
      if (res.status >= 400) throw new Error(res.data.message);
      return res;
    } catch (err) {
      window.alert(err.response?.data?.message || err.message);
      return null;
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData("")
      .then((res) => {
        res ? setData(res.data.data) : setData([]);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  const debounce = () => {
    let timeOutId;
    return (e) => {
      setState(e.target.value);
      clearTimeout(timeOutId);
      timeOutId = setTimeout(async () => {
        const res = await fetchData(e.target.value);
        res ? setData(res.data.data) : setData([]);
      }, 900);
    };
  };

  const handleChange = useMemo(
    () => debounce(),
    // eslint-disable-next-line
    []
  );

  const handleAdd = async (user, access) => {
    if (!["head", "edit", "view"].includes(access)) {
      window.alert("Please provide correct access.");
      return;
    }
    setLoading(true);
    try {
      await axios.patch(
        base_url + "/api/v1/courses/" + common_id + "/users",
        {
          _id: user._id,
          access,
        },
        {
          withCredentials: true,
        }
      );
      const res = await fetchData("");
      res ? setData(res.data.data) : setData([]);
    } catch (err) {
      window.alert(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <Modal onClose={onClose} className="px-4">
      <div className="ml-2 flex justify-between w-[50%] my-4 rounded-xl">
        <div className="px-1 py-1.5 rounded-l bg-white border-2 border-gray-400 border-r-0">
          <img src="/search-black.png" alt="search" />
        </div>
        <input
          onChange={handleChange}
          value={state}
          className="p-1.5 border-l-0 border-2 border-gray-400 rounded rounded-l-none flex-grow focus:outline-none"
        />
      </div>

      <div className="mx-auto w-[98%] py-2 px-4 bg-primary-700 text-white flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <h3>Image</h3>
          <h3>User Detials</h3>
        </div>
        <div className="mr-3 flex gap-8 items-center">
          <h3>Access Type</h3>
          <h3>Button</h3>
        </div>
      </div>
      {/* Modal body */}
      {loading ? (
        <Loading count={8} cardClassName="h-16" containerClassName="my-4" />
      ) : (
        <ul className="px-2 py-4 flex flex-col gap-2">
          {data?.map((user, ind) => (
            <User
              key={ind}
              user={user}
              loading={loading}
              handleAdd={handleAdd}
            />
          ))}
        </ul>
      )}
    </Modal>
  );
}

function User({ user, handleAdd, loading }) {
  const { common_id } = useParams();

  const access = user?.courses?.find((el) => el.id === common_id)?.access;

  const [value, setValue] = useState(access || "select..");

  return (
    <li
      key={user._id}
      className="w-full rounded-2xl flex justify-between p-4 border-2 border-gray-500"
    >
      <div className="flex gap-2">
        <img
          className={`w-12 h-12 object-cover rounded-full ${
            !user.profileImgUrl && "border-2 border-primary-950"
          }`}
          alt="profile"
          src={user?.profileImgUrl || "/profile.svg"}
        />
        <div>
          <h3 className="ml-[3px] font-medium">{user.name}</h3>
          <p className="text-gray-400 text-sm-custom">@{user.email}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="px-2">
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-w-28 border-2 border-gray-400 rounded px-2 py-1 focus:outline-none cursor-pointer"
          >
            <option value="">Select</option>
            <option value="head" className="text-sm-custom">
              head
            </option>
            <option value="edit" className="text-sm-custom">
              edit
            </option>
            <option value="view" className="text-sm-custom">
              view
            </option>
          </select>
        </div>
        <SecondaryButton
          onClick={() => handleAdd(user, value)}
          disabled={loading}
          className={`!p-2 !py-1.5 h-fit ${loading && "opacity-50"}`}
        >
          {loading ? "O" : "Add +"}
        </SecondaryButton>
      </div>
    </li>
  );
}
