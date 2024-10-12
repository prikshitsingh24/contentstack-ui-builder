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

    async function fetchData() {
      try {
        const response = await getAllEntries("components");
        if (!response) throw new Error('Status code 404');
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    }
  
    useEffect(() => {
      fetchData();
    }, []);

    const handleAddSectionClick = () => {
        // Create a new section with a unique id
        const sectionId="section-"+`${uuidv4()}-`;
        const newSection = {
            id: sectionId,
          contentBackgroundColor: "#FFFFFF",
          children: [],  // Empty children array, can be filled later
        };
      
        const updatedPage=pages.map((page,index)=>{
            if(page.id === selectedPage.id){
              return{
                ...page,
                headerBackgroundColor:  "#FFFFFF",
                footerBackgroundColor: "#FFFFFF",
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
      const exportToJson = () => {
        // Step 1: Convert the `pages` array to a JSON string
        const jsonString = JSON.stringify(pages, null, 2);  // `null, 2` is used for pretty-printing the JSON
      
        // Step 2: Create a Blob containing the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });
      
        // Step 3: Create a download link (anchor element)
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pages.json';  // Name the file "pages.json" when downloading
      
        // Step 4: Programmatically trigger the download by clicking the anchor element
        a.click();
      
        // Cleanup: Revoke the object URL after the download
        URL.revokeObjectURL(url);
      };

      const handlePreviewClick=()=>{
        setSelectedSection({});
        setGridVisibility(false);
        setPreview(!preview);
      }
    return(
        <div className="grid grid-rows-[2fr_1fr] items-start h-full shadow-[1px_3px_10px_grey]">
            <div className=" h-full grid grid-rows-[0.5fr_3fr]" >
            <div className="pl-3 pr-3 pt-5">
                <div className="text-3xl font-sans font-bold ">
                Add elements
                </div>
                <div className="mt-5">
                <input type="text" className="border border-gray-500 rounded-xl p-2 focus:outline-none" placeholder="Search" />
                </div>
            </div>
            <div className="flex flex-col overflow-y-scroll  border-gray-400 mt-2  h-full pl-3 pt-3">
              <div className="grid grid-cols-2 gap-x-4">
            {data.map((item:any)=>{
                return (
                    <div className="mb-3 hover:cursor-pointer w-full " key={item.data.id}><Draggable id={item.data.id} data={item.data}><div className="w-full h-24 border-2 border-gray-500 p-2 rounded-md shadow-md flex flex-col items-start">
                      <div className="w-full h-14 flex items-center justify-center">
                        {item.icon==="text"&&(
                          <Image src={textLogo} alt={"icon"} className="w-14 h-14"/>
                        )}
                         {item.icon==="button"&&(
                          <Image src={buttonLogo} alt={"icon"} className="w-14 h-14"/>
                        )}
                         {item.icon==="input"&&(
                          <Image src={inputLogo} alt={"icon"} className="w-14 h-14"/>
                        )}
                         {item.icon==="image"&&(
                          <Image src={imageLogo} alt={"icon"} className="w-14 h-14"/>
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
                <div className="hover:cursor-pointer mb-5 text-xl font-sans font-semibold flex flex-row transition duration-300 ease-in-out hover:bg-red-700/20 p-2 hover:backdrop-blur-lg hover:rounded-lg" onClick={exportToJson}>
                <div className="mr-4"><Image src={exportLogo} alt="cross" className="w-7"></Image></div>
                  Export
                  </div>
                  <div className="hover:cursor-pointer mb-5 text-xl font-sans font-semibold flex flex-row transition duration-300 ease-in-out hover:bg-blue-700/20 p-2 hover:backdrop-blur-lg hover:rounded-lg" onClick={handlePreviewClick}>
                <div className="mr-4"><Image src={previewLogo} alt="cross" className="w-7"></Image></div>
                  Preview
                  </div>
            </div>
        </div>
    );
}