import canvasState from "@/app/states/canvasState";
import pageState from "@/app/states/pageState";
import sectionState from "@/app/states/sectionState";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from 'uuid';


export default function AddPages(){
    const [pages,setPages]=useRecoilState(pageState.pageState);
    const [input,setInput]=useState(false);
    const [pageName,setPageName]=useState("");
    const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);

    const handleAddPageClick=()=>{
       setInput(true);
    }

    const handleAddPageName=(e:any)=>{
        setPageName(e.target.value);
    }

    const handleDoneClick=()=>{
        if(pageName){
            const newSection = {
                id: "section-"+`${uuidv4()}`,
                headerBackgroundColor: "#FFFFFF", // Optional
                contentBackgroundColor: "#FFFFFF",
                footerBackgroundColor: "#FFFFFF",
                children: [], // Assumed to be an array of dropped items
              };
              
              // Create a new page object
              const newPage = {
                id: "page-" + pageName, // Modify if you need unique IDs
                children: [newSection], // Add the newly created section to the children
              };
              
              // Update the pages state by appending the new page to the existing pages
              setPages(prevPages => [...prevPages, newPage]);
              setInput(false);
        }
    }
    const handlePageClick=(page:any)=>{
        setSelectedPage(page)
    }
    return(
        <div className="bg-white w-96 h-full border-2 rounded-xl shadow-md grid grid-rows-[0fr_0.2fr_4fr]">
            <div className="p-2 border-b-2 pt-2 pb-2 font-sans font-semibold">
                Site pages and menu
            </div>
            <div className="p-2 flex flex-row justify-between mr-2 ml-2 font-sans font-normal">
                <div>Site menu</div>
                <div className="text-blue-600 cursor-pointer font-sans font-semibold" onClick={handleAddPageClick}>Add pages</div>
            </div>
            <div className="flex flex-col border-2 border-gray-500 rounded-md mr-2 ml-2 p-2 overflow-y-scroll mb-10">
                {pages.map((page,index)=>{
                    return(
                        <div className={`border-2 p-2 rounded-xl mb-2  cursor-pointer ${selectedPage.id==page.id?'bg-blue-400 text-white':''}`}  onClick={()=>handlePageClick(page)}>{page.id?.slice(5,)}</div>
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