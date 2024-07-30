import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading, Modal, SecondaryButton } from "../../../../components";
import { useUserContext } from "../../../../context";

export default function VersionPage() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [createVersion, setCreateVersion] = useState(false);
  const [version, setVersion] = useState(-1);
  const { common_id } = useParams();
  const { accessedCourses } = useUserContext();
  const base_url = process.env.REACT_APP_URL;

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        base_url + "/api/v1/commit/get-all-commits/" + common_id,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.data?.commits) setData(res.data.data.commits);
      else throw new Error("Data has not come in desired format!");
    } catch (err) {
      window.alert(err.response?.data?.message || err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const resetToOldVersion = async () => {
    let access = "";
    for (const course of accessedCourses) {
      if (common_id === course?.id) {
        access = course.access;
        break;
      }
    }

    if (access !== "head") {
      window.alert("You don't have access to reset to old version.");
      return;
    }

    setLoading(true);
    try {
      await axios.delete(
        `${base_url}/api/v1/commit/reset-commit/${common_id}/${version}`,
        {
          withCredentials: true,
        }
      );
      await getData(setData, setLoading);
    } catch (err) {
      window.alert(err.response?.data?.message || err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const createNewVersion = () => {
    setShowConfirmModal(false);
    setLoading(true);
    axios
      .post(
        `${base_url}/api/v1/commit/save/${common_id}/`,
        {},
        { withCredentials: true }
      )
      .then(async (res) => {
        await getData(setData, setLoading);
      })
      .catch((err) => {
        // handle Error
        window.alert(err.response?.data?.message || err.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="">
      <header className="my-2 px-4 flex justify-between">
        <h1 className="text-3xl text-center text-primary-500 font-bold">
          Previous versions
        </h1>
        <SecondaryButton
          onClick={() => {
            setCreateVersion(true);
            setShowConfirmModal(true);
          }}
        >
          Create Version
        </SecondaryButton>
      </header>

      <div className="flex flex-col m-4 gap-4">
        {loading ? (
          <Loading
            count={8}
            cardClassName="w-full h-16"
            containerClassName="rounded"
          />
        ) : (
          data?.map((version, ind) => (
            <div
              key={ind}
              className="w-full rounded flex justify-between items-center p-4 border-2 border-gray-500"
            >
              <h2 className="bg-primary-500 p-2 px-4 text-white font-semibold rounded-full">
                {version?.version}
              </h2>
              <h2 className="text-gray-600">
                {version?.dateOfCommit.substring(0, 10)}
              </h2>
              <h2 className="text-lg-custom font-medium">
                {version?.title?.cur}
              </h2>
              <div className="flex gap-3 items-center">
                <button className="py-1.5 px-3 text-white bg-secondary-500 rounded">
                  Open
                </button>
                <button
                  className="py-1.5 px-3 text-white bg-primary-500 rounded"
                  onClick={() => {
                    setVersion(version?.version);
                    setShowConfirmModal(true);
                  }}
                  disabled={loading}
                >
                  Apply
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showConfirmModal && (
        <Modal
          onClose={() => {
            setShowConfirmModal(false);
            setCreateVersion(false);
          }}
          className="!h-[10rem] !w-[22rem]"
        >
          <p className="mt-8 px-4 text-center">
            {createVersion
              ? "Are you sure you want to create a new version?"
              : "Are you sure you want to apply previous version?"}
          </p>
          <div className="mt-4 w-full flex justify-evenly items-center">
            <button
              className="min-w-[80px] px-2 py-1 bg-primary-500 text-white"
              onClick={() =>
                createVersion ? createNewVersion() : resetToOldVersion(version)
              }
            >
              Yes
            </button>
            <button
              className="min-w-[80px] px-2 py-1 bg-red-500 text-white"
              onClick={() => {
                setShowConfirmModal(false);
                setCreateVersion(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
