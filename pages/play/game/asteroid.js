import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Intersection } from 'three/src/core/Raycaster';
import { Object3D } from 'three/src/core/Object3D';
import { Mesh } from 'three/src/objects/Mesh';

const Target = () => {
  const [hit, setHit] = useState(false);
  const ref = useRef();

  useFrame(() => {
    // Rotate the target
    ref.current.rotation.y += 0.01;
  });

  const handleClick = (e, intersects) => {
    // Check if the target was clicked
    const target = intersects.find(intersect => intersect.object === ref.current);
    if (target) {
      setHit(true);
    }
  };

  return (
    <Mesh ref={ref} onClick={handleClick}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <MeshStandardMaterial attach="material" color={hit ? 'red' : 'green'} />
    </Mesh>
  );
};

const ShootingRange = () => {
  const [gun, setGun] = useState();

  useEffect(() => {
    // Load the gun model
    const loader = new GLTFLoader();
    loader.load('/models/gun.glb', setGun);
  }, []);

  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      {gun && <primitive object={gun} position={[0, 0, -5]} />}
      <Target position={[0, 0, -10]} />
    </Canvas>
  );
};

export default ShootingRange;
