import { LucideIcon } from "lucide-react";
import Link from "next/link";
interface SidebarProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}
const SidebarItem = ({
  icon: Icon,
  label,
  href,
  isActive,
  onClick,
}: SidebarProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center justify-start gap-2 px-4 py-2 h-11 rounded-md hover:bg-white transition ${
        isActive ? "bg-white" : "bg-muted"
      }`}
    >
      <Icon className="size-4" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default SidebarItem;
