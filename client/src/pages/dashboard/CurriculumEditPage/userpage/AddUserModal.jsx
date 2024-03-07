import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Loading, SecondaryButton, Modal } from "../../../../components";
import axios from "axios";

export default function AddUserModal({ onClose }) {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState("")

    const { common_id } = useParams();

    const axiosInstance = axios.create({
        baseURL: "http://localhost:8080/api/v1/users",
        withCredentials: true
    })
    const fetchData = async (search) => {
        try {
            const res = await axiosInstance.get("", {
                params: {
                    search,
                    fields: "name,email,role,profileImgUrl,courses"
                }
            })
            if (res.status >= 400) throw new Error(res.data.message)
            return res;
        } catch (err) {
            window.alert(err.message)
            return null
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchData("")
            .then((res) => {
                res ? setData(res.data.data) : setData([])
                setLoading(false)
            })
        // eslint-disable-next-line
    }, [])

    const debounce = () => {
        let timeOutId;
        return (e) => {
            setState(e.target.value);
            clearTimeout(timeOutId);
            timeOutId = setTimeout(async () => {
                const res = await fetchData(e.target.value)
                res ? setData(res.data.data) : setData([])
            }, 900);
        }
    }

    const handleChange = useMemo(() => debounce()
    // eslint-disable-next-line
    , []);

    const handleAdd = async (user, access) => {
        if (!["head", "edit", "view"].includes(access)) return;
        setLoading(true)
        try {
            await axios.patch("http://localhost:8080/api/v1/courses/" + common_id + "/users", {
                _id: user._id,
                access
            }, {
                withCredentials: true
            })
            const res = await fetchData("")
            res ? setData(res.data.data) : setData([])
        } catch (err) {
            window.alert(err.message)
        }
        setLoading(false)
    }

    return (
    <Modal onClose={onClose}>
        <div className="flex items-center justify-between p-2 border-b rounded-t">
            <div className="flex gap-2 w-[80%] bg-secondary-400 p-2 rounded-xl">
                <img className="object-cover" src="/search-white.png" alt="search" />
                <input
                    onChange={handleChange}
                    value={state}
                    className="border-2 border-gray-400 rounded flex-grow focus:outline-none"
                />
            </div>
        </div>
        {/* Modal body */}
        {loading ?
            <Loading count={4} cardClassName="" />
            :
            <ul className="px-2 py-4 flex flex-col gap-2">
                {
                    data?.map((user, ind) => <User key={ind} user={user} loading={loading} handleAdd={handleAdd} />)
                }
            </ul>}
    </Modal>
    )
}

function User({ user, handleAdd, loading }) {
    const { common_id } = useParams();

    const access = user?.courses?.find(el => el.id === common_id)?.access

    const [value, setValue] = useState(access || "select..");

    return <li key={user._id} className="w-full rounded-2xl flex justify-between p-4 border-2 border-gray-500">
        <div className="flex gap-2">
            <img className="w-12 h-12 object-cover rounded-full" alt="profile" src={user.profileImgUrl} />
            <div>
                <p>@{user.email}</p>
                <h3>{user.name}</h3>
            </div>
        </div>
        <div className="flex gap-2 items-center">
            <div className="px-2">
                <p>Access type:</p>
                <select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="border-2 border-gray-400 rounded px-2 py-1 focus:outline-none"
                >
                    <option value="select.." className="text-sm">select..</option>
                    <option value="head" className="text-sm">head</option>
                    <option value="edit" className="text-sm">edit</option>
                    <option value="view" className="text-sm">view</option>
                </select>
            </div>
            <SecondaryButton
                onClick={() => handleAdd(user, value)}
                disabled={loading}
                className={`!p-2 h-fit ${loading && "opacity-50"}`}
            >
                {loading ? "O" : "Add+"}
            </SecondaryButton>
        </div>
    </li>
}