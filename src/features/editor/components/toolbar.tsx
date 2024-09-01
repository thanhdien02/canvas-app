"use client";
import Hint from "@/components/hint";
import { ActiveTool, Editor } from "../type/type.editor";
import { Button } from "@/components/ui/button";
import { BsBorderWidth } from "react-icons/bs";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Copy,
  Trash,
} from "lucide-react";
import { RxTransparencyGrid } from "react-icons/rx";
import { isTextType } from "../utils";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { useEffect, useState } from "react";
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
  const selectedObject = editor?.selectedObjects[0];
  const initialFontWeight = editor?.getActiveFontWeight();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFillColor = editor?.getActiveFillColor();
  const initialOpacity = editor?.getActiveOpacity();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialStrokeWidth = editor?.getActiveStrokeWidth();
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialFontLineThrough = editor?.getActiveFontLineThrough();
  const initialFontUnderline = editor?.getActiveFontUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();

  const [properties, setProperties] = useState({
    fontWeight: initialFontWeight,
    fontFamily: initialFontFamily,
    fillColor: initialFillColor,
    opacity: initialOpacity,
    strokeColor: initialStrokeColor,
    strokeWidth: initialStrokeWidth,
    fontStyle: initialFontStyle,
    fontLineThrough: initialFontLineThrough,
    fontUnderline: initialFontUnderline,
    textAlign: initialTextAlign,
  });
  useEffect(() => {
    setProperties({
      fontWeight: initialFontWeight,
      fontFamily: initialFontFamily,
      fillColor: initialFillColor,
      opacity: initialOpacity,
      strokeColor: initialStrokeColor,
      strokeWidth: initialStrokeWidth,
      fontStyle: initialFontStyle,
      fontLineThrough: initialFontLineThrough,
      fontUnderline: initialFontUnderline,
      textAlign: initialTextAlign,
    });
  }, [
    selectedObject,
    initialFillColor,
    initialStrokeColor,
    initialStrokeWidth,
    initialFontFamily,
    initialFontWeight,
    initialFontStyle,
    initialOpacity,
    initialFontLineThrough,
    initialFontUnderline,
    initialTextAlign,
  ]);

  const isText = isTextType(editor?.selectedObjects[0]?.type);
  const toggleFontWeight = () => {
    const valueWeight = editor?.getActiveFontWeight();
    const value = valueWeight == 500 ? 700 : 500;
    editor?.changeFontWeight(value);
    setProperties({ ...properties, fontWeight: value });
  };
  const toggleFontStyle = () => {
    const valueStyle = editor?.getActiveFontStyle();
    const value = valueStyle == "normal" ? "italic" : "normal";
    editor?.changeFontStyle(value);
    setProperties({ ...properties, fontStyle: value });
  };
  const toggleFontLineThrough = () => {
    const valueLineThrough = editor?.getActiveFontLineThrough();
    const value = valueLineThrough ? false : true;
    editor?.changeFontLineThrough(value);
    setProperties({ ...properties, fontLineThrough: value });
  };
  const toggleFontUnderline = () => {
    const valueUnderline = editor?.getActiveFontUnderline();
    const value = valueUnderline ? false : true;
    editor?.changeFontUnderline(value);
    setProperties({ ...properties, fontUnderline: value });
  };
  const toggleTextAlign = (value: string) => {
    // const valueTextAlign = editor?.getActiveTextAlign();
    // const value = valueUnderline ? false : true;
    editor?.changeTextAlign(value);
    setProperties({ ...properties, textAlign: value });
  };
  return (
    <div
      onClick={onClick}
      className="h-[52px] px-4 shrink-0 border-b w-full overflow-x-auto flex items-center"
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
        {isText && editor?.selectedObjects[0] && (
          <Hint label="Font family" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 w-auto px-2 text-sm text-black ${
                isActive === "font" ? "bg-muted-foreground/20" : "bg-white"
              }`}
              size="icon"
              onClick={() => onChangeActiveTool("font")}
            >
              <div className={`truncate max-w-[100px]`}>
                {editor?.getActiveFontFamily()}
              </div>
              <ChevronDown className="size-4 shrink-0 ml-2" />
            </Button>
          </Hint>
        )}
        {isText && editor?.selectedObjects[0] && (
          <Hint label="Font weight" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 text-black bg-white
                ${properties?.fontWeight == 700 && "bg-muted-foreground/20"}`}
              size="icon"
              onClick={toggleFontWeight}
            >
              <FaBold className="size-4" />
            </Button>
          </Hint>
        )}
        {isText && editor?.selectedObjects[0] && (
          <Hint label="Italic" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 text-black bg-white
                ${
                  properties?.fontStyle == "italic" && "bg-muted-foreground/20"
                }`}
              size="icon"
              onClick={toggleFontStyle}
            >
              <FaItalic className="size-4" />
            </Button>
          </Hint>
        )}
        {isText && editor?.selectedObjects[0] && (
          <Hint label="Underline" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 text-black bg-white
                ${properties?.fontUnderline && "bg-muted-foreground/20"}`}
              size="icon"
              onClick={toggleFontUnderline}
            >
              <FaUnderline className="size-4" />
            </Button>
          </Hint>
        )}
        {isText && editor?.selectedObjects[0] && (
          <Hint label="Line through" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 text-black bg-white
                ${properties?.fontLineThrough && "bg-muted-foreground/20"}`}
              size="icon"
              onClick={toggleFontLineThrough}
            >
              <FaStrikethrough className="size-4" />
            </Button>
          </Hint>
        )}
        {isText && editor?.selectedObjects[0] && (
          <Hint label="Text left" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 text-black bg-white
                ${
                  properties?.textAlign === "left" && "bg-muted-foreground/20"
                }`}
              size="icon"
              onClick={() => toggleTextAlign("left")}
            >
              <AlignLeft className="size-4" />
            </Button>
          </Hint>
        )}
        {isText && editor?.selectedObjects[0] && (
          <Hint label="Text center" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 text-black bg-white
                ${
                  properties?.textAlign === "center" && "bg-muted-foreground/20"
                }`}
              size="icon"
              onClick={() => toggleTextAlign("center")}
            >
              <AlignCenter className="size-4" />
            </Button>
          </Hint>
        )}
        {isText && editor?.selectedObjects[0] && (
          <Hint label="Text right" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 text-black bg-white
                ${
                  properties?.textAlign === "right" && "bg-muted-foreground/20"
                }`}
              size="icon"
              onClick={() => toggleTextAlign("right")}
            >
              <AlignRight className="size-4" />
            </Button>
          </Hint>
        )}
        {!isText && editor?.selectedObjects[0] && (
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
        {!isText && editor?.selectedObjects[0] && (
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
          <Hint label="Stroke width" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 bg-white`}
              size="icon"
              onClick={() => editor?.bringForward()}
            >
              <ArrowUp className="rounded size-4 text-black" />
            </Button>
          </Hint>
        )}
        {editor?.selectedObjects[0] && (
          <Hint label="Stroke width" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 bg-white`}
              size="icon"
              onClick={() => editor?.sendBackwards()}
            >
              <ArrowDown className="rounded size-4 text-black" />
            </Button>
          </Hint>
        )}
        {/* Common */}
        {editor?.selectedObjects[0] && (
          <Hint label="Opacity" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 ${
                isActive === "opacity" ? "bg-muted-foreground/20" : "bg-white"
              }`}
              size="icon"
              onClick={() => onChangeActiveTool("opacity")}
            >
              <RxTransparencyGrid className="text-black size-4" />
            </Button>
          </Hint>
        )}
        {editor?.selectedObjects[0] && (
          <Hint label="Copy & Paste" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 bg-white`}
              size="icon"
              onClick={() => {
                editor?.onCopy();
                editor?.onPaste();
              }}
            >
              <Copy className="text-black size-4" />
            </Button>
          </Hint>
        )}
        {editor?.selectedObjects[0] && (
          <Hint label="Trash" side="bottom" sideOffset={10}>
            <Button
              className={`hover:bg-muted-foreground/20 bg-white`}
              size="icon"
              onClick={() => {
                editor?.onDelete();
              }}
            >
              <Trash className="text-black size-4" />
            </Button>
          </Hint>
        )}

        <span></span>
      </div>
    </div>
  );
};

export default ToolBar;
