import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { useThree } from "react-three-fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNightMap from "../../assets/textures/8k_earth_nightmap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import { getDataForLat } from "../../connection";

export default function Earth() {
  const [colorMap, normalMap, specularMap, cloudsMap, nightMap] = useLoader(
    TextureLoader,
    [
      EarthDayMap,
      EarthNormalMap,
      EarthSpecularMap,
      EarthCloudsMap,
      EarthNightMap,
    ]
  );
  const earthRef = useRef();
  const cloudsRef = useRef();
  const ambientLightRef = useRef();
  const { camera } = useThree();
  const [nightMapOn, setNightMapOn] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (selectedCountry) {
      const { lat, lon } = selectedCountry;
      getDataForLat(lat, lon);
    }
  }, [selectedCountry]);

  useFrame(() => {
    if (ambientLightRef.current) {
      ambientLightRef.current.position.set(
        camera.position.x - 0.3,
        camera.position.y,
        camera.position.z
      );
    }
  });

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

  const invertLongitude = (lon) => {
    return lon >= 0 ? -lon : Math.abs(lon);
  };

  const pointToLatLong = (point) => {
    const radius = 1;
    const phi = Math.acos(point.y / radius);
    let theta = Math.atan2(point.z, point.x);

    let lat = 90 - (phi * 180) / Math.PI;
    let lon = (theta * 180) / Math.PI;

    lon = lon > 180 ? lon - 360 : lon;
    lon = lon < -180 ? lon + 360 : lon;

    lon = invertLongitude(lon);

    return { lat, lon };
  };

  return (
    <>
      <ambientLight intensity={nightMapOn ? 10 : 5} />
      <pointLight ref={ambientLightRef} color="#f6f3ea" intensity={6} />
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
          opacity={nightMapOn ? 0.01 : 0.3}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} onClick={handleClick}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={nightMapOn ? nightMap : colorMap}
          normalMap={normalMap}
          metalness={0.8}
          roughness={1}
        />
        <OrbitControls
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          rotateSpeed={0.4}
          minDistance={1.3}
          maxDistance={2}
          enablePan={false}
        />
      </mesh>
    </>
  );
}
