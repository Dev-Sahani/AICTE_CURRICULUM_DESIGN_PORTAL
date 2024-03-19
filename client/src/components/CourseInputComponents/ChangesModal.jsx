import { useCourseContext } from "../../context";
import { Label, Modal } from "../";

export default function ChangesModal({ name, subName, onClose }) {
  const [propertyName, index] = name.split(".");
  let {[propertyName]: propertyValue} = useCourseContext();

  if(propertyValue === undefined || !propertyValue.cur) return;
  if(!subName && index!==undefined && index!=="" && Array.isArray(propertyValue.cur) && index*1 < propertyValue.cur.length && propertyValue.cur[index*1].cur) {
    propertyValue = propertyValue.cur[index];
  }
  else if(index!==undefined && index!=="" && Array.isArray(propertyValue.cur) && index*1 < propertyValue.cur.length && propertyValue.cur[index*1].cur && propertyValue.cur[index*1].cur[subName])  {
    propertyValue = {
      cur: propertyValue.cur[index*1].cur[subName],
      new: propertyValue.cur[index*1].new?.reduce((currSub, newSub)=>newSub?.value[subName] ? [...currSub, {by: newSub.by, value: newSub.value[subName]}] : currSub, [])
    };
  }
  
  return ( 
    <Modal onClose={onClose} className="!w-[56rem]">
      <div className="h-full p-6 flex flex-col gap-6 overflow-y-auto">

        <h1 className="w-full text-center text-2xl font-semibold text-primary-500">
            Changes
        </h1>

        <div className="w-full flex gap-4 items-start justify-between">
          <h3 className="mt-2 text-lg font-medium">Current Value</h3>
          <div className={`basis-[85%] px-1.5 py-1 ${typeof propertyValue.cur!=="object" && 'max-h-56 border border-black bg-white rounded-md overflow-y-auto'} flex flex-col gap-2`}>
            { 
              propertyValue.cur && typeof propertyValue.cur === "object"
              ?
                Object.keys(propertyValue.cur).map((key)=>{
                  return (
                    <div className="w-full flex justify-between" key={key}>
                      <Label>{key}</Label>
                      <input type="text" className="w-full p-1.5 outline-none border-2 border-gray-300" value={propertyValue.cur[key]}  onChange={()=>{}}/>
                    </div>
                  )
                })
              :
              propertyValue.cur && propertyValue.cur
            }
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <h3 className="mt-2 text-lg font-medium">New Values</h3>
          <div className="basis-[85%]">
            {
              propertyValue.new &&
              propertyValue.new.map((item, ind)=> 
                typeof item?.value === "object" 
                ?
                <div className="w-full flex flex-col gap-2" key={ind}>
                  {
                  Object.keys(item?.value)?.map(key=>
                    <div className="w-full flex justify-between" key={key}>
                      <Label>{key}</Label>
                      <input className="p-1.5 w-full outline-none border-2 border-gray-200" value={item?.value[key]} onChange={()=>{}}/>
                    </div>
                  )
                  }
                  <p className="w-full text-end text-gray-500">by: {item.by}</p>
                </div>
                :
                  <div className="mb-4 flex flex-col gap-1 items-end" key={ind}>
                    <div className="max-h-56 w-full px-1.5 py-1 border border-black bg-white rounded-md overflow-y-auto">
                      <p>{item?.value}</p>
                    </div>
                    <p className="text-gray-500 text-sm">by: {item?.by}</p>
                  </div>
              )
            }
          </div>
        </div>

        {
          propertyName.del && propertyName.del.length > 0 && 
          <div>
            <h3>Delete</h3>
            {
              propertyValue.new &&
              propertyValue.new.map((item)=>
                <div>
                  <p>{item?.value}</p>
                  <p>{item?.by}</p>
                </div>
              )
            }
          </div>
        }

      </div>

    </Modal>
  )
}
