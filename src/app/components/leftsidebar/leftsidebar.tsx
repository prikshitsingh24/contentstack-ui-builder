"use client"

import canvasState from "@/app/states/canvasState";
import sectionState from "@/app/states/sectionState";
import { useRecoilState } from "recoil";
import { Draggable } from "../draggable/draggable";
import { v4 as uuidv4 } from 'uuid';

export default function Leftsidebar({data}:any){
    const [droppedItems,setDroppedItems]=useRecoilState(canvasState.droppedItemState);
    const [sections, setSections] = useRecoilState(sectionState.sectionState);
    const [headerBackgroundColor,setHeaderBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [contentBackgroundColor,setContentBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [footerBackgroundColor,setFooterBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);


    const handleAddSectionClick = () => {
        // Create a new section with a unique id
        const newSection = {
            id: "section"+`${uuidv4()}`,
          headerBackgroundColor: headerBackgroundColor, // Optional, can be modified later
          contentBackgroundColor:contentBackgroundColor,
          footerBackgroundColor:footerBackgroundColor,
          children: [],  // Empty children array, can be filled later
        };
      
        // Update the sections state by appending the new section
        setSections((prevSections) => [...prevSections, newSection]);
      };
    return(
        <div className="grid grid-rows-[3fr_1fr] items-start h-full shadow-[1px_3px_10px_grey]">
            <div className=" h-full grid grid-rows-[0.5fr_3fr]" >
            <div className="pl-3 pr-3 pt-5">
                <div className="text-3xl ">
                Add elements
                </div>
                <div className="mt-5">
                <input type="text" className="border border-gray-500 rounded-xl p-2" placeholder="Search" />
                </div>
            </div>
            <div className="flex flex-col overflow-y-scroll border-t-2 mt-2 border-b-2 text-gray-500 border-gray-300 h-full pl-3 pt-3">
            {data.map((item:any)=>{
                return (
                    <div className="mb-3 hover:cursor-pointer w-full" key={item.id}><Draggable id={item.id} data={item}><div className="w-full ">{item.type}</div></Draggable></div>
                )
            })}
            {/* <div className="mb-3 hover:cursor-pointer w-full"><Draggable id="text" data={"Text"}><div className="w-full ">Text</div></Draggable></div>
            <div className="mb-3 hover:cursor-pointer w-full"><Draggable id="image" data={"Image"}><div className="w-full ">Image</div></Draggable></div>
            <div className="mb-3 hover:cursor-pointer w-full"><Draggable id="button" data={"Button"}><div className="w-full ">Button</div></Draggable></div> */}
            </div>
            </div>
            <div className=" h-full pl-3 pt-5 pr-3 ">
                <div className="hover:cursor-pointer mb-5 text-xl" onClick={handleAddSectionClick}>Add section</div>
                <div className="hover:cursor-pointer mb-5 text-xl">Add page</div>
            </div>
        </div>
    );
}