import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const FloatingCapsule = ({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <MeshDistortMaterial
          color="#393469"
          roughness={0.3}
          metalness={0.1}
          distort={0.2}
          speed={2}
        />
      </mesh>
    </Float>
  );
};

const FloatingSphere = ({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.3} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={position} scale={scale}>
        <MeshDistortMaterial
          color="#4a4580"
          roughness={0.4}
          metalness={0.05}
          distort={0.3}
          speed={1.5}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
};

const FloatingTorus = ({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.6} floatIntensity={0.6}>
      <Torus ref={meshRef} args={[1, 0.3, 16, 32]} position={position} scale={scale}>
        <meshStandardMaterial
          color="#2d2a5a"
          roughness={0.5}
          metalness={0.15}
          transparent
          opacity={0.9}
        />
      </Torus>
    </Float>
  );
};

const FloatingBox = ({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.1;
    }
  });

  return (
    <Float speed={speed * 0.9} rotationIntensity={0.4} floatIntensity={0.9}>
      <RoundedBox ref={meshRef} args={[1.2, 1.2, 1.2]} radius={0.15} position={position} scale={scale}>
        <meshStandardMaterial
          color="#D8EBE2"
          roughness={0.35}
          metalness={0.1}
          transparent
          opacity={0.8}
        />
      </RoundedBox>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#fff8e7" />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#a8b89a" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#d4dcc4" />

      {/* Floating elements */}
      <FloatingCapsule position={[-3.5, 1, -2]} scale={0.8} speed={1.2} />
      <FloatingCapsule position={[4, -1.5, -3]} scale={0.6} speed={0.9} />
      
      <FloatingSphere position={[3, 2, -4]} scale={0.7} speed={1} />
      <FloatingSphere position={[-2.5, -2, -2]} scale={0.5} speed={1.3} />
      
      <FloatingTorus position={[0, 0, -5]} scale={0.9} speed={0.7} />
      <FloatingTorus position={[-4, 2.5, -6]} scale={0.5} speed={1.1} />
      
      <FloatingBox position={[4.5, 0.5, -4]} scale={0.55} speed={0.8} />
      <FloatingBox position={[-1.5, 2.5, -3]} scale={0.4} speed={1.4} />
    </>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroScene;
