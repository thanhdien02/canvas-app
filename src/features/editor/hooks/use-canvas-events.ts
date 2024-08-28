import { fabric } from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (object: fabric.Object[]) => void;
  clearSelectedObjects?: () => void;
}
const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
  clearSelectedObjects,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
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
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [canvas, setSelectedObjects, clearSelectedObjects]);
  return {};
};

export default useCanvasEvents;
