import { useRecoilState } from "recoil";
import canvasState from "@/app/states/canvasState";
import { SketchPicker } from "react-color";
import { useState } from "react";
import colorPickerState from "@/app/states/colorPickerState";
import pageState from "@/app/states/pageState";

export default function TextDesign() {
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const [colorPicker,setColorPicker]=useRecoilState(colorPickerState.colorPickerState);
  const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
  const [pages,setPages]=useRecoilState(pageState.pageState);
  const [color, setColor] = useState("#000000");
  // Function to handle font size change
  const handleTextDesignClick=(e:any)=>{
    if ((e.target as HTMLElement).closest('#picker-1')) return;
    setColorPicker(false);
  }

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontSize = event.target.value;

    // Update selected item state with new font size
    setSelected({
      ...selected,
      style: {
        ...selected.style,
        fontSize: newFontSize,  // Update font size in the selected item state
      },
    });

    // Update the font size within selectedPage.children
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      const updatedChildren = section.children.map((item: any) => {
          // If the item matches, update its font size
          if (item.id === selected.id) {
              return {
                  ...item,
                  style: {
                      ...item.style,
                      fontSize: newFontSize,  // Update font size
                  },
              };
          }
          // Otherwise, return the item as is
          return item;
      });

      return {
          ...section,
          children: updatedChildren,  // Update section's children with modified items
      };
  });

  // Update the selectedPage state with the modified children
  setSelectedPage({
      ...selectedPage,
      children: updatedSelectedPage,  // The updated sections with updated item styles
  });

  // Now update the pages object with the new font size in the selectedPage
  const updatedPages = pages.map((page: any) => {
    // Find the correct page that matches the selectedPage
    if (page.id === selectedPage.id) {
        // If we found the correct page, update its children
        return {
            ...page,
            children: updatedSelectedPage,  // Set updated selectedPage as this page's children
        };
    }
    return page;  // Otherwise, leave the page unchanged
  });

  // Finally, update the pages state with the updated pages
  setPages(updatedPages);
};

const handleFontStyleChange = (style: string) => {
  // Update the selected item's font style
  setSelected({
    ...selected,
    style: {
      ...selected.style,
      fontStyle: style, // Update font style in the selected item state
    },
  });

  // Update the font style in the selectedPage
  const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
    const updatedChildren = section.children.map((item: any) => {
      if (item.id === selected.id) {
        return {
          ...item,
          style: {
            ...item.style,
            fontStyle: style, // Update font style for matching item in selectedPage
          },
        };
      }
      return item; // Return other items unchanged
    });

    return {
      ...section,
      children: updatedChildren, // Update section's children with modified items
    };
  });

  // Update the selectedPage state
  setSelectedPage({
    ...selectedPage,
    children: updatedSelectedPage,
  });

  // Update the pages state if selectedPage is part of it
  const updatedPages = pages.map((page: any) => {
    if (page.id === selectedPage.id) {
      return {
        ...page,
        children: updatedSelectedPage, // Set updated selectedPage as this page's children
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
      fontWeight: newFontWeight, // Update font weight in the selected item state
    },
  });

  // Update the font weight in the selectedPage
  const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
    const updatedChildren = section.children.map((item: any) => {
      if (item.id === selected.id) {
        return {
          ...item,
          style: {
            ...item.style,
            fontWeight: newFontWeight, // Update font weight for matching item in selectedPage
          },
        };
      }
      return item; // Return other items unchanged
    });

    return {
      ...section,
      children: updatedChildren, // Update section's children with modified items
    };
  });

  // Update the selectedPage state
  setSelectedPage({
    ...selectedPage,
    children: updatedSelectedPage,
  });

  // Update the pages state if selectedPage is part of it
  const updatedPages = pages.map((page: any) => {
    if (page.id === selectedPage.id) {
      return {
        ...page,
        children: updatedSelectedPage, // Set updated selectedPage as this page's children
      };
    }
    return page;
  });

  setPages(updatedPages);
};


const handleColorChange = (newColor: string) => {
  // Update the color state
  setColor(newColor);

  // Update the selected item's color
  setSelected({
    ...selected,
    style: {
      ...selected.style,
      color: newColor, // Apply color to the selected item
    },
  });

  // Update the color in the selectedPage
  const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
    const updatedChildren = section.children.map((item: any) => {
      if (item.id === selected.id) {
        return {
          ...item,
          style: {
            ...item.style,
            color: newColor, // Update color for matching item in selectedPage
          },
        };
      }
      return item; // Return other items unchanged
    });

    return {
      ...section,
      children: updatedChildren, // Update section's children with modified items
    };
  });

  // Update the selectedPage state
  setSelectedPage({
    ...selectedPage,
    children: updatedSelectedPage,
  });

  // Update the pages state if selectedPage is part of it
  const updatedPages = pages.map((page: any) => {
    if (page.id === selectedPage.id) {
      return {
        ...page,
        children: updatedSelectedPage, // Set updated selectedPage as this page's children
      };
    }
    return page;
  });

  setPages(updatedPages);
};

const handleColorTextChange=(e:any)=>{
  setSelected({
    ...selected,
    style: {
      ...selected.style,
      color:e.target.value,  // Update background color in the selected item state
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
            color:e.target.value,  // Update background color in selectedPage
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
    <div className="grid grid-cols-2 gap-4" onClick={(e)=>handleTextDesignClick(e)}>
      {/* Font Size Dropdown */}
      <div>
        <div className="text-sm mb-2 font-sans font-light">Font Size</div>
        <select
          value={selected.style?.fontSize || "16px"}  // Default value if fontSize is undefined
          onChange={handleFontSizeChange}
          className="border-2 p-1 rounded w-20 font-sans font-normal border-gray-500"
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
        <div className="text-sm mb-2 font-sans font-light">Font style</div>
        <div className="flex flex-row border-2 w-14  rounded-lg justify-between border-gray-500">
            <div
              className={`cursor-pointer px-2 rounded-lg ${
                selected.style?.fontStyle === "normal" ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => handleFontStyleChange("normal")}
            >
              <span>N</span>
            </div>
            <div
            className={`cursor-pointer px-2 rounded-lg ${
                selected.style?.fontStyle === "italic" ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => handleFontStyleChange("italic")}
            ><i>I</i>
            </div>
        </div>
      </div>
      <div>
        <div className="text-sm mb-2 font-sans font-light">Font weight</div>
        <select
          value={selected.style?.fontWeight || "400"}  // Default value if fontSize is undefined
          onChange={handleFontWeightChange}
          className="border-2 p-1 rounded w-28 font-sans font-normal border-gray-500"
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
      <div className="text-sm mb-2 font-sans font-light">Color</div>
      {colorPicker &&(
        <div className="fixed right-20 mt-10" id="picker-1"><SketchPicker color={color} onChangeComplete={(color) => handleColorChange(color.hex)}/></div>
      )}
      <div>  
        <div className="w-32 h-9 rounded-md border-2 border-gray-500 flex flex-row p-1 items-center">
            <div className="border-2 mr-1 w-12 h-full rounded-md cursor-pointer" id="picker-1" style={{backgroundColor:selected.style?.color}} onClick={()=>setColorPicker(true)}>
            </div>
            <div className="border-r-2 h-full mr-1 border-gray-500"></div>
            <div>
                <input type="text" className="w-full h-full px-1 py-1 focus:outline-none font-sans font-normal" value={selected.style?.color} onChange={handleColorTextChange}/>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}
