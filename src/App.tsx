import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./components/Scene";
import { Suspense, useState } from "react";
import { Poses, Purses } from "./components/MannequinModel";
import {
  Button,
  Divider,
  Flex,
  FloatButton,
  Image,
  List,
  Popover,
  Radio,
  Segmented,
  Space,
} from "antd";
import { Vector3 } from "three";
import { Html } from "@react-three/drei";

const purses = [
  {
    id: "gucci",
    label: "女式硬质休闲包",
    colors: [
      {
        id: "gucci",
        label: "浅粉",
        image: "/src/assets/render_purse_gucci.png",
      },
    ],
  },
  {
    id: "square",
    label: "博尔萨皮拎包",
    colors: [
      { id: "black", label: "黑", image: "/src/assets/render_purse_black.png" },
      { id: "blue", label: "蓝", image: "/src/assets/render_purse_blue.png" },
      { id: "brown", label: "棕红", image: "/src/assets/render_purse_brown.png" },
    ],
  },
];

const shoes = [
  { id: "sneaker", label: "板鞋", image: "/src/assets/render_sneaker.png" },
  { id: "highheel", label: "高跟鞋", image: "/src/assets/render_highheel.png" },
  { id: "kids", label: "休闲平底鞋", image: "/src/assets/render_kids.png" },
];

const camPosFull = new Vector3(-0.38, 1.14, 2.68);
const camPosBody = new Vector3(-0.22, 1.19, 1.43);
const camPosFoot = new Vector3(-0.51, 0.42, 0.62).multiplyScalar(1.5);

const camTargetFull = new Vector3(0, 0.92, 0);
const camTargetBody = new Vector3(0, 0.99, 0);
const camTargetFoot = new Vector3(0, 0.2, 0);

function App() {
  const [selectedShoe, setSelectedShoe] = useState(shoes[1].id);
  const [selectedPurse, setSelectedPurse] = useState(null);

  const [camPos, setCamPos] = useState(camPosFull);
  const [camTarget, setCamTarget] = useState(camTargetFull);

  const [openHelp, setOpenHelp] = useState(false);

  return (
    <>
      <main>
        <Flex>
          <div
            className="ui-container flex column"
            style={{
              // minWidth: "300px",
              height: "600px",
              boxSizing: "border-box",
              overflowY: "scroll",
              overflowX: "hidden",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
          >
            <h3>物品列表</h3>
            <Divider orientation="left" className="divider">
              服装
            </Divider>
            <Radio.Group>
              <Flex justify="space-between" align="center">
                <Radio>点纹棉裙</Radio>
                <Image src="/src/assets/render_polka_dress.png" width={64} />
              </Flex>
            </Radio.Group>

            <Divider orientation="left" className="divider">
              鞋
            </Divider>
            <Radio.Group
              value={selectedShoe}
              onChange={(e) => setSelectedShoe(e.target.value)}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                {shoes.map((shoe) => (
                  <Flex key={shoe.id} justify="space-between" align="center">
                    <Radio value={shoe.id}>{shoe.label}</Radio>
                    <Image
                      style={{ borderRadius: 4, textAlign: "right" }}
                      src={shoe.image}
                      width={64}
                    />
                  </Flex>
                ))}
              </Space>
            </Radio.Group>

            <Divider orientation="left" className="divider">
              <span>饰品</span>
            </Divider>

            <Space direction="vertical">
              <Radio.Group
                value={selectedPurse === null ? "" : selectedPurse}
                onChange={(e) =>
                  setSelectedPurse(
                    e.target.value === "" ? null : e.target.value,
                  )
                }
              >
                <Radio value={""}>无</Radio>
              </Radio.Group>
              {purses.map((purse) => (
                <Flex key={purse.id} vertical>
                  <span>{purse.label}</span>
                  <Radio.Group
                    value={selectedPurse}
                    onChange={(e) => setSelectedPurse(e.target.value)}
                    style={{ paddingLeft: "16px" }}
                  >
                    {purse.colors.map((color) => (
                      <Radio key={color.id} value={color.id}>
                        <Flex vertical align="center">
                          <Image
                            src={color.image}
                            width={48}
                            style={{ borderRadius: 4 }}
                            onClick={(e) => e.preventDefault()}
                          />
                          {color.label}
                        </Flex>
                      </Radio>
                    ))}
                  </Radio.Group>
                </Flex>
              ))}
            </Space>
          </div>

          <div className="canvas-container">
            <div className="canvas-hud-container left bottom">
              <Space direction="vertical">
                <Button
                  type="default"
                  onClick={(_) => {
                    setCamPos(camPosFull.clone());
                    setCamTarget(camTargetFull.clone());
                  }}
                >
                  远景
                </Button>
                <Button
                  onClick={(_) => {
                    setCamPos(camPosBody.clone());
                    setCamTarget(camTargetBody.clone());
                  }}
                >
                  身体
                </Button>
                <Button
                  onClick={(_) => {
                    setCamTarget(camTargetFoot.clone());
                    setCamPos(camPosFoot.clone());
                  }}
                >
                  腿部
                </Button>
              </Space>
            </div>
            <div className="canvas-hud-container right bottom">
              <Popover
                content={
                  <div style={{ maxWidth: "190px" }}>
                    <p>鼠标左键旋转</p>
                    <p>鼠标右键平移</p>
                    <p>鼠标滚轮缩放</p>
                    <p>点击左下角远景、身体、腿部三个按钮切换预设镜头角度</p>
                  </div>
                }
                title="帮助"
                trigger="click"
                open={openHelp}
                onOpenChange={(n) => setOpenHelp(n)}
                placement="topRight"
              >
                <Button shape="circle" type="primary">
                  ?
                </Button>
              </Popover>
            </div>

            <Canvas className="canvas-container" gl={{ alpha: true }} shadows>
              <Suspense
                fallback={
                  <Html style={{ width: "400px" }}>
                    <p>加载中...</p>
                  </Html>
                }
              >
                <Scene
                  pose={selectedShoe}
                  purse={selectedPurse}
                  camPos={camPos}
                  camTarget={camTarget}
                />
              </Suspense>
            </Canvas>
          </div>
        </Flex>

        <Divider />
        <div className="description">
          <p>说明：</p>
          <p>仓库地址</p>
          <p>技术栈</p>
          <p>流程</p>
          <p>工作量占比</p>
        </div>
      </main>
      <footer>...</footer>
    </>
  );
}

export default App;
