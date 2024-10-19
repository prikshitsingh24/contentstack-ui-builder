import addPage from "@/app/states/addPage";
import builderState from "@/app/states/builderState";
import canvasState from "@/app/states/canvasState";
import { useRecoilState } from "recoil";


export default function TemplateContainer(props:any){
    const [_selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
    const [_selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);
    const [_newPage,setNewPage]=useRecoilState(builderState.newPageState);
    const [_addPagePanel,setAddPagePanel]=useRecoilState(addPage.addPagePanelState);

    const addTemplatePage=async ()=>{
      try {
        const response = await fetch(props.template);
    
        if (!response.ok) {
          throw new Error('Failed to fetch JSON file');
        }
    
        const pageTemplate = await response.json();
        setSelectedPage(pageTemplate[0]);
        setSelectedSection({})
    
      } catch (error) {
        console.error('Error fetching or parsing template:', error);
      }

      
    }
    const handleTemplateClick=()=>{
      addTemplatePage();
      setNewPage(false);
      setAddPagePanel(true);
    }

    return(
        <div className="border-2 h-64 w-52 rounded-xl border-gray-500 cursor-pointer hover:scale-110 transform transition-transform duration-300 ease-in-out" onClick={handleTemplateClick}>
        <div className="flex flex-col h-full overflow-hidden p-1">
          <div className="flex-1">
            {/* Apply object-fit to the image */}
            <img
              src={props.thumbnailOne}
              alt="thumbnail"
              className="h-full w-full object-cover rounded-t-xl"
            />
          </div>
          <div className="flex-1">
            {/* Apply object-fit to the image */}
            <img
              src={props.thumbnailTwo}
              alt="thumbnail"
              className="h-full w-full object-cover rounded-b-xl"
            />
          </div>
        </div>
      </div>
    )
}