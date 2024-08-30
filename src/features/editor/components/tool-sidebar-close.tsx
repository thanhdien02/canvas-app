import { ChevronsLeft } from "lucide-react";

interface ToolSidebarCloseProps {
  onClose: () => void;
}
const ToolSidebarClose = ({ onClose }: ToolSidebarCloseProps) => {
  return (
    <button
      onClick={onClose}
      className="absolute cursor-pointer right-0 top-1/2 translate-x-[100%] -translate-y-1/2 
                bg-white rounded-none rounded-r-lg h-[70px] group hover:bg-white px-2 border border-l-0"
    >
      <ChevronsLeft className="group-hover:opacity-75 transition size-4 text-black" />
    </button>
  );
};

export default ToolSidebarClose;
