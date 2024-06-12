import React, { useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { useThree } from "react-three-fiber";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";

export default function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const { camera } = useThree();

  const handleClick = (event) => {
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseVector, camera);

    const intersects = raycaster.intersectObject(earthRef.current);

    if (intersects.length > 0) {
      const intersectionPoint = intersects[0].point;

      const latLong = pointToLatLong(intersectionPoint);
      setSelectedCountry(latLong);
      console.log("Latitude and Longitude: ", latLong);
    }
  };

  const pointToLatLong = (point) => {
    const radius = 1;
    const phi = Math.acos(point.y / radius);
    const theta = Math.atan2(point.z, point.x);

    const lat = 90 - (phi * 180) / Math.PI;
    const lon = (((theta * 180) / Math.PI + 180) % 360) - 180;

    return { lat, lon };
  };

  return (
    <>
      <ambientLight intensity={2} />
      <pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={10} />
      <Stars
        radius={300}
        depth={70}
        count={10000}
        factor={5}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef} onClick={handleClick}>
        <sphereGeometry args={[1.007, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.3}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} onClick={handleClick}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.8}
          roughness={0.7}
        />
        <OrbitControls
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          rotateSpeed={0.4}
        />
      </mesh>
    </>
  );
}
