import { useState } from "react";
import axios from "axios";
import { SecondaryButton, Modal } from "../../../components";

const BASE_URL = process.env.REACT_APP_URL;

export default function AddResourceForm({ onClose }) {
  const [state, setState] = useState({
    title: "",
    author: "",
    publisher: "",
    url: "",
    coverImageUrl: "",
    type: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAdd = async (e) => {
    setLoading(true);
    try {
      if (
        !state.type ||
        state.type === "select format" ||
        !state.author ||
        !state.title ||
        !state.url ||
        !state.coverImageUrl ||
        !state.description
      ) {
        throw new Error("Please enter details correctly");
      }
      await axios.post(
        BASE_URL + "/api/v1/resources/",
        {
          title: state.title,
          author: state.author,
          type: state.type,
          url: state.url,
          publisher: state.publisher,
          coverImageUrl: state.coverImageUrl,
          description: state.description,
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
    <Modal onClose={onClose} className="!w-[40rem] overflow-y-auto">
      <form className="mt-4 w-full p-4 pt-8 flex flex-col gap-2 overflow-auto">
        <div className="flex justify-between items-center px-2">
          <label className="" htmlFor="title@add">
            Title
          </label>
          <input
            value={state.title}
            className="w-[80%] p-1 border-2 border-gray-400 rounded focus:outline-none resize-none"
            name="title"
            id="title@add"
            placeholder="Enter title..."
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between items-center px-2">
          <label className="" htmlFor="author@add">
            Author
          </label>
          <input
            value={state.author}
            className="w-[80%] p-1 border-2 border-gray-400 rounded focus:outline-none resize-none"
            name="author"
            id="author@add"
            placeholder="Enter Author..."
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between items-center px-2">
          <label className="" htmlFor="publisher@add">
            Publisher
          </label>
          <input
            value={state.publisher}
            className="w-[80%] p-1 border-2 border-gray-400 rounded focus:outline-none resize-none"
            name="publisher"
            id="publisher@add"
            placeholder="Enter Publisher..."
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between items-center px-2">
          <label className="" htmlFor="url@add">
            Url
          </label>
          <input
            value={state.url}
            className="w-[80%] p-1 border-2 border-gray-400 rounded focus:outline-none resize-none"
            name="url"
            id="url@add"
            placeholder="Enter Url... if any"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between items-center px-2">
          <label className="" htmlFor="imgurl@add">
            Image Url
          </label>
          <input
            value={state.coverImageUrl}
            className="w-[80%] p-1 border-2 border-gray-400 rounded focus:outline-none resize-none"
            name="coverImageUrl"
            id="imgurl@add"
            placeholder="Enter Image Url... if any"
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between gap-16 items-center px-2">
          <label className="" htmlFor="type@invite">
            Format
          </label>
          <select
            className="w-full border-2 border-gray-400 rounded ml-1 px-2 py-1 focus:outline-none"
            name="type"
            id="type@invite"
            onChange={handleChange}
            value={state.type}
          >
            <option value="select format" className="text-sm-custom">
              select format
            </option>
            <option value="book" className="text-sm-custom">
              book
            </option>
            <option value="e-book" className="text-sm-custom">
              e-book
            </option>
            <option value="videos" className="text-sm-custom">
              videos
            </option>
          </select>
        </div>

        <div className="mt-4 items-center px-2">
          <label className="ml-px mb-1 block" htmlFor="text@invite">
            Description
          </label>
          <textarea
            type="text"
            value={state.description}
            name="description"
            id="text@invite"
            placeholder="Enter description..."
            onChange={handleChange}
            className="w-full h-44 overflow-auto p-1 border-2 border-gray-400 rounded focus:outline-none resize-none"
          />
        </div>
        <SecondaryButton
          className={`${loading && "opacity-50"} !mx-2`}
          disabled={loading}
          onClick={handleAdd}
        >
          Add+
        </SecondaryButton>
      </form>
    </Modal>
  );
}
