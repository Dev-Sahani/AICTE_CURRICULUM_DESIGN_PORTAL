import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../context";
import { useEffect, useState } from "react";

const SidebarList = ({ data, isOpen }) => {
  const location = useLocation();
  const active =
    location.pathname === data.link ||
    (data.link === "/" && location.pathname.startsWith("/curriculum"));

  const { lastSeenNotification, notifications } = useUserContext();
  const [unseenNotifications, setUnseenNotification] = useState(false);
  useEffect(() => {
    setUnseenNotification(
      data.name === "Notification" &&
        new Date(lastSeenNotification) < new Date(notifications[0]?.timestamp)
    );
    // eslint-disable-next-line
  }, [notifications, lastSeenNotification]);

  const color = active ? "#BB6002" : data.color;

  return (
    <Link
      className="h-12 ml-[0.5vw] flex gap-2 items-center relative"
      to={data.link}
      {...data}
      svg="" //to avoid warning
    >
      {data.svg(color)}

      <h2
        style={{
          color: `${color}`,
        }}
        className={!isOpen ? "hidden" : ""}
      >
        {data.name}
      </h2>
      {active && (
        <div className="h-6 border-[3px] border-accent-700 rounded absolute right-0" />
      )}
      {unseenNotifications && (
        <div className="w-2 h-2 mb-2 bg-accent-700 rounded-full" />
      )}
    </Link>
  );
};

export default SidebarList;
