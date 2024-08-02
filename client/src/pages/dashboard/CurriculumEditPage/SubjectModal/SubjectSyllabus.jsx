import { useState } from "react";
import {
  Loading,
  Modal,
  ModuleInput,
  ModuleNewValues,
} from "../../../../components";
import { useSubjectContext } from "../../../../context";
import { useParams } from "react-router-dom";

export default function SubjectSyllabus() {
  const [showNewValueModal, setShowNewValueModal] = useState(false);
  const [showAddNewValue, setShowAddNewValue] = useState(false);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full px-4 my-2 flex justify-between items-center">
          <h2 className="text-primary-500 font-semibold text-lg-custom mt-2">
            Modules
          </h2>
          <div className="flex items-center gap-3">
            <button
              className="bg-secondary-500 px-2 py-1 text-white rounded"
              onClick={() => setShowAddNewValue(!showAddNewValue)}
            >
              Add New +
            </button>
            <button
              className="bg-accent-500 px-2 py-1 text-white rounded"
              onClick={() => setShowNewValueModal(!showNewValueModal)}
            >
              New Values
            </button>
          </div>
        </div>

        {showNewValueModal && (
          <ModuleNewValues onClose={() => setShowNewValueModal(false)} />
        )}
        {showAddNewValue && (
          <AddNewModule onClose={() => setShowAddNewValue(false)} />
        )}
        <ModuleInput />
      </div>
    </div>
  );
}

function AddNewModule({ onClose }) {
  const { updateModule } = useSubjectContext();
  const { subject_common_id } = useParams();

  const [curr, setCurr] = useState({
    title: "",
    topics: [""],
  });
  const [localLoading, setLocalLoading] = useState(false);

  const handleUpdate = async () => {
    setLocalLoading(true);
    curr.topics = curr.topics.filter((topic) => topic !== "");
    const res = await updateModule(subject_common_id, curr, true);
    setLocalLoading(false);
    if (res) onClose();
  };

  return (
    <Modal onClose={onClose} className="relative">
      <div className="!flex !flex-col">
        <h1 className="w-full mt-6 mb-4 text-center text-2xl-custom text-primary-500 font-bold">
          Add New Module
        </h1>
        <div className="w-full p-4 pr-8 flex gap-2 items-center ">
          <p className="min-w-[5rem] font-medium text-lg-custom">Title: </p>
          {localLoading ? (
            <Loading
              cardClassName="h-14 w-full"
              containerClassName="h-14 w-full"
            />
          ) : (
            <input
              className="w-full p-2 outline-none border-2 border-gray-400 rounded"
              value={curr.title}
              onChange={(e) => setCurr({ ...curr, title: e.target.value })}
            />
          )}
        </div>

        <div className="w-full p-4 pr-8 flex">
          <h3 className="mt-4 min-w-[5rem] font-medium text-lg-custom text-">
            Modules topics:{" "}
          </h3>
          <div className="w-full flex flex-col gap-3">
            {curr.topics.map((topic, ind) => {
              if (localLoading)
                return (
                  <Loading
                    cardClassName="h-14 w-full"
                    containerClassName="h-14 w-full"
                    key={ind}
                  />
                );

              return (
                <input
                  className="w-full p-2 outline-none border-2 border-gray-400 rounded"
                  key={ind}
                  value={curr.topics[ind]}
                  onChange={(e) =>
                    setCurr({
                      ...curr,
                      topics: curr.topics.map((_, index) =>
                        ind === index ? e.target.value : _
                      ),
                    })
                  }
                />
              );
            })}
            <div className="w-full flex justify-end">
              <button
                disabled={localLoading}
                className="px-2.5 py-1.5 rounded bg-secondary-500 text-white"
                onClick={() =>
                  setCurr({ ...curr, topics: [...curr.topics, ""] })
                }
              >
                Add Topic +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pr-8 absolute bottom-0 right-0 w-full flex items-center justify-end gap-4">
        <button
          disabled={localLoading}
          className="px-4 py-1.5 rounded bg-secondary-500 text-white"
          onClick={handleUpdate}
        >
          Save
        </button>
        <button
          disabled={localLoading}
          className="px-3 py-1.5 rounded bg-red-500 text-white"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
