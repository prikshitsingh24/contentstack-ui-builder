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
            
            {content &&(
                  <div className="w-full mt-5 h-72 border-2 border-gray-500 overflow-y-scroll">
                {Object.entries(content).map(([key, value]: any) => {
                    // If the key starts with "image", handle it separately
                    if (key.startsWith("image")) {
                        return (
                            <div
                                key={key}
                                className="border-b-2 h-auto pl-2 font-sans font-semibold cursor-pointer hover:bg-gray-200 transition-colors duration-300"
                                onClick={() =>  handleInsertImageOnClick(value.url)}
                            >
                                {renderImage(value)}
                            </div>
                        );
                    }

                    // Skip rendering if the key is "uid"
                    if (key === "uid") {
                        return null;
                    }

                    // For other content types
                    return (
                        <div
                            key={key}
                            className="border-b-2 h-auto pl-2 font-sans font-semibold cursor-pointer hover:bg-gray-200 transition-colors duration-300"
                            onClick={() => handleInsertTextOnClick(value)}
                        >
                            {typeof value === 'string' || typeof value === 'number' ? (
                                <p>
                                    {typeof value === 'string' ? sliceText(value, 8) : value}
                                </p>
                            ) : (
                                <div></div>
                            )}
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