import React, { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { useThree } from "react-three-fiber";
import { TextureLoader } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import EarthNightMap from "../../assets/textures/8k_earth_nightmap.jpg";

export default function Earth(props) {
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

  //se mudar o valor pra true, o planeta fica de noite, ajustar valores no return e criar botao posteriormente
  const [nightMapOn, setNightMapOn] = useState(false);

  const earthRef = useRef();
  const cloudsRef = useRef();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const { camera } = useThree();

  useEffect(() => {
    const fetchCountry = async () => {
      if (selectedCountry) {
        const { lat, lon } = selectedCountry;
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=3`
          );
          if (
            response.data &&
            response.data.address &&
            response.data.address.country
          ) {
            const country = response.data.address.country;
            console.log("Country: ", country);
          } else {
            console.log("Country information not found");
          }
        } catch (error) {
          console.error("Error fetching country data: ", error);
        }
      }
    };

    fetchCountry();
  }, [selectedCountry]);

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
      <ambientLight intensity={nightMapOn ? 20 : 5} />
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
          roughness={nightMapOn ? 1 : 0.7}
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
