import Canvas from "./components/canvas/canvas";
import Leftsidebar from "./components/leftsidebar/leftsidebar";
import Rightsidebar from "./components/rightsidebar/rightsidebar";

export default function Home() {
  return (
    <div className="grid grid-cols-[1fr_6fr_1.5fr] gap-3 h-screen">
      <div>
        <Leftsidebar></Leftsidebar>
      </div>
      <div className="mb-2 mt-2">
      <Canvas></Canvas>
      </div>
      <div>
        <Rightsidebar></Rightsidebar>
      </div>
    </div>
  );
}
