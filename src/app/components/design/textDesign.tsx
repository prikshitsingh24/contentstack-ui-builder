import { useRecoilState } from "recoil";
import canvasState from "@/app/states/canvasState";
import { SketchPicker } from "react-color";
import { useState } from "react";
import colorPickerState from "@/app/states/colorPickerState";
import pageState from "@/app/states/pageState";
import alignLeftLogo from "../../images/alignLeftLogo.png"
import alignRightLogo from "../../images/alignRightLogo.png";
import alignCenterLogo from "../../images/alignCenterLogo.png";
import alignLeftLogoWhite from "../../images/alignLeftLogoWhite.png"
import alignRightLogoWhite from "../../images/alignRightLogoWhite.png";
import alignCenterLogoWhite from "../../images/alignCenterLogoWhite.png";
import Image from "next/image";

export default function TextDesign() {
  const [selected, setSelected] = useRecoilState(canvasState.selectedItemState);
  const [colorPicker,setColorPicker]=useRecoilState(colorPickerState.colorPickerState);
  const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
  const [pages,setPages]=useRecoilState(pageState.pageState);
  const [color, setColor] = useState("#000000");

  const handleTextDesignClick=(e:any)=>{
    if ((e.target as HTMLElement).closest('#picker-1')) return;
    setColorPicker(false);
  }

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
    if (selected.id?.slice(0,6)=="header") {
      const updatedSelectedPage=selectedPage?.header?.map((item:any)=>{
        if(selected.id===item.id){
          return{
            ...item,
            style: {
              ...item.style,
              fontSize: newFontSize,  // Update font size in selectedPage
            },
        }
      }
        return item;
      });

      setSelectedPage({
        ...selectedPage,
        header:updatedSelectedPage
      })

      const updatedPages = pages.map((page: any) => {
        if (page.id === selectedPage.id) {
          return {
            ...page,
            header:updatedSelectedPage  // Update this page's children with the updated selectedPage
          };
        }
        return page;
      });
    
      setPages(updatedPages);
    
    }else if(selected.id?.slice(0,6)=="footer"){
      const updatedSelectedPage=selectedPage?.footer?.map((item:any)=>{
        if(selected.id===item.id){
          return{
            ...item,
            style: {
              ...item.style,
              fontSize: newFontSize,  // Update font size in selectedPage
            },
        }
      }
        return item;
      });

      setSelectedPage({
        ...selectedPage,
        footer:updatedSelectedPage
      })

      const updatedPages = pages.map((page: any) => {
        if (page.id === selectedPage.id) {
          return {
            ...page,
            footer:updatedSelectedPage  // Update this page's children with the updated selectedPage
          };
        }
        return page;
      });
    
      setPages(updatedPages);
    }else{
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
    }
    // Update font size in the selectedPage state
    
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

    if (selected.id?.slice(0,6)=="header") {
      const updatedSelectedPage=selectedPage?.header?.map((item:any)=>{
        if(selected.id===item.id){
          return{
            ...item,
            style: {
              ...item.style,
              fontStyle: style,  // Update font size in selectedPage
            },
        }
      }
        return item;
      });

      setSelectedPage({
        ...selectedPage,
        header:updatedSelectedPage
      })

      const updatedPages = pages.map((page: any) => {
        if (page.id === selectedPage.id) {
          return {
            ...page,
            header:updatedSelectedPage  // Update this page's children with the updated selectedPage
          };
        }
        return page;
      });
    
      setPages(updatedPages);
    
    }else if(selected.id?.slice(0,6)=="footer"){
      const updatedSelectedPage=selectedPage?.footer?.map((item:any)=>{
        if(selected.id===item.id){
          return{
            ...item,
            style: {
              ...item.style,
              fontStyle: style,  // Update font size in selectedPage
            },
        }
      }
        return item;
      });

      setSelectedPage({
        ...selectedPage,
        footer:updatedSelectedPage
      })

      const updatedPages = pages.map((page: any) => {
        if (page.id === selectedPage.id) {
          return {
            ...page,
            footer:updatedSelectedPage  // Update this page's children with the updated selectedPage
          };
        }
        return page;
      });
    
      setPages(updatedPages);
    }else{
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
    }
  
    
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
    if (selected.id?.slice(0,6)=="header") {
      const updatedSelectedPage=selectedPage?.header?.map((item:any)=>{
        if(selected.id===item.id){
          return{
            ...item,
            style: {
              ...item.style,
              fontWeight: newFontWeight,  // Update font size in selectedPage
            },
        }
      }
        return item;
      });

      setSelectedPage({
        ...selectedPage,
        header:updatedSelectedPage
      })

      const updatedPages = pages.map((page: any) => {
        if (page.id === selectedPage.id) {
          return {
            ...page,
            header:updatedSelectedPage  // Update this page's children with the updated selectedPage
          };
        }
        return page;
      });
    
      setPages(updatedPages);
    
    }else if(selected.id?.slice(0,6)=="footer"){
      const updatedSelectedPage=selectedPage?.footer?.map((item:any)=>{
        if(selected.id===item.id){
          return{
            ...item,
            style: {
              ...item.style,
              fontWeight: newFontWeight,  // Update font size in selectedPage
            },
        }
      }
        return item;
      });

      setSelectedPage({
        ...selectedPage,
        footer:updatedSelectedPage
      })

      const updatedPages = pages.map((page: any) => {
        if (page.id === selectedPage.id) {
          return {
            ...page,
            footer:updatedSelectedPage  // Update this page's children with the updated selectedPage
          };
        }
        return page;
      });
    
      setPages(updatedPages);
    }else{
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
  }
  };
  

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    // Update color in the selected item
    setSelected({
      ...selected,
      style: {
        ...selected.style,
        color: newColor,  // Update color in the selected item state
      },
    });
    if (selected.id?.slice(0,6)=="header") {
      const updatedSelectedPage=selectedPage?.header?.map((item:any)=>{
        if(selected.id===item.id){
          return{
            ...item,
            style: {
              ...item.style,
              color: newColor,  // Update font size in selectedPage
            },
        }
      }
        return item;
      });

      setSelectedPage({
        ...selectedPage,
        header:updatedSelectedPage
      })

      const updatedPages = pages.map((page: any) => {
        if (page.id === selectedPage.id) {
          return {
            ...page,
            header:updatedSelectedPage  // Update this page's children with the updated selectedPage
          };
        }
        return page;
      });
    
      setPages(updatedPages);
    
    }else if(selected.id?.slice(0,6)=="footer"){
      const updatedSelectedPage=selectedPage?.footer?.map((item:any)=>{
        if(selected.id===item.id){
          return{
            ...item,
            style: {
              ...item.style,
              color: newColor,  // Update font size in selectedPage
            },
        }
      }
        return item;
      });

      setSelectedPage({
        ...selectedPage,
        footer:updatedSelectedPage
      })

      const updatedPages = pages.map((page: any) => {
        if (page.id === selectedPage.id) {
          return {
            ...page,
            footer:updatedSelectedPage  // Update this page's children with the updated selectedPage
          };
        }
        return page;
      });
    
      setPages(updatedPages);
    }else{
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
  }
  };

const handleColorTextChange=(e:any)=>{
  setSelected({
    ...selected,
    style: {
      ...selected.style,
      color:e.target.value,  // Update background color in the selected item state
    },
  });
  if (selected.id?.slice(0,6)=="header") {
    const updatedSelectedPage=selectedPage?.header?.map((item:any)=>{
      if(selected.id===item.id){
        return{
          ...item,
          style: {
            ...item.style,
            color:e.target.value,  // Update font size in selectedPage
          },
      }
    }
      return item;
    });

    setSelectedPage({
      ...selectedPage,
      header:updatedSelectedPage
    })

    const updatedPages = pages.map((page: any) => {
      if (page.id === selectedPage.id) {
        return {
          ...page,
          header:updatedSelectedPage  // Update this page's children with the updated selectedPage
        };
      }
      return page;
    });
  
    setPages(updatedPages);
  
  }else if(selected.id?.slice(0,6)=="footer"){
    const updatedSelectedPage=selectedPage?.footer?.map((item:any)=>{
      if(selected.id===item.id){
        return{
          ...item,
          style: {
            ...item.style,
            color:e.target.value,  // Update font size in selectedPage
          },
      }
    }
      return item;
    });

    setSelectedPage({
      ...selectedPage,
      footer:updatedSelectedPage
    })

    const updatedPages = pages.map((page: any) => {
      if (page.id === selectedPage.id) {
        return {
          ...page,
          footer:updatedSelectedPage  // Update this page's children with the updated selectedPage
        };
      }
      return page;
    });
  
    setPages(updatedPages);
  }else{
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
}

const handleCenterAlignClick=()=>{
  
  // Update the selected item's font size
  setSelected({
    ...selected,
    style: {
      ...selected.style,
      textAlign:"center"
    },
  });
  if (selected.id?.slice(0,6)=="header") {
    const updatedSelectedPage=selectedPage?.header?.map((item:any)=>{
      if(selected.id===item.id){
        return{
          ...item,
          style: {
            ...item.style,
            textAlign:"center"
          },
      }
    }
      return item;
    });

    setSelectedPage({
      ...selectedPage,
      header:updatedSelectedPage
    })

    const updatedPages = pages.map((page: any) => {
      if (page.id === selectedPage.id) {
        return {
          ...page,
          header:updatedSelectedPage  // Update this page's children with the updated selectedPage
        };
      }
      return page;
    });
  
    setPages(updatedPages);
  
  }else if(selected.id?.slice(0,6)=="footer"){
    const updatedSelectedPage=selectedPage?.footer?.map((item:any)=>{
      if(selected.id===item.id){
        return{
          ...item,
          style: {
            ...item.style,
            textAlign:"center"
          },
      }
    }
      return item;
    });

    setSelectedPage({
      ...selectedPage,
      footer:updatedSelectedPage
    })

    const updatedPages = pages.map((page: any) => {
      if (page.id === selectedPage.id) {
        return {
          ...page,
          footer:updatedSelectedPage  // Update this page's children with the updated selectedPage
        };
      }
      return page;
    });
  
    setPages(updatedPages);
  }else{
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      const updatedChildren = section.children.map((item: any) => {
        if (item.id === selected.id) {
          return {
            ...item,
            style: {
              ...item.style,
              textAlign:"center"
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
}

const handleLeftAlignClick=()=>{
  
  // Update the selected item's font size
  setSelected({
    ...selected,
    style: {
      ...selected.style,
      textAlign:"left"
    },
  });
  if (selected.id?.slice(0,6)=="header") {
    const updatedSelectedPage=selectedPage?.header?.map((item:any)=>{
      if(selected.id===item.id){
        return{
          ...item,
          style: {
            ...item.style,
            textAlign:"left"
          },
      }
    }
      return item;
    });

    setSelectedPage({
      ...selectedPage,
      header:updatedSelectedPage
    })

    const updatedPages = pages.map((page: any) => {
      if (page.id === selectedPage.id) {
        return {
          ...page,
          header:updatedSelectedPage  // Update this page's children with the updated selectedPage
        };
      }
      return page;
    });
  
    setPages(updatedPages);
  
  }else if(selected.id?.slice(0,6)=="footer"){
    const updatedSelectedPage=selectedPage?.footer?.map((item:any)=>{
      if(selected.id===item.id){
        return{
          ...item,
          style: {
            ...item.style,
            textAlign:"left"
          },
      }
    }
      return item;
    });

    setSelectedPage({
      ...selectedPage,
      footer:updatedSelectedPage
    })

    const updatedPages = pages.map((page: any) => {
      if (page.id === selectedPage.id) {
        return {
          ...page,
          footer:updatedSelectedPage  // Update this page's children with the updated selectedPage
        };
      }
      return page;
    });
  
    setPages(updatedPages);
  }else{
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      const updatedChildren = section.children.map((item: any) => {
        if (item.id === selected.id) {
          return {
            ...item,
            style: {
              ...item.style,
              textAlign:"left"
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
}

const handleRightAlignClick=()=>{
  
  // Update the selected item's font size
  setSelected({
    ...selected,
    style: {
      ...selected.style,
      textAlign:"right"
    },
  });
  if (selected.id?.slice(0,6)=="header") {
    const updatedSelectedPage=selectedPage?.header?.map((item:any)=>{
      if(selected.id===item.id){
        return{
          ...item,
          style: {
            ...item.style,
            textAlign:"right"
          },
      }
    }
      return item;
    });

    setSelectedPage({
      ...selectedPage,
      header:updatedSelectedPage
    })

    const updatedPages = pages.map((page: any) => {
      if (page.id === selectedPage.id) {
        return {
          ...page,
          header:updatedSelectedPage  // Update this page's children with the updated selectedPage
        };
      }
      return page;
    });
  
    setPages(updatedPages);
  
  }else if(selected.id?.slice(0,6)=="footer"){
    const updatedSelectedPage=selectedPage?.footer?.map((item:any)=>{
      if(selected.id===item.id){
        return{
          ...item,
          style: {
            ...item.style,
            textAlign:"right"
          },
      }
    }
      return item;
    });

    setSelectedPage({
      ...selectedPage,
      footer:updatedSelectedPage
    })

    const updatedPages = pages.map((page: any) => {
      if (page.id === selectedPage.id) {
        return {
          ...page,
          footer:updatedSelectedPage  // Update this page's children with the updated selectedPage
        };
      }
      return page;
    });
  
    setPages(updatedPages);
  }else{
    const updatedSelectedPage = selectedPage?.children?.map((section: any) => {
      const updatedChildren = section.children.map((item: any) => {
        if (item.id === selected.id) {
          return {
            ...item,
            style: {
              ...item.style,
              textAlign:"right"
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
}


  return (
    <div className="grid grid-cols-2 gap-4" onClick={(e)=>handleTextDesignClick(e)}>
      {/* Font Size Dropdown */}
      <div>
        <div className="text-sm mb-2 font-sans font-light">Font Size</div>
        <select
          value={selected.style?.fontSize || "16px"}  // Default value if fontSize is undefined
          onChange={handleFontSizeChange}
          className="border-2 h-8 rounded w-20 font-sans font-normal border-gray-500"
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
      <div className="flex flex-row border-2 border-gray-500 w-14 rounded-lg h-8 overflow-hidden">
        <button
          className={`flex-1 py-1 transition-colors duration-200 ease-in-out ${
            selected.style?.fontStyle === "normal" 
              ? "bg-blue-600 text-white" 
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleFontStyleChange("normal")}
        >
          N
        </button>
        <button
          className={`flex-1 py-1 transition-colors duration-200 ease-in-out ${
            selected.style?.fontStyle === "italic" 
              ? "bg-blue-600 text-white" 
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => handleFontStyleChange("italic")}
        >
          <i>I</i>
        </button>
      </div>
    </div>
      <div>
        <div className="text-sm mb-2 font-sans font-light">Font weight</div>
        <select
          value={selected.style?.fontWeight || "400"}  // Default value if fontSize is undefined
          onChange={handleFontWeightChange}
          className="border-2 h-8 rounded w-28 font-sans font-normal border-gray-500"
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
        <div className="w-28 h-8 rounded-md border-2 border-gray-500 flex flex-row p-1 items-center">
            <div className="border-2 mr-1 w-12 h-full rounded-md cursor-pointer" id="picker-1" style={{backgroundColor:selected.style?.color}} onClick={()=>setColorPicker(!colorPicker)}>
            </div>
            <div className="border-r-2 h-full mr-1 border-gray-500"></div>
            <div>
                <input type="text" className="w-full h-full focus:outline-none font-sans font-normal" value={selected.style?.color} onChange={handleColorTextChange}/>
            </div>
        </div>
        </div>
      </div>
      <div>
      <div className="text-sm mb-2 font-sans font-light">Text Align</div>
        <div className="flex flex-row">
         {selected.style?.textAlign=="left"?(
           <div className="h-8 w-28 border-2 rounded-md mr-2 flex justify-center items-center border-gray-500 cursor-pointer bg-black">
           <Image src={alignLeftLogoWhite} alt="alignLeftLogo"></Image>
         </div>
         ):(
          <div className=" h-8 w-28 border-2 rounded-md mr-2 flex justify-center items-center border-gray-500 cursor-pointer" onClick={handleLeftAlignClick}>
          <Image src={alignLeftLogo} alt="alignLeftLogo"></Image>
        </div>
         )}
           {selected.style?.textAlign=="center"?(
           <div className=" h-8 w-28 border-2 rounded-md mr-2 flex justify-center items-center border-gray-500 cursor-pointer bg-black">
           <Image src={alignCenterLogoWhite} alt="alignLeftLogo"></Image>
         </div>
         ):(
          <div className=" h-8 w-28 border-2 rounded-md mr-2 flex justify-center items-center border-gray-500 cursor-pointer" onClick={handleCenterAlignClick}>
          <Image src={alignCenterLogo} alt="alignLeftLogo"></Image>
        </div>
         )}
           {selected.style?.textAlign=="right"?(
           <div className=" h-8 w-28 border-2 rounded-md mr-2 flex justify-center items-center border-gray-500 cursor-pointer bg-black">
           <Image src={alignRightLogoWhite} alt="alignLeftLogo"></Image>
         </div>
         ):(
          <div className=" h-8 w-28 border-2 rounded-md mr-2 flex justify-center items-center border-gray-500 cursor-pointer" onClick={handleRightAlignClick}>
          <Image src={alignRightLogo} alt="alignLeftLogo"></Image>
        </div>
         )}
        </div>
      </div>
    </div>
  );
}
