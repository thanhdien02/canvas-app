import { ActiveTool, Editor } from "../type/type.editor";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import ToolSidebarHeader from "./tool-siderbar-header";
import { Separator } from "@/components/ui/separator";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "./shape-tool";

interface ShapesSideBarProps {
  isActive: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: Editor | undefined;
}
const ShapesSideBar = ({
  isActive,
  editor,
  onChangeActiveTool,
}: ShapesSideBarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };
  return (
    <div
      className={`flex flex-col relative z-40 shrink-0 border-r bg-white transition-all
         ${
           isActive === "shapes"
             ? "w-[360px] opacity-100"
             : "w-0 opacity-0 invisible"
         }`}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      ></ToolSidebarHeader>
      <Separator orientation="horizontal"></Separator>
      <ScrollArea>
        <div className="p-3 grid grid-cols-3 gap-4">
          <ShapeTool
            icon={FaCircle}
            onClick={() => {
              editor?.addCircle();
            }}
          ></ShapeTool>
          <ShapeTool
            icon={FaSquare}
            onClick={() => {
              editor?.addSoftRectangle();
            }}
          ></ShapeTool>
          <ShapeTool
            icon={FaSquareFull}
            onClick={() => {
              editor?.addRectangle();
            }}
          ></ShapeTool>
          <ShapeTool
            icon={IoTriangle}
            onClick={() => {
              editor?.addTriangle();
            }}
          ></ShapeTool>
          <ShapeTool
            onClick={() => {
              editor?.addInverseTriangle();
            }}
            icon={IoTriangle}
            iconClassName="rotate-180"
          />
          <ShapeTool
            icon={FaDiamond}
            onClick={() => {
              editor?.addDiamond();
            }}
          ></ShapeTool>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClose={onClose}></ToolSidebarClose>
    </div>
  );
};

export default ShapesSideBar;
