import addPage from "@/app/states/addPage";
import builderState from "@/app/states/builderState";
import canvasState from "@/app/states/canvasState";
import pageState from "@/app/states/pageState";
import { useState } from "react";
import { useRecoilState } from "recoil";


export default function TemplateContainer(props:any){
    const [selectedTemplate,setSelectedTemplate]=useState();
    const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
    const [selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);
    const [newPage,setNewPage]=useRecoilState(builderState.newPageState);
    const [addPagePanel,setAddPagePanel]=useRecoilState(addPage.addPagePanelState);
    const [pages,setPages]=useRecoilState(pageState.pageState);
    const [newSection,setNewSection]=useRecoilState(builderState.newSectionState);

    const addTemplateSection=async ()=>{
      try {
        const response = await fetch(props.template);
    
        if (!response.ok) {
          throw new Error('Failed to fetch JSON file');
        }
    
        const sectionTemplate = await response.json();


        if(selectedPage.children?.length){
            const id = selectedPage?.children?.length + 1;
            const sectionId = `section-${id}`;

            // Modify each child within sectionTemplate.children, setting a new id for "over" property
            const updatedChildren = sectionTemplate.children.map((child:any, index:number) => {
                return {
                ...child,
                over: `${sectionId}`+'-content'  // Set the `over` field to the new id for each child
                };
            });

            // New section object with updated children and section ID
            const newSection = {
                id: sectionId,
                contentBackgroundColor: sectionTemplate.contentBackgroundColor,
                children: updatedChildren,
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
    
      } catch (error) {
        console.error('Error fetching or parsing template:', error);
      }

      
    }
    const handleTemplateClick=()=>{
      addTemplateSection();
      setNewSection(false);
    }

    return(
        <div className="border-2 h-48 w-56 rounded-xl border-gray-500 cursor-pointer hover:scale-110 transform transition-transform duration-300 ease-in-out" onClick={handleTemplateClick}>
        <div className="flex flex-col h-full overflow-hidden p-1">
          <div className="flex-1">
            {/* Apply object-fit to the image */}
            <img
              src={props.thumbnailOne}
              alt="thumbnail"
              className="h-full w-full object-cover rounded-t-xl"
            />
          </div>
        </div>
      </div>
    )
}