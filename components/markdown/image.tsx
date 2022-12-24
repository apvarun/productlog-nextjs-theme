import Image from "next/image";

const MarkdownImage = (props) => (
  <Image {...props} className="markdown-img" fill sizes="100vw" />
);

export default MarkdownImage;
