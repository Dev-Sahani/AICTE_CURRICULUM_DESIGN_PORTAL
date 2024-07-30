import { useParams } from "react-router-dom";
import { Modal } from "..";
import { useSubjectContext } from "../../context";
import { Module } from "./ChangesModal";

export default function ModuleNewValues({ onClose }) {
  const { subject_common_id: subjectId } = useParams();
  const { subject, acceptChangesInModule } = useSubjectContext();

  return (
    <Modal onClose={onClose}>
      <h1 className="w-full text-center mb-4 text-primary-500 text-2xl-custom font-bold">
        New Values
      </h1>
      <div>
        {subject.modules.add.length === 0 ? (
          <div className="w-full h-[30rem] flex justify-center items-center">
            <h1 className="text-primary-200 text-6xl-custom uppercase font-black">
              No Values
            </h1>
          </div>
        ) : (
          subject.modules.add.map((module, ind) => {
            return (
              <div key={ind} className="p-4">
                <div className="bg-accent-400 rounded-md">
                  <Module module={module?.value} whiteHeading />
                </div>
                <div className="mt-2 mb-4 flex justify-between">
                  <p className="ml-1 text-gray-500 text-sm-custom">
                    by: {module?.by}
                  </p>
                  <button
                    className="px-3 py-2 bg-secondary-500 rounded text-white"
                    onClick={() =>
                      acceptChangesInModule(subjectId, undefined, ind, true)
                    }
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Modal>
  );
}
