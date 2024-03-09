import classNames from "classnames"

export default function Modal({onClose, children, className}){
    className = classNames(
        "h-[36rem] w-[56rem] relative rounded-lg shadow bg-primary-50",
        className,
    );

    return (
    <div className="overflow-y-auto bg-[#3c3c5066] overflow-x-hidden fixed top-0 left-0 z-50 w-full md:inset-0 h-full max-h-full">
        <div className="relative flex items-center justify-center h-full w-full">
            {/* Modal content */} 
            <div className={className}>
                <button onClick={()=>onClose()} className="bg-secondary-400 rounded-full w-6 h-6 absolute top-[4px] right-[4px]">
                    <img src="/CloseImage.png" alt="close" className="mix-blend-multiply"/>
                </button>

                {children}
            
            </div>
        </div>
    </div>
    )
}