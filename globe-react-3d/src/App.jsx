import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Earth, Loading, InfoCountry } from "./components";

function App() {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        <Suspense fallback={<Loading />}>
          <Earth />
        </Suspense>
      </Canvas>
      <InfoCountry />
    </div>
  );
}

export default App;
