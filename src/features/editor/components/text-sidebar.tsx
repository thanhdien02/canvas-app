import {
  ActiveTool,
  Editor,
} from "../type/type.editor";
import ToolSidebarHeader from "./tool-siderbar-header";
import { Separator } from "@/components/ui/separator";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface TextSideBarProps {
  isActive: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const TextSideBar = ({
  isActive,
  editor,
  onChangeActiveTool,
}: TextSideBarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <div
      className={`flex flex-col relative z-40 shrink-0 border-r bg-white transition-all w-[360px] 
         ${isActive === "text" ? "block" : "hidden"}`}
    >
      <ToolSidebarHeader
        title="Text"
        description="Add to text"
      ></ToolSidebarHeader>
      <Separator orientation="horizontal"></Separator>
      <ScrollArea>
        <div className="p-4 space-y-5">
          <Button className="w-full" onClick={() => editor?.addText("Text")}>
            Add to textbox
          </Button>
          <Button
            className="w-full text-2xl font-bold py-5 h-14"
            variant="secondary"
            onClick={() =>
              editor?.addText("Heading", {
                fontWeight: 700,
                fontSize: 80,
              })
            }
          >
            Add a heading
          </Button>
          <Button
            className="w-full h-12 text-xl"
            variant="secondary"
            onClick={() =>
              editor?.addText("Heading", {
                fontWeight: 600,
                fontSize: 60,
              })
            }
          >
            Add a subheading
          </Button>
          <Button
            className="w-full text-sm"
            variant="secondary"
            onClick={() =>
              editor?.addText("Heading", {
                fontWeight: 500,
                fontSize: 50,
              })
            }
          >
            Paragraph
          </Button>
        </div>
      </ScrollArea>
      <Separator orientation="horizontal"></Separator>
      <ToolSidebarClose onClose={onClose}></ToolSidebarClose>
    </div>
  );
};

export default TextSideBar;
