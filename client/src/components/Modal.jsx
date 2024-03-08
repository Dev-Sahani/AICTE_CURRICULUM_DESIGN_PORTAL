export default function Modal({onClose, children}){
    return (
    <div className="overflow-y-auto bg-[#3c3c5066] overflow-x-hidden fixed top-0 left-0 z-50 w-full md:inset-0 h-full max-h-full">
        <div className="relative flex items-center justify-center h-full w-full">
            {/* Modal content */} 
            <div className="h-[36rem] w-[44rem] relative rounded-lg shadow bg-primary-50">
                <button onClick={()=>onClose()} className="bg-secondary-400 rounded-full w-8 h-8 text-2xl font-semibold absolute top-[4px] right-[4px]">
                    x
                </button>

                {children}
            
            </div>
        </div>
    </div>
    )
}