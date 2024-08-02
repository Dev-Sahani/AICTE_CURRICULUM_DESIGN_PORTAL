import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavBar, Sidebar, ConfirmationCard } from "../../components";
import useWindowSize from "../../hooks/useWindowSize";
import { breakPoints } from "../../utils/constants";
import io from "socket.io-client";
import { useUserContext } from "../../context";

const SharedLayout = () => {
  const windowSize = useWindowSize();
  const [showSmallScreenWarning, setShowSmallScreenWarning] = useState(false);
  const { user, getAllNotifications, addNotificationLocally } =
    useUserContext();

  useEffect(() => {
    if (windowSize.width < breakPoints[1]) {
      setShowSmallScreenWarning(true);
    } else {
      setShowSmallScreenWarning(false);
    }
  }, [windowSize]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_URL);
    socket.emit("init", { userId: user._id, courses: user.courses });
    socket.on("new-notification", (newNotification) => {
      addNotificationLocally(newNotification);
    });
    getAllNotifications();

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      {showSmallScreenWarning && (
        <ConfirmationCard
          description="You will not be able open any curriculum on your small screen. You can only download them."
          heading="The App is not for small screens."
          onClose={() => setShowSmallScreenWarning(false)}
        />
      )}
      <NavBar className="gap-x-4 p-2 md:px-6 md:py-4" />
      <main className="flex w-[100vw] grow overflow-hidden">
        <Sidebar className="border-2" />
        <div className="w-full px-8 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default SharedLayout;
