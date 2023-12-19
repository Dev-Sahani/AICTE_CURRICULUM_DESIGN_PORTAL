
export default function CardWrapper({children, classNames}) {
  let classes = "bg-white rounded-xl"
  if(classNames) classes = classNames + " " + classes;
  return (
    <div className={classes}>
        {children}
    </div>
  )
}
