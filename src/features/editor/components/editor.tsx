"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/features/editor/components/navbar";
import SideBar from "@/features/editor/components/sidebar";
import ToolBar from "@/features/editor/components/toolbar";
import Footer from "@/features/editor/components/footer";
import useEditor from "../hooks/use-editor";
import { fabric } from "fabric";
import { ActiveTool } from "../type/type.editor";
import ShapesSideBar from "./shape-sidebar";
const Editor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef(null);
  const { init, editor } = useEditor();

  const [isActive, setIsActive] = useState<ActiveTool>("shapes");

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

  const onChangeActiveTool = (tool: ActiveTool) => {
    setIsActive(tool);
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
          <div className="flex-1 flex flex-col overflow-auto">
            <ToolBar onClick={handleSave} />
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
