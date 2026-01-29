import Image from "next/image";
import Codexia from "public/codexia-logo.svg";

type CodexiaLogoProps = {
  width?: number;
  height?: number;
  title?: {
    text: string;
    className?: string;
  };
};

export default function CodexiaLogo({
  width = 90,
  height = 90,
  title,
}: CodexiaLogoProps) {
  return (
    <>
      <Image src={Codexia} alt="Codexia Logo" width={width} height={height} />
      {title && <h1 className={title.className || ""}>{title.text}</h1>}
    </>
  );
}
