export default function ContextMenu({ onResize, onDelete,onDuplicate }: any) {
    return (
      <div className="w-32 bg-white shadow-md rounded-md py-2">
        <button 
          className="w-full text-left px-4 py-2 hover:bg-gray-100 font-sans font-normal flex justify-between items-center"
          onClick={onResize}
        >
          <span>Resize</span>
          <span className="text-gray-500 text-xs">(hold r)</span>
        </button>
        <button 
          className=" w-full text-left px-4 py-2 hover:bg-gray-100 font-sans font-normal flex justify-between items-center"
          onClick={onDuplicate}
        >
          <span>Duplicate</span>
        </button>
        <button 
          className=" w-full text-left px-4 py-2 hover:bg-gray-100 font-sans font-normal flex justify-between items-center"
          onClick={onDelete}
        >
          <span>Delete</span>
        </button>
      </div>
    );
  }
  