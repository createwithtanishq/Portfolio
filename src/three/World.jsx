/*
  The spatial world: one hand-built scene the camera travels across, lit like a product shot.
  Champagne metal, ivory stone and onyx, nothing else. Each station is drawn from a real piece of work:
  - bracket:    the 16-player double-elimination bracket from the Tekken 8 system
  - jam:        Hackabury 2026 (29 team tables, 107 students, 22 judges)
  - creators:   short-form creator screens (brand and creator campaigns)
  - pathways:   the dissertation census (22 programmes across 15 providers)
  - pillars:    the six-pillar model for sustainable esports organisations
  - principles: the four principles of the Indian ecosystem blueprint
  - conditions: the three core conditions of the mental performance standard
  - flant:      Aura-7, the bioluminescent world of FLANT
  - final:      the podium, with the top step left open
  No models or textures are loaded: everything is geometry and light.
*/
import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const GAP = 44;
const ORDER = ['bracket', 'jam', 'creators', 'pathways', 'pillars', 'principles', 'conditions', 'flant', 'final'];
const STATIONS = Object.fromEntries(ORDER.map((id, i) => [id, { x: i * GAP }]));

/* Camera position and aim for each station, tuned for a 16:9 view; narrower views pull back. */
const VIEW = {
  bracket: { cam: [-0.4, 10.6, 12.6], look: [-0.5, 0, -0.3] },
  jam: { cam: [0, 10.2, 12.4], look: [0, 0, -0.6] },
  creators: { cam: [0, 2.9, 9.6], look: [0, 1.6, 0] },
  pathways: { cam: [0, 8, 13.6], look: [0, 0.9, 0] },
  pillars: { cam: [0, 3.8, 12.2], look: [0, 1.9, 0] },
  principles: { cam: [6.4, 7.6, 8.8], look: [0, 0.8, 0] },
  conditions: { cam: [0, 1.7, 9], look: [0, 1.7, 0] },
  flant: { cam: [0, 5.4, 12.8], look: [0, 0.8, 0] },
  final: { cam: [0, 4.6, 12.4], look: [0, 1.5, 0] },
};

/* Where the subject sits inside the view (fractions of width and height) and how far back the camera stands. */
const COMPOSE = {
  center: () => [0.5, 0.5, 0.6],
  hero: (aspect) => (aspect >= 1 ? [0.7, 0.34, 1.62] : [0.5, 0.25, 1.0]),
  card: (aspect) => (aspect >= 1.15 ? [0.36, 0.5, 1.05] : [0.5, 0.42, 0.8]),
};

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* ---------- shared helpers ---------- */
const tmp = new THREE.Object3D();

function place(mesh, items, i, dy = 0, k = null) {
  const it = items[i];
  tmp.position.set(it.p[0], it.p[1] + dy, it.p[2]);
  tmp.rotation.set(...(it.r || [0, 0, 0]));
  if (k) tmp.scale.set(k, k, k);
  else tmp.scale.set(...(it.s || [1, 1, 1]));
  tmp.updateMatrix();
  mesh.setMatrixAt(i, tmp.matrix);
}

function Boxes({ items, material, geo = [1, 1, 1], animate }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    items.forEach((_, i) => place(ref.current, items, i));
    ref.current.instanceMatrix.needsUpdate = true;
  }, [items]);
  useFrame((state) => {
    if (!animate || !ref.current) return;
    const t = state.clock.elapsedTime;
    items.forEach((it, i) => place(ref.current, items, i, animate(t, i, it)));
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, material, items.length]} frustumCulled={false}>
      <boxGeometry args={geo} />
    </instancedMesh>
  );
}

/* ---------- stations ---------- */

/* 16-player double elimination: winners 8-4-2-1, losers 4-4-2-2-1-1, grand final. */
function Bracket({ m, motion }) {
  const { winners, losers, links } = useMemo(() => {
    const w = [];
    const lo = [];
    const l = [];
    const W = [8, 4, 2, 1];
    const L = [4, 4, 2, 2, 1, 1];
    const wPos = W.map((count, r) => Array.from({ length: count }, (_, i) => [-6.4 + r * 2.7, -4.4 + ((i + 0.5) * 4.2) / count]));
    const lPos = L.map((count, r) => Array.from({ length: count }, (_, i) => [-6.4 + r * 1.85, 0.9 + ((i + 0.5) * 3.2) / count]));
    const seg = (x1, z1, x2, z2) => {
      const mx = (x1 + x2) / 2;
      l.push({ p: [(x1 + mx) / 2, 0.05, z1], s: [Math.max(0.001, Math.abs(mx - x1)), 1, 1] });
      l.push({ p: [mx, 0.05, (z1 + z2) / 2], s: [Math.max(0.001, Math.abs(z2 - z1) + 0.06), 1, 1], r: [0, Math.PI / 2, 0] });
      l.push({ p: [(mx + x2) / 2, 0.05, z2], s: [Math.max(0.001, Math.abs(x2 - mx)), 1, 1] });
    };
    wPos.forEach((round, r) => round.forEach(([x, z], i) => {
      w.push({ p: [x, 0.15, z] });
      if (r < W.length - 1) { const [nx, nz] = wPos[r + 1][Math.floor(i / 2)]; seg(x + 0.55, z, nx - 0.55, nz); }
    }));
    lPos.forEach((round, r) => round.forEach(([x, z], i) => {
      lo.push({ p: [x, 0.13, z] });
      if (r < L.length - 1) {
        const next = lPos[r + 1];
        const [nx, nz] = next[next.length === round.length ? i : Math.floor(i / 2)];
        seg(x + 0.5, z, nx - 0.5, nz);
      }
    }));
    const gf = [4.9, -0.6];
    seg(wPos[3][0][0] + 0.55, wPos[3][0][1], gf[0] - 0.7, gf[1]);
    seg(lPos[5][0][0] + 0.5, lPos[5][0][1], gf[0] - 0.7, gf[1]);
    return { winners: w, losers: lo, links: l };
  }, []);
  const wave = motion ? (t, i, it) => Math.max(0, Math.sin(t * 1.3 - it.p[0] * 0.55)) * 0.1 : null;
  return (
    <group>
      <Boxes items={winners} material={m.ivory} geo={[1.1, 0.26, 0.42]} animate={wave} />
      <Boxes items={losers} material={m.dim} geo={[1.0, 0.22, 0.34]} animate={wave} />
      <Boxes items={links} material={m.metal} geo={[1, 0.05, 0.05]} />
      <mesh position={[4.9, 0.5, -0.6]} material={m.metal}><boxGeometry args={[1.4, 1, 1.4]} /></mesh>
      <mesh position={[4.9, 1.6, -0.6]} material={m.metal}><cylinderGeometry args={[0.46, 0.16, 1.2, 32]} /></mesh>
    </group>
  );
}

/* Hackabury 2026: 29 team tables, 107 students, 22 judges. */
function Jam({ m, motion }) {
  const { tables, students, judges } = useMemo(() => {
    const r = rng(29);
    const t = [];
    const s = [];
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 6; col++) {
        if (t.length === 29) break;
        t.push({ p: [-4.75 + col * 1.9, 0.25, -3.4 + row * 1.6] });
      }
    }
    t.forEach((tb, i) => {
      const seats = i < 20 ? 4 : 3; // 20 × 4 + 9 × 3 = 107
      for (let k = 0; k < seats; k++) {
        const side = k % 2 ? 1 : -1;
        const along = k < 2 ? -0.32 : 0.32;
        s.push({ p: [tb.p[0] + along, 0.62, tb.p[2] + side * 0.56], ph: r() * 6 });
      }
    });
    const j = Array.from({ length: 22 }, (_, i) => ({ p: [-6.3 + i * 0.6, 0.75, -5.1] }));
    return { tables: t, students: s, judges: j };
  }, []);
  const bob = motion ? (t, i, it) => Math.max(0, Math.sin(t * 1.8 + it.ph)) * 0.14 : null;
  return (
    <group>
      <Boxes items={tables} material={m.dim} geo={[1.3, 0.5, 0.8]} />
      <Boxes items={students} material={m.ivory} geo={[0.22, 0.22, 0.22]} animate={bob} />
      <Boxes items={judges} material={m.metal} geo={[0.2, 1.5, 0.2]} />
    </group>
  );
}

/* Creator screens: seven 9:16 slabs on an arc. */
function Creators({ m, motion }) {
  const group = useRef(null);
  const slabs = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const a = (i - 3) * 0.36;
    return { x: Math.sin(a) * 4.6, z: -Math.cos(a) * 4.6 + 3.4, ry: -a, y: 1.5 + (i % 2) * 0.35 };
  }), []);
  useFrame((state) => {
    if (!motion || !group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.22) * 0.16;
    group.current.children.forEach((ch, i) => { ch.position.y = slabs[i].y + Math.sin(t * 0.9 + i) * 0.1; });
  });
  return (
    <group ref={group}>
      {slabs.map((sl, i) => (
        <group key={i} position={[sl.x, sl.y, sl.z]} rotation={[0, sl.ry, 0]}>
          <mesh material={i === 3 ? m.metal : m.dim}><boxGeometry args={[1.05, 1.9, 0.09]} /></mesh>
          <mesh position={[0, 0.02, 0.05]} material={i === 3 ? m.glow : m.screen}><planeGeometry args={[0.9, 1.6]} /></mesh>
        </group>
      ))}
    </group>
  );
}

/* The dissertation census: 22 programmes across 15 providers (7 providers with two, 8 with one). */
function Pathways({ m, motion }) {
  const { pairs, singles } = useMemo(() => {
    const r = rng(22);
    const a = [];
    const b = [];
    const sizes = [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2];
    sizes.forEach((n, k) => {
      const cx = -5.2 + (k % 5) * 2.6;
      const cz = -2.4 + Math.floor(k / 5) * 2.2;
      for (let i = 0; i < n; i++) {
        const h = 0.6 + r() * 2.2;
        (n === 2 ? a : b).push({ p: [cx + (n === 2 ? (i ? 0.36 : -0.36) : 0), h / 2, cz], s: [1, h, 1], ph: r() * 6 });
      }
    });
    return { pairs: a, singles: b };
  }, []);
  const breathe = motion ? (t, i, it) => Math.sin(t * 0.8 + it.ph) * 0.05 : null;
  return (
    <group>
      <Boxes items={pairs} material={m.metal} geo={[0.5, 1, 0.5]} animate={breathe} />
      <Boxes items={singles} material={m.ivory} geo={[0.5, 1, 0.5]} animate={breathe} />
    </group>
  );
}

/* Six pillars holding up one slab. */
function Pillars({ m, motion }) {
  const slab = useRef(null);
  useFrame((state) => {
    if (!motion || !slab.current) return;
    slab.current.position.y = 3.55 + Math.sin(state.clock.elapsedTime * 0.7) * 0.04;
  });
  return (
    <group>
      <mesh position={[0, 0.15, 0]} material={m.dim}><boxGeometry args={[11, 0.3, 2.6]} /></mesh>
      <mesh position={[0, 0.42, 0]} material={m.dim}><boxGeometry args={[10.2, 0.24, 2.1]} /></mesh>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[-4.2 + i * 1.68, 1.95, 0]} material={m.ivory}>
          <cylinderGeometry args={[0.34, 0.38, 2.8, 40]} />
        </mesh>
      ))}
      <mesh ref={slab} position={[0, 3.55, 0]} material={m.metal}><boxGeometry args={[10.6, 0.4, 2.2]} /></mesh>
    </group>
  );
}

/* Four principles as four blocks of one organisation. */
function Principles({ m, motion }) {
  const g = useRef(null);
  useFrame((state) => {
    if (!motion || !g.current) return;
    g.current.rotation.y = state.clock.elapsedTime * 0.1;
  });
  const blocks = [
    { p: [-1.1, 0, -1.1], h: 1.4 },
    { p: [1.1, 0, -1.1], h: 2.2 },
    { p: [-1.1, 0, 1.1], h: 1.8 },
    { p: [1.1, 0, 1.1], h: 2.6 },
  ];
  return (
    <group ref={g}>
      <mesh position={[0, 0.12, 0]} material={m.dim}><boxGeometry args={[5, 0.24, 5]} /></mesh>
      {blocks.map((b, i) => (
        <mesh key={i} position={[b.p[0], 0.24 + b.h / 2, b.p[2]]} material={i === 3 ? m.metal : m.ivory}>
          <boxGeometry args={[1.8, b.h, 1.8]} />
        </mesh>
      ))}
    </group>
  );
}

/* Three conditions: readiness, alignment, decision clarity. The rings drift and fall into line. */
function Conditions({ m, motion }) {
  const rings = useRef([]);
  useFrame((state) => {
    if (!motion) return;
    const t = state.clock.elapsedTime;
    const spread = 0.5 + 0.5 * Math.sin(t * 0.3);
    rings.current.forEach((r, i) => {
      if (!r) return;
      r.rotation.x = Math.sin(t * 0.6 + i * 2.1) * 0.9 * spread;
      r.rotation.y = Math.cos(t * 0.45 + i * 1.3) * 0.7 * spread;
    });
  });
  return (
    <group position={[0, 1.7, 0]}>
      {[1.1, 1.75, 2.4].map((r, i) => (
        <mesh key={i} ref={(el) => { rings.current[i] = el; }} material={i === 1 ? m.ivory : m.metal}>
          <torusGeometry args={[r, 0.08, 24, 120]} />
        </mesh>
      ))}
      <mesh material={m.glow}><sphereGeometry args={[0.3, 32, 24]} /></mesh>
    </group>
  );
}

/* Aura-7: bioluminescent plants on a low mound. */
function Flant({ m, motion }) {
  const { stems, buds } = useMemo(() => {
    const r = rng(7);
    const s = [];
    const b = [];
    for (let i = 0; i < 46; i++) {
      const a = r() * Math.PI * 2;
      const d = Math.sqrt(r()) * 5.2;
      const h = 0.5 + r() * 1.9;
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d * 0.62;
      s.push({ p: [x, h / 2 + 0.25, z], s: [1, h, 1] });
      b.push({ p: [x, h + 0.38, z], ph: r() * 6, k: 0.6 + r() * 0.9 });
    }
    return { stems: s, buds: b };
  }, []);
  const budsRef = useRef(null);
  useLayoutEffect(() => {
    if (!budsRef.current) return;
    buds.forEach((x, i) => place(budsRef.current, buds, i, 0, x.k));
    budsRef.current.instanceMatrix.needsUpdate = true;
  }, [buds]);
  useFrame((state) => {
    if (!motion || !budsRef.current) return;
    const t = state.clock.elapsedTime;
    buds.forEach((x, i) => place(budsRef.current, buds, i, 0, x.k * (0.85 + 0.22 * Math.sin(t * 1.2 + x.ph))));
    budsRef.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <group>
      <mesh position={[0, -1.6, 0]} scale={[6.4, 1.9, 4.2]} material={m.dim}><sphereGeometry args={[1, 48, 24]} /></mesh>
      <Boxes items={stems} material={m.dim} geo={[0.06, 1, 0.06]} />
      <instancedMesh ref={budsRef} args={[undefined, m.glow, buds.length]} frustumCulled={false}>
        <icosahedronGeometry args={[0.2, 1]} />
      </instancedMesh>
    </group>
  );
}

/* The podium, with the top step left open. */
function Final({ m, motion }) {
  const ring = useRef(null);
  useFrame((state) => {
    if (!motion || !ring.current) return;
    const t = state.clock.elapsedTime;
    ring.current.rotation.z = t * 0.5;
    ring.current.position.y = 3.6 + Math.sin(t * 1.1) * 0.1;
  });
  return (
    <group>
      <mesh position={[-2.1, 0.6, 0]} material={m.dim}><boxGeometry args={[2, 1.2, 2]} /></mesh>
      <mesh position={[0, 0.95, 0]} material={m.ivory}><boxGeometry args={[2.1, 1.9, 2.1]} /></mesh>
      <mesh position={[2.1, 0.45, 0]} material={m.dim}><boxGeometry args={[2, 0.9, 2]} /></mesh>
      <mesh ref={ring} position={[0, 3.6, 0]} rotation={[Math.PI / 2.4, 0, 0]} material={m.metal}>
        <torusGeometry args={[0.8, 0.07, 24, 96]} />
      </mesh>
    </group>
  );
}

const BUILD = { bracket: Bracket, jam: Jam, creators: Creators, pathways: Pathways, pillars: Pillars, principles: Principles, conditions: Conditions, flant: Flant, final: Final };

/* ---------- materials: champagne metal, ivory stone, onyx ---------- */
function useMaterials(colors) {
  const mats = useMemo(() => ({
    metal: new THREE.MeshStandardMaterial({ color: colors.accent, metalness: 0.92, roughness: 0.26 }),
    ivory: new THREE.MeshStandardMaterial({ color: colors.ink, metalness: 0, roughness: 0.48 }),
    dim: new THREE.MeshStandardMaterial({ color: colors.dim, metalness: 0.1, roughness: 0.7 }),
    screen: new THREE.MeshBasicMaterial({ color: colors.ink, toneMapped: false }),
    glow: new THREE.MeshBasicMaterial({ color: colors.accent, toneMapped: false }),
    floor: new THREE.MeshStandardMaterial({ color: colors.floor, metalness: 0, roughness: 1 }),
  }), [colors.accent, colors.ink, colors.dim, colors.floor]);
  useEffect(() => () => Object.values(mats).forEach((x) => x.dispose()), [mats]);
  return mats;
}

/* ---------- camera that travels between stations ---------- */
function Rig({ station, motion, compose }) {
  const get = useThree((s) => s.get);
  const invalidate = useThree((s) => s.invalidate);
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const look = useRef(new THREE.Vector3());
  const goalPos = useMemo(() => new THREE.Vector3(), []);
  const goalLook = useMemo(() => new THREE.Vector3(), []);
  const first = useRef(true);

  useEffect(() => {
    const base = STATIONS[station] ?? STATIONS.bracket;
    const v = VIEW[station] ?? VIEW.bracket;
    const aspect = width / Math.max(1, height);
    const [cx, cy, zoom] = (COMPOSE[compose] ?? COMPOSE.center)(aspect);
    const pull = Math.max(1, Math.pow(1.78 / aspect, 0.85)) * zoom;
    goalLook.set(base.x + v.look[0], v.look[1], v.look[2]);
    goalPos.set(
      goalLook.x + (v.cam[0] - v.look[0]) * pull,
      v.look[1] + (v.cam[1] - v.look[1]) * pull,
      v.look[2] + (v.cam[2] - v.look[2]) * pull
    );
    const { scene, camera } = get();
    const key = scene.getObjectByName('key');
    if (key) {
      key.position.set(goalLook.x + 6, 11, goalLook.z + 7);
      key.target.position.copy(goalLook);
      key.target.updateMatrixWorld();
    }
    const dist = goalPos.distanceTo(goalLook);
    if (scene.fog) { scene.fog.near = dist * 0.85; scene.fog.far = dist * 2.3; }
    camera.far = dist * 3;

    /* The camera is managed here so the view offset and aspect stay in step on resize. */
    camera.manual = true;
    if (cx === 0.5 && cy === 0.5) {
      camera.clearViewOffset();
      camera.aspect = width / Math.max(1, height);
    } else {
      const fw = width * 2 * Math.max(cx, 1 - cx);
      const fh = height * 2 * Math.max(cy, 1 - cy);
      camera.setViewOffset(fw, fh, fw / 2 - cx * width, fh / 2 - cy * height, width, height);
      camera.aspect = fw / fh;
    }
    camera.updateProjectionMatrix();

    if (first.current || !motion) {
      camera.position.copy(goalPos);
      look.current.copy(goalLook);
      camera.lookAt(look.current);
      first.current = false;
    }
    invalidate();
  }, [station, motion, compose, get, goalPos, goalLook, invalidate, width, height]);

  useFrame((state, dt) => {
    if (!motion) return;
    const k = 1 - Math.exp(-Math.min(dt, 0.05) * 2.2);
    const cam = state.camera;
    cam.position.x += (goalPos.x + state.pointer.x * 0.6 - cam.position.x) * k;
    cam.position.y += (goalPos.y + state.pointer.y * 0.3 - cam.position.y) * k;
    cam.position.z += (goalPos.z - cam.position.z) * k;
    look.current.lerp(goalLook, k);
    cam.lookAt(look.current);
  });
  return null;
}

/* Drops the pixel ratio on devices that can't hold a smooth frame rate. */
function AdaptiveQuality() {
  const setDpr = useThree((s) => s.setDpr);
  const frames = useRef({ n: 0, t: 0, done: false });
  useFrame((_, dt) => {
    const f = frames.current;
    if (f.done) return;
    f.n += 1;
    if (f.n > 5) f.t += dt;
    if (f.n === 50) {
      f.done = true;
      if (f.t / 45 > 0.034) setDpr(1);
    }
  });
  return null;
}

function Scene({ station, motion, colors, compose, shadows }) {
  const get = useThree((s) => s.get);
  const m = useMaterials(colors);
  const floor = useRef(null);

  /* Soft shadows ground every object on the floor (wide screens with a fine pointer only). */
  useEffect(() => {
    if (!shadows) return;
    const { scene, invalidate } = get();
    scene.traverse((o) => {
      if (!o.isMesh) return;
      const isFloor = o === floor.current;
      o.receiveShadow = isFloor;
      o.castShadow = !isFloor && o.material !== m.glow && o.material !== m.screen;
    });
    invalidate();
  }, [get, shadows, m]);

  useLayoutEffect(() => {
    const { scene, invalidate } = get();
    scene.background = new THREE.Color(colors.bg);
    scene.fog = new THREE.Fog(colors.bg, 14, 36);
    invalidate();
  }, [get, colors.bg]);

  /* A neutral studio environment gives the metal its reflections. */
  useEffect(() => {
    const { gl, scene, invalidate } = get();
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    invalidate();
    return () => { scene.environment = null; env.dispose(); pmrem.dispose(); room.dispose?.(); };
  }, [get]);

  return (
    <>
      <hemisphereLight args={[colors.ink, colors.bg, 0.2]} />
      <directionalLight
        name="key"
        position={[6, 11, 7]}
        intensity={1.9}
        color={colors.ink}
        castShadow={shadows}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
        shadow-radius={6}
        shadow-camera-left={-11}
        shadow-camera-right={11}
        shadow-camera-top={11}
        shadow-camera-bottom={-11}
        shadow-camera-near={1}
        shadow-camera-far={40}
      />
      <pointLight position={[-6, 4, -6]} intensity={40} distance={30} color={colors.accent} />
      <mesh ref={floor} rotation={[-Math.PI / 2, 0, 0]} position={[(ORDER.length - 1) * GAP / 2, 0, 0]} material={m.floor}>
        <planeGeometry args={[ORDER.length * GAP + 80, 90]} />
      </mesh>
      {ORDER.map((id) => {
        const Build = BUILD[id];
        return (
          <group key={id} position={[STATIONS[id].x, 0, 0]}>
            <Build m={m} motion={motion} />
          </group>
        );
      })}
      <Rig station={station} motion={motion} compose={compose} />
      {motion && <AdaptiveQuality />}
    </>
  );
}

export default function World({ station, motion, colors, compose = 'center', shadows = false, onReady }) {
  return (
    <Canvas
      shadows={shadows ? 'soft' : false}
      dpr={[1, 1.6]}
      frameloop={motion ? 'always' : 'demand'}
      camera={{ fov: 36, near: 0.1, far: 120, position: [0, 8, 10] }}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      onCreated={() => onReady?.()}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Scene station={station} motion={motion} colors={colors} compose={compose} shadows={shadows} />
    </Canvas>
  );
}
