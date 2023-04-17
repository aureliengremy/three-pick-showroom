import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store/index";

const ElementGuitarPick = () => {
  const snap = useSnapshot(state);
  // const { nodes, materials } = useGLTF("./shirt_baked.glb");
  const { nodes, materials } = useGLTF("./guitar_pick.glb");

  // Some Logs :
  console.log(nodes.Scene.position);
  console.log(nodes.Guitar_Pick);
//   console.log(materials);
  // console.log(snap.color);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    easing.dampC(materials.Plastic.color, snap.color, 0.25, delta);
    // easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        // geometry={nodes.T_Shirt_male.geometry}
        geometry={nodes.Guitar_Pick.geometry}
        // position={[0, -0.3, 1.6]}
        rotation={[1, 0, 0.2]}
        material={materials.Plastic}
        // material={materials.lambert1}
        // material-roughness={-1}
        dispose={null}
        scale={30}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={0.015}
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
