"use client"

import { useRecoilState } from "recoil";
import { Draggable } from "../draggable/draggable";
import addPage from "@/app/states/addPage";
import { useState } from "react";
import pagesLogo from "../../images/pagesLogo.png";
import addSectionLogo from "../../images/addSectionLogo.png"
import Image from "next/image";
import textLogo from "../../images/textLogo.png";
import buttonLogo from "../../images/buttonLogo.png";
import inputLogo from "../../images/inputLogo.png";
import imageLogo from "../../images/imageLogo.png";
import builderState from "@/app/states/builderState";
import arrowBackLogo from "../../images/arrowBackLogo.png";
import boxLogo from  "../../images/boxLogo.png";
import addSectionHoverLogo from "../../images/addSectionHoverLogo.png"
import pagesHoverLogo from "../../images/pagesHoverLogo.png"

export default function Leftsidebar({data}:any){
    const [addPagePanel,setAddPagePanel]=useRecoilState(addPage.addPagePanelState);
    const [_newSection,setNewSection]=useRecoilState(builderState.newSectionState);
    const [_leftSidebarCollapsed,setLeftSidebarCollapsed]=useRecoilState(builderState.leftSidebarCollapsedState);
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    const handleAddSectionClick = () => { 
      setNewSection(true);
    };
      const handleAddPageClick=()=>{
        setAddPagePanel(!addPagePanel);
      }
    
      const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value.toLowerCase());
      };
    
      const filteredData = data.filter((item: any) => {
        return (
          item.data.type.toLowerCase().includes(searchTerm) ||
          item.data.id.toLowerCase().includes(searchTerm)
        );
      });

      const [isSectionHovered, setIsSectionHovered] = useState(false);
      const [isPageHovered, setIsPageHovered] = useState(false);
  
    return(
        <div className="bg-white grid grid-rows-[2fr_1fr] items-start h-full shadow-[1px_3px_10px_grey]">
            <div className=" h-full grid grid-rows-[0.5fr_3fr] relative" >
              <div className="absolute right-2 top-2 cursor-pointer flex justify-end w-full" onClick={()=>setLeftSidebarCollapsed(true)}>
              <Image src={arrowBackLogo} alt={"arrow back"} width={25}></Image>
                </div>
            <div className="pl-3 pr-3 pt-8">
                <div className="text-2xl font-sans font-bold ">
                Add elements
                </div>
                <div className="mt-5">
                <input type="text" className="border border-gray-500 rounded-xl w-full p-2 focus:outline-none" placeholder="Search" onChange={handleSearchChange}/>
                </div>
            </div>
            <div className="flex flex-col overflow-y-scroll overflow-x-hidden w-fit border-gray-400 mt-2 h-full pl-3 pt-3">
              <div className="grid grid-cols-2 gap-x-4">
              {filteredData.map((item: any) => {
              return (
                <div className="mb-3 hover:cursor-pointer w-20" key={item.data.id}>
                  <Draggable id={item.data.id} data={item.data}>
                    <div className="w-full border-2 border-gray-500 p-1 rounded-md shadow-md flex flex-col items-start">
                      <div className="w-full flex items-center justify-center">
                        {item.icon === "text" && (
                          <Image src={textLogo} alt={"icon"} className="w-10 h-10" />
                        )}
                        {item.icon === "button" && (
                          <Image src={buttonLogo} alt={"icon"} className="w-10 h-10" />
                        )}
                        {item.icon === "input" && (
                          <Image src={inputLogo} alt={"icon"} className="w-10 h-10" />
                        )}
                        {item.icon === "image" && (
                          <Image src={imageLogo} alt={"icon"} className="w-10 h-10" />
                        )}
                         {item.icon === "box" && (
                          <Image src={boxLogo} alt={"icon"} className="w-10 h-10" />
                        )}
                      </div>
                      <div className="flex flex-row w-full justify-center items-center font-sans">
                        {item.data.type}
                      </div>
                    </div>
                  </Draggable>
                </div>
              );
            })}
            </div>
            </div>
            </div>
            <div className=" h-full pl-1 pt-5 pr-3 ">
            <div
              className="hover:cursor-pointer mb-5 text-xl font-sans font-semibold flex flex-row transition duration-300 ease-in-out hover:bg-black rounded-lg hover:text-white p-2 hover:backdrop-blur-lg hover:rounded-lg"
              onClick={handleAddSectionClick}
              onMouseEnter={() => setIsSectionHovered(true)}
              onMouseLeave={() => setIsSectionHovered(false)}
            >
              <div className="mr-2">
                {/* Conditionally change the image on hover */}
                <Image src={isSectionHovered ? addSectionHoverLogo : addSectionLogo} alt="section logo" className="w-7" />
              </div>
              Add Section
            </div>

            {/* Add Page */}
            <div
              className="hover:cursor-pointer mb-5 text-xl font-sans font-semibold flex flex-row transition duration-300 ease-in-out hover:bg-black rounded-lg hover:text-white p-2 hover:backdrop-blur-lg hover:rounded-lg"
              onClick={handleAddPageClick}
              onMouseEnter={() => setIsPageHovered(true)}
              onMouseLeave={() => setIsPageHovered(false)}
            >
              <div className="mr-2">
                {/* Conditionally change the image on hover */}
                <Image src={isPageHovered ? pagesHoverLogo : pagesLogo} alt="page logo" className="w-7" />
              </div>
              Add Page
            </div>
          </div>
          
                
            </div>
    );
}