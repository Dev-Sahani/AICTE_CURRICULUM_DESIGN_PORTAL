
export default function ModelWrapper({children}) {
  return (
    <div className='bg-gray-200/50 absolute top-0 left-0 flex justify-center items-center'>
        {children}
    </div>
  )
}
