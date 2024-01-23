import { Link, useLocation } from 'react-router-dom';

const SidebarList = ({data}) => {
  const location = useLocation();
  const active = (location.pathname === data.link || (data.link==="/" && location.pathname.startsWith("/curriculum")));
  const color = active ? "#BB6002" : data.color;
  return (
    <Link 
      className={"h-12 ml-[0.5vw] flex gap-4 items-center"} 
      to={data.link}
      {...data}
      svg="" //to avoid warning
    >
        {
          data.svg(color)
        }

        <h2 
          style={{
            color: `${color}`,
            textWrap: "nowrap", 
          }} 
        >
          {data.name}
        </h2>
        {
          active && 
          <div className="h-6 border-[3px] border-accent-700 rounded absolute right-0"></div>
        }
    </Link>
  )
}

export default SidebarList