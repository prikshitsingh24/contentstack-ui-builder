"use client"

import canvasState from "@/app/states/canvasState";
import { useEffect } from "react";
import { useRecoilState } from "recoil";


export default function Rightsidebar(){
    const [selected,setSelected]=useRecoilState(canvasState.selectedItemState);

    useEffect(()=>{
        console.log(selected)
    },[selected])
    return(
        <div className="grid grid-rows-[1.8fr_1fr] items-start h-full shadow-[-1px_3px_10px_grey]">
            <div className="h-full border-b-2 border-grey-400">
            <div className="pl-3 pr-3 pt-5">
                <div className="text-2xl ">
                 Design
                </div>
                </div>
            </div>
            <div>
            <div className="pl-3 pr-3 pt-5">
                <div className="text-2xl ">
                 Data
                </div>
                </div>
            </div>
        </div>
    );
}