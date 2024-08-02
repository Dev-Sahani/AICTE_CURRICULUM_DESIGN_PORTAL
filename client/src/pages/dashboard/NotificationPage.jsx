import { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function NotificationPage() {
  const { notifications, setLastSeenNotification } = useUserContext();
  useEffect(() => {
    setLastSeenNotification(notifications[0]?.timestamp || new Date("1979"));
    // eslint-disable-next-line
  }, [notifications]);

  return (
    <div className="p-4">
      <h1 className="text-5xl-custom font-bold text-primary-500">
        Notifications
      </h1>
      <ul className="w-full mt-8 flex flex-col gap-6">
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
    <li className="bg-white rounded shadow relative flex justify-between gap-12 p-4 py-5">
      <Link
        to={link}
        className="w-full flex justify-between gap-4 items-center"
      >
        <img
          src={image || "/icons8-notification.png"}
          className="h-12 w-12 hidden sm:block"
          alt="notification"
        />
        <div className="w-full h-full flex flex-col gap-2">
          <h4 className="text-xl-custom font-semibold text-accent-500">
            {heading}
          </h4>
          <p className="text-base-custom">{message}</p>
        </div>
      </Link>
      <img
        src="/deleteButton2.svg"
        className="w-5 h-5 absolute top-1 right-1 sm:static mt-1 hover:cursor-pointer"
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
        {new Date(timestamp).toUTCString().substring(5, 22)}
      </p>
    </li>
  );
}
