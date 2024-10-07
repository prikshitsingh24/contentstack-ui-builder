"use client"

import canvasState from "@/app/states/canvasState";
import sectionState from "@/app/states/sectionState";
import { useRecoilState } from "recoil";
import { Draggable } from "../draggable/draggable";
import { v4 as uuidv4 } from 'uuid';
import pageState from "@/app/states/pageState";
import addPage from "@/app/states/addPage";

export default function Leftsidebar({data}:any){
    const [headerBackgroundColor,setHeaderBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [contentBackgroundColor,setContentBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [footerBackgroundColor,setFooterBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
    const [pages,setPages]=useRecoilState(pageState.pageState);
    const [addPagePanel,setAddPagePanel]=useRecoilState(addPage.addPagePanelState);

    const handleAddSectionClick = () => {
        // Create a new section with a unique id
        const newSection = {
            id: "section"+`${uuidv4()}`,
          headerBackgroundColor:  "#FFFFFF", // Optional, can be modified later
          contentBackgroundColor: "#FFFFFF",
          footerBackgroundColor: "#FFFFFF",
          children: [],  // Empty children array, can be filled later
        };
      
        const updatedPage=pages.map((page,index)=>{
            if(page.id === selectedPage.id){
              return{
                ...page,
                children:[...page.children || [], newSection]
              }
            }
            return page;
          });
          setPages(updatedPage)
          setSelectedPage({
            ...selectedPage,
            children: [...selectedPage.children || [], newSection] // Append the new section to selectedPage children
          });
          

      };
      const handleAddPageClick=()=>{
        setAddPagePanel(!addPagePanel);
      }
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
                <div className="hover:cursor-pointer mb-5 text-xl" onClick={handleAddPageClick}>Pages</div>
            </div>
        </div>
    );
}