import Logo from "./logo";
import SidebarRoute from "./sibar-routes";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 bottom-0 bg-muted shrink-0 lg:flex hidden flex-col w-[300px] p-4 gap-y-5">
      <Logo />
      <SidebarRoute/>
    </div>
  );
};

export default Sidebar;
