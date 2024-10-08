"use client"

import canvasState from "@/app/states/canvasState";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import BackgroundDesign from "../design/backgroundDesign";
import ButtonDesign from "../design/buttonDesign";
import ImageDesign from "../design/imageDesign";
import InputDesign from "../design/inputDesign";
import TextDesign from "../design/textDesign";


export default function Rightsidebar(){
    const [selected,setSelected]=useRecoilState(canvasState.selectedItemState);

    return(
        <div className="grid grid-rows-[1.8fr_1fr] items-start h-full shadow-[-1px_3px_10px_grey]">
            <div className="h-full border-b-2 border-grey-400">
            <div className="pl-3 pr-3 pt-5">
                <div className="text-2xl font-sans font-semibold">
                 Design
                </div>
                <div className="mt-4">
                    {!selected.type&&(
                        <BackgroundDesign></BackgroundDesign>
                    )}
                    {selected.type=="Text"&&(
                        <TextDesign></TextDesign>
                    )}
                     {selected.type=="Button"&&(
                        <ButtonDesign></ButtonDesign>
                    )}
                     {selected.type=="Input"&&(
                        <InputDesign></InputDesign>
                    )}
                     {selected.type=="Image"&&(
                        <ImageDesign></ImageDesign>
                    )}
                </div>
                </div>
            </div>
            <div>
            <div className="pl-3 pr-3 pt-5">
                <div className="text-2xl font-sans font-semibold ">
                 Data
                </div>
                </div>
            </div>
        </div>
    );
}