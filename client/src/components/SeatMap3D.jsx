import React from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import helvetikerFont from "three/examples/fonts/helvetiker_regular.typeface.json"; // Correct path

const Seat = ({ position }) => {
  return (
    <group position={position}>
      {/* Seat Base (Rounded for realism) */}
      <mesh castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#007acc" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Backrest (Curved for realism) */}
      <mesh position={[0, 0.4, -0.2]}>
        <boxGeometry args={[0.4, 0.5, 0.08]} />
        <meshStandardMaterial color="#005f99" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
};

const Stage = () => (
  <mesh position={[0, 0, -8]}>
    <boxGeometry args={[8, 0.2, 3]} />
    <meshStandardMaterial color="#663399" roughness={0.7} />
  </mesh>
);

const Screen = () => (
  <mesh position={[0, 2, -10]}>
    <planeGeometry args={[10, 4]} />
    <meshStandardMaterial color="black" roughness={0.2} />
  </mesh>
);

const SeatMap3D = () => {
  const rows = 5;
  const cols = 8;
  const spacing = 1.2;
  const seats = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * spacing - (cols * spacing) / 2;
      const z = row * spacing;
      seats.push(<Seat key={`${row}-${col}`} position={[x, 0, z]} />);
    }
  }

  return (
    <Canvas className="w-full h-full bg-gray-900" shadows>
      <PerspectiveCamera makeDefault position={[0, 8, 14]} />
      <OrbitControls />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      {/* Stage and Screen */}
      <Stage />
      <Screen />

      {/* Seats */}
      {seats}
    </Canvas>
  );
};

export default SeatMap3D;
