
export default function Loading({containerClassName, cardClassName, count=1}){    
    console.log(count);
    const ar = []
    for(let i=0; i<count; i++)
        ar.push(<div key={i} className={`animate-pulse w-full bg-gray-300 h-16 rounded-xl ${cardClassName}`} />)

    return (
        <div className={`flex flex-col gap-2 p-2 ${containerClassName}`}>
            {ar}
        </div>
    );
}