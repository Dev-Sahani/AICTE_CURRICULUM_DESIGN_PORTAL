import { useCourseContext, useUserContext } from "../context";
import { Modal } from "./";

export default function NewAndDeleteProperty({ propertyName, onClose }) {
  let {
    [propertyName]: { add: newValues, del: deletedValues, cur: originalValues },
    acceptChanges,
  } = useCourseContext();

  const {
    user: { role },
  } = useUserContext();

  deletedValues = deletedValues.map(({ by, index }) => {
    const value =
      index !== undefined && originalValues && originalValues[index]?.cur;
    return { by, value };
  });

  return (
    <Modal onClose={onClose} className="!overflow-y-auto">
      <h1 className="my-2 w-full text-3xl font-bold text-center text-primary-500">
        Changes
      </h1>
      <main className="mb-4 p-4 w-full flex flex-col gap-4">
        {newValues && Array.isArray(newValues) && newValues.length > 0 && (
          <>
            <h2 className="font-semibold text-xl-custom">New Values: </h2>
            {newValues?.map(
              (newValue, index) =>
                newValue?.value && (
                  <ul className="ml-8 flex flex-col gap-2" key={index}>
                    {newValue?.value &&
                      typeof newValue?.value === "object" &&
                      Object.keys(newValue?.value).map((key, index) => (
                        <li className="flex gap-2 items-center" key={index}>
                          <label className="min-w-[100px] font-medium capitalize">
                            {key}
                          </label>
                          <div className="w-full p-2 border-2 border-gray-300 bg-secondary-500 text-white rounded">
                            {newValue?.value[key] || "-"}
                          </div>
                        </li>
                      ))}
                    <div className="w-full flex justify-between items-center">
                      <p className="ml-[110px] text-gray-400">
                        by: {newValue?.by}
                      </p>
                      {role === "administrator" && (
                        <button
                          className="px-2 py-1 bg-secondary-500 text-white"
                          onClick={() =>
                            acceptChanges(propertyName, index, true)
                          }
                        >
                          Accept
                        </button>
                      )}
                    </div>
                  </ul>
                )
            )}
          </>
        )}

        {Array.isArray(deletedValues) && deletedValues.length > 0 && (
          <>
            <h2 className="font-semibold text-red-500 text-xl-custom">
              Deleted Values:
            </h2>
            {deletedValues?.map(
              (deletedValue, index) =>
                deletedValue && (
                  <ul className="ml-8 flex flex-col gap-2" key={index}>
                    {deletedValue?.value &&
                      typeof deletedValue?.value === "object" &&
                      Object.keys(deletedValue?.value).map((key, index) => (
                        <li className="flex gap-2 items-center" key={index}>
                          <label className="min-w-[100px] text-red-500 font-medium capitalize">
                            {key}
                          </label>
                          `
                          <div className="w-full p-2 bg-red-500 text-white border-2 border-gray-300 rounded">
                            {deletedValue?.value[key] || "-"}
                          </div>
                        </li>
                      ))}
                    <div className="w-full flex justify-between items-center">
                      <p className="ml-[110px] text-gray-400">
                        by: {deletedValue?.by}
                      </p>
                      {role === "administrator" && (
                        <button
                          className="px-2 py-1 bg-secondary-500 text-white"
                          onClick={() =>
                            acceptChanges(propertyName, index, false, true)
                          }
                        >
                          Accept
                        </button>
                      )}
                    </div>
                  </ul>
                )
            )}
          </>
        )}
      </main>
    </Modal>
  );
}
