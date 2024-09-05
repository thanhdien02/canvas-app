import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
const font = Space_Grotesk({
  weight: ["700"],
  subsets: ["latin"],
});

const Logo = () => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative size-8">
        <Image src="/logo.svg" fill alt="Logo"></Image>
      </div>
      <h1 className={cn(font.className, "text-xl font-bold")}>Image AI</h1>
    </div>
  );
};

export default Logo;
