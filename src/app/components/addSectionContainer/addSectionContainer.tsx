
import whiteAddLogo from "../../images/whiteAddLogo.png";
import Image from "next/image";
import { useRecoilState } from "recoil";
import sectionState from "@/app/states/sectionState";
import canvasState from "@/app/states/canvasState";
import { v4 as uuidv4 } from 'uuid';
import pageState from "@/app/states/pageState";
import builderState from "@/app/states/builderState";
import addPage from "@/app/states/addPage";
import crossLogo from "../../images/crossLogo.png"

export default function AddSectionContainer(){
    const [headerBackgroundColor,setHeaderBackgroundColor]=useRecoilState(sectionState.headerBackgroundColorState);
    const [contentBackgroundColor,setContentBackgroundColor]=useRecoilState(sectionState.contentBackgroundColorState);
    const [footerBackgroundColor,setFooterBackgroundColor]=useRecoilState(sectionState.footerBackgroundColorState);
    const [droppedItems,setDroppedItems]=useRecoilState(canvasState.droppedItemState);
    const [pages,setPages]=useRecoilState(pageState.pageState);
    const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
    const [newPage,setNewPage]=useRecoilState(builderState.newPageState);
    const [addPagePanel,setAddPagePanel]=useRecoilState(addPage.addPagePanelState);
    const [selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);
    const [newSection,setNewSection]=useRecoilState(builderState.newSectionState);
    
    const addBlankSection=()=>{
      if(selectedPage.children?.length){
        const id = selectedPage?.children?.length+1;
        const sectionId="section-"+`${id}`;
        const newSection = {
            id: sectionId,
          contentBackgroundColor: "#FFFFFF",
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
      }
          
    }

    const handleBlankPageClick=()=>{
        addBlankSection();
        setNewSection(false);
    }

    const handleCrossClick=()=>{
      setNewSection(false);
    }
    return(
        <div className="fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center z-[9999] backdrop-blur-sm">
       <div className="h-5/6 w-7/12 bg-white z-10 relative">
        <div className="absolute right-5 top-2" onClick={handleCrossClick}>
        <Image src={crossLogo} alt={"cross Logo"} width={25} height={25}></Image>
        </div>
         <div className="font-sans text-xl font-bold p-3">
          Add Section
         </div>
         <hr />
         <div className="w-full h-full pb-14 grid grid-cols-[1fr_5fr]">
          <div className="p-2 border-r-2 grid grid-rows-[0.1fr_1fr]">
            <div className="bg-blue-500 h-10 text-white flex rounded-xl p-1 justify-center items-center cursor-pointer" onClick={handleBlankPageClick}>
              <div className="mr-2"><Image src={whiteAddLogo} alt={"add logo"} width={25} height={25}></Image></div>
              <div >Blank Section</div>
              </div>
              <div>
              <div className="font-sans cursor-pointer">About us</div>
              </div>
          </div>
          <div className="p-2">
            <div className="font-sans text-2xl font-semibold">
                Start with a template
            </div>
            <div className="font-sans text-md font-thin">Choose any section template and customize it according to your needs!!</div>
          </div>
         </div>
       </div>
     </div>
    )
}