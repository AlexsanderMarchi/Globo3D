import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Earth, Loading } from "./components";


function App() {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        <Suspense fallback={<Loading />}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
