import Image from "next/image";
import logo from "../../../../public/logo.svg";
const Logo = () => {
  return (
    <div className="relative size-8">
      <Image className="" fill src={logo} alt="Logo"></Image>
    </div>
  );
};

export default Logo;
