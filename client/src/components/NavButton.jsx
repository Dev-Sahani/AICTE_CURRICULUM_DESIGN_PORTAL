import { Link, useLocation } from "react-router-dom";

export default function NavButton({to, children}) {
  const location = useLocation();
  const active = (location.pathname === to);
  const color = (active) ? "bg-secondary-300" : "bg-primary-100";
  return (
        <Link
          className={`${color} rounded-sm px-4 py-[0.4rem] inline-block`}
            to={to?to:location.pathname}
        >
            {children}
        </Link>
  )
}
