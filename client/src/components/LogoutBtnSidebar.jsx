import { useUserContext } from "../context"

export default function LogoutBtnSidebar(){
  const {logout} = useUserContext()

  const handleLogout = async ()=>{
    await logout()
  }

  return (
    <button 
      className="h-12 ml-[0.5vw] flex gap-4 items-center w-full"
      onClick={handleLogout}
    >
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.6667 36C13.9333 36 13.3056 35.7389 12.7833 35.2167C12.2611 34.6944 12 34.0667 12 33.3333V14.6667C12 13.9333 12.2611 13.3056 12.7833 12.7833C13.3056 12.2611 13.9333 12 14.6667 12H24V14.6667H14.6667V33.3333H24V36H14.6667ZM29.3333 30.6667L27.5 28.7333L30.9 25.3333H20V22.6667H30.9L27.5 19.2667L29.3333 17.3333L36 24L29.3333 30.6667Z" fill="#F53D4C"/>
      </svg>
      <h2 className="text-[#F53D4C] text-nowrap">
        Log-Out
      </h2>
      <div className="hidden h-6 border-[3px] border-accent-700 rounded absolute right-0" />
    </button>

  )
}