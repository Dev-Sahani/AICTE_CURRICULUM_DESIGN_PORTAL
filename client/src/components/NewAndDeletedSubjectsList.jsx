import { useCourseContext } from "../context";
import { Link } from "react-router-dom";

export default function NewAndDeletedSubjectsList({ deleted = false }) {
  const {
    subjects: { add: newSubjects, del: deletedSubjects, cur: subjects },
    acceptChanges,
  } = useCourseContext();
  const keys = [
    "code",
    "title",
    "semester",
    "l",
    "t",
    "p",
    "credits",
    "by",
    "-",
  ];
  const rowClasses = `w-full py-2 px-2 lg:px-6 xl:px-10 text-center ${
    deleted ? "bg-red-500 text-white" : "bg-accent-400"
  }`;

  let arrayOfSubject = newSubjects;
  if (deleted) {
    arrayOfSubject = deletedSubjects;
    arrayOfSubject = arrayOfSubject.map((item, index) => {
      if (item?.index === undefined || subjects?.length <= item?.index)
        return { by: item?.by, value: {} };
      return { by: item?.by, value: { ...subjects[item?.index]?.cur } };
    });
  }

  const handleAccept = async (index) => {
    await acceptChanges(
      "subjects",
      index,
      !deleted,
      deleted,
      !deleted ? arrayOfSubject[index]?.value?.title : undefined
    );
  };

  return (
    <div className="flex w-full my-4">
      {keys.map((key, indx) => {
        const classes = `
            ${rowClasses} 
            ${indx === 0 && " rounded-l-full "} 
            ${indx === keys.length - 2 && " rounded-r-full"}
          `;

        return (
          <div
            className="w-full flex flex-col items-center justify-between whitespace-nowrap"
            key={indx}
          >
            <header className="mb-2 text-center text-white bg-primary-700 p-2 w-full text-lg-custom font-semibold capitalize">
              <h2 className="text-center">{key}</h2>
            </header>

            <main className="w-full flex flex-col justify-between items-center gap-2">
              {arrayOfSubject?.map((item, ind) => {
                if (key === "-")
                  return (
                    <button
                      className="mb-1 text-white px-2 py-1 bg-secondary-500"
                      onClick={() => handleAccept(ind)}
                      key={ind}
                    >
                      Accept
                    </button>
                  );

                if (!item) return null;

                return (
                  <div
                    className="w-full flex flex-col items-end gap-1 relative overflow-visible"
                    key={ind}
                  >
                    {/* -------- Add to={} prop to the <Link> to open modal having modules deatils --------- */}
                    <Link key={ind} className={classes}>
                      {key === "by" ? item?.by : item?.value[key] || "-"}
                    </Link>
                  </div>
                );
              })}
            </main>
          </div>
        );
      })}
    </div>
  );
}
