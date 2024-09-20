import { Flex, Image } from "antd";

export default function ImageWithTitle({
  fileName,
  title,
}: {
  fileName: string;
  title?: string;
}) {
  return (
    <Flex vertical align="center">
      <Image
        className="image"
        src={new URL(`/src/assets/${fileName}`, import.meta.url).href}
      />
      {title && <i className="small-text grey-text">{title}</i>}
    </Flex>
  );
}
