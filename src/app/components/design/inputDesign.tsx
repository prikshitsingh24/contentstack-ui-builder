import { useRecoilState } from "recoil";
import canvasState from "@/app/states/canvasState";
import colorPickerState from "@/app/states/colorPickerState";
import { useState } from "react";
import { SketchPicker } from "react-color";
import pageState from "@/app/states/pageState";

export default function InputDesign() {
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const [colorPicker,setColorPicker]=useRecoilState(colorPickerState.colorPickerState);
  const [backgroundColorPicker,setBackgroundColorPicker]=useRecoilState(colorPickerState.backgroundColorPickerState);
  const [color, setColor] = useState("#000000");
  const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
  const [pages,setPages]=useRecoilState(pageState.pageState);
  // Function to handle font size change
  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontSize = event.target.value;
  
    // Update the selected item's font size
    setSelected({
      ...selected,
      style: {
        ...selected.style,
        fontSize: newFontSize,  // Update font size in the selected item state
      },
    });
  
    // Update font size in the selectedPage state
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      const updatedChildren = section.children.map((item: any) => {
        if (item.id === selected.id) {
          return {
            ...item,
            style: {
              ...item.style,
              fontSize: newFontSize,  // Update font size in selectedPage
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
  
  const handleFontStyleChange = (style: string) => {
    // Update the selected item's font style
    setSelected({
      ...selected,
      style: {
        ...selected.style,
        fontStyle: style,  // Update font style in the selected item state
      },
    });
  
    // Update font style in the selectedPage state
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      const updatedChildren = section.children.map((item: any) => {
        if (item.id === selected.id) {
          return {
            ...item,
            style: {
              ...item.style,
              fontStyle: style,  // Update font style in selectedPage
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
  

  const handleFontWeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontWeight = event.target.value;
  
    // Update the selected item's font weight
    setSelected({
      ...selected,
      style: {
        ...selected.style,
        fontWeight: newFontWeight,  // Update font weight in the selected item state
      },
    });
  
    // Update font weight in the selectedPage state
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      const updatedChildren = section.children.map((item: any) => {
        if (item.id === selected.id) {
          return {
            ...item,
            style: {
              ...item.style,
              fontWeight: newFontWeight,  // Update font weight in selectedPage
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
  

  const handleColorChange = (newColor: string) => {
    // Update color in the selected item
    setSelected({
      ...selected,
      style: {
        ...selected.style,
        color: newColor,  // Update color in the selected item state
      },
    });
  
    // Update color in the selectedPage state
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      const updatedChildren = section.children.map((item: any) => {
        if (item.id === selected.id) {
          return {
            ...item,
            style: {
              ...item.style,
              color: newColor,  // Update color in selectedPage
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
  

  
  const handleColorPickerClick = ()=>{
    setBackgroundColorPicker(false);
    setColorPicker(true);
  }

  const handleBackgroundColorPickerClick = ()=>{
    setColorPicker(false);
    setBackgroundColorPicker(true);
   
  }

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
        <button onClick={handleColorPickerClick}>Pick a color</button>
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
        <button onClick={handleBackgroundColorPickerClick}>Pick a color</button>
      )}
      </div>
    </div>
  );
}
