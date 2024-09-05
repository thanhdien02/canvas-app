import Sidebar from "./sidebar";

interface LayoutDashboardProps {
  children: React.ReactNode;
}
const LayoutDashboard = ({ children }: LayoutDashboardProps) => {
  return (
    <div className="bg-muted flex min-h-screen">
      <Sidebar />
      <div className="lg:flex-1">{children}</div>
    </div>
  );
};

export default LayoutDashboard;
