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

export default function Leftsidebar({data}:any){
    const [headerBackgroundColor,setHeaderBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [contentBackgroundColor,setContentBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [footerBackgroundColor,setFooterBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
    const [pages,setPages]=useRecoilState(pageState.pageState);
    const [addPagePanel,setAddPagePanel]=useRecoilState(addPage.addPagePanelState);


    async function fetchData() {
      try {
        const response = await getAllEntries();
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
        const newSection = {
            id: "section-"+`${uuidv4()}-`,
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
    return(
        <div className="grid grid-rows-[3fr_1fr] items-start h-full shadow-[1px_3px_10px_grey]">
            <div className=" h-full grid grid-rows-[0.5fr_3fr]" >
            <div className="pl-3 pr-3 pt-5">
                <div className="text-3xl font-sans font-semibold ">
                Add elements
                </div>
                <div className="mt-5">
                <input type="text" className="border border-gray-500 rounded-xl p-2 focus:outline-none" placeholder="Search" />
                </div>
            </div>
            <div className="flex flex-col overflow-y-scroll  border-gray-400 mt-2   h-full pl-3 pt-3">
              <div className="grid grid-cols-2 gap-2">
            {data.map((item:any)=>{
                return (
                    <div className="mb-3 hover:cursor-pointer w-full " key={item.id}><Draggable id={item.id} data={item}><div className="w-full h-28 border-2 border-gray-500 p-2 rounded-md shadow-md flex flex-col items-start">
                      <div className="w-full h-20 border-2 rounded-xl">hi</div>
                     <div className="flex flex-row w-full justify-center items-center font-sans"> {item.type}</div>
                      </div></Draggable></div>
                )
            })}
            {/* <div className="mb-3 hover:cursor-pointer w-full"><Draggable id="text" data={"Text"}><div className="w-full ">Text</div></Draggable></div>
            <div className="mb-3 hover:cursor-pointer w-full"><Draggable id="image" data={"Image"}><div className="w-full ">Image</div></Draggable></div>
            <div className="mb-3 hover:cursor-pointer w-full"><Draggable id="button" data={"Button"}><div className="w-full ">Button</div></Draggable></div> */}
            </div>
            </div>
            </div>
            <div className=" h-full pl-3 pt-5 pr-3 ">
                <div className="hover:cursor-pointer mb-5 text-xl font-sans font-semibold flex flex-row" onClick={handleAddSectionClick}>
                <div className="mr-4"><Image src={addSectionLogo} alt="cross" className="w-7"></Image></div>
                  Add section
                  </div>
                <div className="hover:cursor-pointer mb-5 text-xl font-sans font-semibold flex flex-row" onClick={handleAddPageClick}>
                  <div className="mr-4"><Image src={pagesLogo} alt="cross" className="w-7"></Image></div>
                  Pages
                  </div>
                <div className="hover:cursor-pointer mb-5 text-xl font-sans font-semibold flex flex-row" onClick={exportToJson}>
                <div className="mr-4"><Image src={exportLogo} alt="cross" className="w-7"></Image></div>
                  Export
                  </div>
            </div>
        </div>
    );
}