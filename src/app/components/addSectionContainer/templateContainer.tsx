import addPage from "@/app/states/addPage";
import builderState from "@/app/states/builderState";
import canvasState from "@/app/states/canvasState";
import pageState from "@/app/states/pageState";
import { useRecoilState } from "recoil";


export default function TemplateContainer(props:any){
    const [selectedPage,setSelectedPage]=useRecoilState(canvasState.selectedPageState);
    const [pages,setPages]=useRecoilState(pageState.pageState);
    const [_newSection,setNewSection]=useRecoilState(builderState.newSectionState);

    const addTemplateSection = async () => {
      try {
        const response = await fetch(props.template);
    
        if (!response.ok) {
          throw new Error('Failed to fetch JSON file');
        }
    
        const sectionTemplate = await response.json();
    
        if (selectedPage.children?.length) {
          const id = selectedPage?.children?.length + 1;
          const sectionId = `section-${id}`;
    
          // Get the current screen width for scaling x-coordinate
          const designWidth = 1920; // This is your reference design width
          if (typeof window !== 'undefined') {
            const currentScreenWidth = window.innerWidth;
            const widthScaleFactor = currentScreenWidth / designWidth;
    
            // Function to scale only the x-coordinate
            const scaleXCoordinate = (originalX:any) => originalX * widthScaleFactor;
    
            // Modify each child within sectionTemplate.children, scaling x and setting a new id for "over" property
            const updatedChildren = sectionTemplate.children.map((child:any, index:number) => {
              const updatedPosition = child.position
                ? {
                    ...child.position,
                    x: scaleXCoordinate(child.position.x), // Scale only x
                    // Do not scale y, keep it unchanged
                  }
                : {};
    
              return {
                ...child,
                position: updatedPosition, // Set the updated position with scaled x
                over: `${sectionId}-content`, // Set the `over` field to the new id for each child
              };
            });
    
            // New section object with updated children and section ID
            const newSection = {
              id: sectionId,
              contentBackgroundColor: sectionTemplate.contentBackgroundColor,
              children: updatedChildren,
            };
    
            // Update the pages state with the new section
            const updatedPage = pages.map((page) => {
              if (page.id === selectedPage.id) {
                return {
                  ...page,
                  children: [...(page.children || []), newSection],
                };
              }
              return page;
            });
    
            // Update the page state with the new section
            setPages(updatedPage);
            setSelectedPage({
              ...selectedPage,
              children: [...(selectedPage.children || []), newSection], // Append the new section to selectedPage children
            });
          }
        }
      } catch (error) {
        console.error('Error fetching or parsing template:', error);
      }
    };
    
    const handleTemplateClick=()=>{
      addTemplateSection();
      setNewSection(false);
    }

    return(
        <div className="border-2 h-48 w-56 rounded-xl border-gray-500 cursor-pointer hover:scale-125 bg-white z-10 transform transition-transform duration-300 ease-in-out" onClick={handleTemplateClick}>
        <div className="flex flex-col h-full overflow-hidden p-1">
          <div className="flex-1">
            {/* Apply object-fit to the image */}
            <img
              src={props.thumbnailOne}
              alt="thumbnail"
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    )
}