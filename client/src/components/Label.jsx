
export default function Label({
    children,
    large,
    breakLine,
    className,
}) {

  let classess = `min-w-[120px] my-2 text-${large?"xl":"lg"} text-primary-900 ${breakLine?"block": "inline"} font-semibold capitalize`
  if(className) classess = className + classess;

  return (
    <label className={classess}>
        {children}
    </label>
  )
}
