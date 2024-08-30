"use client";
import Hint from "@/components/hint";
import { ActiveTool, Editor } from "../type/type.editor";
import { Button } from "@/components/ui/button";
import { BsBorderWidth } from "react-icons/bs";
import { Copy } from "lucide-react";
interface ToolBarProps {
  editor: Editor | undefined;
  isActive?: ActiveTool;
  onClick?: () => void;
  onChangeActiveTool: (tool: ActiveTool) => void;
}
const ToolBar = ({
  onClick,
  onChangeActiveTool,
  editor,
  isActive,
}: ToolBarProps) => {
  return (
    <div
      onClick={onClick}
      className="h-[52px] px-4 shrink-0 border-b w-full overflow-x-auto flex items-center o"
    >
      <div className="flex items-center gap-x-1">
        {editor?.selectedObjects[0] && (
          <Hint label="Color" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 ${
                isActive === "fill" ? "bg-muted-foreground/20" : "bg-white"
              }`}
              size="icon"
              onClick={() => onChangeActiveTool("fill")}
            >
              <span
                className={`size-4 rounded cursor-pointer`}
                style={{ backgroundColor: editor?.getActiveFillColor() }}
              ></span>
            </Button>
          </Hint>
        )}
        {editor?.selectedObjects[0] && (
          <Hint label="Stroke" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 ${
                isActive === "stroke-color"
                  ? "bg-muted-foreground/20"
                  : "bg-white"
              }`}
              size="icon"
              onClick={() => onChangeActiveTool("stroke-color")}
            >
              <span
                className={`size-4 rounded cursor-pointer bg-white border `}
                style={{ borderColor: editor?.getActiveStrokeColor() }}
              ></span>
            </Button>
          </Hint>
        )}
        {editor?.selectedObjects[0] && (
          <Hint label="Stroke width" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 ${
                isActive === "stroke-width"
                  ? "bg-muted-foreground/20"
                  : "bg-white"
              }`}
              size="icon"
              onClick={() => onChangeActiveTool("stroke-width")}
            >
              <BsBorderWidth className="rounded size-4" fill="black" />
            </Button>
          </Hint>
        )}
        {editor?.selectedObjects[0] && (
          <Hint label="Copy" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 ${
                isActive === "stroke-width"
                  ? "bg-muted-foreground/20"
                  : "bg-white"
              }`}
              size="icon"
              onClick={() => onChangeActiveTool("stroke-width")}
            >
              <Copy className="text-black size-4"  />
            </Button>
          </Hint>
        )}

        <span></span>
      </div>
    </div>
  );
};

export default ToolBar;
