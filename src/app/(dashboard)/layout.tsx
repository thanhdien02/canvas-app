import Sidebar from "./sidebar";

interface LayoutDashboardProps {
  children: React.ReactNode;
}
const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
  return (
    <div className="bg-muted h-full w-full">
      <Sidebar />
      <div className="lg:pl-[300px]">{children}</div>
    </div>
  );
};

export default LayoutDashboard;
