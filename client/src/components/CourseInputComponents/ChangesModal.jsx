import { useCourseContext } from "../../context";
import { Modal } from "../";

export default function ChangesModal({ name, onClose }) {
  const [propertyName, index] = name.split(".");
  let {[propertyName]: propertyValue} = useCourseContext();
  
  if(propertyValue === undefined) return;
  if(index!==undefined && index!=="" && Array.isArray(propertyValue) && index*1 < propertyValue.length)  
    propertyValue = propertyValue[index];

  return ( 
    <Modal onClose={onClose} className="!w-[56rem]">
      <div className="h-full p-6 flex flex-col gap-6 overflow-y-auto">

        <h1 className="w-full text-center text-2xl font-semibold text-primary-500">
            Changes
        </h1>

        <div className="w-full flex gap-4 items-start justify-between">
          <h3 className="text-lg font-medium">Current Value</h3>
          <div className="max-h-56 basis-[85%] px-1.5 py-1 border border-black bg-white rounded-md overflow-y-auto">
            { propertyValue.cur && propertyValue.cur }
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <h3 className="text-lg font-medium">New Values</h3>
          <div className="basis-[85%]">
            {
              propertyValue.new &&
              propertyValue.new.map((item)=>
                <div className="mb-4 flex flex-col gap-1 items-end">
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
