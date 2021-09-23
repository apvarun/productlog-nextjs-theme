import Image from 'next/image';

const MarkdownImage = (props) => (
  <div className="markdown-img-container">
    <Image {...props} layout="fill" className="markdown-img" />
  </div>
);

export default MarkdownImage;
