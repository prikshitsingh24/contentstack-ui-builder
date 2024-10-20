
import whiteAddLogo from "../../images/whiteAddLogo.png";
import Image from "next/image";
import { useRecoilState } from "recoil";
import canvasState from "@/app/states/canvasState";
import pageState from "@/app/states/pageState";
import builderState from "@/app/states/builderState";
import crossLogo from "../../images/crossLogo.png"
import { getAllEntries, getReferenceTemplate } from "@/app/helper";
import { useEffect, useState } from "react";
import TemplateContainer from "./templateContainer";

export default function AddSectionContainer(){
    const [pages,setPages]=useRecoilState(pageState.pageState);
    const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
    const [_newSection,setNewSection]=useRecoilState(builderState.newSectionState);
    
    const addBlankSection=()=>{
      if(selectedPage.children?.length){
        const id = selectedPage?.children?.length+1;
        const sectionId="section-"+`${id}`;
        const newSection = {
            id: sectionId,
          contentBackgroundColor: "#ffffff",
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
    

    const [sectionTemplates,setSectionTemplates]=useState<any>([]);
    const [sectionTemplatesName,setSectionTemplatesName]=useState<any>()
    const [selectedSectionName,setSelectedSectionName]=useState<any>();
    const [allTemplates,setAllTemplates]=useState<any>();

    async function fetchData() {
      try {
        // Step 1: Fetch the response
        const response: any = await getAllEntries("visuals");
        if (!response) throw new Error('Status code 404');
    
        // Step 2: Collect all template names and uids
        const allNames = [];
        const templates = []; 
    
        
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const template = response[key];
    
            if (template.name === "Section template") {
              const names = template.template_name; // Get the template name
              const uids = template.template_data.map((item: any) => item.uid); // Extract uids
    
              allNames.push(names);
              templates.push({ name: names, uids: uids });
            }
          }
        }
    
        // Step 3: Set the first template as selected
        const firstTemplate = templates[0];
    
        setSelectedSectionName(firstTemplate.name);
        setAllTemplates(templates)
    
        // Step 5: Fetch the template for the first template
        if (firstTemplate.uids.length > 0) {
          fetchTemplates(firstTemplate.uids); // Fetch for the first template
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    useEffect(()=>{
      fetchData();
    },[])

    const fetchTemplates=async (templateUid:string[])=>{
      try {
        const response:any = await getReferenceTemplate(templateUid);
        if (!response) throw new Error('Status code 404');
        setSectionTemplates(response)
        
      } catch (error) {
        console.error(error);
      }
    }

    const handlePageNameClick = async (pageName:any,uid:string[]) => {
  
      if (pageName && uid) {
          await fetchTemplates(uid);
          setSelectedSectionName(pageName);
        
      }
    };
    
    return(
        <div className="fixed inset-0 bg-black bg-opacity-5 flex justify-center items-center z-[9999] backdrop-blur-sm">
       <div className="h-5/6 w-7/12 bg-white z-10 relative">
        <div className="absolute right-5 top-2 cursor-pointer" onClick={handleCrossClick}>
        <Image src={crossLogo} alt={"cross Logo"} width={25} height={25}></Image>
        </div>
         <div className="font-sans text-xl font-bold p-3">
          Add Section
         </div>
         <hr />
         <div className="w-full h-full pb-14 grid grid-cols-[1.5fr_5fr] 2xl:grid-cols-[0.8fr_4fr] ">
          <div className="p-2 border-r-2 grid grid-rows-[0.1fr_1fr]">
            <div className="bg-blue-500 h-10 text-white flex rounded-xl p-1 justify-center items-center cursor-pointer" onClick={handleBlankPageClick}>
              <div className="mr-2"><Image src={whiteAddLogo} alt={"add logo"} width={25} height={25}></Image></div>
              <div >Blank Section</div>
              </div>
              <div className="w-full h-full overflow-y-scroll">
              {allTemplates?.map((item:any)=>{
                return (
                  <div key={item.name} className={`font-sans cursor-pointer p-2 transition duration-300 ease-in-out hover:bg-blue-400 mb-4 hover:text-white rounded-xl ${item.name==selectedSectionName?'bg-blue-400 text-white':''}`} onClick={()=>handlePageNameClick(item.name,item.uids)}>{item.name}</div>
                )
              })}
              </div>
              <div>
              </div>
          </div>
          <div className="p-2 h-full">
            <div className="font-sans text-2xl font-semibold">
                Start with a template
            </div>
            <div className="font-sans text-md font-thin">Choose any section template and customize it according to your needs!!</div>
            <div className="p-4 h-full grid grid-cols-2 2xl:grid-cols-3 gap-4">
            {sectionTemplates.length > 0 && sectionTemplates.map((template: any) => {
                // Check if all necessary properties are available before rendering
                if (template.thumbnail_1?.url && template.ui_spec?.url) {
                  return (
                    <TemplateContainer
                      key={template.id} // Use a unique identifier like template.id
                      thumbnailOne={template.thumbnail_1.url}
                      template={template.ui_spec.url}
                    />
                  );
                } else {
                  // Optionally, render a fallback if any property is missing
                  return <div key={template.id}></div>;
                }
              })}
            </div>
          </div>
         </div>
       </div>
     </div>
    )
}