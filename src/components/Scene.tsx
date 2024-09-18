import {
  Grid,
  Helper,
  OrbitControls,
  PerspectiveCamera,
  SoftShadows,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import MannequinModel, { Poses, Purses } from "./MannequinModel";
import {
  DirectionalLightHelper,
  PointLightHelper,
  Vector3,
  Event,
  DoubleSide,
} from "three";

export default function Scene({
  pose,
  purse,
  camPos,
  camTarget,
}: {
  pose?: Poses;
  purse?: Purses;
  camPos: Vector3;
  camTarget: Vector3;
}) {
  return (
    <>
      {/* <gridHelper args={[4, 4]} /> */}
      {/* <gridHelper args={[4, 4]} rotation-x={Math.PI / 2} /> */}
      {/* <gridHelper args={[4, 4]} rotation-z={Math.PI / 2} /> */}
      {/* <Grid */}
      {/*   position={[0, -0.002, 0]} */}
      {/*   scale={4} */}
      {/*   cellSize={0.25} */}
      {/*   cellThickness={1} */}
      {/*   cellColor={"#ff00ff"} */}
      {/*   // sectionSize={0.125} */}
      {/*   // sectionThickness={1} */}
      {/*   // sectionColor={"#ff00ff"} */}
      {/*   side={DoubleSide} */}
      {/* /> */}
      {/* <Grid */}
      {/*   rotation-x={Math.PI / 2} */}
      {/*   scale={4} */}
      {/*   cellSize={0.25} */}
      {/*   cellThickness={1} */}
      {/*   cellColor={"#ffff00"} */}
      {/*   side={DoubleSide} */}
      {/* /> */}
      {/* <Grid */}
      {/*   rotation-z={-Math.PI / 2} */}
      {/*   scale={4} */}
      {/*   cellSize={0.25} */}
      {/*   cellThickness={1} */}
      {/*   cellColor={"#00ffff"} */}
      {/*   side={DoubleSide} */}
      {/* /> */}

      <color attach="background" args={["#f0f0f0"]} />
      <fog attach="fog" args={["#f0f0f0", 0, 20]} />

      <PerspectiveCamera makeDefault fov={45} position={camPos} />
      <OrbitControls
        target={camTarget}
        // onEnd={(e) => {
        //   console.log(e.target.object.position);
        //   console.log(e.target.target);
        // }}
        // enablePan={false}
        minDistance={1}
        maxDistance={3}
        minPolarAngle={Math.PI / 2 - Math.PI / 8}
        maxPolarAngle={Math.PI / 2 + Math.PI / 8}
      />

      <ambientLight intensity={0.2} />

      <directionalLight
        position={[3, 3, 3]}
        intensity={0.8}
        castShadow
        // shadow={{ mapSize }}
        shadow-bias={-0.00001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-normalBias={0.005}
      >
        {/* <Helper type={DirectionalLightHelper} args={[1, "lightgreen"]} /> */}
      </directionalLight>
      <directionalLight
        position={[-3, 3, 3]}
        intensity={0.8}
        castShadow
        shadow-bias={-0.00001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-normalBias={0.005}
      >
        {/* <Helper type={DirectionalLightHelper} args={[1, "lightgreen"]} /> */}
      </directionalLight>
      <directionalLight
        position={[0, 3, -3]}
        intensity={0.5}
        castShadow
        shadow-bias={-0.00001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-normalBias={0.005}
      >
        {/* <Helper type={DirectionalLightHelper} args={[1, "lightgreen"]} /> */}
      </directionalLight>
      <pointLight
        position={[0.5, 0.6, 0]}
        intensity={0.5}
        color={"white"}
        distance={0.5}
        decay={0.2}
      >
        {/* <Helper type={PointLightHelper} /> */}
      </pointLight>

      {/* <axesHelper args={[2]} /> */}

      <SoftShadows size={16} samples={16} />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.001, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.05} />
        {/* <meshStandardMaterial /> */}
      </mesh>

      <MannequinModel pose={pose} purse={purse} />
    </>
  );
}
