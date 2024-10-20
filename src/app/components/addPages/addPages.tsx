import { useState } from "react";
import { useRecoilState } from "recoil";
import pageState from "@/app/states/pageState";
import canvasState from "@/app/states/canvasState";
import builderState from "@/app/states/builderState";
import addPage from "@/app/states/addPage";
import Image from "next/image";
import addLogo from "../../images/addLogo.png";
import threeDotLogo from "../../images/threeDotLogo.png";

export default function AddPages() {
  const [pages, setPages] = useRecoilState(pageState.pageState);
  const [input, setInput] = useRecoilState(addPage.inputState);
  const [selectedPage, setSelectedPage] = useRecoilState(canvasState.selectedPageState);
  const [_newPage, setNewPage] = useRecoilState(builderState.newPageState);
  const [propertiesVisible, setPropertiesVisible] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [_selectedSection,setSelectedSection]=useRecoilState(canvasState.selectedSectionState);
  const [pageNameInput,setPageNameInput]=useState("");

  const handleAddPageClick = () => {
    setNewPage(true);
    setInput(true);
  };

  const handleAddPageName = (e: any) => {
    setPageNameInput(e.target.value);
    const pageName = e.target.value;
    const newPage = {
      id: "page-" + `${pageName}`,
    };
    setSelectedPage({
      ...selectedPage,
      id: newPage.id,
    });
  };

  const handleDoneClick = () => {
    if(pageNameInput!=""){
      setPages((prevPages) => [...prevPages, selectedPage]);
      setInput(false);
    }
 
  };

  const handlePageClick = (page: any) => {
    setSelectedPage(page);
    setSelectedSection({})
    setPropertiesVisible(null); // Reset properties visibility when selecting a page
  };

  const handleOnPagePropertiesClick = (e: React.MouseEvent, pageId: string) => {
    e.stopPropagation(); // Prevent propagation to prevent triggering page selection

    const { clientX, clientY } = e; // Get mouse position
    setMenuPosition({ x: clientX+20, y: clientY}); // Offset to the right and slightly below the mouse

    if (propertiesVisible === pageId) {
      setPropertiesVisible(null); // Hide menu if it's already visible
    } else {
      setPropertiesVisible(pageId); // Show properties for the selected page
    }
  };

  const handleDeletePage = (pageId: string) => {
    if(pages.length==1){
        return;
    }
    setPages(pages.filter((page) => page.id !== pageId));
    setPropertiesVisible(null); // Hide properties after deletion
  };


  return (
    <div className="bg-white w-80 h-full border-2 grid grid-rows-[0fr_0.2fr_4fr]">
      <div className="p-2 border-b-2 pt-2 pb-2 font-sans font-semibold">
        Site pages and menu
      </div>
      <div className="p-2 flex flex-row justify-between mr-2 ml-2 font-sans font-normal">
        <div>Site menu</div>
        <div
          className="text-blue-600 cursor-pointer font-sans font-semibold flex flex-row justify-center items-center"
          onClick={handleAddPageClick}
        >
          <div className="h-5 w-5 mr-1">
            <Image src={addLogo} alt={"add logo"}></Image>
          </div>
          Add pages
        </div>
      </div>
      <div className="flex flex-col border-2 border-gray-500 rounded-md mr-2 ml-2 p-2 overflow-y-scroll mb-10">
        {pages.map((page) => {
          return (
            <div key={page.id}>
              <div
                className={`flex flex-row justify-between items-center h-14 border-2 p-2 border-blue-800 rounded-xl font-sans font-normal mb-2 w-full cursor-pointer ${
                  selectedPage.id === page.id ? "bg-blue-200 text-black" : ""
                }`}
                onClick={() => handlePageClick(page)}
              >
                {page.id?.slice(5,)}
                <div
                  className="p-1 px-2 rounded-full border border-blue-800"
                  onClick={(e) => {
                    handleOnPagePropertiesClick(e, page.id || "");
                  }}
                >
                  <div className="h-5 w-5">
                    <Image src={threeDotLogo} alt={"add logo"}></Image>
                  </div>
                </div>
              </div>

              {/* Properties dropdown rendered dynamically */}
              {propertiesVisible === page.id && (
                <div
                  className="fixed bg-white border border-gray-300 p-2 rounded-md shadow-md z-10"
                  style={{
                    left: `${menuPosition.x}px`, // Position to the right of the click
                    top: `${menuPosition.y}px`, // Slightly below the click
                  }}
                >
                  <div className="flex flex-col">
                    <button
                      onClick={() => handleDeletePage(page.id || "")}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {input && (
          <div className="flex flex-row items-center justify-between">
            <input
              type="text"
              className="border-2 p-2 rounded-xl mb-2 w-full focus:outline-none"
              placeholder="Page name.."
              onChange={handleAddPageName}
            />
            <div
              className="p-2 border-2 mb-1 rounded-xl bg-blue-600 text-white cursor-pointer"
              onClick={handleDoneClick}
            >
              Done
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
