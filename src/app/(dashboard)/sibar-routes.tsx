"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Crown, Home, MessageCircleQuestion } from "lucide-react";
import SidebarItem from "./sibar-item";
import { usePathname } from "next/navigation";
import path from "path";

const SidebarRoute = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col">
      <Button
        variant="outline"
        className="border-0 hover:bg-white hover:opacity-70 transition flex items-center gap-2 h-11"
      >
        <Crown className="size-4 fill-yellow-500 text-yellow-500" />
        Upgrade to Image AI Pro
      </Button>

      <Separator className="my-4"></Separator>
      <SidebarItem
        label="Home"
        href="/"
        isActive={pathname === "/"}
        icon={Home}
      />
      <Separator className="my-4"></Separator>
      <ul className="space-y-2">
        <SidebarItem label="Billing" href="/" icon={CreditCard} />
        <SidebarItem
          label="Get help"
          href="mailto:support@ntd171002.com"
          icon={MessageCircleQuestion}
        />
      </ul>
    </div>
  );
};

export default SidebarRoute;
