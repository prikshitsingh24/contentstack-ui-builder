"use client"

import { getAllContentTypes, getAllEntries } from "@/app/helper/indext";
import canvasState from "@/app/states/canvasState";
import pageState from "@/app/states/pageState";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import BackgroundDesign from "../design/backgroundDesign";
import ButtonDesign from "../design/buttonDesign";
import ImageDesign from "../design/imageDesign";
import InputDesign from "../design/inputDesign";
import TextDesign from "../design/textDesign";


export default function Rightsidebar(){
    const [selected,setSelected]=useRecoilState(canvasState.selectedItemState);
    const [contentTypes,setContentTypes]=useState<any>([]);
    const [selectedContentType, setSelectedContentType] = useState<string>("");
    const [content,setContent]=useState<any>();
    const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
    const [pages,setPages]=useRecoilState(pageState.pageState);

    async function fetchContentTypes() {
        try {
          const response = await getAllContentTypes();
          if (!response) throw new Error('Status code 404');
          if(response){
            console.log(response)
            setContentTypes(response.content_types);

          }
        } catch (error) {
          console.error(error);
        }
      }
    
      useEffect(() => {
        fetchContentTypes();
      }, []);

      const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedContentType(event.target.value);
      };

      async function fetchData(contentType:string) {
        try {
          const response = await getAllEntries(contentType);
          if (!response) throw new Error('Status code 404');
          console.log(response)
          setContent(response)
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(()=>{
        if(selectedContentType){
            fetchData(selectedContentType);
        }
        
      },[selectedContentType])

      const handleInsertTextOnClick=(value:string)=>{
        setSelected({
          ...selected,
          content:value
        })
        if (selected.id?.slice(0,6)=="header") {
          const updatedSelectedPage=selectedPage?.header?.map((item:any)=>{
            if(selected.id===item.id){
              return{
                ...item,
                content:value
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
                content:value
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
        const updatedItems=selectedPage?.children?.map((section)=>{
          const updatedChildren=section?.children?.map((item)=>{
            if(selected.id===item.id){
              return {
                ...item,
                content:value
              }
            }
            return item
          })
          return {
            ...section,
            children: updatedChildren,  // Update section's children with modified items
          };
        })
         

        setSelectedPage({
          ...selectedPage,
          children:updatedItems
        })

        const updatePages=pages.map((item)=>{
          if(selectedPage.id===item.id){
            return {
              ...item,
              children:updatedItems
            }
          }
          return item
        })

        setPages(updatePages)
      }
        
      }

      const handleInsertImageOnClick=(imageUrl:string)=>{
        setSelected({
          ...selected,
          src:imageUrl
        })
        if (selected.id?.slice(0,6)=="header") {
          const updatedSelectedPage=selectedPage?.header?.map((item:any)=>{
            if(selected.id===item.id){
              return{
                ...item,
                src:imageUrl
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
                src:imageUrl
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
        const updatedItems=selectedPage?.children?.map((section)=>{
          const updatedChildren=section?.children?.map((item)=>{
            if(selected.id===item.id){
              return {
                ...item,
                src:imageUrl
              }
            }
            return item
          })
          return {
            ...section,
            children: updatedChildren,  // Update section's children with modified items
          };
        })
         

        setSelectedPage({
          ...selectedPage,
          children:updatedItems
        })

        const updatePages=pages.map((item)=>{
          if(selectedPage.id===item.id){
            return {
              ...item,
              children:updatedItems
            }
          }
          return item
        })

        setPages(updatePages)
      }
      }

      function sliceText(text: string, wordLimit: number) {
        const words = text.split(' '); // Split the string into words
    
        // If the word count exceeds the limit, slice and add ellipsis
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        } else {
            return text; // Return the full text if it's within the word limit
        }
    }

    return(
        <div className="grid grid-rows-[1.2fr_1fr] items-start h-full shadow-[-1px_3px_10px_grey]">
            <div className="h-full border-gray-400">
            <div className="pl-3 pr-3 pt-5">
                <div className="text-2xl font-sans font-semibold">
                 Design
                </div>
                <div className="mt-4">
                    {!selected.type&&(
                        <BackgroundDesign></BackgroundDesign>
                    )}
                    {selected.type=="Text"&&(
                        <TextDesign></TextDesign>
                    )}
                     {selected.type=="Button"&&(
                        <ButtonDesign></ButtonDesign>
                    )}
                     {selected.type=="Input"&&(
                        <InputDesign></InputDesign>
                    )}
                     {selected.type=="Image"&&(
                        <ImageDesign></ImageDesign>
                    )}
                </div>
                </div>
            </div>
            <div className="h-full">
            <div className="pl-3 pr-3 pt-5 h-full">
                <div className="text-2xl font-sans font-semibold ">
                 Data
                </div>
                <div className="mt-2">
                {contentTypes.length > 0 ? (
              <div>
                <select
                  className="border-2 p-2 rounded focus:outline-none border-gray-500"
                  value={selectedContentType}
                  onChange={handleDropdownChange}
                        >
                        <option value="">Select a content type</option>
                        {contentTypes.map((item: any, index: number) => (
                            <option key={index} value={item.uid}>
                            {item.title}
                            </option>
                        ))}
                        </select>
                    </div>
                    ) : (
                    <div></div>
                )}
                </div>
            
                {content && (
                <div  className={`w-full mt-5 h-72 border-2 border-gray-300 overflow-y-scroll bg-white rounded-lg shadow-md transition-opacity duration-300 ease-in-out ${
                  !selected.id ? "cursor-not-allowed bg-gray-200 text-gray-500 opacity-60 " : ""
                }`}>
                  {Object.entries(content).map(([key, value]: any) => {
                    
                    // Handle images separately (if key starts with "image")
                    if (key.startsWith("image")) {
                      return (
                        <div
                          key={key}
                          className="border-b-2 h-auto pl-4 py-3 cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                          onClick={() => handleInsertImageOnClick(value.url)}
                        >
                          <div className="flex items-center space-x-4">
                            {/* Image Thumbnail */}
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                              {value.url ? (
                                <img src={value.url} alt="Preview" className="object-cover w-full h-full" />
                              ) : (
                                <span className="text-gray-400">No image available</span>
                              )}
                            </div>
                            {/* Image Info */}
                            <div className="flex flex-col">
                              <p className="font-sans font-semibold text-base text-gray-800">Image: {(value.title).slice(0,20)}...</p>
                              {selected.id && (
                                <span className="text-gray-500 font-sans font-semibold  text-sm">Click to insert</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Skip rendering if the key is "uid"
                    if (key === "uid") {
                      return null;
                    }

                    // For other content types (text or numbers)
                    return (
                      <div
                        key={key}
                        className="border-b-2 h-auto pl-4 py-3 cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                        onClick={() => handleInsertTextOnClick(value)}
                      >
                        <div className="flex items-center space-x-4">
                          {/* Content Info */}
                          <div className="flex flex-col">
                            <p className="font-semibold font-sans text-gray-800">
                              {typeof value === "string"
                                ? sliceText(value, 8)
                                : "No preview"}
                            </p>
                            {selected.id&&(
                              <span className="text-gray-500 font-sans font-semibold text-sm">Click to insert</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

       

                </div>
            </div>
        </div>
    );
}

function renderImage(value: any) {
  if (typeof value === 'object' && value?.url) {
      return (
          <div className="p-2">
              <img src={value.url} alt="image content" className="w-32 h-32" />
          </div>
      );
  } else {
      return <div className="p-2">Image URL not available</div>;
  }
}