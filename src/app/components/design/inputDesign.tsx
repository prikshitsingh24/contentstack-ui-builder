import { useRecoilState } from "recoil";
import canvasState from "@/app/states/canvasState";
import colorPickerState from "@/app/states/colorPickerState";
import { useState } from "react";
import { SketchPicker } from "react-color";

export default function InputDesign() {
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const [droppedItems,setDroppedItems]=useRecoilState(canvasState.droppedItemState);
  const [colorPicker,setColorPicker]=useRecoilState(colorPickerState.colorPickerState);
  const [backgroundColorPicker,setBackgroundColorPicker]=useRecoilState(colorPickerState.backgroundColorPickerState);
  const [color, setColor] = useState("#000000");
  // Function to handle font size change
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontSize = event.target.value;

    setSelected({
      ...selected,
      style: {
        ...selected.style,
        fontSize: newFontSize,  // Update font size in the selected item state
      },
    });
    const updatedItems = droppedItems.map((item) =>
      item.id === selected.id
        ? { ...item, style: { ...item.style, fontSize: newFontSize } }  // Update the style for the matching item
        : item  // Return the other items unchanged
    );

    setDroppedItems(updatedItems); 
  };
  const handleFontStyleChange=(style:string)=>{
    setSelected({
        ...selected,
        style: {
          ...selected.style,
          fontStyle: style,  // Update font size in the selected item state
        },
      });
      const updatedItems = droppedItems.map((item) =>
        item.id === selected.id
          ? { ...item, style: { ...item.style, fontStyle: style } }  // Update the style for the matching item
          : item  // Return the other items unchanged
      );
  
      setDroppedItems(updatedItems); 
  }

  const handleFontWeightChange=(event: React.ChangeEvent<HTMLSelectElement>)=>{
    const newfontWeight = event.target.value;
    setSelected({
        ...selected,
        style: {
          ...selected.style,
          fontWeight: newfontWeight,  // Update font size in the selected item state
        },
      });
      const updatedItems = droppedItems.map((item) =>
        item.id === selected.id
          ? { ...item, style: { ...item.style, fontWeight: newfontWeight } }  // Update the style for the matching item
          : item  // Return the other items unchanged
      );
  
      setDroppedItems(updatedItems); 
  }

  const handleColorChange = (newColor: string) => {
    setColor(newColor);  // Update color state

    // Update color in selected item and dropped items
    setSelected({
      ...selected,
      style: {
        ...selected.style,
        color: newColor,  // Apply color to the selected item
      },
    });

    const updatedItems = droppedItems.map((item) =>
      item.id === selected.id
        ? { ...item, style: { ...item.style, color: newColor } }
        : item
    );

    setDroppedItems(updatedItems);
  };

  const handleBackgroundColorChange = (newColor: string) => {
    setColor(newColor);  // Update color state

    // Update color in selected item and dropped items
    setSelected({
      ...selected,
      style: {
        ...selected.style,
        backgroundColor: newColor,  // Apply color to the selected item
      },
    });

    const updatedItems = droppedItems.map((item) =>
      item.id === selected.id
        ? { ...item, style: { ...item.style, backgroundColor: newColor } }
        : item
    );

    setDroppedItems(updatedItems);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Font Size Dropdown */}
      <div>
        <div className="text-sm mb-2">Font Size</div>
        <select
          value={selected.style?.fontSize || "16px"}  // Default value if fontSize is undefined
          onChange={handleFontSizeChange}
          className="border p-1 rounded w-20"
        >
          {/* Define font size options */}
          <option value="12px">12px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="24px">24px</option>
          <option value="36px">36px</option>
          <option value="40px">40px</option>
        </select>
      </div>
      <div>
        <div className="text-sm mb-2">Font style</div>
        <div className="flex flex-row border-2 w-14  rounded-lg justify-between ">
            <div
              className={`cursor-pointer px-2 rounded-lg ${
                selected.style?.fontStyle === "normal" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleFontStyleChange("normal")}
            >
              <span>N</span>
            </div>
            <div
            className={`cursor-pointer px-2 rounded-lg ${
                selected.style?.fontStyle === "italic" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleFontStyleChange("italic")}
            ><i>I</i>
            </div>
        </div>
      </div>
      <div>
        <div className="text-sm mb-2">Font weight</div>
        <select
          value={selected.style?.fontWeight || "400"}  // Default value if fontSize is undefined
          onChange={handleFontWeightChange}
          className="border p-1 rounded w-28"
        >
          {/* Define font size options */}
        <option value="100">Thin</option>
        <option value="200">Extra light</option>
        <option value="300">Light</option>
        <option value="400">Regular</option>
        <option value="600">Semi bold</option>
        <option value="700">Bold</option>
        <option value="900">Black</option>
        </select>
      </div>
      <div>
      <div className="text-sm mb-2">Color</div>
      {colorPicker &&(
        <div className="fixed right-20 mt-10"><SketchPicker color={color} onChangeComplete={(color) => handleColorChange(color.hex)}/></div>
      )}
      {colorPicker?(
        <button onClick={()=>setColorPicker(false)}>Close</button>
      ):(
        <button onClick={()=>setColorPicker(true)}>Pick a color</button>
      )}
      </div>
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
