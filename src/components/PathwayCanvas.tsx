'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type { Group } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

import { moduleDefinitions as modules, type ModuleId } from '@/content/modules';

type Props = {
  active: boolean;
  selectedId: ModuleId;
  onReady: () => void;
  onFailure: () => void;
  onSelect: (id: ModuleId) => void;
};

const stationPositions = [-4.2, -1.4, 1.4, 4.2];
const stationGeometry = new RoundedBoxGeometry(2.15, 0.46, 2.05, 4, 0.12);

function Station({
  index,
  selectedId,
  onSelect
}: {
  index: number;
  selectedId: ModuleId;
  onSelect: (id: ModuleId) => void;
}) {
  const item = modules[index];
  const selected = selectedId === item.id;

  return (
    <group position={[stationPositions[index], 0.2, 0]}>
      <mesh
        position={[0, selected ? 0.14 : 0, 0]}
        onClick={() => onSelect(item.id)}
        onPointerEnter={(event) => {
          event.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = '';
        }}
      >
        <primitive attach="geometry" object={stationGeometry} />
        <meshStandardMaterial
          color="#123a3a"
          emissive={item.accent}
          emissiveIntensity={selected ? 0.2 : 0.055}
          metalness={0.48}
          roughness={0.38}
        />
      </mesh>
      <mesh position={[0, selected ? -0.105 : -0.245, 0]}>
        <boxGeometry args={[2.22, 0.045, 2.12]} />
        <meshStandardMaterial color={item.accent} emissive={item.accent} emissiveIntensity={0.18} />
      </mesh>
      {[-0.48, -0.16, 0.16, 0.48].map((depth, slot) => (
        <mesh key={slot} position={[0, selected ? 0.39 : 0.25, depth]}>
          <boxGeometry args={[1.25 - slot * 0.08, 0.035, 0.055]} />
          <meshStandardMaterial color={item.accent} emissive={item.accent} emissiveIntensity={selected ? 0.52 : 0.26} />
        </mesh>
      ))}
      <mesh position={[0, selected ? 0.1 : -0.04, 1.04]}>
        <boxGeometry args={[1.15, 0.07, 0.035]} />
        <meshStandardMaterial color={item.accent} emissive={item.accent} emissiveIntensity={0.38} />
      </mesh>
    </group>
  );
}

function FlowPulse({ active }: { active: boolean }) {
  const pulse = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!active || !pulse.current) return;
    const progress = (clock.getElapsedTime() * 0.17) % 1;
    pulse.current.position.x = -5.3 + progress * 10.6;
  });

  return (
    <group ref={pulse} position={[-5.3, 1.1, 0]}>
      {[-0.16, 0, 0.16].map((offset, index) => (
        <mesh key={offset} position={[offset, 0, 0]}>
          <boxGeometry args={[0.11 + index * 0.03, 0.045, 0.11]} />
          <meshStandardMaterial color="#91fff4" emissive="#31d5c8" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Scene({ active, selectedId, onSelect }: Omit<Props, 'onReady' | 'onFailure'>) {
  const rig = useRef<Group>(null);
  const { size } = useThree();

  useFrame(({ clock }) => {
    if (!active || !rig.current) return;
    rig.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.22) * 0.018;
  });

  return (
    <group ref={rig} position={[size.width > 900 ? 2.25 : 0, 0, 0]} rotation={[-0.08, 0, 0]}>
      <mesh position={[0, -0.7, 0]}>
        <boxGeometry args={[12.25, 0.24, 3.55]} />
        <meshStandardMaterial color="#0a2627" metalness={0.58} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.53, 0]}>
        <boxGeometry args={[11.65, 0.08, 3.05]} />
        <meshStandardMaterial color="#0e3434" metalness={0.42} roughness={0.52} />
      </mesh>
      {Array.from({ length: 36 }, (_, index) => (
        <mesh key={index} position={[-5.25 + index * 0.3, 1.1, 0]}>
          <boxGeometry args={[0.17, 0.025, 0.065]} />
          <meshStandardMaterial color={index % 4 === 0 ? '#63ded3' : '#176d69'} emissive="#168b84" emissiveIntensity={0.18} />
        </mesh>
      ))}
      {modules.map((module, index) => (
        <Station key={module.id} index={index} selectedId={selectedId} onSelect={onSelect} />
      ))}
      <FlowPulse active={active} />
      <gridHelper args={[20, 28, '#125454', '#0a3031']} position={[0, -0.39, 0]} />
    </group>
  );
}

function SceneLifecycle({ onReady, onFailure }: Pick<Props, 'onReady' | 'onFailure'>) {
  const { gl } = useThree();
  const signalled = useRef(false);
  const readinessFrame = useRef<number | null>(null);

  useFrame(() => {
    if (signalled.current) return;
    signalled.current = true;
    readinessFrame.current = window.requestAnimationFrame(onReady);
  });

  useEffect(() => {
    const canvas = gl.domElement;
    const handleContextLoss = (event: Event) => {
      event.preventDefault();
      onFailure();
    };

    canvas.addEventListener('webglcontextlost', handleContextLoss);
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLoss);
      if (readinessFrame.current !== null) window.cancelAnimationFrame(readinessFrame.current);
    };
  }, [gl, onFailure]);

  return null;
}

export default function PathwayCanvas({ active, selectedId, onReady, onFailure, onSelect }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 5.2, 10.3], fov: 43 }}
      dpr={[1, 1.65]}
      frameloop={active ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#061a1a')}
    >
      <ambientLight intensity={0.68} />
      <directionalLight position={[4, 7, 6]} intensity={1.55} color="#d8fffb" />
      <pointLight position={[-5, 2, 3]} intensity={5} distance={10} color="#2db9ff" />
      <pointLight position={[5, 2, 2]} intensity={4} distance={9} color="#36d5a9" />
      <SceneLifecycle onReady={onReady} onFailure={onFailure} />
      <Scene active={active} selectedId={selectedId} onSelect={onSelect} />
    </Canvas>
  );
}
