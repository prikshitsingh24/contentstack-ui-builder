import addPage from "@/app/states/addPage";
import builderState from "@/app/states/builderState";
import canvasState from "@/app/states/canvasState";
import { useRecoilState } from "recoil";


export default function TemplateContainer(props:any){
    const [_selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
    const [_selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);
    const [_newPage,setNewPage]=useRecoilState(builderState.newPageState);
    const [_addPagePanel,setAddPagePanel]=useRecoilState(addPage.addPagePanelState);

    const addTemplatePage = async () => {
      try {
        const response = await fetch(props.template); // Assuming `props.template` is a valid URL
    
        if (!response.ok) {
          throw new Error('Failed to fetch JSON file');
        }
    
        const pageTemplate = await response.json();
    
        // Define the design width (e.g., 1920px)
        const designWidth = 1920;
    
        // You need to ensure this is executed only on the client side
        if (typeof window !== 'undefined') {
          // Get the current screen width
          const currentScreenWidth = window.innerWidth;
    

          const scaleFactor = currentScreenWidth / designWidth;
    
          const scaleXCoordinate = (originalX:any) => originalX * scaleFactor;
    
          const scaleXInJson = (page:[]) => {
            page.forEach((page:any) => {
              if (page.header) {
                page.header.forEach((item:any) => {
                  if (item.position && item.position.x) {
                    item.position.x = scaleXCoordinate(item.position.x);
                  }
                });
              }
    
              if (page.children) {
                page.children.forEach((section:any) => {
                  if (section.children) {
                    section.children.forEach((child:any) => {
                      if (child.position && child.position.x) {
                        child.position.x = scaleXCoordinate(child.position.x);
                      }
                    });
                  }
                });
              }
    
              if (page.footer) {
                page.footer.forEach((item:any) => {
                  if (item.position && item.position.x) {
                    item.position.x = scaleXCoordinate(item.position.x);
                  }
                });
              }
            });
          };
    
         
          scaleXInJson(pageTemplate);
        }
        console.log(pageTemplate[0])
        // Now set the selected page and section with the scaled JSON
        setSelectedPage(pageTemplate[0]);
        setSelectedSection({});
    
      } catch (error) {
        console.error('Error fetching or parsing template:', error);
      }
    };
    
    const handleTemplateClick=()=>{
      addTemplatePage();
      setNewPage(false);
      setAddPagePanel(true);
    }

    return(
        <div className="border-2 h-64 w-52 rounded-xl border-gray-500 cursor-pointer hover:scale-125 bg-white z-10 transform transition-transform duration-300 ease-in-out" onClick={handleTemplateClick}>
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