"use client"

import { getAllContentTypes, getAllEntries } from "@/app/helper/indext";
import canvasState from "@/app/states/canvasState";
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
    const [content,setContent]=useState()

    async function fetchContentTypes() {
        try {
          const response = await getAllContentTypes();
          if (!response) throw new Error('Status code 404');
          if(response){
            console.log(response)
            setContentTypes(response.content_types)
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
                <div className="w-full mt-5 h-72 border-2 border-gray-500 overflow-y-scroll">
                        
                </div>
                </div>
            </div>
        </div>
    );
}