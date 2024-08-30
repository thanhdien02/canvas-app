import {
  ActiveTool,
  Editor,
  FILL_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "../type/type.editor";
import ToolSidebarHeader from "./tool-siderbar-header";
import { Separator } from "@/components/ui/separator";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface StrokeWidthSideBarProps {
  isActive: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const StrokeWidthSideBar = ({
  isActive,
  editor,
  onChangeActiveTool,
}: StrokeWidthSideBarProps) => {
  const widthValue = useMemo(() => {
    return editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  }, [editor]);
  const onClose = () => {
    onChangeActiveTool("select");
  };
  const onChange = (values: number[]) => {
    editor?.changeStrokeWidth(values[0]);
  };
  return (
    <div
      className={`flex flex-col relative z-40 shrink-0 border-r bg-white transition-all w-[360px]
         ${isActive === "stroke-width" ? "block" : "hidden"}`}
    >
      <ToolSidebarHeader
        title="Stroke width"
        description="Change the stroke width of the selected shape"
      ></ToolSidebarHeader>
      <Separator orientation="horizontal"></Separator>
      <ScrollArea>
        <div className="p-4 w-full space-y-4">
          <Label>Stroke width</Label>
          <Slider
            value={[widthValue]}
            className={cn("w-full")}
            onValueChange={onChange}
          />
        </div>
        <div className="p-4 space-y-4">
          <Label>Stroke type</Label>
          <div
            onClick={() => {
              editor?.changeStrokeDashArray([]);
            }}
            className={`flex items-center justify-center hover:bg-slate-300/40 rounded h-7 transition w-full cursor-pointer
              ${
                JSON.stringify(
                  editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY
                ) == `[]` && "bg-slate-300/40 border border-blue-400"
              }`}
          >
            <div className="bg-black w-[300px] h-2" />
          </div>
          <div
            className={`flex items-center justify-center hover:bg-slate-300/40 rounded h-7 transition w-full cursor-pointer
              ${
                JSON.stringify(
                  editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY
                ) == `[5,5]` && "bg-slate-300/40 border border-blue-400"
              }`}
            onClick={() => {
              editor?.changeStrokeDashArray([5, 5]);
            }}
          >
            <div className="border-t-8 border-dashed border-black w-[300px]" />
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClose={onClose}></ToolSidebarClose>
    </div>
  );
};

export default StrokeWidthSideBar;
