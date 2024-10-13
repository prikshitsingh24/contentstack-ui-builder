import canvasState from "@/app/states/canvasState";
import pageState from "@/app/states/pageState";
import sectionState from "@/app/states/sectionState";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image";
import addLogo from "../../images/addLogo.png";
import builderState from "@/app/states/builderState";
import addPage from "@/app/states/addPage";

export default function AddPages(){
    const [pages,setPages]=useRecoilState(pageState.pageState);
    const [input,setInput]=useRecoilState(addPage.inputState)
    const [pageName,setPageName]=useState("");
    const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
    const [newPage,setNewPage]=useRecoilState(builderState.newPageState);
    const [selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);

    const handleAddPageClick=()=>{
       setNewPage(true);
       setInput(true);
    }


    const handleAddPageName=(e:any)=>{
        const pageName=e.target.value;
        const newPage = {
            id: 'page-' + `${pageName}`,
            // Add any other properties here as needed
          };
      
          // Update the selectedPage state
          setSelectedPage({
            ...selectedPage,
            id:newPage.id
          });

    }

    const handleDoneClick = () => {
     
         
        setPages(prevPages => [...prevPages, selectedPage]);
        
          // Close the input if required
          setInput(false);
     
    };

    const handlePageClick=(page:any)=>{
        setSelectedSection({})
        setSelectedPage(page)
    }
    return(
        <div className="bg-white w-72 h-full border-2 grid grid-rows-[0fr_0.2fr_4fr]">
            <div className="p-2 border-b-2 pt-2 pb-2 font-sans font-semibold">
                Site pages and menu
            </div>
            <div className="p-2 flex flex-row justify-between mr-2 ml-2 font-sans font-normal">
                <div>Site menu</div>
                <div className="text-blue-600 cursor-pointer font-sans font-semibold flex flex-row justify-center items-center" onClick={handleAddPageClick}>
                    <div className="h-5 w-5 mr-1"><Image src={addLogo} alt={"add logo"}></Image></div>
                    Add pages
                    </div>
            </div>
            <div className="flex flex-col border-2 border-gray-500 rounded-md mr-2 ml-2 p-2 overflow-y-scroll mb-10">
                {pages.map((page,index)=>{
                    return(
                        <div className={`border-2 p-2 rounded-xl mb-2  cursor-pointer ${selectedPage.id==page.id?'bg-blue-400 text-white':''}`} key={page.id}  onClick={()=>handlePageClick(page)}>{page.id?.slice(5,)}</div>
                    )
                })}
               {input &&(
                 <div className="flex flex-row items-center justify-between ">
                    <input type="text" className="border-2 p-2 rounded-xl mb-2 w-full focus:outline-none" placeholder="Page name.." onChange={handleAddPageName}/>
                    <div className="p-2 border-2 mb-1 rounded-xl bg-blue-600 text-white cursor-pointer" onClick={handleDoneClick}>Done</div>
                 </div>
               )}
            </div>
        </div>
    )
}