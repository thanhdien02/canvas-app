import Sidebar from "./sidebar";

interface LayoutDashboardProps {
  children: React.ReactNode;
}
const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
  return (
    <div className="bg-muted flex min-h-screen w-screen">
      <Sidebar />
      <div className="lg:flex-1 w-full">{children}</div>
    </div>
  );
};

export default LayoutDashboard;
