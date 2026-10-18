"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { journey } from "@/lib/data";

/* ================================================================== */
/*  TasalaHQ 3D — a real head of HAIR, built procedurally.             */
/*                                                                     */
/*  The enky lesson, applied as technique (not copy): one hero 3D      */
/*  object that IS the subject — a head of hair — carried through      */
/*  the whole page, responding to drag, scroll and mouse.              */
/*                                                                     */
/*  Hair = ~120 "hair cards": bent planes with a canvas-painted        */
/*  strand texture, anchored on a mannequin head. Health morphs       */
/*  the hair from dry/frizzy (spread, dull, rough) to healthy          */
/*  (aligned, glossy, rich). All geometry is code — no binary          */
/*  model files, so the repo stays pushable as text.                   */
/* ================================================================== */

/* --------------------------- strand texture ------------------------ */
function makeStrandTexture(): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, 128, 512);
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * 128;
    const w = 0.6 + Math.random() * 1.8;
    const shade = 140 + Math.random() * 115;
    ctx.strokeStyle = `rgba(${shade},${shade},${shade},${0.35 + Math.random() * 0.55})`;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(x, -10);
    for (let y = 0; y <= 512; y += 32) {
      ctx.lineTo(x + Math.sin(y * 0.02 + i) * 3.5, y);
    }
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

/* --------------------------- hair state ---------------------------- */
type HairState = {
  color: string;
  highlight: string;
  roughness: number;
  spread: number; // 0 = sleek, 1 = frizzy / spread out
  volume: number; // card-group scale
};

const DRY_COLOR = new THREE.Color("#7d6f5e");
const HEALTHY_COLOR = new THREE.Color("#1c110a");
const DRY_HI = new THREE.Color("#9a8b76");
const HEALTHY_HI = new THREE.Color("#4a2c14");

function healthToState(health: number): HairState {
  return {
    color: `#${new THREE.Color().lerpColors(DRY_COLOR, HEALTHY_COLOR, health).getHexString()}`,
    highlight: `#${new THREE.Color().lerpColors(DRY_HI, HEALTHY_HI, health).getHexString()}`,
    roughness: THREE.MathUtils.lerp(0.95, 0.14, health),
    spread: (1 - health) * 1,
    volume: 1 + (1 - health) * 0.1,
  };
}

export type LabMode = "moisture" | "colour" | "strength";

export const LAB_MODES: Record<
  LabMode,
  { label: string; state: HairState; blurb: string; service: string }
> = {
  moisture: {
    label: "Moisture",
    state: { color: "#17100b", highlight: "#3a2416", roughness: 0.1, spread: 0, volume: 1 },
    blurb: "Deep moisture infusion — thirsty strands drink it in and go glossy.",
    service: "Healthy Hair Treatment",
  },
  colour: {
    label: "Colour",
    state: { color: "#7a2f16", highlight: "#c07a3e", roughness: 0.3, spread: 0.12, volume: 1.04 },
    blurb: "Dimensional colour, mixed for your skin tone, sealed with bond care.",
    service: "Colour & Highlights",
  },
  strength: {
    label: "Strength",
    state: { color: "#241407", highlight: "#c9a24b", roughness: 0.22, spread: 0.08, volume: 1.18 },
    blurb: "Protein rebuilt strand by strand — breakage stops, length stays.",
    service: "Reinforcer Protein Treatment",
  },
};

/* --------------------------- hair cards ---------------------------- */
type CardDef = {
  position: THREE.Vector3;
  healthyQ: THREE.Quaternion;
  dryQ: THREE.Quaternion;
  scale: number;
  highlight: boolean;
};

function buildCards(count: number): CardDef[] {
  const defs: CardDef[] = [];
  const up = new THREE.Vector3(0, 1, 0);
  let guard = 0;
  while (defs.length < count && guard < count * 40) {
    guard++;
    // Random point on the scalp (upper + back + sides of the head).
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(1 - Math.random() * 1.35); // 0 = crown → ~1.35 rad
    const p = new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta),
    );
    // Reject the face cone (front +Z, below the brow line).
    if (p.z > 0.45 && p.y < 0.55) continue;
    if (p.y < -0.35) continue;

    const anchor = p.clone().multiplyScalar(1.0);
    // Hair falls down + slightly outward.
    const fall = anchor.clone().multiplyScalar(0.4).add(new THREE.Vector3(0, -1, 0)).normalize();
    const zAxis = anchor.clone().normalize(); // card normal = outward
    const yAxis = fall.clone().negate().normalize(); // card +Y = up the strand
    const xAxis = new THREE.Vector3().crossVectors(yAxis, zAxis).normalize();
    const z2 = new THREE.Vector3().crossVectors(xAxis, yAxis).normalize();
    const m = new THREE.Matrix4().makeBasis(xAxis, yAxis, z2);
    const healthyQ = new THREE.Quaternion().setFromRotationMatrix(m);

    // Dry/frizzy pose = healthy pose + a random outward kick.
    const axis = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    const kick = new THREE.Quaternion().setFromAxisAngle(axis, 0.25 + Math.random() * 0.45);
    const dryQ = healthyQ.clone().multiply(kick);

    defs.push({
      position: anchor,
      healthyQ,
      dryQ,
      scale: 0.85 + Math.random() * 0.5,
      highlight: Math.random() < 0.28,
    });
  }
  return defs;
}

function bentCardGeometry(): THREE.BufferGeometry {
  const geo = new THREE.PlaneGeometry(0.34, 1.75, 1, 10);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const v = (0.875 - y) / 1.75; // 0 = root, 1 = tip
    const bow = Math.sin(v * Math.PI * 1.15) * 0.1 + v * v * 0.3;
    const wave = Math.sin(v * Math.PI * 2.6) * 0.045;
    pos.setZ(i, bow);
    pos.setX(i, pos.getX(i) + wave);
  }
  geo.translate(0, -0.875, 0); // origin at the root, hair hangs down -Y
  geo.computeVertexNormals();
  return geo;
}

/* ----------------------------- HairHead ---------------------------- */
function HairHead({
  healthRef,
  mode,
  turntable = false,
  reducedMotion = false,
}: {
  healthRef?: React.MutableRefObject<number>;
  mode?: LabMode;
  turntable?: boolean;
  reducedMotion?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const cardRefs = useRef<(THREE.Mesh | null)[]>([]);

  const texture = useMemo(() => makeStrandTexture(), []);
  const geometry = useMemo(() => bentCardGeometry(), []);
  const cards = useMemo(() => buildCards(120), []);

  // Two SHARED materials — every card uses one of these, so the morph
  // (colour / roughness) updates all hair at once.
  const baseMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: texture,
        alphaMap: texture,
        alphaTest: 0.38,
        side: THREE.DoubleSide,
        roughness: 0.9,
      }),
    [texture],
  );
  const hiMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: texture,
        alphaMap: texture,
        alphaTest: 0.38,
        side: THREE.DoubleSide,
        roughness: 0.9,
      }),
    [texture],
  );
  useEffect(() => {
    // Dispose the shared materials when the component unmounts.
    return () => {
      baseMat.dispose();
      hiMat.dispose();
      texture.dispose();
      geometry.dispose();
    };
  }, [baseMat, hiMat, texture, geometry]);

  const cur = useRef({
    color: new THREE.Color("#7d6f5e"),
    highlight: new THREE.Color("#9a8b76"),
    roughness: 0.9,
    spread: 1,
    volume: 1.05,
  });
  const tmpColor = useRef(new THREE.Color());
  const tmpHi = useRef(new THREE.Color());
  const tmpQ = useRef(new THREE.Quaternion());

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const desired: HairState = mode
      ? LAB_MODES[mode].state
      : healthToState(healthRef ? healthRef.current : 1);
    const k = 1 - Math.pow(0.0005, dt); // smooth exponential approach
    const c = cur.current;
    c.color.lerp(tmpColor.current.set(desired.color), k);
    c.highlight.lerp(tmpHi.current.set(desired.highlight), k);
    c.roughness += (desired.roughness - c.roughness) * k;
    c.spread += (desired.spread - c.spread) * k;
    c.volume += (desired.volume - c.volume) * k;

    if (baseMat) {
      baseMat.color.copy(c.color);
      baseMat.roughness = c.roughness;
    }
    if (hiMat) {
      hiMat.color.copy(c.highlight);
      hiMat.roughness = c.roughness;
    }

    // Per-card morph: slerp between sleek and frizzy poses.
    for (let i = 0; i < cards.length; i++) {
      const mesh = cardRefs.current[i];
      if (!mesh) continue;
      mesh.quaternion.slerpQuaternions(cards[i].healthyQ, cards[i].dryQ, c.spread);
      if (!reducedMotion) {
        // Gentle sway — each card breathes a little.
        const sway = Math.sin(t * 0.9 + i * 0.7) * 0.02 * (0.4 + c.spread);
        mesh.rotateZ(sway * 0.2);
      }
    }

    if (group.current) {
      group.current.scale.setScalar(c.volume * 0.98);
      if (turntable && !reducedMotion) group.current.rotation.y += dt * 0.25;
    }
  });

  return (
    <group ref={group}>
      {/* Mannequin bust — faceless, so the hair is the star */}
      <group scale={[0.92, 1.08, 0.95]}>
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial color="#e9d9c6" roughness={0.55} />
        </mesh>
        <mesh position={[0, -1.15, 0]}>
          <cylinderGeometry args={[0.34, 0.42, 0.9, 32]} />
          <meshStandardMaterial color="#e9d9c6" roughness={0.55} />
        </mesh>
        <mesh position={[0, -1.62, 0]} scale={[1.7, 0.5, 0.95]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#e9d9c6" roughness={0.6} />
        </mesh>
      </group>

      {/* Hair cards — all share the two morphing materials */}
      <group scale={[0.92, 1.08, 0.95]}>
        {cards.map((card, i) => (
          <mesh
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            geometry={geometry}
            material={card.highlight ? hiMat : baseMat}
            position={card.position}
            quaternion={card.healthyQ}
            scale={card.scale}
          />
        ))}
      </group>
    </group>
  );
}

/* ------------------------------ lights ------------------------------ */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.7} color="#fff3d6" />
      <directionalLight position={[-5, 2, -3]} intensity={0.8} color="#9fd1bc" />
      <pointLight position={[0, -2, 4]} intensity={10} color="#c96f4a" />
    </>
  );
}

function GoldDust({ count = 110 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
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
      <pointsMaterial size={0.045} color="#e4c67f" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ---------------- HERO: full head of hair, drag to rotate ----------- */
export function HeroCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 5.6], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Lights />
      <HairHead reducedMotion={reducedMotion} />
      <GoldDust />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.7}
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
        target={[0, -0.1, 0]}
      />
    </Canvas>
  );
}

/* ------------- JOURNEY: scroll orbits the head, hair heals --------- */
function JourneyScene({
  progressRef,
  reducedMotion,
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  useFrame(({ camera }) => {
    const p = reducedMotion ? 1 : progressRef.current;
    const angle = p * Math.PI * 1.4;
    const radius = THREE.MathUtils.lerp(6.4, 4.4, p);
    camera.position.set(
      Math.sin(angle) * radius,
      THREE.MathUtils.lerp(0.9, 0.1, p),
      Math.cos(angle) * radius,
    );
    camera.lookAt(0, -0.1, 0);
  });
  return (
    <>
      <Lights />
      <HairHead healthRef={progressRef} reducedMotion={reducedMotion} />
      <GoldDust count={70} />
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
      camera={{ position: [0, 0.9, 6.4], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <JourneyScene progressRef={progressRef} reducedMotion={reducedMotion} />
    </Canvas>
  );
}

/* ------------- COMPARE: drag the slider, hair transforms ------------ */
export function CompareCanvas({
  healthRef,
  reducedMotion,
}: {
  healthRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.2], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Lights />
      <HairHead healthRef={healthRef} turntable reducedMotion={reducedMotion} />
      <GoldDust count={60} />
    </Canvas>
  );
}

/* ---------------- LAB: treatment switcher on the same head --------- */
function LabScene({ mode, reducedMotion }: { mode: LabMode; reducedMotion: boolean }) {
  return (
    <>
      <Lights />
      <HairHead mode={mode} reducedMotion={reducedMotion} />
      <GoldDust count={70} />
    </>
  );
}

export function LabCanvas({ mode, reducedMotion }: { mode: LabMode; reducedMotion: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.2], fov: 40 }}
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
        minPolarAngle={Math.PI * 0.3}
        maxPolarAngle={Math.PI * 0.7}
        target={[0, -0.1, 0]}
      />
    </Canvas>
  );
}

export const JOURNEY_COUNT = journey.length;
