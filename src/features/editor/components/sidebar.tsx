import { ActiveTool, Editor } from "../type/type.editor";
import SideBarItem from "./sidebar-item";
import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Settings,
  Shapes,
  Type,
} from "lucide-react";
interface SideBarProps {
  isActive: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
const SideBar = ({ isActive, onChangeActiveTool }: SideBarProps) => {
  return (
    <div className="w-[100px] shrink-0 overflow-y-auto border-r z-[41]">
      <ul className="flex flex-col">
        <SideBarItem
          label="Design"
          icon={LayoutTemplate}
          isActive={isActive === "templates"}
          onChangeActiveTool={() => {
            onChangeActiveTool("templates");
          }}
        ></SideBarItem>
        <SideBarItem
          label="Image"
          icon={ImageIcon}
          onChangeActiveTool={() => {
            onChangeActiveTool("images");
          }}
          isActive={isActive === "images"}
        ></SideBarItem>
        <SideBarItem
          label="Text"
          icon={Type}
          onChangeActiveTool={() => {
            onChangeActiveTool("text");
          }}
          isActive={isActive === "text"}
        ></SideBarItem>
        <SideBarItem
          label="Shapes"
          icon={Shapes}
          isActive={isActive === "shapes"}
          onChangeActiveTool={() => {
            onChangeActiveTool("shapes");
          }}
        ></SideBarItem>
        <SideBarItem
          label="Draw"
          icon={Pencil}
          isActive={isActive === "draw"}
          onChangeActiveTool={() => {
            onChangeActiveTool("draw");
          }}
        ></SideBarItem>
        <SideBarItem
          label="Setting"
          icon={Settings}
          isActive={isActive === "settings"}
          onChangeActiveTool={() => {
            onChangeActiveTool("settings");
          }}
        ></SideBarItem>
      </ul>
    </div>
  );
};

export default SideBar;
