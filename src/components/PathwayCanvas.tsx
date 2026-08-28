'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import type { Group } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

import { moduleDefinitions as modules, type ModuleId } from '@/content/modules';

type SequenceAct = 0 | 1 | 2;
type Position = [number, number, number];

type Props = {
  animating: boolean;
  runToken: number;
  selectedId: ModuleId | null;
  sequenceAct: SequenceAct;
  onReady: () => void;
  onFailure: () => void;
  onSelect: (id: ModuleId) => void;
};

const sourcePosition: Position = [-5.05, 0.2, 0];
const programmePosition: Position = [-2.7, 0.2, 0];
const modulePositions: Position[] = [
  [-0.15, 0.2, -1.2],
  [2.3, 0.2, -1.2],
  [-0.15, 0.2, 1.2],
  [2.3, 0.2, 1.2]
];
const stationGeometry = new RoundedBoxGeometry(1.92, 0.42, 1.64, 4, 0.1);
const finiteMotionDurations = [0.65, 0.72, 1.15] as const;

function lerpPosition(from: Position, to: Position, progress: number): Position {
  return [
    from[0] + (to[0] - from[0]) * progress,
    from[1] + (to[1] - from[1]) * progress,
    from[2] + (to[2] - from[2]) * progress
  ];
}

function Connector({
  from,
  to,
  active
}: {
  from: Position;
  to: Position;
  active: boolean;
}) {
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];
  const length = Math.hypot(dx, dz);
  const midpoint: Position = [(from[0] + to[0]) / 2, -0.06, (from[2] + to[2]) / 2];

  return (
    <mesh position={midpoint} rotation={[0, -Math.atan2(dz, dx), 0]}>
      <boxGeometry args={[length, 0.035, active ? 0.075 : 0.045]} />
      <meshStandardMaterial
        color={active ? '#5cded3' : '#24504f'}
        emissive={active ? '#31bdb2' : '#123b3a'}
        emissiveIntensity={active ? 0.38 : 0.1}
      />
    </mesh>
  );
}

function SourceFoundation({ active }: { active: boolean }) {
  return (
    <group position={sourcePosition}>
      <mesh position={[0, active ? 0.1 : 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.18, 0.5, 1.18]} />
        <meshStandardMaterial
          color="#123a3a"
          emissive="#31d5c8"
          emissiveIntensity={active ? 0.34 : 0.1}
          metalness={0.38}
          roughness={0.42}
        />
      </mesh>
      <mesh position={[0, active ? 0.38 : 0.28, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.72, 0.035, 0.72]} />
        <meshStandardMaterial color="#91fff4" emissive="#31d5c8" emissiveIntensity={active ? 0.7 : 0.28} />
      </mesh>
      <mesh position={[0, -0.33, 0]}>
        <cylinderGeometry args={[0.92, 1.04, 0.12, 4]} />
        <meshStandardMaterial color="#0b2f30" metalness={0.48} roughness={0.44} />
      </mesh>
    </group>
  );
}

function ProgrammeBoundary({ active }: { active: boolean }) {
  return (
    <group position={programmePosition}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.12, 12, 48]} />
        <meshStandardMaterial
          color={active ? '#8ce9df' : '#376965'}
          emissive={active ? '#31d5c8' : '#153c3a'}
          emissiveIntensity={active ? 0.62 : 0.14}
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.22, 32]} />
        <meshStandardMaterial
          color="#103737"
          emissive="#4ccfc4"
          emissiveIntensity={active ? 0.26 : 0.08}
          metalness={0.44}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

function Station({
  index,
  selectedId,
  revealed,
  onSelect
}: {
  index: number;
  selectedId: ModuleId | null;
  revealed: boolean;
  onSelect: (id: ModuleId) => void;
}) {
  const item = modules[index];
  const selected = selectedId === item.id;
  const raised = selected ? 0.14 : 0;

  return (
    <group position={modulePositions[index]}>
      <mesh
        position={[0, raised, 0]}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(item.id);
        }}
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
          emissiveIntensity={selected ? 0.3 : revealed ? 0.13 : 0.035}
          metalness={0.48}
          roughness={0.38}
        />
      </mesh>
      <mesh position={[0, raised - 0.225, 0]}>
        <boxGeometry args={[1.98, 0.045, 1.7]} />
        <meshStandardMaterial
          color={item.accent}
          emissive={item.accent}
          emissiveIntensity={selected ? 0.34 : revealed ? 0.2 : 0.08}
        />
      </mesh>
      {[-0.34, 0, 0.34].map((depth, slot) => (
        <mesh key={depth} position={[0, raised + 0.24, depth]}>
          <boxGeometry args={[1.08 - slot * 0.08, 0.03, 0.05]} />
          <meshStandardMaterial
            color={item.accent}
            emissive={item.accent}
            emissiveIntensity={selected ? 0.52 : revealed ? 0.3 : 0.12}
          />
        </mesh>
      ))}
    </group>
  );
}

function FlowMarker() {
  return (
    <>
      {[-0.13, 0, 0.13].map((offset, index) => (
        <mesh key={offset} position={[offset, 0, 0]}>
          <boxGeometry args={[0.09 + index * 0.025, 0.05, 0.09]} />
          <meshStandardMaterial color="#91fff4" emissive="#31d5c8" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </>
  );
}

function FiniteFlow({
  animating,
  runToken,
  sequenceAct
}: Pick<Props, 'animating' | 'runToken' | 'sequenceAct'>) {
  const invalidate = useThree((state) => state.invalidate);
  const sourceMarker = useRef<Group>(null);
  const programmeMarker = useRef<Group>(null);
  const branchMarkers = useRef<Array<Group | null>>([]);
  const elapsedTime = useRef(0);

  useEffect(() => {
    elapsedTime.current = 0;

    if (sourceMarker.current) {
      sourceMarker.current.visible = animating && sequenceAct === 0;
      sourceMarker.current.position.set(...sourcePosition);
      sourceMarker.current.position.y = 1.08;
      sourceMarker.current.scale.setScalar(1);
    }

    if (programmeMarker.current) {
      programmeMarker.current.visible = animating && sequenceAct === 1;
      programmeMarker.current.position.set(sourcePosition[0], 1.08, sourcePosition[2]);
    }

    branchMarkers.current.forEach((marker) => {
      if (!marker) return;
      marker.visible = animating && sequenceAct === 2;
      marker.position.set(programmePosition[0], 1.08, programmePosition[2]);
    });

    invalidate();
  }, [animating, invalidate, runToken, sequenceAct]);

  useFrame((_, delta) => {
    if (!animating) return;
    elapsedTime.current += Math.min(delta, 0.1);
    const progress = Math.min(elapsedTime.current / finiteMotionDurations[sequenceAct], 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    if (sequenceAct === 0 && sourceMarker.current) {
      const scale = 1 + Math.sin(progress * Math.PI) * 0.42;
      sourceMarker.current.scale.setScalar(scale);
      return;
    }

    if (sequenceAct === 1 && programmeMarker.current) {
      const position = lerpPosition(sourcePosition, programmePosition, eased);
      programmeMarker.current.position.set(position[0], 1.08, position[2]);
      return;
    }

    if (sequenceAct === 2) {
      branchMarkers.current.forEach((marker, index) => {
        if (!marker) return;
        const position = lerpPosition(programmePosition, modulePositions[index], eased);
        marker.position.set(position[0], 1.08, position[2]);
      });
    }
  });

  return (
    <>
      <group ref={sourceMarker} visible={false}>
        <FlowMarker />
      </group>
      <group ref={programmeMarker} visible={false}>
        <FlowMarker />
      </group>
      {modules.map((module, index) => (
        <group
          key={module.id}
          ref={(group) => {
            branchMarkers.current[index] = group;
          }}
          visible={false}
        >
          <FlowMarker />
        </group>
      ))}
    </>
  );
}

function Scene({
  animating,
  runToken,
  selectedId,
  sequenceAct,
  onSelect
}: Omit<Props, 'onReady' | 'onFailure'>) {
  const { size } = useThree();
  const modulesRevealed = sequenceAct === 2;

  return (
    <group position={[size.width > 900 ? 2.2 : 1.45, 0, 0]} rotation={[-0.08, 0, 0]}>
      <mesh position={[-1.35, -0.72, 0]}>
        <boxGeometry args={[9.85, 0.24, 4.35]} />
        <meshStandardMaterial color="#0a2627" metalness={0.58} roughness={0.4} />
      </mesh>
      <mesh position={[-1.35, -0.55, 0]}>
        <boxGeometry args={[9.35, 0.08, 3.85]} />
        <meshStandardMaterial color="#0e3434" metalness={0.42} roughness={0.52} />
      </mesh>

      <Connector from={sourcePosition} to={programmePosition} active={sequenceAct >= 1} />
      {modulePositions.map((position, index) => (
        <Connector key={modules[index].id} from={programmePosition} to={position} active={modulesRevealed} />
      ))}

      <SourceFoundation active={sequenceAct === 0} />
      <ProgrammeBoundary active={sequenceAct === 1} />
      {modules.map((module, index) => (
        <Station
          key={module.id}
          index={index}
          selectedId={selectedId}
          revealed={modulesRevealed}
          onSelect={onSelect}
        />
      ))}

      <FiniteFlow animating={animating} runToken={runToken} sequenceAct={sequenceAct} />
      <gridHelper args={[18, 28, '#125454', '#0a3031']} position={[-1.35, -0.4, 0]} />
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

export default function PathwayCanvas({
  animating,
  runToken,
  selectedId,
  sequenceAct,
  onReady,
  onFailure,
  onSelect
}: Props) {
  return (
    <Canvas
      camera={{ position: [0, 5.4, 10.4], fov: 43 }}
      dpr={[1, 1.65]}
      frameloop={animating ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#061a1a')}
    >
      <ambientLight intensity={0.68} />
      <directionalLight position={[4, 7, 6]} intensity={1.55} color="#d8fffb" />
      <pointLight position={[-5, 2, 3]} intensity={5} distance={10} color="#2db9ff" />
      <pointLight position={[4, 2, 2]} intensity={4} distance={9} color="#36d5a9" />
      <SceneLifecycle onReady={onReady} onFailure={onFailure} />
      <Scene
        animating={animating}
        runToken={runToken}
        selectedId={selectedId}
        sequenceAct={sequenceAct}
        onSelect={onSelect}
      />
    </Canvas>
  );
}
