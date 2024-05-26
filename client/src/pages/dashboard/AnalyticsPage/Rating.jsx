import classNames from "classnames"

export default function Rating({percent, bgClassName, ratingClassName}){
    const bgClass = classNames(
        bgClassName,
        `bg-gray-500 rounded-xl h-4 w-full`
    )
    const ratingClass = classNames(
        ratingClassName,
        `bg-primary-600 rounded-xl h-full`
    )

    return <div className={bgClass}>
        <div className={ratingClass} style={{width:`${percent}%`}}></div>
    </div>
}