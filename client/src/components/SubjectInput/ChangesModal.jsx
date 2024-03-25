import { useSubjectContext } from "../../context";
import { Modal } from "../";

export default function ChangesModal({ name, index, onClose }) {
  let {subject: {[name]: propertyValue}} = useSubjectContext();

  if(propertyValue === undefined || !propertyValue.cur) return <div>Some Error</div>;
  if(index!==undefined && index!=="" && Array.isArray(propertyValue.cur) && index*1 < propertyValue.cur.length)  {
    propertyValue = propertyValue.cur[index*1];
  }
  
  return ( 
    <Modal onClose={onClose} className="!w-[56rem]">
      <div className="h-full p-6 flex flex-col gap-6 overflow-y-auto">

        <h1 className="w-full text-center text-2xl font-semibold text-primary-500">
            Changes
        </h1>

        <div className="w-full flex gap-4 items-start justify-between">
          <h3 className="text-lg font-medium">Current Value</h3>
          <div className="max-h-56 basis-[85%] px-1.5 py-1 border border-black bg-white rounded-md overflow-y-auto">
            { 
              name === "modules" ?
              <Module module={propertyValue.cur} />
              :
              propertyValue.cur && propertyValue.cur 
            }
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <h3 className="text-lg font-medium">New Values</h3>
          <div className="basis-[85%]">
            {
              propertyValue.new &&
              propertyValue.new.map((item, ind)=> 
              {  
                if(name === "modules") return (
                  <div key={ind}>
                    <Module module={item?.value} />
                    <p className="text-gray-500 text-sm">by: {item?.by}</p>
                  </div>
                );
                return  (                  
                  <div className="mb-4 flex flex-col gap-1 items-end" key={ind}>
                    <div className={`max-h-56 w-full px-1.5 py-1 border border-black ${item?.value==="deleted" ? "bg-red-500 text-white text-center capitalize" : "bg-white"} rounded-md overflow-y-auto`} > 
                      <p>{item?.value}</p>
                    </div>
                    <p className="text-gray-500 text-sm">by: {item?.by}</p>
                  </div>
                );
              })
            }
          </div>
        </div>

        {
          propertyValue.del && propertyValue.del.length > 0 && 
          <div>
            <h3>Delete</h3>
            {
              propertyValue.new &&
              propertyValue.new.map((item, indx)=>
                <div key={indx}>
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

function Module({module}) {
  if(!module) return <div>Some Error</div>;

  return (
    <div>
      {
        module.title && 
        <div className='flex flex-col gap-3'>
          <h4 className='w-full font-semibold text-primary-500'>Module Title</h4>
          <input 
            value={module.title}
            onChange={()=>{}}
            className="px-2 py-1 mb-3 outline-none border-2 border-gray-300 w-full rounded"
          />
        </div>
      }
      {
        module.topics && Array.isArray(module.topics) 
        &&
        <div className='flex flex-col gap-3'>
          <h4 className='min-w-[100px] font-semibold text-primary-500'>Modules</h4>
          <div className='w-full grid grid-cols-2 gap-3'>
            {
              module.topics.map((topic, ind) => 
                <input 
                  key={ind}
                  defaultValue={module.topics[ind]}
                  className="px-2 py-1 outline-none border-2 border-gray-300 w-full rounded"
                />
              )
            }
          </div>
        </div>
      }
    </div>
  )
}