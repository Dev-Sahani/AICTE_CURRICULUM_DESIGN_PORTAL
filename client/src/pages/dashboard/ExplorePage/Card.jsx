import data from "./ResourceUtility";
import { Link } from "react-router-dom";

function Explore1() {
  const getImageUrl = (url) => {
    let domain = new URL(url).hostname?.split(".");
    domain = domain.splice(domain.length - 3, domain.length).join(".");

    return `https://www.google.com/s2/favicons?domain=${domain}`;
  };

  return (
    <>
      <div className=" w-full grid grid-cols-1 sm:grid-cols-2 my-4 gap-6 min-w-fit ">
        {data.map((x, index) => {
          return (
            <Link to={x.url} key={index}>
              <div className=" flex flex-col shadow-md transform transition-transform duration-300 hover:scale-[1.03] gap-3 p-4 border-[1px] border-slate-100 bg-white rounded-[10px]  min-h-fit min-w-fit ">
                <div className=" flex flex-col gap-2">
                  <div className="text-[#04314D] text-xl-custom font-semibold flex-start">
                    {x.subjectname}
                  </div>
                  <div className="flex flex-row gap-4">
                    <img src={getImageUrl(x.url)} alt="favicon" />
                  </div>
                  <div className="font-medium text- text-[#04314D] content-center justify-center">
                    {x.instituteName}
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <div className="padding-custom rounded-2xl bg-[#FFF9C5] text-[#7C3D0B] text-sm-custom  font-medium justify-center items-center w-fit">
                  {x.level}
                </div>
                <div className="padding-custom rounded-2xl bg-[#F2E3FF] text-[#521486] text-sm-custom  font-medium justify-center items-center w-fit">
                  {x.program}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Explore1;
