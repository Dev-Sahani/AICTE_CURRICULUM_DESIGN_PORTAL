import { useSubjectContext } from "../../context";
import { Modal } from "..";
import { useParams } from "react-router-dom";

export default function NewValuesModal({ propertyName, setShowNew }) {
  const { subject_common_id } = useParams();
  const { subject, acceptChanges } = useSubjectContext();
  if (!subject || !subject[propertyName]) return null;

  return (
    <Modal onClose={() => setShowNew("")} className="p-4">
      <h1 className="mb-4 text-primary-500 text-2xl-custom font-bold">
        New Values
      </h1>
      {subject[propertyName].add?.map((item, index) => (
        <div key={index} className="my-3">
          <div className="mb-2 bg-accent-300 border-2 border-gray-400 rounded p-1 px-2">
            {item?.value}
          </div>
          <div className="pl-1 flex justify-between items-start">
            <p className="text-gray-500">by: {item?.by}</p>
            <button
              className="bg-secondary-500 px-2.5 py-1.5 rounded text-white"
              onClick={() =>
                acceptChanges(subject_common_id, propertyName, index, true)
              }
            >
              Accept
            </button>
          </div>
        </div>
      ))}
    </Modal>
  );
}
