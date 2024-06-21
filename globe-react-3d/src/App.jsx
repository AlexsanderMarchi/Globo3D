import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Earth, Loading, InfoCountry, ImageCountry } from "./components";

function App() {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        {/* <Suspense fallback={<Loading />}> */}
        <Suspense>
          <Earth />
        </Suspense>
      </Canvas>
      <InfoCountry />
      <ImageCountry />
    </div>
  );
}

export default App;
