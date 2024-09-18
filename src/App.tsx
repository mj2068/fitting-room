import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./components/Scene";
import { CSSProperties, Suspense, useState } from "react";
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
      {
        id: "brown",
        label: "棕红",
        image: "/src/assets/render_purse_brown.png",
      },
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
              padding: "16px",
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
        <div className="desc-container">
          <p>
            <b>开发说明</b>
          </p>
          <p>
            依托于React成熟的渲染机制和普及的开发生态，three.js对WebGL完整的实现，fiber对three.js良好的React化封装，使得3D
            Web应用开发模板代码大大精简，效率提高，门槛降低。这一组合是精品3D应用开发的绝配和不二之选。
          </p>
          <p>
            仓库地址：<a>https://...</a>
          </p>
          <p>
            主要技术栈：主框架React、3D实现@react-three/fiber，UI组件库Ant
            Design
          </p>
          <p>开发流程：</p>
          <ul>
            <li>初步设计</li>
            <li>收集资源</li>
            <li>
              对3D模型进行整理、修复，为web开发做相应的转换和适应化
              <Flex>
                <Space>
                  <Flex vertical align="center">
                    <Image
                      className="image"
                      src="/src/assets/blender_modeling.jpg"
                      style={{
                        maxHeight: "240px",
                        height: "auto",
                      }}
                    />
                    <i className="image-desc">Blender模型处理</i>
                  </Flex>
                  <Flex vertical align="center">
                    <Image
                      className="image"
                      src="/src/assets/blender_modeling_2.jpg"
                      style={{
                        maxHeight: "240px",
                        height: "auto",
                      }}
                    />
                    <i className="image-desc">模型简化</i>
                  </Flex>
                </Space>
              </Flex>
            </li>
            <li>
              代码及调试
              <Flex>
                <Flex vertical align="center">
                  <Image
                    className="image"
                    src="/src/assets/debug_view.jpg"
                    style={{
                      maxHeight: "240px",
                      height: "auto",
                    }}
                  />
                  <i className="image-desc">场景调试</i>
                </Flex>
              </Flex>
            </li>
            <li>打包构建，及后续配置</li>
          </ul>
          <p>工作量占比估算：</p>
          <ul>
            <li>设计及资源准备：20%</li>
            <li>3D模型处理：40%</li>
            <li>程序结构及编码：30%</li>
            <li>部署：10%</li>
          </ul>
          <p>
            扩展开发可能性：其中一个进阶开发的可能性为材质动态物理模拟。但实现难度的提高和对客户端性能的影响，实际开发时需要根据需求做好可行性评定和测试。以下视频为渲染效果参考：
          </p>
          <video src="/src/assets/0001-0096.mkv" height={300} controls />
        </div>
      </main>
      <footer>...</footer>
    </>
  );
}

export default App;
