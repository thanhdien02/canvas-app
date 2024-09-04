import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (object: fabric.Object[]) => void;
  clearSelectedObjects?: () => void;
  save: () => void;
}
const useCanvasEvents = ({
  canvas,
  save,
  setSelectedObjects,
  clearSelectedObjects,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", () => {
        save();
      });
      canvas.on("object:removed", () => {
        save();
      });
      canvas.on("object:modified", () => {
        save();
      });
      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:cleared", (e) => {
        setSelectedObjects([]);
        clearSelectedObjects?.();
      });
    }
    return () => {
      if (canvas) {
        canvas.off("object:added");
        canvas.off("object:removed");
        canvas.off("object:modified");
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [canvas, 
      setSelectedObjects, 
      clearSelectedObjects, 
      save]);
  return {};
};

export default useCanvasEvents;
