"use client"

import { Draggable } from "../draggable/draggable";

export default function Leftsidebar({data}:any){
   
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
            
            <div className="mb-3 hover:cursor-pointer w-full"><Draggable id="text" data={"Text"}><div className="w-full ">Text</div></Draggable></div>
            <div className="mb-3 hover:cursor-pointer w-full"><Draggable id="image" data={"Image"}><div className="w-full ">Image</div></Draggable></div>
            <div className="mb-3 hover:cursor-pointer w-full"><Draggable id="button" data={"Button"}><div className="w-full ">Button</div></Draggable></div>
            </div>
            </div>
            <div className=" h-full pl-3 pt-5 pr-3 ">
                <div className="hover:cursor-pointer mb-5 text-xl">Add section</div>
                <div className="hover:cursor-pointer mb-5 text-xl">Add page</div>
            </div>
        </div>
    );
}