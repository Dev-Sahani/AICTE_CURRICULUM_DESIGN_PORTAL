import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSubjectContext } from "../../context";
import { Loading } from "..";
import { ViewChangesButton } from ".";

export default function Module({ module, index }) {
  const name = "modules";
  const { subject_common_id } = useParams();
  const { updateModule } = useSubjectContext();
  const [value, setValue] = useState(module?.cur);
  const [localLoading, setLocalLoading] = useState(false);

  if (!value) return <div>Invalid {name} value</div>;

  const handleUpdate = async (del = false) => {
    setLocalLoading(true);
    if (!del) {
      setValue(value.topics.filter((topic) => topic !== "" && topic !== " "));
    }
    await updateModule(
      subject_common_id,
      del ? undefined : value,
      false,
      index,
      del
    );
    setValue(module?.cur);
    setLocalLoading(false);
  };

  if (localLoading) return <Loading count={1} cardClassName="!h-48" />;

  return (
    <div
      className="w-full flex flex-col gap-3 bg-primary-50 rounded p-4"
      key={index}
    >
      {value && (
        <div className="w-full">
          {value.title && (
            <div className="flex gap-3">
              <h4 className="min-w-[100px] font-semibold text-primary-500">
                Module Title
              </h4>
              <input
                name={`module.${index}`}
                value={value.title}
                onChange={(e) => setValue({ ...value, title: e.target.value })}
                className={`
                  px-2 py-1 mb-3 outline-none border-2 border-gray-300 w-full rounded
                  ${
                    module &&
                    module.new &&
                    module.new.length > 0 &&
                    "bg-accent-300"
                  }
                `}
              />
            </div>
          )}
          {value.topics && Array.isArray(value.topics) && (
            <div className="mt-2 flex gap-3">
              <h4 className="min-w-[100px] font-semibold text-primary-500">
                Modules
              </h4>
              <div className="w-full flex flex-col gap-2">
                {value.topics.map((topic, ind) => (
                  <div className="flex gap-2 items-center" key={ind}>
                    <input
                      key={ind}
                      name={`module.${index}.topics.${ind}`}
                      value={value.topics[ind]}
                      onChange={(e) =>
                        setValue({
                          ...value,
                          topics: value.topics.map((v, i) =>
                            i === ind ? e.target.value : v
                          ),
                        })
                      }
                      className={`
                          px-2 py-1 outline-none border-2 border-gray-300 w-full rounded
                          ${
                            module &&
                            module.new &&
                            module.new.length > 0 &&
                            "bg-accent-300"
                          }
                        `}
                    />
                    <button
                      onClick={() =>
                        setValue({
                          ...value,
                          topics: value.topics.filter((t, i) => i !== ind),
                        })
                      }
                      className="cursor-pointer"
                    >
                      <img
                        src="/deleteButton2.svg"
                        alt="del"
                        className="h-5 w-5"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="w-full flex gap-4 justify-between items-center">
        <div>
          <button
            disabled={localLoading}
            onClick={() =>
              setValue({ ...value, topics: [...value.topics, ""] })
            }
            className="px-3 py-1.5 rounded bg-secondary-500 text-white text-sm-custom"
          >
            Add Module
          </button>
        </div>
        <div className="flex gap-3 items-center">
          {module.new.length > 0 && (
            <ViewChangesButton
              name={name}
              index={index}
              showText
              imageClassName="h-8"
            />
          )}
          <button
            disabled={localLoading}
            onClick={() => handleUpdate(true)}
            className="px-3 py-1 rounded bg-red-400 text-white"
          >
            Delete
          </button>
          {JSON.stringify(value) !== JSON.stringify(module.cur) && (
            <div className="flex gap-3">
              <button
                disabled={localLoading}
                onClick={() => handleUpdate()}
                className="px-3 py-1 rounded bg-secondary-500 text-white"
              >
                Save
              </button>
              <button
                disabled={localLoading}
                onClick={() => setValue(module?.cur)}
                className="px-3 py-1 rounded bg-red-400 text-white"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
