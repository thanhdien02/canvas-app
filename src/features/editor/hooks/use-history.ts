import { useCallback, useRef, useState } from "react";

interface UseHistoryProps {
  canvas: fabric.Canvas | null;
}
const useHistory = () => {
  const [historyIndex, setHistoryIndex] = useState(0);
  const canvasHistory = useRef<string[]>([""]);
  const skipSave = useRef(false);
  const canUndo = useCallback(() => {
    return historyIndex > 0;
  }, [historyIndex]);
  const canRedo = useCallback(() => {
    return historyIndex < canvasHistory.current.length - 1;
  }, [historyIndex]);
  const save = useCallback(() => {
    console.log("saved");
  }, []);
  return { save };
};

export default useHistory;
