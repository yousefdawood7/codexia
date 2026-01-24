import Image from "next/image";
import Codexia from "public/codexia-logo.svg";

export default function CodexiaLogo() {
  return <Image src={Codexia} alt="Codexia Logo" width={90} height={90} />;
}
