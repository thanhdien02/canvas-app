import { ChromePicker, CirclePicker } from "react-color";
import { colors } from "../type/type.editor";
import { rgbaObjectToString } from "../utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}
const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
        className="!w-full"
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
        className="!w-full"
      />
    </div>
  );
};

export default ColorPicker;
