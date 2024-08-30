import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

interface ShapeToolProps {
  icon: LucideIcon | IconType;
  onClick: () => void;
  iconClassName?: string;
}
const ShapeTool = ({ icon: Icon, onClick, iconClassName }: ShapeToolProps) => {
  return (
    <button className="aspect-square border rounded-md p-5" onClick={onClick}>
      <Icon className={`h-full w-full ${iconClassName}`} />
    </button>
  );
};

export default ShapeTool;
