import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loading, SecondaryButton } from "../../../../components";
import classNames from "classnames";
import axios from "axios";
import AddMaterial from "./AddMaterial";

export default function SubjectResource() {
  const { subject_common_id } = useParams();
  const [data, setData] = useState();
  const [addMaterial, setAddMaterial] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);
  const base_url = process.env.REACT_APP_URL;

  const axiosInstance = axios.create({
    baseURL: base_url + "/api/v1/subjects/",
    withCredentials: true,
  });
  const fetch = async () => {
    try {
      const res = await axiosInstance.get(
        `${subject_common_id}/referenceMaterial`
      );
      if (res.status >= 400) throw new Error(res.data.message);
      return res?.data?.data;
    } catch (err) {
      window.alert(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetch()
      .then((res) => {
        setData(res);
      })
      .finally(() => setLocalLoading(false));
    //eslint-disable-next-line
  }, []);

  const handleDelete = async (e, ind) => {
    setLocalLoading(true);
    try {
      const res = await axiosInstance.patch(
        `/update-by-user/${subject_common_id}`,
        {
          prop: `referenceMaterial.${ind}`,
          del: true,
        }
      );
      if (res.status >= 400) throw new Error(res.data.message);
      const res2 = await fetch();
      setData(res2);
    } catch (err) {
      window.alert(err.response?.data?.message || err.message);
    }
    setLocalLoading(false);
  };
  const handleAdd = async (e, id) => {
    setLocalLoading(true);
    try {
      const res = await axiosInstance.patch(
        `/update-by-user/${subject_common_id}`,
        {
          prop: "referenceMaterial",
          isnew: true,
          data: id,
        }
      );
      if (res.status >= 400) throw new Error(res.data.message);
      const res2 = await fetch();
      setData(res2);
      setAddMaterial(false);
    } catch (err) {
      window.alert(err.response?.data?.message || err.message);
    }
    setLocalLoading(false);
  };
  const handleAccept = async (e, del, isAdd, ind) => {
    setLocalLoading(true);
    if (del) {
      ind = data?.delIndex?.indexOf(ind);
      // console.log(ind)
    }
    try {
      const res = await axiosInstance.patch(
        `/accept-updates/${subject_common_id}`,
        {
          prop: `referenceMaterial`,
          [del ? "del" : "isnew"]: true,
          index: ind,
        }
      );
      if (res.status >= 400) throw new Error(res.data.message);
      const res2 = await fetch();
      setData(res2);
    } catch (err) {
      window.alert(err.response?.data?.message || err.message);
    }
    setLocalLoading(false);
  };

  if (localLoading) {
    return (
      <Loading
        count={5}
        cardClassName="h-20 w-full"
        containerClassName="w-full mt-12"
      />
    );
  }

  return (
    <div className="mt-2 flex flex-col p-2 gap-4">
      <div className="w-full px-2 flex justify-between items-center">
        <h1 className="text-primary-500 text-2xl-custom font-medium">
          Resources
        </h1>
        <SecondaryButton onClick={() => setAddMaterial((prev) => !prev)}>
          Add new Material
        </SecondaryButton>
      </div>
      <div className="pr-2 flex flex-col gap-4">
        {data?.referenceMaterial?.map((resource, indx) => (
          <Resource
            resource={resource}
            key={indx}
            handleDelete={async (e) => handleDelete(e, indx)}
            handleAccept={async (e) => handleAccept(e, true, false, indx)}
            del={data?.delIndex?.includes(indx)}
          />
        ))}
      </div>

      {data?.addReferenceMaterial?.length > 0 && (
        <div>
          <hr className="border-2 border-b my-4" />
          <h1 className="pb-2 ml-2 text-primary-500 text-xl-custom font-medium">
            Newly Added Material
          </h1>

          <div className="flex flex-col gap-4">
            {data?.addReferenceMaterial?.map((resource, indx) => (
              <Resource
                resource={resource}
                isAdd
                key={indx}
                handleAccept={async (e) => handleAccept(e, false, true, indx)}
              />
            ))}
          </div>
        </div>
      )}

      {addMaterial && (
        <AddMaterial
          onClose={() => setAddMaterial(false)}
          handleAdd={handleAdd}
        />
      )}
    </div>
  );
}

function Resource({ resource, isAdd, handleDelete, handleAccept, del }) {
  const classOne = classNames(
    "flex flex-row gap-4 items-center rounded-md p-3 h-full",
    {
      "bg-accent-100": isAdd,
      "bg-primary-100": !isAdd,
      "!bg-red-100": del,
    }
  );

  return (
    <div className="mx-1 flex flex-col w-full min-w-fit">
      <div className={classOne}>
        <Link to={resource?.url}>
          <img
            src={resource?.coverImageUrl}
            alt="book"
            className="flex shrink-0 h-full w-[60px] object-contain"
          />
        </Link>

        <div className="flex flex-col space-y-4 justify-between w-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row space-x-2 ">
                <div className="rounded-2xl bg-[#FEDEEA] px-4 py-1 text-sm-custom font-text-[#F8186E] items-center justify-center">
                  {resource?.title}
                </div>
                <div className="rounded-2xl bg-[#F3FFC7] px-2 py-1 text-xs text-[#5B8506] items-center justify-center content-center">
                  {resource?.type}
                </div>
              </div>
            </div>
            <div className="ml-2 text-sm-custom">by {resource?.author}</div>
          </div>
        </div>
        {isAdd || del ? (
          <button
            onClick={handleAccept}
            className={`px-3 py-1.5 rounded ${
              del ? "bg-red-400" : "bg-secondary-500"
            } text-white`}
          >
            Save
          </button>
        ) : (
          <button onClick={handleDelete}>
            <img
              className="w-8 hover:mix-blend-luminosity"
              src="/deleteButton.png"
              alt="delete"
            />
          </button>
        )}
      </div>
    </div>
  );
}
