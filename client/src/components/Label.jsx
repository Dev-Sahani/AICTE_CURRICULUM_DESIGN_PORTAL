
export default function Label({
    children,
    large,
    breakLine,
    className,
}) {
  let classess = ` w-[8vw] my-2 text-${large?"xl":"lg"} text-primary-900 ${breakLine?"block": "inline"} font-semibold`
  if(className) classess = className + classess;

  return (
    <h2 className={classess}>
        {children}
    </h2>
  )
}
