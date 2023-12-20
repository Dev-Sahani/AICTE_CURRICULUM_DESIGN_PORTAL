
export default function SidePopup({children}) {
  return (
    <div className="absolute bottom-0 right-[-40px] h-[100vh] w-32 bg-white">
        {children}
    </div>
  )
}
