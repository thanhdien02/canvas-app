import { Button } from "@/components/ui/button";
import debounce from "debounce";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface FontSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}
const FontSizeInput = ({ value, onChange }: FontSizeInputProps) => {
  const [fontSize, setFontSize] = useState<number | string>(value);
  const onChangeFontSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e?.target?.value === 0) {
      setFontSize("");
      return;
    }
    onChange(+e?.target?.value);
    setFontSize(+e?.target?.value);
  };
  useEffect(() => {
    setFontSize(value);
  }, [value]);
  return (
    <div className="flex items-center">
      <Button
        className={`hover:bg-muted-foreground/20 text-black bg-white rounded-l-md border border-r-0 rounded-r-none 
      `}
        size="icon"
        onClick={() => {
          onChange((value as number) - 1);
        }}
      >
        <Minus className="size-4" />
      </Button>
      <input
        type="text"
        value={fontSize}
        onChange={onChangeFontSize}
        className="h-9 w-12 border outline-none px-1 text-center"
      />
      <Button
        className={`hover:bg-muted-foreground/20 text-black bg-white border border-l-0 rounded-r-md rounded-l-none
      `}
        size="icon"
        onClick={() => {
          onChange((value as number) + 1);
        }}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};

export default FontSizeInput;
