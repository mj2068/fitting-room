export default function MakeLink({ text }: { text: string }) {
  // 2024年9月19日 16点18分
  // 待实现：从字符串中将链接挑出来
  const m = /((http:\/\/|https:\/\/).*)\s/;
  console.log(text.split(m))

  return null;
}
