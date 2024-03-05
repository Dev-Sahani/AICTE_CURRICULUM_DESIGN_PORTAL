import { Link } from 'react-router-dom';

export default function Resources({ resource }) {

  const truncatedDescription = (resource.description.length > 25)
    ? (`${resource.description.substr(0, 25)}...`)
    : (resource.description);
  return (
    <Link
      to={resource.url}
    >
      <div className='mx-1 my-2 flex flex-col w-full min-w-fit '>
        <div className='rounded-2xl flex flex-row p-5 pb-3 space-x-3 gap-5 h-full bg-white shadow-sm transform transition-transform duration-300 hover:scale-[1.03] '>
          <div><img src={resource.BookImage} alt="" className='flex shrink-0 h-full w-[90px] ' /></div>

          <div className='flex flex-col space-y-4 justify-between  w-full'>
            <div className='flex flex-col space-y-1'>
              <div className='flex flex-row justify-between'>
                {/* <div className='text-xl font-medium leading-none'>{resource.subjectName}</div> */}
                <div className='flex flex-row space-x-2 '>
                  <div className='rounded-2xl bg-[#F3FFC7] px-4 py-1.5 font-medium text-[#5B8506] items-center justify-center content-center'>{resource.type}</div>
                  <div className='rounded-2xl bg-[#FEDEEA] px-4 py-1 font-medium text-[#F8186E] items-center justify-center'>{resource.title}</div>
                </div>
              </div>
              <div className=' text-medium'>{resource.author}</div>
            </div>
            <div className='text-sm'>
              {truncatedDescription}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}