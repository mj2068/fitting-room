// import { Image } from "antd";

export default function Header() {
  return (
    <>
      <a href="https://zizaimai.space/demo/">返回上级</a>
      {/* <div> */}
      {/*   <Image */}
      {/*     src={new URL("/src/assets/logo_t.png", import.meta.url).href} */}
      {/*     height={32} */}
      {/*   /> */}
      {/* </div> */}
      <h4 className="no-margin-bot">3D换装试衣间</h4>
      <i className="small-text grey-text">
        在左侧列表选择不同的物品，将在右侧3D互动场景里实时呈现
      </i>
    </>
  );
}
