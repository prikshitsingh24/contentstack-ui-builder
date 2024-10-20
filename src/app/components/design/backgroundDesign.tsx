import { useRecoilState } from "recoil";
import canvasState from "@/app/states/canvasState";
import { SketchPicker } from "react-color";
import { useState } from "react";
import colorPickerState from "@/app/states/colorPickerState";
import sectionState from "@/app/states/sectionState";
import pageState from "@/app/states/pageState";

export default function BackgroundDesign() {
    const [headerbackgroundColorPicker,setheaderBackgroundColorPicker]=useRecoilState(colorPickerState.headerBackgroundColorPickerState);
    const [contentbackgroundColorPicker,setContentBackgroundColorPicker]=useRecoilState(colorPickerState.contentBackgroundColorPickerState);
    const [footerbackgroundColorPicker,setFooterBackgroundColorPicker]=useRecoilState(colorPickerState.footerBackgroundColorPickerState);
    const [gridColorPicker,setGridColorPicker]=useRecoilState(colorPickerState.gridColorPickerState)
    const [headerBackgroundColor,setHeaderBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [contentBackgroundColor,setContentBackgroundColor]=useRecoilState(sectionState.contentBackgroundColorState);
    const [footerBackgroundColor,setFooterBackgroundColor]=useRecoilState(sectionState.footerBackgroundColorState);
    const [gridVisibility,setGridVisibility]=useRecoilState(canvasState.gridVisibilityStatus);
    const [gridColor,setGridColor]=useRecoilState(canvasState.gridColorStatus);
    const [selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);
    const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
    const [pages,setPages]=useRecoilState(pageState.pageState);
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
  
    setSelectedPage({
      ...selectedPage,
      headerBackgroundColor:newColor
    });
  
    // Update pages if selectedPage exists
    const updatedPages = pages.map((page: any) => {
      if (page.id === selectedPage.id) {
        return {
          ...page,
          headerBackgroundColor:newColor  // Update this page's children with the updated selectedPage
        };
      }
      return page;
    });
  
    setPages(updatedPages);
  };

  
  const handleContentBackgroundColorChange = (newColor: string) => {
    setContentBackgroundColor(newColor);
    setSelectedSection({
      ...selectedSection,
      contentBackgroundColor:newColor
    });
  
    // Update background color in the selectedPage state
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      if(selectedSection.id == section.id){
        return {
          ...section,
          contentBackgroundColor:newColor
        }
      }
      return section
    });
  
    setSelectedPage({
      ...selectedPage,
      children: updatedSelectedPage,
    });
  
    // Update pages if selectedPage exists
    const updatedPages = pages.map((page: any) => {
      if (page.id === selectedPage.id) {
        return {
          ...page,
          children: updatedSelectedPage,  // Update this page's children with the updated selectedPage
        };
      }
      return page;
    });
  
    setPages(updatedPages);
  };

  const handleFooterBackgroundColorChange = (newColor: string) => {
    setFooterBackgroundColor(newColor);
  
    setSelectedPage({
      ...selectedPage,
      footerBackgroundColor:newColor
    });
  
    // Update pages if selectedPage exists
    const updatedPages = pages.map((page: any) => {
      if (page.id === selectedPage.id) {
        return {
          ...page,
          footerBackgroundColor:newColor  // Update this page's children with the updated selectedPage
        };
      }
      return page;
    });
  
    setPages(updatedPages);
 
  };

  const handleGridColorChange=(newColor:string)=>{
    setGridColor(newColor);
  }

  const handleHeaderBackgroundColorPicker=()=>{
    setGridColorPicker(false)
    setContentBackgroundColorPicker(false);
    setFooterBackgroundColorPicker(false);
    setheaderBackgroundColorPicker(!headerbackgroundColorPicker);
  }
  const handleContentBackgroundColorPicker=()=>{
    setGridColorPicker(false)
    setFooterBackgroundColorPicker(false);
    setheaderBackgroundColorPicker(false);
    setContentBackgroundColorPicker(!contentbackgroundColorPicker);
  }

  const handleFooterBackgroundColorPicker=()=>{
    setGridColorPicker(false)
    setheaderBackgroundColorPicker(false);
    setContentBackgroundColorPicker(false);
    setFooterBackgroundColorPicker(!footerbackgroundColorPicker);
  }

  const handleGridColorPicker=()=>{
    setheaderBackgroundColorPicker(false);
    setContentBackgroundColorPicker(false);
    setFooterBackgroundColorPicker(false);
    setGridColorPicker(!gridColorPicker)
  }

  const handleFooterBackgroundChange=(e:any)=>{
    setFooterBackgroundColor(e.target.value)
  }

  const handleContentBackgroundChange=(e:any)=>{
   const backgroundColor=e.target.value;
   setSelectedSection({
    ...selectedSection,
    contentBackgroundColor:backgroundColor
  });

  // Update background color in the selectedPage state
  const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
    if(selectedSection.id == section.id){
      return {
        ...section,
        contentBackgroundColor:backgroundColor
      }
    }
    return section
  });

  setSelectedPage({
    ...selectedPage,
    children: updatedSelectedPage,
  });

  // Update pages if selectedPage exists
  const updatedPages = pages.map((page: any) => {
    if (page.id === selectedPage.id) {
      return {
        ...page,
        children: updatedSelectedPage,  // Update this page's children with the updated selectedPage
      };
    }
    return page;
  });

  setPages(updatedPages);
  }

  const handleHeaderBackgroundChange=(e:any)=>{
    setHeaderBackgroundColor(e.target.value)
  }

  const handleGridChange=(e:any)=>{
    setGridColor(e.target.value)
  }

  return (
    <div className="grid grid-cols-1 gap-4" onClick={(e)=>handleBackgroundDesignClick(e)}>
     <div>
      <div className="text-sm mb-2 font-sans font-light">Header Background color</div>
      {headerbackgroundColorPicker &&(
        <div className="fixed right-20 mt-10 z-10" id="picker-1"><SketchPicker color={headerBackgroundColor} onChangeComplete={(color) => handleHeaderBackgroundColorChange(color.hex)}/></div>
      )}
    <div>  
        <div className="w-28 h-8 rounded-md border-2 border-gray-500 flex flex-row p-1 items-center">
            <div className="border-2 mr-1 w-12 h-full rounded-md cursor-pointer" id="picker-1" style={{backgroundColor:selectedPage?.headerBackgroundColor || 'white'}} onClick={handleHeaderBackgroundColorPicker}>
            </div>
            <div className="border-r-2 h-full mr-1 border-gray-500"></div>
            <div>
                <input type="text" className="w-full h-full focus:outline-none font-sans font-normal" value={selectedPage?.headerBackgroundColor || ""} onChange={handleHeaderBackgroundChange}/>
            </div>
        </div>
        </div>
      </div>
      <div>
      <div className="text-sm mb-2 font-sans font-light">Content Background color</div>
      {contentbackgroundColorPicker &&(
        <div className="fixed right-20 mt-10 z-10" id="picker-2"><SketchPicker color={contentBackgroundColor} onChangeComplete={(color) => handleContentBackgroundColorChange(color.hex)}/></div>
      )}
     <div>  
        <div className="w-28 h-8 rounded-md border-2 flex flex-row p-1 items-center border-gray-500">
            <div className="border-2 mr-1 w-12 h-full rounded-md cursor-pointer" id="picker-2" style={{backgroundColor:selectedSection?.contentBackgroundColor || "white"}} onClick={handleContentBackgroundColorPicker}>
            </div>
            <div className="border-r-2 h-full mr-1 border-gray-500"></div>
            <div>
                <input type="text" className="w-full h-full  focus:outline-none font-sans font-normal" value={selectedSection?.contentBackgroundColor} onChange={handleContentBackgroundChange}/>
            </div>
        </div>
        </div>
      </div>
      <div>
      <div className="text-sm mb-2 font-sans font-light">Footer Background color</div>
      {footerbackgroundColorPicker &&(
        <div className="fixed right-20 mt-10 z-10" id="picker-3"><SketchPicker color={footerBackgroundColor} onChangeComplete={(color) => handleFooterBackgroundColorChange(color.hex)}/></div>
      )}
      <div>  
        <div className="w-28 h-8 rounded-md border-2 flex flex-row p-1 items-center border-gray-500">
            <div className="border-2 mr-1 w-12 h-full rounded-md cursor-pointer" id="picker-3" style={{backgroundColor:selectedPage?.footerBackgroundColor || "white"}} onClick={handleFooterBackgroundColorPicker}>
            </div>
            <div className="border-r-2 h-full mr-1 border-gray-500"></div>
            <div>
                <input type="text" className="w-full h-full  focus:outline-none font-sans font-normal" value={selectedPage?.footerBackgroundColor || ""} onChange={handleFooterBackgroundChange}/>
            </div>
        </div>
        </div>
      </div>
         <label className="flex items-center cursor-pointer">
         <div className="mr-3 text-gray-700 font-medium">
        Grid
      </div>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={gridVisibility}
          onChange={()=>setGridVisibility(!gridVisibility)}
        />
        <div
          className={`block w-10 h-6 rounded-full ${
            gridVisibility ? 'bg-blue-600' : 'bg-gray-600'
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out ${
            gridVisibility ? 'transform translate-x-full' : ''
          }`}
        ></div>
      </div>
    </label>
    <div>
      <div className="text-sm mb-2 font-sans font-light">Grid color</div>
      {gridColorPicker &&(
        <div className="fixed right-20 mt-10 z-10" id="picker-3"><SketchPicker color={gridColor} onChangeComplete={(color) => handleGridColorChange(color.hex)}/></div>
      )}
      <div>  
        <div className="w-28 h-8 rounded-md border-2 flex flex-row p-1 items-center border-gray-500">
            <div className="border-2 mr-1 w-12 h-full rounded-md cursor-pointer" id="picker-3" style={{backgroundColor:gridColor }} onClick={handleGridColorPicker}>
            </div>
            <div className="border-r-2 h-full mr-1 border-gray-500"></div>
            <div>
                <input type="text" className="w-full h-full  focus:outline-none font-sans font-normal" value={gridColor} onChange={handleGridChange}/>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}
