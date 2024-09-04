"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/features/editor/components/navbar";
import SideBar from "@/features/editor/components/sidebar";
import ToolBar from "@/features/editor/components/toolbar";
import Footer from "@/features/editor/components/footer";
import useEditor from "../hooks/use-editor";
import { fabric } from "fabric";
import { ActiveTool } from "../type/type.editor";
import ShapesSideBar from "./shape-sidebar";
import FillColorSideBar from "./fill-color-sidebar";
import StrokeColorSideBar from "./stroke-color-sidebar";
import StrokeWidthSideBar from "./stroke-width-sidebar";
import DrawSideBar from "./draw-sidebar";
import TextSideBar from "./text-sidebar";
import FontSideBar from "./font-sidebar";
import OpacitySideBar from "./opacity-sidebar";
import ImageSideBar from "./image-sidebar";
import SettingSideBar from "./setting-sidebar";
const Editor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef(null);

  const { init, editor } = useEditor();

  const [isActive, setIsActive] = useState<ActiveTool>("select");
  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === "draw" && isActive !== "draw") {
        editor?.enableDrawingMode();
      }

      if (isActive === "draw") {
        editor?.disableDrawingMode();
      }

      if (tool === isActive) {
        return setIsActive("select");
      }

      setIsActive(tool);
    },
    [editor, isActive]
  );
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });
    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });
    return () => {
      canvas.dispose();
    };
  }, [init]);
  const handleSave = () => {
    editor?.autoZoom();
  };

  return (
    <>
      <div className="h-full flex flex-col ">
        <Navbar />
        <div className="flex h-screen-minus-68px w-full">
          <SideBar
            onChangeActiveTool={onChangeActiveTool}
            isActive={isActive}
          />
          <ShapesSideBar
            isActive={isActive}
            editor={editor}
            onChangeActiveTool={onChangeActiveTool}
          ></ShapesSideBar>
          <FillColorSideBar
            isActive={isActive}
            editor={editor}
            onChangeActiveTool={onChangeActiveTool}
          ></FillColorSideBar>
          <StrokeColorSideBar
            isActive={isActive}
            editor={editor}
            onChangeActiveTool={onChangeActiveTool}
          ></StrokeColorSideBar>
          <StrokeWidthSideBar
            isActive={isActive}
            editor={editor}
            onChangeActiveTool={onChangeActiveTool}
          ></StrokeWidthSideBar>
          <DrawSideBar
            isActive={isActive}
            editor={editor}
            onChangeActiveTool={onChangeActiveTool}
          ></DrawSideBar>
          <TextSideBar
            isActive={isActive}
            editor={editor}
            onChangeActiveTool={onChangeActiveTool}
          ></TextSideBar>
          <FontSideBar
            isActive={isActive}
            editor={editor}
            onChangeActiveTool={onChangeActiveTool}
          ></FontSideBar>
          <OpacitySideBar
            isActive={isActive}
            editor={editor}
            onChangeActiveTool={onChangeActiveTool}
          ></OpacitySideBar>
          <ImageSideBar
            isActive={isActive}
            editor={editor}
            onChangeActiveTool={onChangeActiveTool}
          ></ImageSideBar>
          <SettingSideBar
            isActive={isActive}
            editor={editor}
            onChangeActiveTool={onChangeActiveTool}
          ></SettingSideBar>
          <div className="flex-1 flex flex-col overflow-auto">
            <ToolBar
              isActive={isActive}
              editor={editor}
              onChangeActiveTool={onChangeActiveTool}
              onClick={handleSave}
            />
            <div
              className="flex-1 bg-muted h-screen-minus-124px z-1"
              ref={containerRef}
            >
              <canvas ref={canvasRef}></canvas>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
