import { ActiveTool, Editor, FILL_COLOR } from "../type/type.editor";
import ToolSidebarHeader from "./tool-siderbar-header";
import { Separator } from "@/components/ui/separator";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo } from "react";

interface DrawSideBarProps {
  isActive: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const DrawSideBar = ({
  isActive,
  editor,
  onChangeActiveTool,
}: DrawSideBarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };
  const value = useMemo(
    () => editor?.getActiveFillColor() || FILL_COLOR,
    [editor]
  );
  const onChange = (value: string) => {
    editor?.changeFillColor(value);
  };
  return (
    <div
      className={`flex flex-col relative z-40 shrink-0 border-r bg-white transition-all w-[360px] 
         ${isActive === "draw" ? "block" : "hidden"}`}
    >
      <ToolSidebarHeader
        title="Draw"
        description="Draw paint"
      ></ToolSidebarHeader>
      <Separator orientation="horizontal"></Separator>
      <ScrollArea>
        <div className="p-4 w-full">
        </div>
      </ScrollArea>
      <ToolSidebarClose onClose={onClose}></ToolSidebarClose>
    </div>
  );
};

export default DrawSideBar;
