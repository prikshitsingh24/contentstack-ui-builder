import { useRecoilState } from "recoil";
import canvasState from "@/app/states/canvasState";
import { SketchPicker } from "react-color";
import { useState } from "react";
import colorPickerState from "@/app/states/colorPickerState";
import sectionState from "@/app/states/sectionState";

export default function BackgroundDesign() {
    const [headerbackgroundColorPicker,setheaderBackgroundColorPicker]=useRecoilState(colorPickerState.headerBackgroundColorPickerState);
    const [contentbackgroundColorPicker,setContentBackgroundColorPicker]=useRecoilState(colorPickerState.contentBackgroundColorPickerState);
    const [footerbackgroundColorPicker,setFooterBackgroundColorPicker]=useRecoilState(colorPickerState.footerBackgroundColorPickerState);
    const [headerBackgroundColor,setHeaderBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [contentBackgroundColor,setContentBackgroundColor]=useRecoilState(sectionState.contentBackgroundColorState);
    const [footerBackgroundColor,setFooterBackgroundColor]=useRecoilState(sectionState.footerBackgroundColorState);
    const [gridVisibility,setGridVisibility]=useRecoilState(canvasState.gridVisibilityStatus)

  const handleHeaderBackgroundColorChange = (newColor: string) => {
    setHeaderBackgroundColor(newColor);
 
  };

  
  const handleContentBackgroundColorChange = (newColor: string) => {
    setContentBackgroundColor(newColor);
 
  };

  const handleFooterBackgroundColorChange = (newColor: string) => {
    setFooterBackgroundColor(newColor);
 
  };
  const handleHeaderBackgroundColorPicker=()=>{
    setContentBackgroundColorPicker(false);
    setFooterBackgroundColorPicker(false);
    setheaderBackgroundColorPicker(true);
  }
  const handleContentBackgroundColorPicker=()=>{
  
    setFooterBackgroundColorPicker(false);
    setheaderBackgroundColorPicker(false);
    setContentBackgroundColorPicker(true);
  }

  const handleFooterBackgroundColorPicker=()=>{
  
    setheaderBackgroundColorPicker(false);
    setContentBackgroundColorPicker(false);
    setFooterBackgroundColorPicker(true);
  }

  return (
    <div className="grid grid-cols-1 gap-4">
     <div>
      <div className="text-sm mb-2">Header Background color</div>
      {headerbackgroundColorPicker &&(
        <div className="fixed right-20 mt-10"><SketchPicker color={headerBackgroundColor} onChangeComplete={(color) => handleHeaderBackgroundColorChange(color.hex)}/></div>
      )}
      {headerbackgroundColorPicker?(
        <button onClick={()=>setheaderBackgroundColorPicker(false)}>Close</button>
      ):(
        <button onClick={handleHeaderBackgroundColorPicker}>Pick a color</button>
      )}
      </div>
      <div>
      <div className="text-sm mb-2">Content Background color</div>
      {contentbackgroundColorPicker &&(
        <div className="fixed right-20 mt-10"><SketchPicker color={contentBackgroundColor} onChangeComplete={(color) => handleContentBackgroundColorChange(color.hex)}/></div>
      )}
      {contentbackgroundColorPicker?(
        <button onClick={()=>setContentBackgroundColorPicker(false)}>Close</button>
      ):(
        <button onClick={handleContentBackgroundColorPicker}>Pick a color</button>
      )}
      </div>
      <div>
      <div className="text-sm mb-2">Footer Background color</div>
      {footerbackgroundColorPicker &&(
        <div className="fixed right-20 mt-10"><SketchPicker color={footerBackgroundColor} onChangeComplete={(color) => handleFooterBackgroundColorChange(color.hex)}/></div>
      )}
      {footerbackgroundColorPicker?(
        <button onClick={()=>setFooterBackgroundColorPicker(false)}>Close</button>
      ):(
        <button onClick={handleFooterBackgroundColorPicker}>Pick a color</button>
      )}
      </div>
      <div>
      <div className="text-sm mb-2">Grid Visibility</div>
      {gridVisibility?(
        <button onClick={()=>setGridVisibility(false)}>Off</button>
      ):(
        <button onClick={()=>setGridVisibility(true)}>On</button>
      )}
      </div>
    </div>
  );
}
