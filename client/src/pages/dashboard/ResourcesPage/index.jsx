import ResourceList from "./ResourceList";
import axios from 'axios';

function ResourcesPage() {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/resources",
    withCredentials: true
  })

  const serach = async ({search, format}) => {
    try {
      const res = await axiosInstance.get("", {
        params: {
          search,
          type: format
        }
      })
      if (res.status >= 400) throw new Error(res.data.message)
      return res?.data?.data;
    } catch (err) {
      window.alert(err.message)
    }
  }

  return <ResourceList searchReqFunc={serach} />
}
export default ResourcesPage