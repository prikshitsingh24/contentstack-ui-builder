import { useRecoilState } from "recoil";
import canvasState from "@/app/states/canvasState";
import colorPickerState from "@/app/states/colorPickerState";
import { useState } from "react";
import { SketchPicker } from "react-color";
import pageState from "@/app/states/pageState";

export default function ImageDesign() {
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const [colorPicker,setColorPicker]=useRecoilState(colorPickerState.colorPickerState);
  const [backgroundColorPicker,setBackgroundColorPicker]=useRecoilState(colorPickerState.backgroundColorPickerState);
  const [borderColorPicker,setBorderColorPicker]=useRecoilState(colorPickerState.borderColorPickerState)
  const [color, setColor] = useState("#000000");
  const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
  const [pages,setPages]=useRecoilState(pageState.pageState);
  // Function to handle font size change

  const handleImageDesignClick=(e:any)=>{
    if ((e.target as HTMLElement).closest('#picker-1')) return;
    if ((e.target as HTMLElement).closest('#picker-2')) return;
    setBackgroundColorPicker(false);
    setBorderColorPicker(false);
  }
  

  const handleBackgroundColorChange = (newColor: string) => {
    // Update background color in the selected item
    setSelected({
      ...selected,
      style: {
        ...selected.style,
        backgroundColor: newColor,  // Update background color in the selected item state
      },
    });
  
    // Update background color in the selectedPage state
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      const updatedChildren = section.children.map((item: any) => {
        if (item.id === selected.id) {
          return {
            ...item,
            style: {
              ...item.style,
              backgroundColor: newColor,  // Update background color in selectedPage
            },
          };
        }
        return item; // Return other items unchanged
      });
  
      return {
        ...section,
        children: updatedChildren,  // Update section's children with modified items
      };
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
  


  const handleBackgroundColorPickerClick = ()=>{
    setColorPicker(false);
    setBackgroundColorPicker(!backgroundColorPicker);
   
  }

  const handleBorderColorPickerClick=()=>{
    setBackgroundColorPicker(false);
    setBorderColorPicker(!borderColorPicker);
  }

  const handleBorderRadiusChange=(e:any)=>{
    const borderRadius=e.target.value;
        setSelected({
            ...selected,
            style: {
              ...selected.style,
              borderRadius:borderRadius,  // Update background color in the selected item state
            },
          });
        
          // Update background color in the selectedPage state
          const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
            const updatedChildren = section.children.map((item: any) => {
              if (item.id === selected.id) {
                return {
                  ...item,
                  style: {
                    ...item.style,
                    borderRadius:borderRadius,  // Update background color in selectedPage
                  },
                };
              }
              return item; // Return other items unchanged
            });
        
            return {
              ...section,
              children: updatedChildren,  // Update section's children with modified items
            };
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

  const handleBorderColorChange=(newColor:string)=>{
    setColor(newColor);
        setSelected({
            ...selected,
            style: {
              ...selected.style,
              borderColor:newColor,  // Update background color in the selected item state
            },
          });
        
          // Update background color in the selectedPage state
          const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
            const updatedChildren = section.children.map((item: any) => {
              if (item.id === selected.id) {
                return {
                  ...item,
                  style: {
                    ...item.style,
                    borderColor:newColor,  // Update background color in selectedPage
                  },
                };
              }
              return item; // Return other items unchanged
            });
        
            return {
              ...section,
              children: updatedChildren,  // Update section's children with modified items
            };
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
  
  const handleBorderColorTextChange=(e:any)=>{
    setSelected({
      ...selected,
      style: {
        ...selected.style,
        borderColor:e.target.value,  // Update background color in the selected item state
      },
    });
  
    // Update background color in the selectedPage state
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      const updatedChildren = section.children.map((item: any) => {
        if (item.id === selected.id) {
          return {
            ...item,
            style: {
              ...item.style,
              borderColor:e.target.value,  // Update background color in selectedPage
            },
          };
        }
        return item; // Return other items unchanged
      });
  
      return {
        ...section,
        children: updatedChildren,  // Update section's children with modified items
      };
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

  const handleBackgroundColorTextChange=(e:any)=>{
    setSelected({
      ...selected,
      style: {
        ...selected.style,
        backgroundColor:e.target.value,  // Update background color in the selected item state
      },
    });
  
    // Update background color in the selectedPage state
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      const updatedChildren = section.children.map((item: any) => {
        if (item.id === selected.id) {
          return {
            ...item,
            style: {
              ...item.style,
              backgroundColor:e.target.value,  // Update background color in selectedPage
            },
          };
        }
        return item; // Return other items unchanged
      });
  
      return {
        ...section,
        children: updatedChildren,  // Update section's children with modified items
      };
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

  return (
    <div className="grid grid-cols-2 gap-4" onClick={(e)=>handleImageDesignClick(e)}>
      {/* Font Size Dropdown */}
      <div>
      <div className="text-sm mb-2 font-sans font-light">Background color</div>
      {backgroundColorPicker &&(
        <div className="fixed right-20 mt-10" id="picker-1"><SketchPicker color={color} onChangeComplete={(color) => handleBackgroundColorChange(color.hex)}/></div>
      )}
      <div>  
        <div className="w-32 h-9 rounded-md border-2 border-gray-500 flex flex-row p-1 items-center">
            <div className="border-2 mr-1 w-12 h-full rounded-md cursor-pointer" id="picker-1" style={{backgroundColor:selected.style?.backgroundColor}} onClick={handleBackgroundColorPickerClick}>
            </div>
            <div className="border-r-2 h-full mr-1 border-gray-500"></div>
            <div>
                <input type="text" className="w-full h-full px-1 py-1 focus:outline-none font-sans font-normal" value={selected.style?.backgroundColor || "#FFFFFF"} onChange={handleBackgroundColorTextChange}/>
            </div>
        </div>
        </div>
      </div>
      <div>
      <div className="text-sm mb-2 font-sans font-light">Border radius</div>
      <input type="text" className="w-28 border-2 h-9 focus:outline-none rounded-md border-gray-500 font-sans font-normal px-2 placeholder-black"  value={selected.style?.borderRadius}  onChange={handleBorderRadiusChange}/>
      </div>
      <div>
      <div className="text-sm mb-2 font-sans font-light">Border color</div>
      {borderColorPicker &&(
        <div className="fixed right-20 mt-10" id="picker-2"><SketchPicker color={color} onChangeComplete={(color) => handleBorderColorChange(color.hex)}/></div>
      )}
      <div>  
        <div className="w-32 h-9 rounded-md border-2 border-gray-500 flex flex-row p-1 items-center">
            <div className="border-2 mr-1 w-12 h-full rounded-md cursor-pointer" id="picker-2" style={{backgroundColor:selected.style?.borderColor }} onClick={handleBorderColorPickerClick}>
            </div>
            <div className="border-r-2 h-full mr-1 border-gray-500"></div>
            <div>
                <input type="text" className="w-full h-full px-1 py-1 focus:outline-none font-sans font-normal" value={selected.style?.borderColor} onChange={handleBorderColorTextChange}/>
            </div>
        </div>
        </div>
      </div>
    </div>
    
  );
}
