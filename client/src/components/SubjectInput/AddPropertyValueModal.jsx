import { Loading, Modal } from "..";
import { useState } from "react";
import { useSubjectContext } from "../../context";
import { useParams } from "react-router-dom";

export default function AddPropertyValueModal({ propertyName, setShowModal }) {
  const [value, setValue] = useState("");
  const { addProperty } = useSubjectContext();
  const { subject_common_id } = useParams();
  const [localLoading, setLocalLoading] = useState(false);

  const handleAdd = async () => {
    setLocalLoading(true);
    const res = await addProperty(propertyName, value, subject_common_id);
    setShowModal("");
    setLocalLoading(false);
    if (!res) alert("Error while sending the request!");
  };

  return (
    <Modal
      onClose={() => setShowModal("")}
      className="!h-[16rem] !w-[28rem] py-4 px-8 flex flex-col justify-evenly items-center"
    >
      <h2 className="text-primary-500 text-xl-custom font-bold">
        Enter value of the field:
      </h2>
      {localLoading ? (
        <Loading count={1} cardClassName="!h-[5.4rem] !w-[23rem] !rounded" />
      ) : (
        <textarea
          className="w-full my-4 p-1 rounded bg-white outline-none border-2 border-gray-400"
          rows={3}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      <div className="w-full flex gap-2 justify-evenly">
        <button
          className="px-2 py-1 rounded bg-secondary-500 text-white"
          onClick={handleAdd}
          disabled={localLoading}
        >
          Add +
        </button>
        <button
          className="px-2 py-1 rounded bg-red-500 text-white"
          onClick={() => setShowModal("")}
          disabled={localLoading}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
