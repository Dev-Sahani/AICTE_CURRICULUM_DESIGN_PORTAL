import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Loading } from "./../../../components";
import SearchBar from "./Searchbar";
import PieChart from "./PieChart";
import Rating from "./Rating";

const BASE_URL = process.env.REACT_APP_URL;

const AnalyticsPage = () => {
  const [course, setCourse] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  const search = useCallback(async () => {
    try{
      return await axios.get(
        `${BASE_URL}/api/v1/feedback/analysis/${course?.common_id}`,
        {
          withCredentials: true,
        }
      );
    }catch(err){
      window.alert("Something went wrong!!!\nserver responded with " + err?.response?.status)
    }
  }, [course]);

  useEffect(() => {
    if (course?.common_id) {
      setLoading(true);
      search()
        .then((response) => {
          response.data?.data.sort(
            (a, b) => a.fields?.questionNo - b.fields?.questionNo
          );
          setData(response.data?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [course, search]);

  if (loading) {
    return <Loading count={7} containerClassName="!my-10" />;
  }

  return (
    <div className="h-full">
      <SearchBar setCourse={setCourse} />
      {data ? (
        !Array.isArray(data) || data.length === 0 ? (
          <div className="flex items-center justify-center text-center stroke-[2px] tracking-wider italic align-middle h-[80%] text-4xl-custom font-black text-gray-500 uppercase">
            <h1>No Data to Show</h1>
          </div>
        ) : (
          <div>
            {/* Heading of course */}
            <header className="my-8 w-full">
              <h1 className="mt-4 mx-2 text-3xl-custom text-primary-600 font-bold">
                {course.title?.cur}
              </h1>
              <h2 className="mx-2 inline text-xl-custom text-secondary-500">
                {course.level?.cur}
              </h2>
              <h2 className="mb-4 mx-2 inline text-xl-custom text-secondary-500">
                {course.program?.cur}
              </h2>
            </header>

            {/* Analysis grid */}
            <div className="w-full grid grid-row-2 sm:grid-cols-[1fr_1.5fr] gap-x-8 gap-y-10">
              {/* Pie Chart */}
              <div className="bg-white shadow-lg rounded-xl p-4 grid grid-cols-[1fr_1fr] grid-rows-[1.5fr_1fr] gap-6">
                <PieChart
                  className="row-start-1 row-end-3 col-span-2 md:col-span-1"
                  yesPer={data[1]?.integersValues * 20}
                  width="180px"
                />
                <p className="font-medium">
                  <span className="text-accent-500">
                    {(data[1]?.integersValues * 20).toFixed(2)}%
                  </span>{" "}
                  people like this course curriculum
                </p>
                <p className="font-medium">
                  <span className="bg-primary-600 inline-block w-4 aspect-square mr-2" />{" "}
                  Yes
                  <br />
                  <span className="bg-primary-200 inline-block w-4 aspect-square mr-2" />{" "}
                  No
                </p>
              </div>

              {/* Ratings Charts */}
              <div className="bg-white shadow-lg rounded-xl p-4 grid grid-cols-[1fr_2fr]">
                <p className="font-medium">Difficulty</p>
                <Rating percent={(data[0].integersValues * 20).toFixed(0)} />
                <p className="font-medium">Interest</p>
                <Rating percent={(data[1].integersValues * 20).toFixed(0)} />
                <p className="font-medium">Industry relevant</p>
                <Rating percent={(data[2].integersValues * 100).toFixed(0)} />
                <p className="font-medium">Course Completion</p>
                <Rating percent={data[4].integersValues.toFixed(0)} />
              </div>

              {/* Year Wise Charts */}
              {/* <div className="bg-white shadow-lg rounded-xl p-4 col-start-1 col-end-3 ">
            Grid item-3
          </div> */}
            </div>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center text-center stroke-[2px] tracking-wider italic align-middle h-[80%] text-4xl-custom font-black text-gray-500 uppercase">
          <h1>Select a course to analyse</h1>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
