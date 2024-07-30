import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { NavBar, Sidebar, ConfirmationCard } from "../../components";
import useWindowSize from "../../hooks/useWindowSize";
import { breakPoints } from "../../utils/constants";

const SharedLayout = () => {
  const windowSize = useWindowSize();
  const [showSmallScreenWarning, setShowSmallScreenWarning] = useState(false);
  useEffect(() => {
    if (windowSize.width < breakPoints[1]) {
      setShowSmallScreenWarning(true);
    } else {
      setShowSmallScreenWarning(false);
    }
  }, [windowSize]);

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
      <main className="flex h-full w-[100vw] grow">
        <Sidebar className="border-2" />
        <div className="w-full px-8 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default SharedLayout;
