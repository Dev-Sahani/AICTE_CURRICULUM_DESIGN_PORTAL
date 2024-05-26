import classNames from "classnames"


function PieChart({ yesPer, width, yesColor, noColor, className}){
  if(!width) width = "150px"
  if(!yesColor) yesColor="#008AD4"
  if(!noColor) noColor="#B6E8FF"

  const pieClass = classNames("pie", className);

  const pieStyle = {
    "--percent":yesPer,
    "--color1":yesColor,
    "--color2":noColor,
    "--w":width,
  }
  
  return (
  <>
    <div
      className={pieClass}
      style={pieStyle}
      >
      <p className="absolute inset-0 m-auto w-fit h-fit text-base">
        {(yesPer).toFixed(2)}%
      </p>
    </div>
  </>)
}

export default PieChart;