import { Flex } from "antd";
import ImageWithTitle from "./ImageWithTitle";

export default function Description() {
  return (
    <div className="desc-container">
      <p>
        <b>开发说明</b>
      </p>
      <p>
        依托于React成熟的渲染机制和普及的开发生态，three.js对WebGL完整的实现，fiber对three.js良好的React化封装，使得3D
        Web应用开发模板代码大大精简，效率提高，门槛降低。这一组合是精品3D应用开发的绝配和不二之选。
      </p>
      <p>
        仓库地址：
        <a href="https://github.com/mj2068/fitting-room/" target="_blank">
          https://github.com/mj2068/fitting-room/
        </a>
      </p>
      <p>
        主要技术栈：主框架React、3D实现@react-three/fiber、UI组件库Ant Design
      </p>
      <p>开发流程：</p>
      <ul>
        <li>初步设计并做极简化实现，大体验证可行性</li>
        <li>收集资源</li>
        <li>
          对3D模型等原始资源进行整理、修复，为web开发做相应适应化转换
          <Flex vertical gap={8}>
            <Flex>
              <ImageWithTitle
                fileName="blender_modeling.jpg"
                title="Blender处理模型"
              />
            </Flex>
            <Flex wrap gap={8}>
              <ImageWithTitle
                fileName="blender_fix_texture.jpg"
                title="贴图修复"
              />
              <ImageWithTitle
                fileName="blender_modeling_2.jpg"
                title="模型简化"
              />
              <ImageWithTitle
                fileName="blender_rigging.gif"
                title="模型骨架及姿态"
              />
            </Flex>
          </Flex>
        </li>
        <li>
          代码及调试
          <Flex>
            <ImageWithTitle fileName="debug_view.jpg" title="场景调试" />
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
      <video
        src={new URL("/src/assets/0001-0096.mp4", import.meta.url).href}
        height={300}
        controls
      />

      <div className="reference-list mar-t-4 small-text grey-text">
        <p>3D模型资源引用：</p>
        <ul>
          <li>
            Mannequin #91d2ac71(
            <a href="https://free3d.io/?a=download&id=91d2ac71" target="_blank">
              https://free3d.io/?a=download&id=91d2ac71
            </a>
            )
          </li>
          <li>
            "Polka Dot Dress" (
            <a href="https://skfb.ly/oPuMH" target="_blank">
              https://skfb.ly/oPuMH
            </a>
            ) by Style3D
          </li>
          <li>
            "Scanned Biege Shoe" (
            <a href="https://skfb.ly/6TnFG" target="_blank">
              https://skfb.ly/6TnFG
            </a>
            ) by ShekhirevaVictoria
          </li>
          <li>
            "Waterproof Kids Shoe" (
            <a href="https://skfb.ly/ovKQy" target="_blank">
              https://skfb.ly/ovKQy
            </a>
            ) by Andrei Alexandrescu
          </li>
          <li>
            "Sneaker de plataforma Walk'n'Dior" (
            <a href="https://skfb.ly/oNSvU" target="_blank">
              https://skfb.ly/oNSvU
            </a>
            ) by vmmaniac
          </li>
          <li>
            "Purse" (
            <a href="https://skfb.ly/6SQ9W" target="_blank">
              https://skfb.ly/6SQ9W
            </a>
            ) by Jogetsu
          </li>
          <li>
            "Gucci Purse" (
            <a href="https://skfb.ly/ooKtD" target="_blank">
              https://skfb.ly/ooKtD
            </a>
            ) by Ziaraallman_3D
          </li>
        </ul>
      </div>
    </div>
  );
}
