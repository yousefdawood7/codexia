import Image from "next/image";
import Codexia from "public/codexia-logo.svg";

export default function CodexiaLogo({ size = 32 }: { size?: number }) {
  return <Image src={Codexia} alt="Codexia Logo" width={size} height={size} />;
}
