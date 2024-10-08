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
    const [gridVisibility,setGridVisibility]=useRecoilState(canvasState.gridVisibilityStatus);

  const handleBackgroundDesignClick=(e:any)=>{
    if ((e.target as HTMLElement).closest('#picker-1')) return;
    if ((e.target as HTMLElement).closest('#picker-2')) return;
    if ((e.target as HTMLElement).closest('#picker-3')) return;
    setContentBackgroundColorPicker(false);
    setFooterBackgroundColorPicker(false);
    setheaderBackgroundColorPicker(false);
  }

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

  const handleFooterBackgroundChange=(e:any)=>{
    setFooterBackgroundColor(e.target.value)
  }

  const handleContentBackgroundChange=(e:any)=>{
    setContentBackgroundColor(e.target.value)
  }

  const handleHeaderBackgroundChange=(e:any)=>{
    setHeaderBackgroundColor(e.target.value)
  }

  return (
    <div className="grid grid-cols-1 gap-4" onClick={(e)=>handleBackgroundDesignClick(e)}>
     <div>
      <div className="text-sm mb-2 font-sans font-light">Header Background color</div>
      {headerbackgroundColorPicker &&(
        <div className="fixed right-20 mt-10" id="picker-1"><SketchPicker color={headerBackgroundColor} onChangeComplete={(color) => handleHeaderBackgroundColorChange(color.hex)}/></div>
      )}
    <div>  
        <div className="w-32 h-9 rounded-md border-2 border-gray-500 flex flex-row p-1 items-center">
            <div className="border-2 mr-1 w-12 h-full rounded-md cursor-pointer" id="picker-1" style={{backgroundColor:headerBackgroundColor?headerBackgroundColor:'white'}} onClick={handleHeaderBackgroundColorPicker}>
            </div>
            <div className="border-r-2 h-full mr-1 border-gray-500"></div>
            <div>
                <input type="text" className="w-full h-full px-1 py-1 focus:outline-none font-sans font-normal" value={headerBackgroundColor || ""} onChange={handleHeaderBackgroundChange}/>
            </div>
        </div>
        </div>
      </div>
      <div>
      <div className="text-sm mb-2 font-sans font-light">Content Background color</div>
      {contentbackgroundColorPicker &&(
        <div className="fixed right-20 mt-10" id="picker-2"><SketchPicker color={contentBackgroundColor} onChangeComplete={(color) => handleContentBackgroundColorChange(color.hex)}/></div>
      )}
     <div>  
        <div className="w-32 h-9 rounded-md border-2 flex flex-row p-1 items-center border-gray-500">
            <div className="border-2 mr-1 w-12 h-full rounded-md cursor-pointer" id="picker-2" style={{backgroundColor:contentBackgroundColor?contentBackgroundColor:'white'}} onClick={handleContentBackgroundColorPicker}>
            </div>
            <div className="border-r-2 h-full mr-1 border-gray-500"></div>
            <div>
                <input type="text" className="w-full h-full px-1 py-1 focus:outline-none font-sans font-normal" value={contentBackgroundColor || ""} onChange={handleContentBackgroundChange}/>
            </div>
        </div>
        </div>
      </div>
      <div>
      <div className="text-sm mb-2 font-sans font-light">Footer Background color</div>
      {footerbackgroundColorPicker &&(
        <div className="fixed right-20 mt-10" id="picker-3"><SketchPicker color={footerBackgroundColor} onChangeComplete={(color) => handleFooterBackgroundColorChange(color.hex)}/></div>
      )}
      <div>  
        <div className="w-32 h-9 rounded-md border-2 flex flex-row p-1 items-center border-gray-500">
            <div className="border-2 mr-1 w-12 h-full rounded-md cursor-pointer" id="picker-3" style={{backgroundColor:footerBackgroundColor?footerBackgroundColor:'white'}} onClick={handleFooterBackgroundColorPicker}>
            </div>
            <div className="border-r-2 h-full mr-1 border-gray-500"></div>
            <div>
                <input type="text" className="w-full h-full px-1 py-1 focus:outline-none font-sans font-normal" value={footerBackgroundColor || ""} onChange={handleFooterBackgroundChange}/>
            </div>
        </div>
        </div>
      </div>
      <div>
      <div className="text-sm mb-2 font-sans font-light">Grid Visibility</div>
      {gridVisibility?(
        <button onClick={()=>setGridVisibility(false)}>Off</button>
      ):(
        <button onClick={()=>setGridVisibility(true)}>On</button>
      )}
      </div>
    </div>
  );
}
