import { useSubjectContext } from "../../context";
import { Modal } from "../";
import { useParams } from "react-router-dom";

export default function ChangesModal({ name, index, onClose }) {
  let {
    subject: { [name]: propertyValue },
    acceptChanges,
    acceptChangesInModule,
  } = useSubjectContext();
  const { subject_common_id: subjectId } = useParams();

  if (propertyValue === undefined || !propertyValue.cur)
    return <div>Some Error</div>;
  if (
    index !== undefined &&
    index !== "" &&
    Array.isArray(propertyValue.cur) &&
    index * 1 < propertyValue.cur.length
  ) {
    propertyValue = propertyValue.cur[index * 1];
  }

  const handleAccept = async (item, ind) => {
    await acceptChanges(
      subjectId,
      name + (item?.value === "deleted" ? "" : "." + index.toString()),
      item?.value === "deleted" ? item?.index : ind,
      false,
      item?.value === "deleted"
    );
  };

  return (
    <Modal onClose={onClose} className="!w-[56rem]">
      <div className="h-full p-6 flex flex-col gap-6 overflow-y-auto">
        <h1 className="w-full text-center text-2xl-custom font-semibold text-primary-500">
          Changes
        </h1>

        <div className="w-full flex gap-4 items-start justify-between">
          <h3 className="text-primary-500 text-lg-custom font-medium">
            Current Value
          </h3>
          <div className="basis-[85%] px-1.5 py-1 border border-black bg-white rounded-md overflow-y-auto">
            {name === "modules" ? (
              <Module module={propertyValue.cur} />
            ) : (
              propertyValue.cur && propertyValue.cur
            )}
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <h3 className="text-primary-500 text-lg-custom font-medium">
            New Values
          </h3>
          <div className="basis-[85%]">
            {propertyValue.new &&
              propertyValue.new.map((item, ind) => {
                if (name === "modules") {
                  const isDeleted = item.value === "deleted";
                  return (
                    <div key={ind}>
                      <div
                        className={`rounded ${
                          isDeleted ? "bg-red" : "bg-accent-400"
                        }`}
                      >
                        <Module module={item?.value} whiteHeading />
                      </div>
                      <div className="mt-1 mb-4 flex justify-between">
                        <p className="ml-1 text-gray-500 text-sm-custom">
                          by: {item?.by}
                        </p>
                        <button
                          className="px-3 py-2 bg-secondary-500 rounded text-white"
                          onClick={() =>
                            acceptChangesInModule(
                              subjectId,
                              index,
                              isDeleted ? item.delIndex : ind,
                              false,
                              isDeleted
                            )
                          }
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="mb-4 flex flex-col gap-1 items-end" key={ind}>
                    <div
                      className={`w-full px-1.5 py-1 border border-black ${
                        item?.value === "deleted"
                          ? "bg-red-500 text-white text-center capitalize"
                          : "bg-white"
                      } rounded-md overflow-y-auto`}
                    >
                      <p>{item?.value}</p>
                    </div>
                    <div className="w-full flex justify-between">
                      <p className="text-gray-500 text-sm-custom">
                        by: {item?.by}
                      </p>
                      <div className="">
                        <button
                          className="px-2 py-1 bg-secondary-500 rounded text-white"
                          onClick={() => handleAccept(item, ind)}
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function Module({ module, whiteHeading }) {
  if (!module) return <div>Some Error</div>;

  if (module === "deleted")
    return (
      <p className="px-2 py-1 mb-3 bg-red-400 border-2 border-gray-300 w-full rounded text-center text-white">
        Deleted
      </p>
    );

  return (
    <div className="p-2 pb-4">
      {module.title && (
        <div className="flex flex-col gap-3">
          <h4
            className={`${whiteHeading && "text-white"} w-full  font-semibold`}
          >
            Module Title
          </h4>
          <p className="px-2 py-1 mb-3 bg-white border-2 border-gray-300 w-full rounded">
            {module.title}
          </p>
        </div>
      )}
      {module.topics && Array.isArray(module.topics) && (
        <div className="flex flex-col gap-3">
          <h4
            className={`${
              whiteHeading && "text-white"
            } min-w-[100px] font-semibold`}
          >
            Modules
          </h4>
          <div className="w-full flex flex-col gap-3">
            {module.topics.map((topic, ind) => (
              <p
                key={ind}
                className="px-2 py-1 bg-white border-2 border-gray-300 w-full rounded"
              >
                {module.topics[ind]}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
