import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./components/Scene";
import { Suspense, useState } from "react";
import { Poses, Purses } from "./components/MannequinModel";
import { Button, Divider, Flex, Image, Popover, Radio, Space } from "antd";
import { Vector3 } from "three";
import { Html } from "@react-three/drei";
import Description from "./components/Description";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Scrollbars from "react-custom-scrollbars-2";

const purses = [
  {
    id: "gucci",
    label: "女式硬质休闲包",
    colors: [
      {
        id: "gucci",
        label: "浅粉",
        image: "render_purse_gucci.png",
      },
    ],
  },
  {
    id: "square",
    label: "博尔萨皮拎包",
    colors: [
      { id: "black", label: "黑", image: "render_purse_black.png" },
      { id: "blue", label: "蓝", image: "render_purse_blue.png" },
      {
        id: "brown",
        label: "棕红",
        image: "render_purse_brown.png",
      },
    ],
  },
];

const shoes = [
  { id: "sneaker", label: "板鞋", image: "render_sneaker.png" },
  { id: "highheel", label: "高跟鞋", image: "render_highheel.png" },
  { id: "kids", label: "休闲平底鞋", image: "render_kids.png" },
];

const camPosFull = new Vector3(-0.38, 1.14, 2.68);
const camPosBody = new Vector3(-0.22, 1.19, 1.43);
const camPosFoot = new Vector3(-0.51, 0.42, 0.62).multiplyScalar(1.5);

const camTargetFull = new Vector3(0, 0.92, 0);
const camTargetBody = new Vector3(0, 0.99, 0);
const camTargetFoot = new Vector3(0, 0.2, 0);

function App() {
  const [selectedShoe, setSelectedShoe] = useState<Poses>(shoes[1].id as Poses);
  const [selectedPurse, setSelectedPurse] = useState<Purses>(null);

  const [camPos, setCamPos] = useState(camPosFull);
  const [camTarget, setCamTarget] = useState(camTargetFull);

  const [openHelp, setOpenHelp] = useState(false);

  return (
    <div id="app" className="app">
      <header>
        <Header />
      </header>
      <main>
        <Flex>
          <div className="ui-container flex column">
            <Scrollbars style={{ width: "100%" }}>
              <h4>物品列表</h4>

              <Divider orientation="left" className="divider">
                服装
              </Divider>
              <Radio.Group>
                <Flex justify="space-between" align="center">
                  <Radio>点纹棉裙</Radio>
                  <Image
                    className="image"
                    src={
                      new URL(
                        "/src/assets/render_polka_dress.png",
                        import.meta.url,
                      ).href
                    }
                    width={64}
                  />
                </Flex>
              </Radio.Group>

              <Divider orientation="left" className="divider">
                鞋
              </Divider>
              <Radio.Group
                value={selectedShoe}
                onChange={(e) => setSelectedShoe(e.target.value)}
              >
                <Space direction="vertical">
                  {shoes.map((shoe) => (
                    <Flex key={shoe.id} justify="space-between" align="center">
                      <Radio value={shoe.id}>{shoe.label}</Radio>
                      <Image
                        className="image"
                        src={
                          new URL(`/src/assets/${shoe.image}`, import.meta.url)
                            .href
                        }
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
                      className="pad-l"
                    >
                      {purse.colors.map((color) => (
                        <Radio key={color.id} value={color.id}>
                          <Flex vertical align="center">
                            <Image
                              className="image"
                              src={
                                new URL(
                                  `/src/assets/${color.image}`,
                                  import.meta.url,
                                ).href
                              }
                              width={48}
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

              <div className="empty" style={{ height: "2rem" }} />
            </Scrollbars>
          </div>

          <div className="canvas-container">
            <div className="canvas-hud-container left bottom">
              <Space direction="vertical">
                <Button
                  type="default"
                  onClick={() => {
                    setCamPos(camPosFull.clone());
                    setCamTarget(camTargetFull.clone());
                  }}
                >
                  远景
                </Button>
                <Button
                  onClick={() => {
                    setCamPos(camPosBody.clone());
                    setCamTarget(camTargetBody.clone());
                  }}
                >
                  身体
                </Button>
                <Button
                  onClick={() => {
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
                  <div style={{ maxWidth: "200px" }}>
                    <p>左侧列表选择试穿样品，点击图片预览大图；</p>
                    <p>
                      右侧场景左键旋转，右键平移，滚轮缩放，左下角远景、身体、腿部按钮切换预设镜头
                    </p>
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

        <Description />
      </main>
      <Footer />
    </div>
  );
}

export default App;
