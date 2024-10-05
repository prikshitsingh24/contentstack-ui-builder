import { useRecoilState } from "recoil";
import canvasState from "@/app/states/canvasState";
import { SketchPicker } from "react-color";
import { useState } from "react";
import colorPickerState from "@/app/states/colorPickerState";

export default function BackgroundDesign() {
    const [backgroundColorPicker,setBackgroundColorPicker]=useRecoilState(colorPickerState.backgroundColorPickerState);
    const [sectionBackgroundColor,setSectionBackgroundColor]=useRecoilState(canvasState.sectionBackgroundColorState);
    const [color, setColor] = useState("#000000");

  const handleBackgroundColorChange = (newColor: string) => {
    setColor(newColor);  // Update color state
    setSectionBackgroundColor(newColor);
    
  };

  return (
    <div className="grid grid-cols-2 gap-4">
     <div>
      <div className="text-sm mb-2">Background color</div>
      {backgroundColorPicker &&(
        <div className="fixed right-20 mt-10"><SketchPicker color={color} onChangeComplete={(color) => handleBackgroundColorChange(color.hex)}/></div>
      )}
      {backgroundColorPicker?(
        <button onClick={()=>setBackgroundColorPicker(false)}>Close</button>
      ):(
        <button onClick={()=>setBackgroundColorPicker(true)}>Pick a color</button>
      )}
      </div>
    </div>
  );
}
