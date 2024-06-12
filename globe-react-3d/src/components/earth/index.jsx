import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useThree, extend } from "react-three-fiber";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";

export function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();

  //   useFrame(({ clock }) => {
  //     const elapsedTime = clock.getElapsedTime();
  //     earthRef.current.rotation.y = elapsedTime / 6;
  //     cloudsRef.current.rotation.y = elapsedTime / 6;
  //   });

  //CLICK COORDINATES

  const [selectedCountry, setSelectedCountry] = useState(null);
  const { camera, gl } = useThree();

  const handleClick = (event) => {
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    // Set mouse coordinates
    // mouseVector.x = mouse.x * 2 - 1;
    // mouseVector.y = -(mouse.y * 2) + 1;
    mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouseVector, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObject(earthRef.current);

    if (intersects.length > 0) {
      // Get the intersection point
      const intersectionPoint = intersects[0].point;

      // Convert the intersection point to latitude and longitude
      const latLong = pointToLatLong(intersectionPoint);
      setSelectedCountry(latLong);
      console.log("Latitude and Longitude: ", latLong);
    }
  };

  const pointToLatLong = (point) => {
    const radius = 1; // Radius of the Earth sphere
    const phi = Math.acos(point.y / radius); // phi (latitude)
    const theta = Math.atan2(point.z, point.x); // theta (longitude)

    // Convert phi and theta to degrees
    const lat = 90 - (phi * 180) / Math.PI;
    const lon = (((theta * 180) / Math.PI + 180) % 360) - 180;

    return { lat, lon };
  };

  return (
    <>
      <ambientLight intensity={2} />
      {/* <pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={14.2} /> */}
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef} onClick={handleClick}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
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
          metalness={0.4}
          roughness={0.7}
        />
        <OrbitControls
          enableZoom={true}
          //   enablePan={true}
          //   panSpeed={0.5}
          enableRotate={true}
          zoomSpeed={0.6}
          rotateSpeed={0.4}
        />
      </mesh>
    </>
  );
}
