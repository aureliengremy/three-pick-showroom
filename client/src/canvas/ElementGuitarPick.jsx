import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store/index";

const ElementGuitarPick = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("./guitar_pick.glb");

  // Some Logs :
  // console.log(nodes);
  // console.log(nodes.Guitar_Pick);
  // console.log(materials);
  // console.log(snap.color);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    easing.dampC(materials.Plectrum.color, snap.color, 0.25, delta);
  });
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
       
        geometry={nodes.Plectrum_Plectrum_0.geometry}
        position={[0, 0, 0]}
        rotation={[1.4, 0, 0]}
        material={materials.Plectrum}
        dispose={null}
        scale={-0.5}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[1, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0.01, -0.1, 0.10]}
            // position={[0, 0, 0]}
            rotation={[1.54, 0, 0]}
            scale={0.40}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default ElementGuitarPick;
