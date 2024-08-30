import { ActiveTool, Editor, STROKE_COLOR } from "../type/type.editor";
import ToolSidebarHeader from "./tool-siderbar-header";
import { Separator } from "@/components/ui/separator";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "./color-picker";
import { useMemo } from "react";

interface StrokeColorSideBarProps {
  isActive: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const StrokeColorSideBar = ({
  isActive,
  editor,
  onChangeActiveTool,
}: StrokeColorSideBarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };
  const value = useMemo(
    () => editor?.getActiveStrokeColor() || STROKE_COLOR,
    [editor]
  );
  const onChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };
  return (
    <div
      className={`flex flex-col relative z-40 shrink-0 border-r bg-white transition-all w-[360px]
         ${isActive === "stroke-color" ? "block" : "hidden"}`}
    >
      <ToolSidebarHeader
        title="Stroke color"
        description="Change the stroke color of the selected shape"
      ></ToolSidebarHeader>
      <Separator orientation="horizontal"></Separator>
      <ScrollArea>
        <div className="p-4 w-full">
          <ColorPicker onChange={onChange} value={value} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClose={onClose}></ToolSidebarClose>
    </div>
  );
};

export default StrokeColorSideBar;
