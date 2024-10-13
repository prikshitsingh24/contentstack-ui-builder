"use client"

import canvasState from "@/app/states/canvasState";
import sectionState from "@/app/states/sectionState";
import { useRecoilState } from "recoil";
import { Draggable } from "../draggable/draggable";
import { v4 as uuidv4 } from 'uuid';
import pageState from "@/app/states/pageState";
import addPage from "@/app/states/addPage";
import { useEffect } from "react";
import { getAllEntries } from "@/app/helper/indext";
import pagesLogo from "../../images/pagesLogo.png";
import exportLogo from "../../images/exportLogo.png";
import addSectionLogo from "../../images/addSectionLogo.png"
import Image from "next/image";
import textLogo from "../../images/textLogo.png";
import buttonLogo from "../../images/buttonLogo.png";
import inputLogo from "../../images/inputLogo.png";
import imageLogo from "../../images/imageLogo.png";
import previewLogo from "../../images/previewLogo.png";
import builderState from "@/app/states/builderState";
import arrowBackLogo from "../../images/arrowBackLogo.png";

export default function Leftsidebar({data}:any){
    const [headerBackgroundColor,setHeaderBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [contentBackgroundColor,setContentBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [footerBackgroundColor,setFooterBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
    const [pages,setPages]=useRecoilState(pageState.pageState);
    const [addPagePanel,setAddPagePanel]=useRecoilState(addPage.addPagePanelState);
    const [preview,setPreview]=useRecoilState(builderState.previewState)
    const [selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);
    const [gridVisibility,setGridVisibility]=useRecoilState(canvasState.gridVisibilityStatus)
    const [newSection,setNewSection]=useRecoilState(builderState.newSectionState);
    const [leftSidebarCollapsed,setLeftSidebarCollapsed]=useRecoilState(builderState.leftSidebarCollapsedState)
    const handleAddSectionClick = () => { 
      setNewSection(true);
    };
      const handleAddPageClick=()=>{
        setAddPagePanel(!addPagePanel);
      }

  
    return(
        <div className="bg-white grid grid-rows-[2fr_1fr] items-start h-full shadow-[1px_3px_10px_grey]">
            <div className=" h-full grid grid-rows-[0.5fr_3fr] relative" >
              <div className="absolute right-2 top-2" onClick={()=>setLeftSidebarCollapsed(true)}>
              <Image src={arrowBackLogo} alt={"arrow back"} width={25}></Image>
                </div>
            <div className="pl-3 pr-3 pt-10">
                <div className="text-2xl font-sans font-bold ">
                Add elements
                </div>
                <div className="mt-5">
                <input type="text" className="border border-gray-500 rounded-xl w-full p-2 focus:outline-none" placeholder="Search" />
                </div>
            </div>
            <div className="flex flex-col overflow-y-scroll w-fit border-gray-400 mt-2 h-full pl-3 pt-3">
              <div className="grid grid-cols-2 gap-x-4">
            {data.map((item:any)=>{
                return (
                    <div className="mb-3 hover:cursor-pointer w-20" key={item.data.id}><Draggable id={item.data.id} data={item.data}><div className="w-full  border-2 border-gray-500 p-1 rounded-md shadow-md flex flex-col items-start">
                      <div className="w-full flex items-center justify-center">
                        {item.icon==="text"&&(
                          <Image src={textLogo} alt={"icon"} className="w-10 h-10"/>
                        )}
                         {item.icon==="button"&&(
                          <Image src={buttonLogo} alt={"icon"} className="w-10 h-10"/>
                        )}
                         {item.icon==="input"&&(
                          <Image src={inputLogo} alt={"icon"} className="w-10 h-10"/>
                        )}
                         {item.icon==="image"&&(
                          <Image src={imageLogo} alt={"icon"} className="w-10 h-10"/>
                        )}
                      </div>
                     <div className="flex flex-row w-full justify-center items-center font-sans"> {item.data.type}</div>
                      </div></Draggable></div>
                )
            })}
            </div>
            </div>
            </div>
            <div className=" h-full pl-3 pt-5 pr-3 ">
                <div className="hover:cursor-pointer mb-5 text-xl font-sans font-semibold flex flex-row transition duration-300 ease-in-out hover:bg-orange-500/20 p-2 hover:backdrop-blur-lg hover:rounded-lg" onClick={handleAddSectionClick}>
                <div className="mr-4"><Image src={addSectionLogo} alt="cross" className="w-7"></Image></div>
                  Add section
                  </div>
                <div className="hover:cursor-pointer mb-5 text-xl font-sans font-semibold flex flex-row transition duration-300 ease-in-out hover:bg-green-500/20 p-2 hover:backdrop-blur-lg hover:rounded-lg" onClick={handleAddPageClick}>
                  <div className="mr-4"><Image src={pagesLogo} alt="cross" className="w-7"></Image></div>
                  Pages
                  </div>
          
                
            </div>
        </div>
    );
}