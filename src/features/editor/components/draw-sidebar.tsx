import {
  ActiveTool,
  Editor,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_WIDTH,
} from "../type/type.editor";
import ToolSidebarHeader from "./tool-siderbar-header";
import { Separator } from "@/components/ui/separator";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo } from "react";
import ColorPicker from "./color-picker";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

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
  const widthValue = useMemo(() => {
    return editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  }, [editor]);
  const onClose = () => {
    onChangeActiveTool("select");
  };
  const valueDraw = useMemo(
    () => editor?.getActiveStrokeColor() || STROKE_COLOR,
    [editor]
  );
  const onChangeDraw = (value: string) => {
    editor?.changeStrokeColor(value);
  };
  const onChangeWidth = (value: number[]) => {
    editor?.changeStrokeWidth(value[0]);
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
        <div className="p-4 w-full space-y-4">
          <Label>Draw width</Label>
          <Slider
            value={[widthValue]}
            className="w-full"
            onValueChange={onChangeWidth}
          />
        </div>
        <div className="p-4 w-full">
          <ColorPicker onChange={onChangeDraw} value={valueDraw} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClose={onClose}></ToolSidebarClose>
    </div>
  );
};

export default DrawSideBar;
