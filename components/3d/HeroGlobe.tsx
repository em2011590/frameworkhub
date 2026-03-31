"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

const FRAMEWORK_SATELLITES = [
  { name: "React", color: "#61dafb", radius: 2.8, speed: 0.4, offset: 0 },
  { name: "Vue", color: "#42b883", radius: 3.2, speed: 0.3, offset: 1.0 },
  { name: "Next.js", color: "#ffffff", radius: 2.5, speed: 0.5, offset: 2.0 },
  { name: "Svelte", color: "#ff3e00", radius: 3.5, speed: 0.25, offset: 0.7 },
  { name: "Angular", color: "#dd0031", radius: 2.9, speed: 0.35, offset: 3.2 },
  { name: "Nuxt", color: "#00dc82", radius: 3.8, speed: 0.2, offset: 1.5 },
  { name: "Django", color: "#092e20", radius: 3.1, speed: 0.45, offset: 4.0 },
  { name: "FastAPI", color: "#009688", radius: 4.0, speed: 0.18, offset: 2.5 },
];

function Satellite({ name, color, radius, speed, offset }: typeof FRAMEWORK_SATELLITES[number]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const textRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = Math.sin(t * 0.5) * 0.8;

    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.y += 0.015;
    }
    if (textRef.current) {
      textRef.current.position.set(x, y + 0.35, z);
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
        <pointLight color={color} intensity={0.5} distance={1.5} />
      </mesh>
      <group ref={textRef}>
        <Text
          fontSize={0.18}
          color={color}
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {name}
        </Text>
      </group>
    </>
  );
}

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.elapsedTime * 0.05;
  });

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0, "#1a1a3e");
    grad.addColorStop(0.5, "#0f0f2a");
    grad.addColorStop(1, "#0a0a1a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
    // Grid lines
    ctx.strokeStyle = "rgba(99,102,241,0.3)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 512; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive="#1a1a4a"
          emissiveIntensity={0.3}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      {/* Glowing ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.1, 0.02, 8, 128]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={1} />
      </mesh>
    </Float>
  );
}

export function HeroGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
      style={{ display: "block" }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -3, -5]} color="#8b5cf6" intensity={1} />
      <pointLight position={[5, 3, 5]} color="#00d4ff" intensity={0.5} />

      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />

      <Globe />
      {FRAMEWORK_SATELLITES.map((sat) => (
        <Satellite key={sat.name} {...sat} />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
      />
    </Canvas>
  );
}

export default HeroGlobe;
