import { Canvas, useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from "three";

export default function Earth() {
  // const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
  //   THREE.TextureLoader, 
  //   [
  //     require('../assets/8k_earth_daymap.jpg'),
  //     require('../assets/8k_earth_normal_map.jpg'),
  //     require('../assets/8k_earth_specular_map.jpg'),
  //     require('../assets/8k_earth_clouds.jpg')
  //   ]
  // );

  return (
    <Canvas className="w-full h-full">
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <mesh>
          <sphereGeometry args={[3, 32, 32]} />
          <meshPhongMaterial />
          <meshStandardMaterial />
        </mesh>
      </Suspense>
    </Canvas>
  );
};