import { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function NotificationPage() {
  const { notifications, setLastSeenNotification } = useUserContext();
  useEffect(() => {
    console.log("inside notification");
    setLastSeenNotification(notifications[0]?.timestamp || new Date("1979"));
  }, [notifications]);

  return (
    <div className="p-4">
      <h1 className="text-5xl-custom font-bold text-primary-500">
        Notifications
      </h1>
      <ul className="w-full mt-8 flex flex-col gap-8 ">
        {notifications.map((notification) => (
          <NotificationCard
            notification={notification}
            key={notification._id}
          />
        ))}
      </ul>
    </div>
  );
}

function NotificationCard({ notification }) {
  const { heading, message, link, _id, timestamp, image } = notification;
  const { removeNotificationLocally, addNotificationLocally } =
    useUserContext();

  return (
    <li className="bg-white rounded shadow relative flex justify-between gap-12 p-4">
      <Link
        to={link}
        className="w-full flex justify-between gap-4 items-center"
      >
        <img
          src={image || "/icons8-notification.png"}
          className="h-16 w-16"
          alt="notification"
        />
        <div className="w-full h-full flex flex-col gap-2">
          <h4 className="text-2xl-custom font-semibold text-accent-500">
            {heading}
          </h4>
          <p>{message}</p>
        </div>
      </Link>
      <img
        src="/deleteButton2.svg"
        className="hover:cursor-pointer"
        alt="del"
        onClick={() => {
          fetch(process.env.REACT_APP_URL + "/api/v1/notification", {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              notificationId: _id,
            }),
          }).catch((err) => addNotificationLocally(notification));
          removeNotificationLocally(_id);
        }}
      />
      <p className="absolute bottom-2 right-2 text-gray-300 text-sm-custom">
        {new Date(timestamp).toUTCString().substring(5, 17)}
      </p>
    </li>
  );
}
