export default function Table({ data, primaryHead, head }) {
  // const keyOrder = ["code", "title", "semester", "l", "t", "p", "credits"];
    let headClasses = "border-separate border-spacing-0 ";
    if (primaryHead) headClasses += " text-white bg-primary-600";
    else headClasses += " text-primary-900";
    if(head) data.unshift(head);

    return (
      <table className="table-auto border-separate border-spacing-y-2">
        <thead>
          <tr className={headClasses}>
            {
              data[0].map((str) => 
                <th className="px-5 py-2 capitalize" key={str}>
                  {str}
                </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {data.map((row, indx) => {
            if (indx === 0) return;
            return (
              <tr className="bg-accent-200" key={indx}>
                {row.map((str, cellIndex) => 
                  <td
                    className={`px-5 py-2 ${
                      // Apply rounded classes to the first and last cells in the row
                      cellIndex === 0 ? "rounded-l-full" : cellIndex === row.length - 1 ? "rounded-r-full" : ""
                    }`}
                    key={cellIndex}
                  >
                    {str}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  