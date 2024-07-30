import axios from "axios";
import { useRef, useState } from "react";
import {
  getAllLevels,
  getAllProgrammes,
} from "../../../utils/getAllProgramAndLevels";
import { Loading, PrimaryButton, SecondaryButton } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context";

export default function NewTemplate() {
  const navigate = useNavigate();
  const options = { level: getAllLevels, program: getAllProgrammes };
  const properties = [
    "title",
    "level",
    "program",
    "message",
    "preface",
    "acknowledgement",
  ];
  const formRef = useRef(null);
  const { getCurrUser } = useUserContext();
  const [localLoading, setLocalLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalLoading(true);
    try {
      const formData = new FormData(formRef.current);
      const formDataObj = {};
      formData?.forEach((value, key) => {
        formDataObj[key] = value;
      });

      await axios.post(
        `${process.env.REACT_APP_URL}/api/v1/courses`,
        formDataObj,
        { withCredentials: true }
      );
      await getCurrUser();
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLocalLoading(false);
    }
  };

  if (localLoading) {
    return (
      <Loading
        count={5}
        cardClassName="w-full h-12"
        containerClassName="w-full mt-8 flex-col"
      />
    );
  }

  return (
    <div className="w-full px-2">
      <h1 className="my-8 text-4xl-custom text-primary-500 font-bold">
        New Course
      </h1>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="w-full flex flex-col gap-4"
      >
        {properties.map((prop, index) => {
          let input = (
            <input
              name={prop}
              className="w-full p-1 px-2 border-2 border-gray-400 rounded outline-none"
            />
          );
          if (prop === "level" || prop === "program") {
            input = (
              <select
                required
                className="min-w-72 p-1 px-2 mr-[100%] rounded border-2 border-gray-400 outline-none cursor-pointer"
                name={prop}
              >
                {options[prop].map((option, ind) => (
                  <option key={ind}>{option}</option>
                ))}
              </select>
            );
          } else if (prop === "title") {
            input = (
              <input
                name={prop}
                className="w-full p-1 px-2 border-2 border-gray-400 rounded outline-none"
                required
              />
            );
          }

          return (
            <div
              className="w-full flex gap-2 items-center justify-between"
              key={index}
            >
              <label className="min-w-48 capitalize" htmlFor={prop}>
                {prop}
              </label>
              {input}
            </div>
          );
        })}

        <div className="w-full my-4 flex justify-end items-center gap-8">
          <SecondaryButton
            type="submit"
            onClick={handleSubmit}
            className="h-fit px-4"
          >
            Save
          </SecondaryButton>
          <PrimaryButton to={"/"} className="h-fit !bg-red-400">
            Cancel
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
