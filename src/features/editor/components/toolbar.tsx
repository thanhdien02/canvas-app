"use client";
interface ToolBarProps {
  editor?: () => void;
  onClick?: () => void;
}
const ToolBar = ({ onClick }: ToolBarProps) => {
  return (
    <div
      onClick={onClick}
      className="h-[52px] p-4 shrink-0 border-b w-full overflow-x-auto"
    >
      Tool bar
    </div>
  );
};

export default ToolBar;
