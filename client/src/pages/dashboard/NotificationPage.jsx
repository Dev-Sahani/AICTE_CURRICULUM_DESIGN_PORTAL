import { useState, useEffect, useMemo } from "react";
import Resource from "./ResourcesPage/Resources";
// import AddResourceForm from "./ResourcesPage/AddResourceForm"
import { Loading, SecondaryButton } from "./../../components";
import axios from "axios";
import SearchImg from "./../../assets/Search.png";

const BASE_URL = process.env.REACT_APP_URL;

const NotificationPage = () => {
  const [resources, setResources] = useState([]);
  const [searchState, setSearchState] = useState({
    search: "",
    format: "",
  });
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const axiosInstance = axios.create({
    baseURL: BASE_URL + "/api/v1/resources",
    withCredentials: true,
  });

  const searchFunc = async ({ search, format }) => {
    if (!search) search = "";
    if (!format || format === "Select format") format = undefined;
    try {
      const res = await axiosInstance.get("", {
        params: {
          search,
          type: format,
        },
      });
      if (res.status >= 400) throw new Error(res.data.message);
      setResources(res.data.data);
    } catch (err) {
      window.alert(err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    searchFunc({ search: "", format: "" }).finally(() => setLoading(false));
    //eslint-disable-next-line
  }, []);

  const debounce = () => {
    let timeOutId;
    return (e) => {
      let stateTemp;
      setSearchState((prev) => {
        stateTemp = {
          ...prev,
          [e.target.name]: e.target.value,
        };
        return stateTemp;
      });
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        console.log(stateTemp);
        searchFunc(stateTemp);
      }, 900);
    };
  };
  const handleChange = useMemo(() => debounce(), []);

  const sendNotification = (message) => {
    setNotifications((prevNotifications) => [...prevNotifications, message]);
  };

  if (loading) return <Loading count={5} cardClassName="!h-28" />;

  return (
    <>
      {/* Search Bar Section */}
      <div className="w-full flex justify-evenly items-center my-2 rounded-xl">
        <div className="border-2 border-gray-400 bg-white h-fit flex rounded m-2 items-center">
          <img src={SearchImg} alt="search" className="w-8 h-8" />
          <input
            type="text"
            name="search"
            value={searchState.search}
            onChange={handleChange}
            placeholder=" Search..."
            className="rounded focus:outline-none w-[28vw] h-8"
          />
        </div>

        {/* Date Filter if aplicable */}

        {/* <div className="border-2 border-gray-400 bg-white h-fit flex rounded m-2 items-center">
          <img src={SearchImg} alt="search" className="w-8 h-8" />
          <select
            name="format"
            value={state.format}
            onChange={handleChange}
            className="rounded px-4 h-8 focus:outline-none"
          >
            <option value="Select format" className="text-base">Select format</option>
            <option value="book" className="text-base">book</option>
            <option value="video" className="text-base">video</option>
            <option value="e-book" className="text-base">e-book</option>
          </select>
        </div> */}

        <SecondaryButton
          onClick={() => sendNotification("New notification message")}
          className=""
        >
          Send New Notification+
        </SecondaryButton>
      </div>

      {/* Display Notifications */}
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}

      {/* Resources List Section */}
      {resources.map((resource, index) => (
        <Resource key={index} resource={resource} />
      ))}
    </>
  );
};
