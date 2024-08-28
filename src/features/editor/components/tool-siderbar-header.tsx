interface ToolSidebarHeaderProps {
  title: string;
  description: string;
}
const ToolSidebarHeader = ({ title, description }: ToolSidebarHeaderProps) => {
  return (
    <div className="flex flex-col gap-y-1 p-3">
      <h2 className="font-medium text-sm">{title}</h2>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

export default ToolSidebarHeader;
