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
    setBackgroundColorPicker(true);
   
  }

  const handleBorderColorPickerClick=()=>{
    setColorPicker(false);
    setBackgroundColorPicker(false);
    setBorderColorPicker(true);
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
  
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Font Size Dropdown */}
      <div>
      <div className="text-sm mb-2">Background color</div>
      {backgroundColorPicker &&(
        <div className="fixed right-20 mt-10"><SketchPicker color={color} onChangeComplete={(color) => handleBackgroundColorChange(color.hex)}/></div>
      )}
      {backgroundColorPicker?(
        <button onClick={()=>setBackgroundColorPicker(false)}>Close</button>
      ):(
        <button onClick={handleBackgroundColorPickerClick}>Pick a color</button>
      )}
      </div>
      <div>
      <div className="text-sm mb-2">Border radius</div>
      <input type="text" className="w-28 border-2 focus:outline-none rounded-xl  px-2 placeholder-black"  value={selected.style?.borderRadius}  onChange={handleBorderRadiusChange}/>
      </div>
      <div>
      <div className="text-sm mb-2">Border color</div>
      {borderColorPicker &&(
        <div className="fixed right-20 mt-10"><SketchPicker color={color} onChangeComplete={(color) => handleBorderColorChange(color.hex)}/></div>
      )}
      {borderColorPicker?(
        <button onClick={()=>setBorderColorPicker(false)}>Close</button>
      ):(
        <button onClick={handleBorderColorPickerClick}>Pick a color</button>
      )}
      </div>
    </div>
    
  );
}
