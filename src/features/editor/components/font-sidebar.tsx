import { ActiveTool, Editor, fonts } from "../type/type.editor";
import ToolSidebarHeader from "./tool-siderbar-header";
import { Separator } from "@/components/ui/separator";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

interface FontSideBarProps {
  isActive: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const FontSideBar = ({
  isActive,
  editor,
  onChangeActiveTool,
}: FontSideBarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <div
      className={`flex flex-col relative z-40 shrink-0 border-r bg-white transition-all w-[360px] 
         ${isActive === "font" ? "block" : "hidden"}`}
    >
      <ToolSidebarHeader
        title="Fonts"
        description="Change font of text in the toolbar"
      ></ToolSidebarHeader>
      <Separator orientation="horizontal"></Separator>
      <ScrollArea>
        <div className="p-4 space-y-2">
          {fonts?.length > 0 &&
            fonts?.map((font: string, index: number) => (
              <Button
                key={index}
                variant="secondary"
                onClick={() => editor?.changeFontFamily(font)}
                className={`h-14 w-full text-base justify-start ${
                  font == editor?.getActiveFontFamily() &&
                  "border-2 border-blue-500"
                }`}
                style={{ fontFamily: font }}
              >
                {font}
              </Button>
            ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClose={onClose}></ToolSidebarClose>
    </div>
  );
};

export default FontSideBar;
