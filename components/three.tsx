"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { journey } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Shared: a flowing hair-strand coil, built procedurally.            */
/*  No external GLB — the geometry is a tube along a helix curve,      */
/*  which keeps the hero scene far under the 2 MB budget.              */
/* ------------------------------------------------------------------ */

function helixPoints(
  turns: number,
  radius: number,
  height: number,
  segments = 220,
  wobble = 0.18,
): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const a = t * Math.PI * 2 * turns;
    const r = radius * (1 + wobble * Math.sin(t * Math.PI * 3));
    pts.push(
      new THREE.Vector3(
        Math.cos(a) * r,
        (t - 0.5) * height,
        Math.sin(a) * r,
      ),
    );
  }
  return pts;
}

function Coil({
  turns = 3.2,
  radius = 1.35,
  height = 4.6,
  tube = 0.16,
  color = "#c9a24b",
  roughness = 0.25,
  metalness = 0.15,
  emissive = "#000000",
  emissiveIntensity = 0,
  materialRef,
}: {
  turns?: number;
  radius?: number;
  height?: number;
  tube?: number;
  color?: string;
  roughness?: number;
  metalness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  materialRef?: React.RefObject<THREE.MeshPhysicalMaterial | null>;
}) {
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      helixPoints(turns, radius, height),
    );
    return new THREE.TubeGeometry(curve, 320, tube, 24, false);
  }, [turns, radius, height, tube]);

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        ref={materialRef}
        color={color}
        roughness={roughness}
        metalness={metalness}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        clearcoat={0.9}
        clearcoatRoughness={0.25}
      />
    </mesh>
  );
}

function Particles({ count = 140 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, [count]);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#e4c67f"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#fff3d6" />
      <directionalLight position={[-5, 2, -3]} intensity={0.7} color="#9fd1bc" />
      <pointLight position={[0, -3, 4]} intensity={8} color="#c96f4a" />
    </>
  );
}

/* ---------------- HERO: golden coil, slow idle rotation ------------- */
function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  useFrame((state, dt) => {
    if (!group.current) return;
    if (!reducedMotion) {
      group.current.rotation.y += dt * 0.18;
      const { x, y } = state.pointer;
      mouse.current.x += (x - mouse.current.x) * 0.04;
      mouse.current.y += (y - mouse.current.y) * 0.04;
      group.current.rotation.x = mouse.current.y * 0.25;
      group.current.rotation.z = mouse.current.x * 0.12;
    }
  });
  return (
    <>
      <Lights />
      <group ref={group} position={[0.6, 0, 0]} rotation={[0.15, 0, 0.1]}>
        <Coil turns={3.4} radius={1.5} height={4.8} tube={0.17} color="#c9a24b" roughness={0.22} />
        <Coil turns={2.6} radius={1.05} height={4.2} tube={0.1} color="#9fd1bc" roughness={0.15} />
      </group>
      <Particles count={130} />
    </>
  );
}

export function HeroCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 6.4], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <HeroScene reducedMotion={reducedMotion} />
    </Canvas>
  );
}

/* ------------- JOURNEY: scroll-scrubbed camera + morph ------------- */
const DULL = new THREE.Color("#6b6257");
const GLOSSY = new THREE.Color("#c9a24b");

function JourneyScene({
  progressRef,
  reducedMotion,
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const cam = useRef<THREE.PerspectiveCamera>(null);
  const tmp = useRef(new THREE.Color());

  useFrame(({ camera }) => {
    const p = reducedMotion ? 1 : progressRef.current;
    if (mat.current) {
      mat.current.color.copy(tmp.current.lerpColors(DULL, GLOSSY, p));
      mat.current.roughness = THREE.MathUtils.lerp(0.95, 0.12, p);
      mat.current.clearcoat = THREE.MathUtils.lerp(0.1, 1, p);
    }
    // Camera dolly: starts wide + low, ends close + high, orbiting gently.
    const a = p * Math.PI * 0.9;
    const radius = THREE.MathUtils.lerp(7.2, 4.6, p);
    camera.position.set(Math.sin(a) * radius, THREE.MathUtils.lerp(-1.6, 1.2, p), Math.cos(a) * radius);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Lights />
      <Coil
        turns={4.2}
        radius={1.5}
        height={5.2}
        tube={0.2}
        color="#6b6257"
        roughness={0.95}
        materialRef={mat}
      />
      <Particles count={80} />
    </>
  );
}

export function JourneyCanvas({
  progressRef,
  reducedMotion,
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, -1.6, 7.2], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <JourneyScene progressRef={progressRef} reducedMotion={reducedMotion} />
    </Canvas>
  );
}

/* ---------------- LAB: interactive viewer --------------------------- */
export type LabMode = "moisture" | "colour" | "strength";

export const LAB_MODES: Record<
  LabMode,
  { label: string; color: string; roughness: number; emissive: string; blurb: string; service: string }
> = {
  moisture: {
    label: "Moisture",
    color: "#7fd1b9",
    roughness: 0.08,
    emissive: "#1d5c40",
    blurb: "Deep moisture infusion — thirsty strands drink it in and go glossy.",
    service: "Healthy Hair Treatment",
  },
  colour: {
    label: "Colour",
    color: "#c96f4a",
    roughness: 0.28,
    emissive: "#3a1206",
    blurb: "Dimensional colour, mixed for your skin tone, sealed with bond care.",
    service: "Colour & Highlights",
  },
  strength: {
    label: "Strength",
    color: "#e4c67f",
    roughness: 0.35,
    emissive: "#4a3a10",
    blurb: "Protein rebuilt strand by strand — breakage stops, length stays.",
    service: "Reinforcer Protein Treatment",
  },
};

function LabScene({ mode, reducedMotion }: { mode: LabMode; reducedMotion: boolean }) {
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const target = useRef(new THREE.Color(LAB_MODES[mode].color));
  const targetEmissive = useRef(new THREE.Color(LAB_MODES[mode].emissive));

  useFrame((_, dt) => {
    const cfg = LAB_MODES[mode];
    target.current.set(cfg.color);
    targetEmissive.current.set(cfg.emissive);
    if (mat.current) {
      mat.current.color.lerp(target.current, 1 - Math.pow(0.001, dt));
      mat.current.emissive.lerp(targetEmissive.current, 1 - Math.pow(0.001, dt));
      mat.current.roughness += (cfg.roughness - mat.current.roughness) * (1 - Math.pow(0.001, dt));
    }
    if (group.current && !reducedMotion) {
      group.current.rotation.y += dt * 0.12;
    }
  });

  return (
    <>
      <Lights />
      <group ref={group}>
        <Coil
          turns={3.6}
          radius={1.4}
          height={4.4}
          tube={0.19}
          color={LAB_MODES[mode].color}
          roughness={LAB_MODES[mode].roughness}
          metalness={0.2}
          emissive={LAB_MODES[mode].emissive}
          emissiveIntensity={0.35}
          materialRef={mat}
        />
      </group>
      <Particles count={70} />
    </>
  );
}

export function LabCanvas({ mode, reducedMotion }: { mode: LabMode; reducedMotion: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <LabScene mode={mode} reducedMotion={reducedMotion} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
      />
    </Canvas>
  );
}

/* Keep the journey stage count in sync for the pinned section. */
export const JOURNEY_COUNT = journey.length;
