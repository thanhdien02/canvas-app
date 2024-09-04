import { ActiveTool, Editor, STROKE_WIDTH } from "../type/type.editor";
import ToolSidebarHeader from "./tool-siderbar-header";
import { Separator } from "@/components/ui/separator";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ColorPicker from "./color-picker";

interface SettingSideBarProps {
  isActive: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
type ISize = {
  width: number | string;
  height: number | string;
};

const SettingSideBar = ({
  isActive,
  editor,
  onChangeActiveTool,
}: SettingSideBarProps) => {
  const initialBackground = useMemo(() => {
    return editor?.getActiveBackgroundPage() || "white";
  }, [editor]);
  const initialSize = useMemo(() => {
    return editor?.getActiveSizePage() || { width: 0, height: 0 };
  }, [editor]);

  const [color, setColor] = useState(initialBackground);
  const [size, setSize] = useState<ISize>(initialSize);

  useEffect(() => {
    setColor(initialBackground);
    setSize(initialSize);
  }, [initialBackground, initialSize]);

  const onClose = () => {
    onChangeActiveTool("select");
  };
  const onChangeBackgroundColor = (color: string) => {
    editor?.changeBackgroundPage(color);
    setColor(color);
  };
  const onChangeSizePage = () => {
    editor?.changeSizePage(
      parseInt(size.width as string, 10),
      parseInt(size.height as string, 10)
    );
  };
  return (
    <div
      className={`flex flex-col relative z-40 shrink-0 border-r bg-white transition-all w-[360px]
         ${isActive === "settings" ? "block" : "hidden"}`}
    >
      <ToolSidebarHeader
        title="Settings"
        description="Change size page"
      ></ToolSidebarHeader>
      <Separator orientation="horizontal"></Separator>
      <ScrollArea>
        <div className="p-4 w-full space-y-4">
          <div className="space-y-3">
            <p className="text-sm font-medium">Height</p>
            <Input
              type="number"
              value={size?.height}
              onChange={(e) => {
                setSize({ ...size, height: e.target.value });
              }}
            ></Input>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium">Width</p>
            <Input
              type="number"
              value={size?.width}
              onChange={(e) => {
                setSize({ ...size, width: e.target.value });
              }}
            ></Input>
          </div>
          <Button className="w-full" onClick={onChangeSizePage}>
            Resize
          </Button>

          <ColorPicker
            value={color}
            onChange={onChangeBackgroundColor}
          ></ColorPicker>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClose={onClose}></ToolSidebarClose>
    </div>
  );
};

export default SettingSideBar;
