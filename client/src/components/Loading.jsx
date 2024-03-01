export default function Loading({count, containerClassName, cardClassName}){
    if(!count)count=1
    
    const ar = []
    for(let i=0; i<count; i++)
    ar.push(<div key={i} className={`animate-pulse w-full bg-gray-300 h-16 rounded-xl ${cardClassName}`} />)
    return <div className={`flex flex-col gap-2 p-2 ${containerClassName}`}>
        {ar}
    </div>
}