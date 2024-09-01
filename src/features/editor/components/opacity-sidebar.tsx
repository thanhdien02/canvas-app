import {
  ActiveTool,
  Editor,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "../type/type.editor";
import ToolSidebarHeader from "./tool-siderbar-header";
import { Separator } from "@/components/ui/separator";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface OpacitySideBarProps {
  isActive: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const OpacitySideBar = ({
  isActive,
  editor,
  onChangeActiveTool,
}: OpacitySideBarProps) => {
  const initialValue = editor?.getActiveOpacity() || 1;
  const selectObject = editor?.selectedObjects[0];
  const [opacity, setOpacity] = useState(initialValue);
  useEffect(() => {
    setOpacity(selectObject?.get("opacity") || 1);
  }, [selectObject]);
  const onClose = () => {
    onChangeActiveTool("select");
  };
  const onChange = (value: number[]) => {
    editor?.changeOpacity(value[0]);
    setOpacity(value[0]);
  };
  return (
    <div
      className={`flex flex-col relative z-40 shrink-0 border-r bg-white transition-all w-[360px]
         ${isActive === "opacity" ? "block" : "hidden"}`}
    >
      <ToolSidebarHeader
        title="Opacity"
        description="Change opacity of the selected object"
      ></ToolSidebarHeader>
      <Separator orientation="horizontal"></Separator>
      <ScrollArea>
        <div className="p-4 w-full space-y-4">
          <Slider
            value={[opacity]}
            min={0}
            max={1}
            step={0.01}
            className={cn("w-full")}
            onValueChange={onChange}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClose={onClose}></ToolSidebarClose>
    </div>
  );
};

export default OpacitySideBar;
