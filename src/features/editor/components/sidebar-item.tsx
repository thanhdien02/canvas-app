import { LucideIcon } from "lucide-react";

interface SideBarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onChangeActiveTool: () => void;
}
const SideBarItem = ({
  icon: Icon,
  label,
  isActive,
  onChangeActiveTool,
}: SideBarItemProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 
    hover:bg-slate-300/30 transition cursor-pointer px-4 py-3
    ${isActive ? "bg-slate-300/40" : ""}`}
      onClick={onChangeActiveTool}
    >
      <Icon size={20} />
      <p className="text-xs font-medium">{label}</p>
    </div>
  );
};

export default SideBarItem;
