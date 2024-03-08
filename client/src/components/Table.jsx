import { Link } from "react-router-dom";

export default function Table({data, keys, primaryHeader=true, secondaryHeader=false, to}) {
  if(!data || !keys) return <div>Data is not passed</div>;

  const rowClasses = "w-full py-2 px-2 lg:px-6 xl:px-10 text-center bg-accent-400";

  return (
    <div className="flex justify-center items-center">
      {
        keys?.map((value, indx)=>{
          return (
            <div className="flex flex-col items-center justify-between whitespace-nowrap" key={indx}>
              <header className={`${secondaryHeader ? "w-full text-center text-white bg-primary-700 p-2" : "text-primary-500"} text-lg font-semibold capitalize`}>
                <h2>{value}</h2>
              </header>
              
              <main className="w-full flex flex-col items-center gap-2 mt-2">
                {
                  data?.map((item, ind)=>{
                    const classes = `
                      ${rowClasses} 
                      ${indx===0 && " rounded-l-full "} 
                      ${indx===keys.length-1 && " rounded-r-full"}
                    `
                    let innerContent = "-"
                    if(item && item.cur && item.cur[value]) 
                      innerContent = item.cur[value];
                    
                    // p can be replaced by input to listen any changes in subject property
                    return <Link key={ind} to={`${item.cur.common_id}`} className={classes}>{ innerContent }</Link>
                  })
                }
              </main>
            </div>
          )
        })
      }
    </div>
  )

  // return (
  //   <table className="indent-[3vw] lg:indent-[4vw] text-center">
  //     <thead className="text-primary-500 text-xl capitalize">
  //       <tr>
  //         {
  //           keys.map((value, indx)=> 
  //             <td key={indx} >
  //               {value || "-"}
  //             </td>
  //           )
  //         }
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {
  //         data.map((item, indx)=> {
  //           if(!item || !item.cur) return;
  //           return (
  //             <tr key={item.cur.common_id || indx}>
  //               {
  //                 keys.map((value, nestedIndx)=>  {
  //                   const classes = `bg-accent-500 ${nestedIndx===0 && "rounded-l-full"} ${nestedIndx===keys.length-1 && "rounded-r-full"}`
  //                   return (
  //                     item.cur[value] 
  //                     ? 
  //                     <td key={nestedIndx} className={classes}>
  //                       {item.cur[value]}
  //                     </td>
  //                     :
  //                     <td className={classes}>-</td>
  //                   );
  //                 })
  //               }
  //             </tr>
  //           )
  //         })
  //       }
  //     </tbody>
  //   </table>
  // )
}
