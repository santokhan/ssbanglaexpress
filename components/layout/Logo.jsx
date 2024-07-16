import Image from "next/image";
import logo from "@/assets/images/logo.svg";

const Logo = ({ className = "" }) => (
  <Image src={logo} alt="logo" width={160} height={80} priority className={className}/>
);

export default Logo