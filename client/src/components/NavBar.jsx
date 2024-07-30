import ImageComponent from "../assets";
import { SidebarContent } from "../utils/constants";
import Hamburger from "./Hamburger";

const NavBar = ({ className }) => {
  return (
    <nav
      className={
        (className || "") +
        " flex justify-between bg-gradient-to-r from-primary-700 to-primary-400 relative"
      }
    >
      <div className="flex items-center gap-4">
        <ImageComponent
          imageName="LogoImage"
          className="h-12"
          alt="AICTE_LOGO"
        />
        <h1 className="text-2xl-custom text-white">
          AICTE Curriculum Design Portal
        </h1>
      </div>
      <Hamburger siteMapList={SidebarContent} />
    </nav>
  );
};

export default NavBar;
