import { useEffect, useRef } from "react";
import { JSON_KEYS } from "../type/type.editor";

interface UseLoadStateProps {
  canvas: fabric.Canvas | null;
  autoZoom: () => void;
  initialState: React.MutableRefObject<string | undefined>;
}
export const useLoadState = ({
  initialState,
  canvas,
  autoZoom,
}: UseLoadStateProps) => {
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current && initialState?.current && canvas) {
      const data = JSON.parse(initialState.current);

      canvas.loadFromJSON(data, () => {
        // const currentState = JSON.stringify(canvas.toJSON(JSON_KEYS));

        // canvasHistory.current = [currentState];
        // setHistoryIndex(0);
        autoZoom();
      });
      initialized.current = true;
    }
  }, [canvas, autoZoom, initialState]);
};
