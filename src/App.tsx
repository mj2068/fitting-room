import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./components/Scene";

function App() {
  return (
    <>
      <div className="canvas-container">
        <Canvas className="canvas-container" gl={{ alpha: false }}>
          <Scene />
        </Canvas>
      </div>
      <div>
        <button>hello</button>
      </div>
    </>
  );
}

export default App;
