import React, { Component, Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';

/* Draco decoder ships locally in /public/draco (no third-party request). */
useGLTF.setDecoderPath('/draco/');
const BOOMBOX_URL = '/models/boombox/BoomBox.gltf';

/* Real model (Khronos glTF sample "Boom Box", CC0). Sized to fit, then sways toward the pointer. */
function BoomBox({ reduce }) {
  const { scene } = useGLTF(BOOMBOX_URL);
  const group = useRef(null);
  const fitted = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = new Vector3();
    box.getSize(size);
    const center = new Vector3();
    box.getCenter(center);
    const s = 2.7 / Math.max(size.x, size.y, size.z);
    return { scale: s, offset: center.multiplyScalar(-s) };
  }, [scene]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const { pointer } = state;
    const tx = reduce ? 0 : Math.sin(t * 0.45) * 0.22 + pointer.y * 0.12;
    const ty = reduce ? -0.5 : Math.sin(t * 0.6) * 0.5 - 0.5 + pointer.x * 0.35;
    g.rotation.x += (tx - g.rotation.x) * 0.06;
    g.rotation.y += (ty - g.rotation.y) * 0.06;
  });

  return (
    <Float speed={reduce ? 0 : 1.2} rotationIntensity={0} floatIntensity={reduce ? 0 : 0.4}>
      <group ref={group}>
        <primitive object={scene} scale={fitted.scale} position={fitted.offset} />
      </group>
    </Float>
  );
}

/* Orbit rings with satellites: the "systems" motif. */
function Orbits({ reduce }) {
  const a = useRef(null);
  const b = useRef(null);
  useFrame((_, dt) => {
    if (reduce) return;
    if (a.current) a.current.rotation.z += dt * 0.22;
    if (b.current) b.current.rotation.x += dt * 0.16;
  });
  return (
    <>
      <group ref={a} rotation={[Math.PI / 2.6, 0, 0]}>
        <Torus args={[2.35, 0.012, 16, 160]}>
          <meshBasicMaterial color="#30d158" transparent opacity={0.7} />
        </Torus>
        <Sphere args={[0.09, 24, 24]} position={[2.35, 0, 0]}>
          <meshStandardMaterial color="#30d158" emissive="#30d158" emissiveIntensity={0.4} />
        </Sphere>
      </group>
      <group ref={b} rotation={[0.5, Math.PI / 3, 0]}>
        <Torus args={[2.8, 0.008, 16, 180]}>
          <meshBasicMaterial color="#8e8e93" transparent opacity={0.45} />
        </Torus>
        <Sphere args={[0.06, 20, 20]} position={[0, 2.8, 0]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
        </Sphere>
      </group>
    </>
  );
}

function Scene({ reduce }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, 1, -2]} intensity={0.8} color="#cfe0ff" />
      <pointLight position={[-3, -2, 2]} color="#2997ff" intensity={2.2} />
      <Suspense fallback={null}>
        <BoomBox reduce={reduce} />
      </Suspense>
      <Orbits reduce={reduce} />
    </>
  );
}

/* Falls back to nothing if WebGL is unavailable, so the hero text still works. */
class Guard extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

const Scene3D = ({ reduce = false }) => (
  <Guard>
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 7.4], fov: 40 }} gl={{ alpha: true, antialias: true }}>
      <Scene reduce={reduce} />
    </Canvas>
  </Guard>
);

export default Scene3D;
